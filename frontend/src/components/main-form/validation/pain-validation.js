import * as Yup from "yup";

export const PainValidation = Yup.number()
  .min(0, "Escala de dor deve ser entre 0 e 10")
  .max(10, "Escala de dor deve ser entre 0 e 10");
