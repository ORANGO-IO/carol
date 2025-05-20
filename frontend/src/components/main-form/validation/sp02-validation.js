import * as Yup from 'yup';

export const SpO2Validation = Yup.number()
  .min(40, 'Saturação de oxigênio inválida, deve ser entre 40 e 100')
  .max(100, 'Saturação de oxigênio inválida, deve ser entre 40 e 100');
