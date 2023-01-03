import { hashSync } from "bcryptjs";
import * as yup from "yup";

const updateUserSchema = yup
  .object()
  .shape({
    id: yup
      .string()
      .notRequired()
      .test((value) => value == undefined),
    isAdm: yup
      .boolean()
      .notRequired()
      .test((value) => value == undefined),
    isActive: yup
      .boolean()
      .notRequired()
      .test((value) => value == undefined),
    name: yup.string().notRequired().max(50),
    email: yup.string().email().notRequired().max(50),
    password: yup
      .string()
      .notRequired()
      .transform((password) => hashSync(password, 10)),
  })
  .noUnknown(true);

const createUserSchema = yup.object().shape({
  name: yup.string().required().max(50),
  email: yup.string().email().required().max(50),
  password: yup
    .string()
    .required()
    .transform((password) => hashSync(password, 10))
    .max(65),
  isAdm: yup.boolean().required(),
});

const showCreateUserSchema = yup.object().shape({
  updatedAt: yup.string(),
  createdAt: yup.string(),
  isActive: yup.boolean(),
  isAdm: yup.boolean(),
  email: yup.string(),
  name: yup.string(),
  id: yup.string().uuid(),
});

const listAllUsersArray = yup.array(showCreateUserSchema);

export {
  createUserSchema,
  showCreateUserSchema,
  listAllUsersArray,
  updateUserSchema,
};
