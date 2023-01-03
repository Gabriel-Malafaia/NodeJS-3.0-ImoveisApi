import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses";
import { Categories } from "../../entities/categories";
import { Properties } from "../../entities/properties";
import { AppError } from "../../errors";
import { IAddressRequest, IPropertyRequest } from "../../interfaces/properties";
import { createPropertiesValidatedSchema } from "../../schemas/properties";

const createPropertyService = async (
  propertyBody: IPropertyRequest,
  addressBody: IAddressRequest
) => {
  const propertyRepo = AppDataSource.getRepository(Properties);
  const addressRepo = AppDataSource.getRepository(Addresses);
  const categoryRepo = AppDataSource.getRepository(Categories);

  const separatedBody = await createPropertiesValidatedSchema.validate(
    propertyBody,
    { stripUnknown: true }
  );

  const { categoryId, size, value } = separatedBody;
  const category = await categoryRepo.findOneBy({ id: categoryId });
  if (!category) {
    throw new AppError("Category id not found.", 404);
  }

  const newAddress = addressRepo.create(addressBody);
  await addressRepo.save(newAddress);

  const property = {
    address: newAddress,
    category: categoryId,
    size,
    value,
  };

  const newProperty = propertyRepo.create(property as object);
  await propertyRepo.save(newProperty);

  return newProperty;
};

export default createPropertyService;
