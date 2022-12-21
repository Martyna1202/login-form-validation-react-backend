import { body } from "express-validator";
import validate from "../middlewares/validate.js";
import User from "../../model/User.js";
import "express-async-errors";

export const register = [
  body("name").isString().optional().withMessage("Please fill in your name"),
  body("email").isEmail().withMessage("Your Email ist not correct"),
  body("email").custom(async (value) => {
    const user = await User.findByEmail(value);
    if (user) throw new Error("This Email is already in use!");
    return true;
  }),
  body("password")
    .isStrongPassword()
    .withMessage("please choose strong Password"),
  validate,
];

export const login = [
  body("name").optional(),
  body("email").isEmail().withMessage("Your Email is not valid"),
  body("password").isString(),
  validate,
];

// FOR CONFIRM PASSWORD OR ADDRESS
// body("confirmPassword").custom((value, { req }) => {
//   if (value !== req.body.password)
//     throw new Error("Password confirmation does not match password");
//   return true;
// }),
//   body("address").isString().optional(),
