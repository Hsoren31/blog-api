import { body, validationResult } from "express-validator";

const profileValidation = [
  body("name")
    .trim()
    .optional({ values: "falsy" })
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name must only contain letters."),
];

const validateProfile = [
  profileValidation,
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    next();
  },
];

export default validateProfile;
