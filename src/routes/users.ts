import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  editUserController,
  getUsersController,
} from "../controllers/users";
import userEmailExistsMiddleware from "../middlewares/users/userEmailExists";
import userIdExistsMiddleware from "../middlewares/users/userIdExists";
import userIsAdmMiddleware from "../middlewares/global/userIsAdmin";
import validateSchemaMiddleware from "../middlewares/global/validateSchema";
import { createUserSchema, updateUserSchema } from "../schemas/users";

const usersRoutes = Router();

usersRoutes.post(
  "",
  validateSchemaMiddleware(createUserSchema),
  userEmailExistsMiddleware,
  createUserController
);
usersRoutes.get("", userIsAdmMiddleware, getUsersController);

usersRoutes.patch(
  "/:id",
  validateSchemaMiddleware(updateUserSchema),
  userIsAdmMiddleware,
  userIdExistsMiddleware,
  editUserController
);

usersRoutes.delete(
  "/:id",
  userIsAdmMiddleware,
  userIdExistsMiddleware,
  deleteUserController
);

export default usersRoutes;
