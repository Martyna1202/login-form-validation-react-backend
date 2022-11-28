import User from "../model/User.js";

//  **************
// CREATE NEW USER
/** @type {import("express").RequestHandler} */
export async function createUser(req, res) {
  //  CREATE NEW USER, GENERATE TOKEN AND SAVE USER DATA
  const user = new User(req.body);
  const token = user.generateAuthToken();
  await user.save();

  //  SET COOKIES
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  };

  //  RESPONSE
  res
    .status(201)
    .cookie("token", token, cookieOptions)
    .send({ msg: "user created", user });
}

//  **************
//  SHOW ALL USERS  //  FOR TESTING DURING CODING
/** @type {import("express").RequestHandler} */
export async function showUsers(req, res) {
  const users = await User.find();

  res.status(200).send(users);
}

//  **************
//  LOGIN
/** @type {import("express").RequestHandler} */
export async function login(req, res, next) {
  const user = await User.findByEmail(req.body.email);
  if (!user) {
    //  IF USER DOESN'T EXIST
    return next({ status: 401, message: "You shall not pass!" });
  }

  const passwordsAreEqual = await user.checkPassword(req.body.password);
  if (!passwordsAreEqual) {
    //  IF COMPARING PASSWORDS DON'T MATCH
    return next({ status: 401, message: "you shall not pass!" });
  }

  const token = user.generateAuthToken();
  await user.save();

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  };

  res.cookie("token", token, cookieOptions).status(200).send({
    message: "Successfully logged in",
    token,
  });
}

//  **************
//  SHOW OWN DATA OF USER
/** @type {import("express").RequestHandler} */
export async function getOneUser(req, res) {
  const user = req.user;
  res.send(user);
}

//  **************
//  UPDATE PROFILE
/** @type {import("express").RequestHandler} */
export async function updateProfile(req, res, next) {
  const user = req.user;
}

//  **************
//  LOGOUT
/** @type {import("express").RequestHandler} */
export async function logout(req, res, next) {
  const user = req.user;
  const token = req.cookies.token;

  const filteredTokens = user.tokens.filter((el) => el !== token);
  user.tokens = filteredTokens;
  await user.save();

  res.clearCookie("token").status(200).send("Successfully logged out");
}

//  **************
//  CHECK IF IS USER LOGGED IN
/** @type {import("express").RequestHandler} */
export async function isLoggedIn(req, res, next) {
  res.status(200).send(true);
}
