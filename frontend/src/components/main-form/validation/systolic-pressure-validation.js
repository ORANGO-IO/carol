import * as Yup from "yup";

function validateSystolicPressure(value) {
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
    return value >= 86 && value <= 106; // 1 infancia

  if (pacientAge >= 3 && pacientAge <= 5)
    return value >= 89 && value <= 112; // pre-escolar

  if (pacientAge >= 6 && pacientAge <= 9)
    return value >= 97 && value <= 115; // escolar

  if(pacientAge >=10 && pacientAge <= 12)
    return value >= 102 && value <= 120; // pre-adolescente

  if(pacientAge >= 13 && pacientAge <= 15)
    return value >= 110 && value <= 131; // adolescente

  if(pacientAge >= 16)
    return value >= 90 && value <= 140; // adulto

  return true
}

export const SystolicPressureValidation = Yup.string()
  .test(
    "validate-systolic",
    "Pressão sistólica incompatível com a idade",
    validateSystolicPressure,
  );
