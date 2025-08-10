import * as Yup from 'yup';

export const HtgValidation = Yup.number()
  .max(600, 'HGT (glicose) inválida, deve ser menor que 600');