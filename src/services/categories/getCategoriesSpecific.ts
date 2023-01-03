import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories";
import { AppError } from "../../errors";


const getCategoriesSpecificService = async (id: string) => {
  const categoryRepo = AppDataSource.getRepository(Categories);

  const properties = await categoryRepo.findOne({
    where: {
      id,
    },
    relations: {
      properties: true,
    },
  });

  if (!properties) {
    throw new AppError("Category id not found.", 404);
  }

  return properties;
};

export default getCategoriesSpecificService;
