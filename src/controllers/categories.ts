import { Response, Request } from "express";
import { FindOptionsWhere } from "typeorm";
import { Properties } from "../entities/properties";
import { ICategoryRequest } from "../interfaces/categories";
import createCategoriesService from "../services/categories/createCategories";
import getCategoriesService from "../services/categories/getCategories";
import getCategoriesSpecificService from "../services/categories/getCategoriesSpecific";

const createCategoriesController = async (req: Request, res: Response) => {
  const validatedBody = req.validatedBody as ICategoryRequest;
  const data = await createCategoriesService(validatedBody);
  return res.status(201).json(data);
};

const getCategoriesController = async (req: Request, res: Response) => {
  const data = await getCategoriesService();
  return res.status(200).json(data);
};

const getCategoriesSpecificController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await getCategoriesSpecificService(id as string);
  return res.status(200).json(data);
};

export { createCategoriesController, getCategoriesController, getCategoriesSpecificController};
