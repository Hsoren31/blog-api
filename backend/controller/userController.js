const db = require("../db/userQueries");

async function createUser(req, res) {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    // check if user exists in the database
    const userExists = await db.findIfUserExists(email);
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    // check if username is taken
    const usernameExists = await db.findIfUsernameExists(username);
    if (usernameExists) {
      return res.status(400).json({ error: "Username is already taken." });
    }
    const user = await db.createUser(
      firstName,
      lastName,
      email,
      username,
      password
    );
    res.json({ user });
  } catch (error) {
    res.json({ error: "Something went wrong. Try again." });
  }
}

async function readUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await db.readUser(userId);
    if (!user) {
      res.status(400).json({ error: "Could not find user." });
    }
    res.json({ user });
  } catch (error) {
    res.json({ error: "Something went wrong. Try again." });
  }
}

async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    const { firstName, lastName, email, username, password } = req.body;
    const user = await db.updateUser(
      userId,
      firstName,
      lastName,
      email,
      username,
      password
    );
    res.json({ user });
  } catch (error) {
    res.json({ error: "Could not find user to be updated." });
  }
}

async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    await db.deleteUser(userId);
    res.json({ message: "Deleted user successfully." });
  } catch (error) {
    res.json({ error: "Could not find user to delete" });
  }
}

module.exports = {
  createUser,
  readUser,
  updateUser,
  deleteUser,
};
