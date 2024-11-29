import * as Yup from "yup";
import { DATE_REGEX } from "../../regex";

function validateBirthday(value) {
  if (value == undefined || value == "") return true;

  if (!DATE_REGEX.test(value)) return false;

  const [day, month, year] = value.split("/").map(Number);

  if (day < 1 || day > 31) return false;
  if (month < 1 || month > 12) return false;
  if (year < 1900) return false;

  return true;
}

function validateAge(value) {
  if (value == undefined || value == "") return true;

  if (Number(value) <= 0 || Number(value) >= 120) return false;

  return true;
}

function validateSystolicPressure(value) {
  if (value == undefined || value == "") return true;

  return true;
}

export const FormSchema = Yup.object().shape({
  complaint: Yup.string(),
  birthday: Yup.string().test(
    "validate-birthday",
    "Data de nascimento inválida",
    validateBirthday,
  ),
  age: Yup.string().test("validate-age", "Idade inválida", validateAge),
  vulnarability: Yup.string(),
  symptoms: Yup.array().of(Yup.string()),
  systolicPressure: Yup.number()
    .test(
      "validate-systolic",
      "Pressão sistólica fora do normal",
      function (value) {
        const { age } = this.parent;
        if (!age) return true;
        if (age < 18) return value >= 60 && value <= 120; // Faixa para crianças
        return value >= 90 && value <= 140; // Faixa para adultos
      },
    ),
  diastolicPressure: Yup.number()
    .test(
      "validate-diastolic",
      "Pressão diastólica fora do normal",
      function (value) {
        const { age } = this.parent;
        if (!age) return true;
        if (age < 18) return value >= 30 && value <= 80; // Faixa para crianças
        return value >= 60 && value <= 90; // Faixa para adultos
      },
    ),
  heartRate: Yup.number()
    .test(
      "validate-heart-rate",
      "Frequência cardíaca fora do normal",
      function (value) {
        const { age } = this.parent;
        if (!age) return true;
        if (age < 1) return value >= 100 && value <= 205; // Recém-nascidos
        if (age < 2) return value >= 100 && value <= 190; // Lactentes
        if (age < 5) return value >= 80 && value <= 140; // Pré-escolares
        if (age < 12) return value >= 75 && value <= 118; // Escolares
        if (age < 18) return value >= 60 && value <= 100; // Adolescentes
        return value >= 60 && value <= 100; // Adultos
      },
    ),
  respiratoryRate: Yup.number()
    .test(
      "validate-respiratory-rate",
      "Frequência respiratória fora do normal",
      function (value) {
        const { age } = this.parent;
        if (!age) return true;
        if (age < 1) return value >= 30 && value <= 53; // Lactentes
        if (age < 5) return value >= 20 && value <= 37; // Pré-escolares
        if (age < 12) return value >= 18 && value <= 28; // Escolares
        if (age < 18) return value >= 12 && value <= 25; // Adolescentes
        return value <= 20; // Adultos
      },
    ),
  spO2: Yup.number()
    .min(90, "Saturação de oxigênio abaixo do normal")
    .max(100, "Saturação de oxigênio inválida"),
  temperature: Yup.number()
    .min(35.1, "Temperatura abaixo do normal")
    .max(37.7, "Temperatura acima do normal"),
  glasgow: Yup.number()
    .min(3, "Escala Glasgow mínima é 3")
    .max(15, "Escala Glasgow máxima é 15"),
  hgt: Yup.number()
    .min(50, "HGT (glicose) abaixo do normal")
    .max(250, "HGT (glicose) acima do normal"),
  pain: Yup.number()
    .min(0, "Escala de dor deve ser entre 0 e 10")
    .max(10, "Escala de dor deve ser entre 0 e 10"),
});
