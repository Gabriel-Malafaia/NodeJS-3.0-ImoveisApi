import * as yup from "yup";

const loginUserSchema = yup.object().shape({
  email: yup.string().email().required().max(106),
  password: yup.string(),
});

export { loginUserSchema };
