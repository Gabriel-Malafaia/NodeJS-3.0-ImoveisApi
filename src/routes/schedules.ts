import { Router } from "express";
import {
  createSchedulesController,
  getSpecificScheduleController,
} from "../controllers/schedules";
import { createSchedulesSchema } from "../schemas/schedules";
import validateSchemaMiddleware from "../middlewares/global/validateSchema";
import isScheduledMiddleware from "../middlewares/schedules/isScheduled";
import isScheduledInTimeMiddleware from "../middlewares/schedules/isScheduledInTime";
import userIsAdmMiddleware from "../middlewares/global/userIsAdmin";

const schedulesRoutes = Router();

schedulesRoutes.post(
  "",
  validateSchemaMiddleware(createSchedulesSchema),
  isScheduledMiddleware,
  isScheduledInTimeMiddleware,
  createSchedulesController
);
schedulesRoutes.get(
  "/properties/:id",
  userIsAdmMiddleware,
  getSpecificScheduleController
);

export default schedulesRoutes;
