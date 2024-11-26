import {
  BaseTextField,
  Container,
  Label,
  LabelContainer,
  TextFieldContainer,
} from "./text-field.styles";

export const TextField = ({ placeholder, label }) => {
  return (
    <Container>
      <TextFieldContainer>
        <BaseTextField placeholder={placeholder} />
      </TextFieldContainer>
      <LabelContainer>
        <Label>{label}</Label>
      </LabelContainer>
    </Container>
  );
};
