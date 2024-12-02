import * as Yup from "yup";

function validateSystolicPressure(value) {
  if (value == undefined || value == "") return true;

  return value >= 39 && value <= 140; //
}

export const SystolicPressureValidation = Yup.string()
  .test(
    "validate-systolic",
    "Pressão sistólica fora do normal",
    function (value) {
      const { age } = this.parent;
      if (!age) return true;
      if (age < 18) return value >= 60 && value <= 120; // Faixa para crianças
      return value >= 90 && value <= 140; // Faixa para adultos
    },
  );
