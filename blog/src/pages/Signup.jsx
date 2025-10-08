export default function Signup() {
  return (
    <form>
      <legend>Sign Up</legend>
      <div>
        <label htmlFor="firstName">First Name: </label>
        <input type="firstName" name="firstName" id="firstName" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name: </label>
        <input type="text" name="lastName" id="lastName" />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" />
      </div>
      <div>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
