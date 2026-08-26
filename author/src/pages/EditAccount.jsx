import { useContext, useState } from "react";
import {
  useAccount,
  useDeleteAccount,
  useEditAccount,
} from "../hooks/useAccount.js";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext.jsx";

export default function EditAccount() {
  const { account, loading, error } = useAccount();

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <EditAccountForm account={account} />
      <DeleteAccountForm username={account.username} />
    </div>
  );
}

function EditAccountForm({ account }) {
  const { editAccount, loading, error } = useEditAccount();
  const [accountData, setAccountData] = useState(account);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setAccountData({
      ...accountData,
      [name]: value,
    });
  }

  function handleCancel() {
    navigate("/account");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await editAccount(accountData);
    navigate("/account");
  }

  return (
    <form>
      {error && (
        <>
          {error.map((err) => (
            <p>{err.msg}</p>
          ))}
        </>
      )}
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          value={accountData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="bio">Bio: </label>
        <input
          type="text"
          name="bio"
          id="bio"
          value={accountData.bio}
          onChange={handleChange}
        />
      </div>
      <button className="cancel" onClick={handleCancel}>
        Cancel
      </button>
      <button onClick={handleSubmit}>
        {loading ? "Loading" : "Update Account"}
      </button>
    </form>
  );
}

function DeleteAccountForm({ username }) {
  const { loading, error, deleteAccount } = useDeleteAccount();
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function onDelete(e) {
    e.preventDefault();
    let confirmation = confirm(
      "Are you sure you want to delete your account? This will delete your account and everything associated with it. This action cannot be undone?"
    );
    if (confirmation) {
      await deleteAccount(username);
      localStorage.clear();
      setUser(null);
      navigate("/signup");
    }
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="danger-zone">
      <h2>Danger Zone</h2>
      <p>
        Deleting your account will delete everything associated with it. This
        action cannot be undone.
      </p>
      <button className="delete" onClick={onDelete}>
        {loading ? "Loading" : "Delete Account"}
      </button>
    </div>
  );
}
