import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories";

const getCategoriesService = async () => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  const getCategories = await categoryRepo.find();

  return getCategories;
};

export default getCategoriesService;
