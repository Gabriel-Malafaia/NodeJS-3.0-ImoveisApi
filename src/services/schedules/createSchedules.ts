import AppDataSource from "../../data-source";
import { Schedules_user_properties } from "../../entities/schedules_user_properties";
import { IScheduleRequest } from "../../interfaces/schedules";

const createSchedulesService = async (payload: IScheduleRequest) => {
  const { hour, date, propertyId, userId } = payload;
  const newSchedule = {
    hour,
    date,
    property: propertyId,
    user: userId,
  } as object;

  const scheduleRepo = AppDataSource.getRepository(Schedules_user_properties);
  const scheduleInstance = scheduleRepo.create(newSchedule);
  await scheduleRepo.save(scheduleInstance);

  return {
    status: "Success",
    statusCode: 201,
    message: `Your appointment on ${date} at ${hour} was a success.`,
  };
};

export default createSchedulesService;
