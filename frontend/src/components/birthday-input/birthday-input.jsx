import { withMask } from "use-mask-input";
import {
  BirthdayInput,
  Container,
  Divider,
  InputContainer,
  PatientAge,
  PatientAgeContainer,
  PatientAgeInput,
} from "./birthday-input.styles";

const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

export const BirthdayField = (
  { placeholder, value, onChange, hasError, ageValue },
) => {
  function onChangeDate(e) {
    const value = e.target.value;
    onChange({
      target: {
        name: "birthday",
        value: value,
      },
    });

    onChange({
      target: {
        name: "age",
        value: "",
      },
    });
  }

  function onChangeAge(e) {
    const value = e.target.value;
    onChange({
      target: {
        name: "age",
        value: value,
      },
    });

    onChange({
      target: {
        name: "birthday",
        value: "",
      },
    });
  }

  function calculateAge(birthDate) {
    if (!DATE_REGEX.test(birthDate)) "IDADE";

    const [day, month, year] = birthDate.split("/").map(Number);
    const today = new Date();
    let age = today.getFullYear() - year;

    const hasBirthdayThisYear = today.getMonth() + 1 > month ||
      (today.getMonth() + 1 === month && today.getDate() >= day);

    if (!hasBirthdayThisYear) {
      age--;
    }

    return age;
  }

  return (
    <Container hasError={hasError}>
      <InputContainer>
        <BirthdayInput
          ref={withMask("99/99/9999")}
          name="birthday"
          value={value}
          onChange={onChangeDate}
          maxLength={10}
          type="text"
          placeholder={placeholder}
        />
      </InputContainer>
      <Divider />
      {DATE_REGEX.test(value)
        ? (
          <PatientAgeContainer>
            <PatientAge>{`${calculateAge(value)} ANOS`}</PatientAge>
          </PatientAgeContainer>
        )
        : (
          <PatientAgeContainer>
            <PatientAgeInput
              maxLength={3}
              onChange={onChangeAge}
              value={ageValue}
              name="age"
              placeholder="IDADE"
              type="text"
            />
          </PatientAgeContainer>
        )}
    </Container>
  );
};
