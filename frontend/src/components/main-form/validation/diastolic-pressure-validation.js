import { DATE_REGEX } from '@/regex';
import { calculateAge } from '@/utils/calculate-age-from-date';
import { getPatientAge } from '@/utils/get-patient-age';
import { getVitalRange } from '@/utils/get-vital-range';
import * as Yup from 'yup';

function validateDiastolicPressure(value) {
  if (value == undefined || value == '') return true;

  const { age, birthday } = this.parent;
  const pacientAge = getPatientAge(age, birthday);
  if (pacientAge === null) return true;

  const range = getVitalRange('diastolic', pacientAge);
  if (!range) return true;

  return value >= range.min && value <= range.max;
}

function valideteIfDiastolicPressureIsRequired(value) {
  const { systolicPressure } = this.parent;
  if (systolicPressure == undefined || systolicPressure == '') return true;

  if (value == undefined || value == '') return false;

  return true;
}

export const DiastolicPressureValidation = Yup.string()
  .test(
    'validate-required-diastolic',
    'Pressão diastólica é obrigatória se a sistólica for preenchida',
    valideteIfDiastolicPressureIsRequired
  )
  .test(
    'validate-diastolic',
    'Pressão diastólica imcompatível com a idade',
    validateDiastolicPressure
  );
