import { Request, Response, NextFunction } from "express";
import { decode, JwtPayload } from "jsonwebtoken";
import { Users } from "../../entities/users";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors";


export interface IJwtPayload extends JwtPayload {
  id: string;
}

const userIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];
  const { originalUrl: path } = req;

  if (!token) {
    throw new AppError("Missing authorization.", 401);
  }

  try {
    decode(token);
  } catch (err) {
    throw new AppError("Missing authorization.", 401);
  }

  const tokenDecode = decode(token) as IJwtPayload;
  const userDatabase = AppDataSource.getRepository(Users);

  const findUser = await userDatabase.findOneBy({ id: tokenDecode.id });

  if (!findUser?.isAdm) {
    throw new AppError(
      "Missing authorization.",
      path.includes("/users/") && req.method !== "DELETE" ? 401 : 403
    );
  }

  return next();
};

export default userIsAdmMiddleware;
