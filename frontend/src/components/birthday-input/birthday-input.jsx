import {
  BirthdayInput,
  Container,
  Divider,
  InputContainer,
  PatientAge,
  PatientAgeContainer,
} from "./birthday-input.styles";

export const BirthdayField = ({ placeholder, value, onChange, hasError }) => {
  function onChangeDate(e) {
    const value = e.target.value;
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return;
    }
    const today = new Date();
    if (date > today) {
      return;
    }
    onChange({
      target: {
        name: "birthday",
        value: value,
      },
    });
  }

  function displayAge(birthday) {
    if (!birthday || typeof birthday !== "string") return "IDADE";

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(birthday)) return "IDADE";

    const date = new Date(birthday);

    if (isNaN(date.getTime())) return "IDADE";

    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDifference = today.getMonth() - date.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < date.getDate())
    ) {
      age--;
    }

    return age >= 0 ? `${age} ANOS` : "IDADE";
  }

  return (
    <Container hasError={hasError}>
      <InputContainer>
        <BirthdayInput
          name="birthday"
          value={value}
          onChange={onChangeDate}
          maxLength={2}
          type="date"
          placeholder={placeholder}
        />
      </InputContainer>
      <Divider />
      <PatientAgeContainer>
        <PatientAge>{displayAge(value)}</PatientAge>
      </PatientAgeContainer>
    </Container>
  );
};
