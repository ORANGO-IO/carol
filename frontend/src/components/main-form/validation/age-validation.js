import * as Yup from "yup";

function validateAge(value) {
  if (value == undefined || value == "") return true;

  if (value <= 0 || value >= 120) return false;

  return true;
}

export const AgeValidation = Yup.string().test(
  "validate-age",
  "Idade inválida",
  validateAge,
);
