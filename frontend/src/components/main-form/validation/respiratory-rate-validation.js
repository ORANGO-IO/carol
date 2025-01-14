import { DATE_REGEX } from "@/regex";
import { calculateAge } from "@/utils/calculate-age-from-date";
import { getVitalRange } from "@/utils/get-vital-range";
import { getPatientAge } from "@/utils/get-patient-age";
import * as Yup from "yup";

function validateRespiratoryRate(value) {
  if (value == undefined || value == "") return true;

  const { age, birthday } = this.parent;
  const pacientAge = getPatientAge(age, birthday);
  if (pacientAge === null) return true;

  const range = getVitalRange("respiratoryRate", pacientAge);
  if (!range) return true;

  return value >= range.min && value <= range.max;
}


export const RespiratoryRateValidation = Yup.string()
  .test(
    "validate-respiratory-rate",
    "Frequência respiratória incompatível com a idade",
    validateRespiratoryRate,
  );
