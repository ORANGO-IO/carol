import * as Yup from "yup";

export const GasglowValidation = Yup.number()
  .min(3, "Escala Glasgow mínima é 3")
  .max(15, "Escala Glasgow máxima é 15");
