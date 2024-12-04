import * as Yup from "yup";

function validateSystolicPressure(value) {
  if (value == undefined || value == "") return true;

  return value >= 39 && value <= 140;
}

export const SystolicPressureValidation = Yup.string()
  .test(
    "validate-systolic",
    "Pressão sistólica inválida",
    validateSystolicPressure,
  );
