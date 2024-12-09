import * as Yup from "yup";
function validateRespiratoryRate(value) {
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
    return value >= 22 && value <= 37; // 1 infancia

  if (pacientAge >= 3 && pacientAge <= 5)
    return value >= 20 && value <= 28; // pre-escolar

  if (pacientAge >= 6 && pacientAge <= 9)
    return value >= 18 && value <= 25; // escolar

  if(pacientAge >= 10 && pacientAge <= 15)
    return value >= 12 && value <= 20; // adolescente

  if(pacientAge >= 16)
    return value >= 0 && value <= 20; // adulto

  return true
}


export const RespiratoryRateValidation = Yup.string()
  .test(
    "validate-respiratory-rate",
    "Frequência respiratória incompatível com a idade",
    validateRespiratoryRate,
  );
