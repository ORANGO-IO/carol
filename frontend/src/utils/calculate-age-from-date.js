import { DATE_REGEX } from '@/regex';

export function calculateAge(birthDate) {
  if (!DATE_REGEX.test(birthDate)) 'IDADE';

  const [day, month, year] = birthDate.split('/').map(Number);
  const today = new Date();
  let age = today.getFullYear() - year;

  const hasBirthdayThisYear =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);

  if (!hasBirthdayThisYear) {
    age--;
  }

  return age;
}
