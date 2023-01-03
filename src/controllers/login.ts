import { Request, Response } from "express";
import { IUserCompleted, IUserRequest } from "../interfaces/users";
import { loginUserService } from "../services";

const loginUserController = async (req: Request, res: Response) => {
  const userData = req.validatedBody as IUserRequest;
  const userSearched = req.validatedUser as IUserCompleted;
  const data = await loginUserService(userData, userSearched);

  return res.status(200).json(data);
};

export { loginUserController };
