import { useState } from "react";
import { useAccount, useEditAccount } from "../hooks/useAccount.js";
import { useNavigate } from "react-router";

export default function EditAccount() {
  const { account, loading, error } = useAccount();

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p>{error}</p>;

  return <EditAccountForm account={account} />;
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
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSubmit}>
        {loading ? "Loading" : "Update Account"}
      </button>
    </form>
  );
}
