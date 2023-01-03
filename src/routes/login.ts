import { Router } from "express";
import { loginUserController } from "../controllers/login";
import userEmailExistsMiddleware from "../middlewares/users/userEmailExists";
import validateSchemaMiddleware from "../middlewares/global/validateSchema";
import { loginUserSchema } from "../schemas/login";

const loginRoutes = Router();

loginRoutes.post(
  "",
  validateSchemaMiddleware(loginUserSchema),
  userEmailExistsMiddleware,
  loginUserController
);

export default loginRoutes;
