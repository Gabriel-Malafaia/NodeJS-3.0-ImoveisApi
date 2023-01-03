import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors";
import { IScheduleRequest } from "../../interfaces/schedules";

const isScheduledInTimeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date, hour } = req.validatedBody as IScheduleRequest;
  const userHour = parseInt(hour.split(":")[0]);
  const userDate = date.replace(/\//g, ",").split(",");
  const int = (str: string) => parseInt(str);

  if (userHour < 8 || userHour >= 18) {
    throw new AppError("Scheduling outside business hours.", 400);
  }

  const searchDate = new Date(
    int(userDate[0]),
    int(userDate[1]) - 1,
    int(userDate[2])
  );

  const dateDay = searchDate.getDay();

  if (dateDay == 0 || dateDay == 6) {
    throw new AppError(
      "It is only possible to make an appointment from Monday to Friday.",
      400
    );
  }

  return next();
};

export default isScheduledInTimeMiddleware;
