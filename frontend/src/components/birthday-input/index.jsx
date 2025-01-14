import { withMask } from 'use-mask-input';
import { DATE_REGEX, NUMERIC_REGEX } from '@/regex';
import {
  BirthdayInput,
  Container,
  Divider,
  InputContainer,
  PatientAge,
  PatientAgeContainer,
  PatientAgeInput,
  PatientAgeInputContainer,
} from '@/components/birthday-input/styles';
import { calculateAge } from '@/utils/calculate-age-from-date';

export const BirthdayField = ({
  placeholder,
  value,
  hasError,
  ageValue,
  setValues,
  handleBlur,
}) => {
  function onChangeDate(e) {
    const value = e.target.value;

    setValues((values) => {
      return {
        ...values,
        birthday: value,
        age: '',
      };
    });
  }

  function onChangeAge(e) {
    const value = e.target.value;

    if (NUMERIC_REGEX.test(value) || value === '') {
      setValues((values) => ({
        ...values,
        birthday: '',
        age: value,
      }));
    }
  }

  return (
    <Container hasError={hasError}>
      <InputContainer>
        <BirthdayInput
          onBlur={handleBlur}
          ref={withMask('99/99/9999')}
          name="birthday"
          value={value}
          onChange={onChangeDate}
          maxLength={10}
          type="text"
          placeholder={placeholder}
        />
      </InputContainer>
      <Divider />
      {DATE_REGEX.test(value) ? (
        <PatientAgeContainer>
          <PatientAge>{`${calculateAge(value)} ANOS`}</PatientAge>
        </PatientAgeContainer>
      ) : (
        <PatientAgeInputContainer>
          <PatientAgeInput
            onBlur={handleBlur}
            maxLength={3}
            onChange={onChangeAge}
            value={ageValue}
            name="age"
            placeholder="IDADE"
            type="number"
          />
        </PatientAgeInputContainer>
      )}
    </Container>
  );
};
