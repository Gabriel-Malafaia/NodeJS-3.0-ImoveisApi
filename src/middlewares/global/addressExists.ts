import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses";
import { AppError } from "../../errors";
import { IPropertyRequest } from "../../interfaces/properties";
import { createAddressSchema } from "../../schemas/properties";

const addressExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { address } = req.validatedBody as IPropertyRequest;
  const addressValidated = await createAddressSchema.validate(address, {
    stripUnknown: true,
  });

  const addressRepo = AppDataSource.getRepository(Addresses);
  const findAddress = await addressRepo.findOne({
    where: { ...addressValidated },
  });

  if (findAddress) {
    throw new AppError("Address is already exists.", 409);
  }

  req.validatedAddress = addressValidated;

  return next();
};

export default addressExistsMiddleware;
