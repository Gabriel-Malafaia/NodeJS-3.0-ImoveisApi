import { Router } from "express";
import {
  createPropertyController,
  getPropertiesController,
} from "../controllers/properties";
import addressExistsMiddleware from "../middlewares/global/addressExists";
import userIsAdmMiddleware from "../middlewares/global/userIsAdmin";
import validateSchemaMiddleware from "../middlewares/global/validateSchema";
import { createPropertiesSchema } from "../schemas/properties";

const propertiesRoutes = Router();

propertiesRoutes.post(
  "",
  validateSchemaMiddleware(createPropertiesSchema),
  userIsAdmMiddleware,
  addressExistsMiddleware,
  createPropertyController
);

propertiesRoutes.get("", getPropertiesController);

export default propertiesRoutes;
