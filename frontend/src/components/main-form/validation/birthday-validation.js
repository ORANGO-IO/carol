import * as Yup from 'yup';
import { DATE_REGEX } from '@/regex';

function validateBirthday(value) {
  if (value == undefined || value == '') return true;

  if (!DATE_REGEX.test(value)) return false;

  const [day, month, year] = value.split('/').map(Number);

  if (day < 1 || day > 31) return false;
  if (month < 1 || month > 12) return false;
  if (year < 1900) return false;

  return true;
}

export const BirthdayValidation = Yup.string().test(
  'validate-birthday',
  'Data de nascimento inválida',
  validateBirthday
);
