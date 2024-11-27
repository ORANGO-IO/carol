import {
  BaseTextField,
  Container,
  Label,
  LabelContainer,
  TextFieldContainer,
} from "./text-field.styles";

export const TextField = (
  { placeholder, label, flexValue, name, value, onChange, hasError },
) => {
  return (
    <Container hasError={hasError} flexValue={flexValue}>
      <TextFieldContainer>
        <BaseTextField
          onChange={onChange}
          value={value}
          name={name}
          placeholder={placeholder}
        />
      </TextFieldContainer>
      <LabelContainer>
        <Label>{label}</Label>
      </LabelContainer>
    </Container>
  );
};
