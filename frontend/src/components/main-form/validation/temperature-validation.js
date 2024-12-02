import * as Yup from "yup";

export const TemperatureValidation = Yup.number()
  .min(35.1, "Temperatura abaixo do normal")
  .max(37.7, "Temperatura acima do normal");
