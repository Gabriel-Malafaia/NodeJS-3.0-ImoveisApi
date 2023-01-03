import { Request, Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules";
import createSchedulesService from "../services/schedules/createSchedules";
import getSpecificScheduleService from "../services/schedules/getSpecificSchedule";

const createSchedulesController = async (req: Request, res: Response) => {
  const payloadData = {
    ...req.validatedBody,
    userId: req.validatedId,
  } as IScheduleRequest;
  const data = await createSchedulesService(payloadData);
  return res.status(201).json(data);
};

const getSpecificScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await getSpecificScheduleService(id);
  return res.status(200).json(data);
};

export { createSchedulesController, getSpecificScheduleController };
