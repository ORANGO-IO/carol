import * as Yup from "yup";

export const HeartRateValidation = Yup.string()
  .test(
    "validate-heart-rate",
    "Frequência cardíaca fora do normal",
    function (value) {
      if (value == undefined || value == "") return true;
      return value >= 50 && value <= 160; // Adultos
    },
  );
