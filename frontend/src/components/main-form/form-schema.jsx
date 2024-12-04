import * as Yup from "yup";
import { DATE_REGEX } from "../../regex";
import { BirthdayValidation } from "./validation/birthday-validation";
import { AgeValidation } from "./validation/age-validation";
import { SystolicPressureValidation } from "./validation/systolic-pressure-validation";
import { DiastolicPressureValidation } from "./validation/diastolic-pressure-validation";
import { HeartRateValidation } from "./validation/heart-rate-validation";
import { RespiratoryRateValidation } from "./validation/respiratory-rate-validation";
import { SpO2Validation } from "./validation/sp02-validation";
import { TemperatureValidation } from "./validation/temperature-validation";
import { GasglowValidation } from "./validation/glasgow-validation";
import { HtgValidation } from "./validation/hgt-validation";
import { PainValidation } from "./validation/pain-validation";

export const FormSchema = Yup.object().shape({
  complaint: Yup.string(),
  birthday: BirthdayValidation,
  age: AgeValidation,
  vulnarability: Yup.string(),
  symptoms: Yup.array().of(Yup.string()),
  systolicPressure: SystolicPressureValidation,
  diastolicPressure: DiastolicPressureValidation,
  heartRate: HeartRateValidation,
  respiratoryRate: RespiratoryRateValidation,
  spO2: SpO2Validation,
  temperature: TemperatureValidation,
  glasgow: GasglowValidation,
  hgt: HtgValidation,
  pain: PainValidation,
});
