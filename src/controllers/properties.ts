import { Request, Response } from "express";
import { IAddressRequest, IPropertyRequest } from "../interfaces/properties";
import createPropertyService from "../services/properties/createProperty";
import getPropertiesService from "../services/properties/getProperties";

const createPropertyController = async (req: Request, res: Response) => {
  const Address = req.validatedAddress as IAddressRequest;
  const Property = req.validatedBody as IPropertyRequest;

  const data = await createPropertyService(Property, Address);
  return res.status(201).json(data);
};

const getPropertiesController = async (req: Request, res: Response) => {
  const data = await getPropertiesService();
  return res.status(200).json(data);
};

export { createPropertyController, getPropertiesController };
