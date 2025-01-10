import * as Yup from "yup";
import { calculateAge } from "@/utils/calculate-age-from-date";
import { DATE_REGEX } from "@/regex";

function validateHeartRateByAge(value) {
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
    return value >= 98 && value <= 140; // 1 infancia

  if (pacientAge >= 3 && pacientAge <= 5)
    return value >= 80 && value <= 120; // pre-escolar

  if (pacientAge >= 6 && pacientAge <= 9)
    return value >= 75 && value <= 118; // escolar

  if(pacientAge >= 18)
    return value >= 60 && value <= 100; // adulto

  return true;
}


export const HeartRateValidation = Yup.string()
  .test(
    "validate-heart-rate",
    "Frequência cardíaca incompatível",
    function (value) {
      if (value == undefined || value == "") return true;

      return value >= 0 && value <= 160; // Default
    },
  ).test(
    "validate-heart-rate-by-age",
    "Frequência cardíaca incompatível com a idade",
    validateHeartRateByAge ,
  )
