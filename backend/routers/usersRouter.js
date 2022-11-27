import express from "express";
import * as controller from "../controller/userController.js";
import * as userValidations from "../lib/validations/userValidation.js";
import "express-async-errors";

const app = express.Router();

app.get("/", controller.showUsers);
app.post("/register", ...userValidations.register, controller.createUser);
app.post("/login", ...userValidations.login, controller.login);

export default app;
