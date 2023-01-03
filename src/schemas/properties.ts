import * as yup from "yup";

const createPropertiesSchema = yup.object().shape({
  value: yup.number().required(),
  size: yup.number().required(),
  address: yup
    .object({
      district: yup.string().required(),
      zipCode: yup.string().required().max(8),
      number: yup.string().notRequired(),
      city: yup.string().required(),
      state: yup.string().required().max(2),
    })
    .required(),
  categoryId: yup.string().required().uuid(),
});

const createPropertiesValidatedSchema = yup.object().shape({
  value: yup.number().required(),
  size: yup.number().required(),
  categoryId: yup.string().required().uuid(),
});

const createAddressSchema = yup.object().shape({
  district: yup.string().required(),
  zipCode: yup.string().required().max(8),
  number: yup.string().notRequired(),
  city: yup.string().required(),
  state: yup.string().required().max(2),
});

export {
  createPropertiesSchema,
  createPropertiesValidatedSchema,
  createAddressSchema,
};
