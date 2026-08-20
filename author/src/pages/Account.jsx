import { useNavigate } from "react-router";
import { useAccount } from "../hooks/useAccount";

export default function Account() {
  const navigate = useNavigate();
  const { account, loading, error } = useAccount();

  function onEdit() {
    navigate("/account/edit");
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Account Details</h1>
      <p>Name: {account.name}</p>
      <p>Bio: {account.bio}</p>
      <p>Username: {account.username}</p>
      <button onClick={onEdit}>Edit</button>
    </>
  );
}
