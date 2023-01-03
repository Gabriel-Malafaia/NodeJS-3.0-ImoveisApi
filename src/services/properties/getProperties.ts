import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties";

const getPropertiesService = async () => {
  const propertyRepository = AppDataSource.getRepository(Properties);
  const searchProperties = await propertyRepository.find();

  return searchProperties;
};

export default getPropertiesService;
