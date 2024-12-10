import * as Yup from "yup";

function validateDiastolicPressure(value) {
  if (value == undefined || value == "") return true;

  const { age,birthday} = this.parent;
  let pacientAge = -1;

  if (age == undefined || age == "") {
    if (birthday == undefined || birthday == "" || !DATE_REGEX.test(birthday)) return true;
    pacientAge = calculateAge(birthday);
  } else {
    pacientAge = age;
  }

  if (pacientAge >= 1 && pacientAge <= 2)
    return value >= 42 && value <= 63; // 1 infancia

  if (pacientAge >= 3 && pacientAge <= 5)
    return value >= 46 && value <= 72; // pre-escolar

  if (pacientAge >= 6 && pacientAge <= 9)
    return value >= 57 && value <= 76; // escolar

  if(pacientAge >=10 && pacientAge <= 12)
    return value >= 61 && value <= 80; // pre-adolescente

  if(pacientAge >= 13 && pacientAge <= 15)
    return value >= 64 && value <= 83; // adolescente

  if(pacientAge >= 16)
    return value >= 90 && value <= 140; // adulto

  return true
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
    "Pressão diastólica imcompatível com a idade",
    validateDiastolicPressure,
  );
