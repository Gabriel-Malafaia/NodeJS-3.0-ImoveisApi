import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories";
import { AppError } from "../../errors";
import { ICategoryRequest } from "../../interfaces/categories";

const categoryExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.validatedBody as ICategoryRequest;

  const categoryRepo = AppDataSource.getRepository(Categories);
  const findCategory = await categoryRepo.findOneBy({ name });

  if (findCategory) {
    throw new AppError("Category is already exists", 409);
  }

  return next();
};

export default categoryExistsMiddleware;
