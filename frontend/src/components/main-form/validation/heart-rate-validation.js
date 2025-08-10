import { getPatientAge } from '@/utils/get-patient-age';
import { getVitalRange } from '@/utils/get-vital-range';
import * as Yup from 'yup';

function validateHeartRateByAge(value) {
  if (value == undefined || value == '') return true;

  const { age, birthday } = this.parent;
  const pacientAge = getPatientAge(age, birthday);
  if (pacientAge === null) return true;

  const range = getVitalRange('heartRate', pacientAge);
  if (!range) return true;

  return value >= range.min && value <= range.max;
}

function validateHeartRateInvalidValues(value){
  if (value == undefined || value == '') return true;

  return value >= 20 && value <= 200;
}

export const HeartRateValidation = Yup.string()
  .test(
    'validate-heart-rate',
    'Frequência cardíaca incompatível deve ser entre 20 a 200',
    validateHeartRateInvalidValues
  )
  .test(
    'validate-heart-rate-by-age',
    '[AGE]Frequência cardíaca incompatível com a idade',
    validateHeartRateByAge
  );
