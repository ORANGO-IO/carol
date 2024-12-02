import * as Yup from "yup";

function validateDiastolicPressure(value) {
  if (value == undefined || value == "") return true;

  return value >= 16 && value <= 140;
}

function valideteIfDiastolicPressureIsRequired(value) {
  const { systolicPressure } = this.parent;
  if (systolicPressure == undefined || systolicPressure == "") return true;

  if (value == undefined || value == "") return false;

  return true;
}

export const DiastolicPressureValidation = Yup.string()
  .test(
    "validate-required-diastolic",
    "Pressão diastólica é obrigatória se a sistólica for preenchida",
    valideteIfDiastolicPressureIsRequired,
  ).test(
    "validate-diastolic",
    "Pressão diastólica fora do normal",
    validateDiastolicPressure,
  );
