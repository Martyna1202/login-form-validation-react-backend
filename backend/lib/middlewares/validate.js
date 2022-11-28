import { validationResult } from "express-validator";
import httpErrors from "http-errors";

export default function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const shortErrors = errors.array().map((err) => {
    return {
      [err.param]: err.msg,
    };
  });

  //  HERE: NEXT()
  //  return next({ message: shortErrors, status: 418 });
  //  OR: THROW NOT RETURN!!!:
  throw httpErrors.BadRequest(shortErrors);
}
