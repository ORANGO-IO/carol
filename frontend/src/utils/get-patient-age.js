import { DATE_REGEX } from "@/regex";
import { calculateAge } from "./calculate-age-from-date";

export function getPatientAge(age, birthday) {
  let patientAge = -1;

  if (age === undefined || age === "") {
    if (birthday === undefined || birthday === "" || !DATE_REGEX.test(birthday)) {
      return null;
    }
    patientAge = calculateAge(birthday);
  } else {
    patientAge = age;
  }

  return patientAge;
}