import { NextFunction, Request, Response } from "express";
import { SchemaLike } from "yup/lib/types";
import { AppError } from "../../errors";

const validateSchemaMiddleware =
  (schema: SchemaLike) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { originalUrl: path } = req;

    const statusCode = (receivedPath: string) => {
      switch (receivedPath) {
        case "/properties":
          return 400;
      }
    };

    try {
      const validated = await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      req.validatedBody = validated;
      return next();
    } catch (err: any) {
      throw new AppError(err.errors, statusCode(path) || 401);
    }
  };

export default validateSchemaMiddleware;
