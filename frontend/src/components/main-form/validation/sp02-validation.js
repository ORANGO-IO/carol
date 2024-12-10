import * as Yup from "yup";

export const SpO2Validation = Yup.number()
  .min(90, "Saturação de oxigênio abaixo do normal, deve ser entre 90 e 100")
  .max(100, "Saturação de oxigênio inválida, deve ser entre 90 e 100");
