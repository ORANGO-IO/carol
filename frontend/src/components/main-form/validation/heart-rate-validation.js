import * as Yup from "yup";
import { calculateAge } from "@/utils/calculate-age-from-date";
import { DATE_REGEX } from "@/regex";
import { getVitalRange } from "@/utils/get-vital-range";
import { getPatientAge } from "@/utils/get-patient-age";

function validateHeartRateByAge(value) {
  if (value == undefined || value == "") return true;
  
  const { age, birthday } = this.parent;
  const pacientAge = getPatientAge(age, birthday);
  if (pacientAge === null) return true;

  const range = getVitalRange("heartRate", pacientAge);
  if (!range) return true;

  return value >= range.min && value <= range.max;
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
