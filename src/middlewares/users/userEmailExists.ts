import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users";
import { AppError } from "../../errors";

const userEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const { originalUrl: path } = req;
  const requestDatabase = AppDataSource.getRepository(Users);
  const emailExists = await requestDatabase.findOneBy({ email });

  if (emailExists && path == "/users") {
    throw new AppError("User already exists", 409);
  }

  if (!emailExists && path == "/login") {
    throw new AppError("Email or password is invalid.", 409);
  }

  req.validatedUser = emailExists;

  return next();
};

export default userEmailExistsMiddleware;
