import { useNavigate } from "react-router";

export default function Account() {
  const navigate = useNavigate();
  const user = {
    firstName: "Test",
    lastName: "Dummy",
    username: "testDummy1234",
    email: "testDummer@dummy",
  };

  function onEdit() {
    navigate("/account/edit");
  }

  return (
    <>
      <h1>Account Details</h1>
      <p>{user.firstName + " " + user.lastName}</p>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <button onClick={onEdit}>Edit</button>
    </>
  );
}
