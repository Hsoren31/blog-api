import * as db from "../db/userQueries.js";
import { body, validationResult } from "express-validator";

async function readUser(req, res) {
  try {
    const { username } = req.params;
    const user = await db.readUser(username);
    if (!user) {
      return res.status(404).json({ error: "Could not find user." });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.json({ error: "Something went wrong. Try again." });
  }
}

const updateProfile = [
  body("name")
    .trim()
    .optional({ values: "falsy" })
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name must only contain letters."),
  async (req, res) => {
    try {
      // Check validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      const { username } = req.params;
      const { name, bio, avatar } = req.body;

      //Check if user was found
      const userExists = await db.checkUserExists(username);
      if (!userExists) {
        return res.status(404).json({ error: "Could not find user." });
      }

      // Check if unauthorized account is trying to update account.
      const userId = await db.readUserId(username);
      if (userId !== req.user.id) {
        return res
          .status(403)
          .json({ error: "You don't have access to change this account." });
      }

      //Update Profile
      const user = await db.updateProfile({
        userId: req.user.id,
        name,
        bio,
        avatar,
      });
      res.json({ user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Something unexpected occured. Please try again." });
    }
  },
];

async function deleteUser(req, res) {
  try {
    const { username } = req.params;
    // Check if user Exists
    const userExists = await db.checkUserExists(username);
    if (!userExists) {
      return res.status(404).json({ error: "Could not find user." });
    }

    // Delete User
    const user = await db.deleteUser(req.user.id);
    res.status(200).json({ message: "Deleted user successfully.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something unexpected happen." });
  }
}

async function followUser(req, res) {
  try {
    const { username } = req.params;

    const connectionExists = await db.checkFollowsConnection(
      req.user.id,
      username
    );
    if (connectionExists) {
      return res.status(409).json({
        error: "Cannot follow a profile you are already following.",
      });
    }
    await db.followUser(req.user.id, username);
    res.json({ message: `Now following ${username}` });
  } catch (error) {
    console.error(error);
    res.json({ error: "Something went wrong." });
  }
}

async function unfollowUser(req, res) {
  try {
    const { username } = req.params;
    const connectionExists = await db.checkFollowsConnection(
      req.user.id,
      username
    );
    if (!connectionExists) {
      return res.status(409).json({
        error: "Cannot unfollow a profile you are not following.",
      });
    }
    await db.unfollowUser(req.user.id, username);
    res.json({ message: `Successfully unfollowed ${username}` });
  } catch (error) {
    console.error(error);
    res.json({ error: "Something went wrong." });
  }
}

export { readUser, updateProfile, deleteUser, followUser, unfollowUser };
