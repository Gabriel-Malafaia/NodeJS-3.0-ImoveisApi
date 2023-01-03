import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties";
import { Schedules_user_properties } from "../../entities/schedules_user_properties";
import { AppError } from "../../errors";
import { IScheduleRequest } from "../../interfaces/schedules";
import { IJwtPayload } from "../global/userIsAdmin";

const isScheduledMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("Missing authorization.", 401);
  }

  try {
    decode(token);
  } catch (err) {
    throw new AppError("Missing authorization.", 401);
  }

  const { date, hour, propertyId } = req.validatedBody as IScheduleRequest;
  const tokenDecode = decode(token) as IJwtPayload;
  const scheduleRepo = AppDataSource.getRepository(Schedules_user_properties);
  const propertyRepo = AppDataSource.getRepository(Properties);

  const checkPropertyId = await propertyRepo
    .createQueryBuilder("properties")
    .where("properties.id = :propertyId", { propertyId })
    .getOne();

  if (!checkPropertyId) {
    throw new AppError("Property id not found.", 404);
  }

  const scheduleFind = await scheduleRepo
    .createQueryBuilder("schedules")
    .where("schedules.property = :id", { id: propertyId })
    .andWhere("schedules.hour = :hour", { hour })
    .andWhere("schedules.date = :date", { date })
    .getOne();

  if (scheduleFind) {
    throw new AppError(
      "This property already has an appointment at this time.",
      409
    );
  }

  const scheduleFindUser = await scheduleRepo
    .createQueryBuilder("schedules")
    .where("schedules.user = :id", { id: tokenDecode.id })
    .andWhere("schedules.hour = :hour", { hour })
    .andWhere("schedules.date = :date", { date })
    .getOne();

  if (scheduleFindUser) {
    throw new AppError("You already have an appointment at this time.", 409);
  }

  req.validatedId = tokenDecode.id;
  return next();
};

export default isScheduledMiddleware;
