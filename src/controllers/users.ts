import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  editUserService,
  getUsersService,
} from "../services";
import { IUserCompleted, IUserRequest, IUserUpdate } from "../interfaces/users";

const createUserController = async (req: Request, res: Response) => {
  const userData = req.validatedBody as IUserRequest;
  const data = await createUserService(userData);

  return res.status(201).json(data);
};

const getUsersController = async (req: Request, res: Response) => {
  const data = await getUsersService();
  return res.status(200).json(data);
};

const editUserController = async (req: Request, res: Response) => {
  const userData = req.validatedBody as IUserUpdate;
  const userValidated = req.validatedUser as IUserCompleted;
  const data = await editUserService(userData, userValidated);

  return res.status(200).json(data);
};

const deleteUserController = async (req: Request, res: Response) => {
  const userData = req.validatedUser as IUserCompleted;
  const data = await deleteUserService(userData);

  return res.status(204).json(data);
};

export {
  createUserController,
  getUsersController,
  editUserController,
  deleteUserController,
};
