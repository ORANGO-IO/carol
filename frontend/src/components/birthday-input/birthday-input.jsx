import {
  BirthdayInput,
  Container,
  Divider,
  InputContainer,
  PatientAge,
  PatientAgeContainer,
} from "./birthday-input.styles";

export const BirthdayField = ({ placeholder }) => {
  return (
    <Container>
      <InputContainer>
        <BirthdayInput type="text" placeholder={placeholder} />
      </InputContainer>
      <Divider />
      <PatientAgeContainer>
        <PatientAge>{"IDADE"}</PatientAge>
      </PatientAgeContainer>
    </Container>
  );
};
