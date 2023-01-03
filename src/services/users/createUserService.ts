import { IUserRequest } from "../../interfaces/users";
import { Users } from "../../entities/users";
import AppDataSource from "../../data-source";
import { showCreateUserSchema } from "../../schemas/users";

const createUserService = async (payload: IUserRequest) => {
  const userDatabase = AppDataSource.getRepository(Users);
  const newUser = userDatabase.create(payload);
  await userDatabase.save(newUser);

  const showUserTreatment = await showCreateUserSchema.validate(newUser, {
    stripUnknown: true,
  });

  return showUserTreatment;
};

export default createUserService;
