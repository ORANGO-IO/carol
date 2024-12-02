import * as Yup from "yup";

export const SpO2Validation = Yup.number()
  .min(90, "Saturação de oxigênio abaixo do normal")
  .max(100, "Saturação de oxigênio inválida");
