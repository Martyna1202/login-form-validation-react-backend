import User from "../../model/User.js";
import httpErrors from "http-errors";

export default async function auth(req, res, next) {
  //   const token = req.headers["x-auth"];
  const token = req.cookies.token;
  if (!token) throw httpErrors.Unauthorized("You shall not pass");

  const user = await User.findByAuthToken(token);
  if (!user) throw httpErrors.Unauthorized("You shall not pass");

  req.user = user;

  next();
}
