import * as Yup from "yup";

export const HtgValidation = Yup.number()
  .min(50, "HGT (glicose) abaixo do normal")
  .max(250, "HGT (glicose) acima do normal");
