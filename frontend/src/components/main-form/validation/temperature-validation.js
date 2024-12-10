import * as Yup from "yup";

export const TemperatureValidation = Yup.number()
  .min(35.1, "Temperatura abaixo do normal, deve ser entre 35.1 e 37.7")
  .max(37.7, "Temperatura acima do normal, deve ser entre 35.1 e 37.7");
