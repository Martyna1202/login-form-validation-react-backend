import express from "express";
import * as controller from "../controller/userController.js";
import * as userValidations from "../lib/validations/userValidation.js";
import auth from "../lib/middlewares/auth.js";
import "express-async-errors";

const app = express.Router();

//  ONLY FOR TESTING DURING CODING!!!
app.get("/", controller.showUsers);

app.get("/user", auth, controller.getOneUser);
app.post("/register", ...userValidations.register, controller.createUser);
app.post("/login", ...userValidations.login, controller.login);
app.post("/isLoggedIn", auth, controller.isLoggedIn);
app.post("/logout", auth, controller.logout);

export default app;
