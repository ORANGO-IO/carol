import { getPatientAge } from '@/utils/get-patient-age';
import { getVitalRange } from '@/utils/get-vital-range';
import * as Yup from 'yup';

function validateSystolicPressure(value) {
  if (value == undefined || value == '') return true;

  const { age, birthday } = this.parent;
  const pacientAge = getPatientAge(age, birthday);
  if (pacientAge === null) return true;

  const range = getVitalRange('systolic', pacientAge);
  if (!range) return true;

  return value >= range.min && value <= range.max;
}

export const SystolicPressureValidation = Yup.string().test(
  'validate-systolic',
  'Pressão sistólica incompatível com a idade',
  validateSystolicPressure
);
