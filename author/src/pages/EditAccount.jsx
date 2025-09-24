import { useState } from "react";
import { useNavigate } from "react-router";

export default function EditAccount() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "Test",
    lastName: "Dummy",
    username: "testDummy1234",
    email: "testDummer@dummy",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function onCancel() {
    navigate("/");
  }

  function onSubmit() {
    //save post
    navigate("/");
  }

  return (
    <>
      <h1>Edit Account</h1>
      <form>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={userData.firstName}
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={userData.lastName}
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={userData.username}
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleInput}
          />
        </div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onSubmit}>Submit</button>
      </form>
    </>
  );
}
