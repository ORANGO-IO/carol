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

function validateSystolicPressureInvalidValues(value) {
  if (value == undefined || value == '') return true;

  return value >= 20 && value <= 300;
}

export const SystolicPressureValidation = Yup.string()
.test(
  'validate-systolic-invalid-values',
  'Pressão sistólica inválida, deve ser entre 20 e 300',
  validateSystolicPressureInvalidValues
)
.test(
  'validate-systolic',
  '[AGE]Pressão sistólica incompatível com a idade',
  validateSystolicPressure
)
