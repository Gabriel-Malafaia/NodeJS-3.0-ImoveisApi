import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories";
import { ICategoryRequest } from "../../interfaces/categories";

const createCategoriesService = async (payload: ICategoryRequest) => {
  const categoriesRepo = AppDataSource.getRepository(Categories);
  const newCategory = categoriesRepo.create(payload);
  await categoriesRepo.save(newCategory);
  return newCategory;
};

export default createCategoriesService;
