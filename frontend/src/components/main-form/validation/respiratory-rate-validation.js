import { getPatientAge } from '@/utils/get-patient-age';
import { getVitalRange } from '@/utils/get-vital-range';
import * as Yup from 'yup';

function validateRespiratoryRate(value) {
  if (value == undefined || value == '') return true;

  const { age, birthday } = this.parent;
  const pacientAge = getPatientAge(age, birthday);
  if (pacientAge === null) return true;

  const range = getVitalRange('respiratoryRate', pacientAge);
  if (!range) return true;

  return value >= range.min && value <= range.max;
}

function validateRespiratoryRateInvalidValues(value){
  if (value == undefined || value == '') return true;

  return value >= 1 && value <= 70;
}

export const RespiratoryRateValidation = Yup.string()
.test(
  'validate-respiratory-rate-invalid-values',
  'Frequência respiratória inválida, deve estar entre 1 a 70',
  validateRespiratoryRateInvalidValues
)
.test(
  'validate-respiratory-rate',
  '[AGE]Frequência respiratória incompatível com a idade',
  validateRespiratoryRate
);
