import User from "../model/User.js";

// {
// "name": "Martina",
// "email": "me@web.de",
// "password": "!Email123",
// "confirmPassword": "!Email123",
// "favoriteMusic": ["Pop"],
// "accountCreatedAt": "27-11-2022",
// "birthday": "12-02-1982"
//   }

// CREATE NEW USER
/** @type {import("express").RequestHandler} */
export async function createUser(req, res) {
  const user = new User(req.body);

  const token = user.generateAuthToken();
  await user.save();

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  };

  res
    .status(201)
    .cookie("token", token, cookieOptions)
    .send({ msg: "user created", user });
}

/** @type {import("express").RequestHandler} */
export async function showUsers(req, res) {
  const users = await User.find();

  res.status(200).send(users);
}

export async function login(req, res, next) {
  const user = await User.findByEmail(req.body.email);

  if (!user) {
    return next({ status: 401, message: "You shall not pass!" });
  }

  const passwordsAreEqual = await user.checkPassword(req.body.password);

  if (!passwordsAreEqual) {
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

export async function getOneUser(req, res) {
  const user = req.user;
  res.send(user);
}
