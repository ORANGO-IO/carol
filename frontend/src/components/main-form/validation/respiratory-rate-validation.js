import * as Yup from "yup";

export const RespiratoryRateValidation = Yup.string()
  .test(
    "validate-respiratory-rate",
    "Frequência respiratória fora do normal",
    function (value) {
      if (value == undefined || value == "") return true;
      return value >= 12 && value <= 53; // Adultos
    },
  );
