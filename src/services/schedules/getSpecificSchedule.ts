import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties";
import { Schedules_user_properties } from "../../entities/schedules_user_properties";
import { AppError } from "../../errors";

const getSpecificScheduleService = async (propertyId: string) => {
  const propertyRepo = AppDataSource.getRepository(Properties);

  const findProperty = await propertyRepo
    .createQueryBuilder("properties")
    .where("properties.id = :propertyId", { propertyId })
    .getOne();

  if (!findProperty) {
    throw new AppError("Property id not found.", 404);
  }

  const schedules = await propertyRepo
    .createQueryBuilder("properties")
    .innerJoinAndSelect("properties.schedules", "schedules")
    .innerJoinAndSelect("schedules.user", "users")
    .where("properties.id = :propertyId", { propertyId })
    .getOne();

  return schedules;
};

export default getSpecificScheduleService;
