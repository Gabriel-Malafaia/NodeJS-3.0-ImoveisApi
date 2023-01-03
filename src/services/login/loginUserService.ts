import { compareSync } from "bcryptjs";
import { AppError } from "../../errors";
import { IUserCompleted, IUserLogin } from "../../interfaces/users";
import { sign } from "jsonwebtoken";
import "dotenv/config";

const loginUserService = async (
  payload: IUserLogin,
  comparePayload: IUserCompleted
) => {
  const { password: payloadPass, email } = payload;
  const { password: comparePass, id, isActive } = comparePayload;
  const hashCompare = compareSync(payloadPass, comparePass);

  if (!isActive) {
    throw new AppError("User is not active.", 400);
  }

  if (!hashCompare) {
    throw new AppError("Email or password is invalid.", 403);
  }

  const secretKeyToken = process.env.SECRET_KEY || "SECRETKEY";

  const generateToken = sign({ id }, secretKeyToken, {
    expiresIn: "24h",
    subject: email,
  });
  
  return { token: generateToken };
};

export default loginUserService;
