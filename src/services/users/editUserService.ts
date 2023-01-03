import AppDataSource from "../../data-source";
import { Users } from "../../entities/users";
import { AppError } from "../../errors";
import { IUserCompleted, IUserUpdate } from "../../interfaces/users";
import { showCreateUserSchema } from "../../schemas/users";

const editUserService = async (
  payload: IUserUpdate,
  validatedUser: IUserCompleted
) => {
  const { email } = payload;
  const requestDatabase = AppDataSource.getRepository(Users);

  if (email && (await requestDatabase.findOneBy({ email }))) {
    throw new AppError("Email is already being used.", 400);
  }

  const updatedUser = Object.assign(validatedUser, payload);

  
  await requestDatabase.save(updatedUser);

  const showUpdatedWithNoPass = await showCreateUserSchema.validate(
    updatedUser,
    { stripUnknown: true }
  );

  return showUpdatedWithNoPass;
};

export default editUserService;
