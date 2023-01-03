import AppDataSource from "../../data-source";
import { Users } from "../../entities/users";
import { AppError } from "../../errors";
import { IUserCompleted } from "../../interfaces/users";

const deleteUserService = async (payload: IUserCompleted) => {
  const { isActive, id } = payload;
  const requestDatabase = AppDataSource.getRepository(Users);

  if (!isActive) {
    throw new AppError("User is not active.", 400);
  }

  await requestDatabase.save({ id, isActive: false });
  return;
};

export default deleteUserService;
