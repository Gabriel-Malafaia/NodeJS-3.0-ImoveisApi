import * as yup from "yup";

const createSchedulesSchema = yup.object().shape({
  date: yup.string().max(10),
  hour: yup.string().max(5),
  propertyId: yup.string().uuid(),
});

export { createSchedulesSchema };
    