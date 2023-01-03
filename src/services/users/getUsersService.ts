import AppDataSource from "../../data-source";
import { Users } from "../../entities/users";
import { listAllUsersArray } from "../../schemas/users";

const getUsersService = async () => {
  const userDatabase = AppDataSource.getRepository(Users);
  const listAllUsers = await userDatabase.find();

  const listAllUsersWithNoPass = listAllUsersArray.validate(listAllUsers, {
    stripUnknown: true,
  });

  return listAllUsersWithNoPass;
};

export default getUsersService;
