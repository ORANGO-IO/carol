import * as Yup from 'yup';

export const TemperatureValidation = Yup.number()
  .min(30, 'Temperatura inválida, deve ser entre 30 e 50')
  .max(50, 'Temperatura inválida, deve ser entre 30 e 50');
