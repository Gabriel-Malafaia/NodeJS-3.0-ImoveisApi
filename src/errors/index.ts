import { NextFunction, Request, Response } from "express";

class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "Error",
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  return res
    .status(500)
    .json({ statusCode: 500, message: "Internal Server Error." });
};

export { AppError, errorHandler };
