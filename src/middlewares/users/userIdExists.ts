import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users";
import { AppError } from "../../errors";
// import AppDataSource from "../data-source";
// import { users } from "../entities/users";
// import { AppError } from "../errors";

const userIdExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError("Patch route needs id params.", 400);
  }

  const requestDatabase = AppDataSource.getRepository(Users);

  try {
    const findUser = await requestDatabase.findOneBy({ id });
    if (!findUser) {
      throw new Error();
    }

    req.validatedUser = findUser;
    return next();
  } catch (err) {
    throw new AppError("User not found.", 404);
  }
};

export default userIdExistsMiddleware;
