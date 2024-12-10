import * as Yup from "yup";

export const HtgValidation = Yup.number()
  .min(50, "HGT (glicose) abaixo do normal, deve ser entre 50 e 250")
  .max(250, "HGT (glicose) acima do normal, deve ser entre 50 e 250");
