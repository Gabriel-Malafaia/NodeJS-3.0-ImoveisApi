import { Router } from "express";
import {
  createCategoriesController,
  getCategoriesController,
  getCategoriesSpecificController,
} from "../controllers/categories";
import categoryExistsMiddleware from "../middlewares/categories/categoryExists";
import userIsAdmMiddleware from "../middlewares/global/userIsAdmin";
import validateSchemaMiddleware from "../middlewares/global/validateSchema";
import { createCategoriesSchema } from "../schemas/categories";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "",
  userIsAdmMiddleware,
  validateSchemaMiddleware(createCategoriesSchema),
  categoryExistsMiddleware,
  createCategoriesController
);
categoriesRoutes.get("", getCategoriesController);
categoriesRoutes.get("/:id/properties", getCategoriesSpecificController);

export default categoriesRoutes;
