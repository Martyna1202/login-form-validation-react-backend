import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
dotenv.config();
import "express-async-errors";

//  IMPORT ROUTES FROM FILES
import usersRouter from "./routers/usersRouter.js";

//  DATA FROM ENV-FILE
const { DB_USER, DB_PASS, DB_HOST, DB_NAME, PORT } = process.env;

//  MONGOOSE DATA CONNECTION-STRING
const dbConnectionString = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

//  MONGOOSE CONNECTION TO DATABASE
mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch(() => console.log("Database is NOT connected!"));

const app = express();
//  MIDDLEWARE
app.use(express.json());
app.use(cookieParser());

//  COMMUNICATION BETWEEN BROWSER & SERVER,
//  ONLY IF THIS SELECTED URL OF BROWSER IS ON WHITE-LIST,
//  BROWSER IS ABLE TO READ RESPONSE
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/user", usersRouter);

//  ERROR HANDLING
app.use((req, res, next) => {
  next({
    status: 404,
    message: "not found",
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message,
  });
});

//  APP IS LISTENING TO PORT
app.listen(PORT, () => console.log("app is listening on port:", PORT));
