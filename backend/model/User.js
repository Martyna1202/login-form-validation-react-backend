import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const mySuperKey = process.env.superSecretKey;

const addressSchema = new Schema(
  {
    street: { type: String },
    city: { type: String },
    zip: { type: Number },
    telephoneNumber: { type: Number },
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthday: { type: Date },
    address: addressSchema,
    favoriteMusic: {
      type: String,
      enum: ["Rock", "Pop", "Dance", "R'n'B", "Reggae", "Classic"],
    },

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],

    tokens: [{ type: String }],
  },
  { timestamps: true }
);

//  INSTANCE METHODS
//****************** */

//  ONLY THIS SELECTED DATA USERS CAN READ
UserSchema.methods.toJSON = function () {
  const user = this;
  const publicFields = [
    "name",
    "email",
    "_id",
    "favoriteMusic",
    "accountCreatedAt",
    "comments",
    "cart",
    "tokens",
  ];
  const result = {};
  for (const key of publicFields) {
    result[key] = user[key];
  }
  return result;
};

//  GENERATE AUTH-TOKEN
UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt
    .sign({ _id: user._id, name: user.name }, mySuperKey, {
      expiresIn: "31 days",
    })
    .toString();

  user.tokens.push(token);
  return token;
};

//  PRE SAVE
UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

//  CHECK PASSWORDS ARE EQUAL
UserSchema.methods.checkPassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

//  STATIC METHODS
//****************** */

//  FIND BY EMAIL
UserSchema.statics.findByEmail = function (email) {
  return User.findOne().where("email").equals(email);
};

//  FIND BY AUTH-TOKEN
UserSchema.statics.findByAuthToken = function (token) {
  const decode = jwt.verify(token, mySuperKey);
  return User.findById(decode._id).where("token").equals(token);
};

//  ***************************

//  CREATE USER MODEL AND EXPORT USER
const User = model("user", UserSchema, "users");

export default User;
