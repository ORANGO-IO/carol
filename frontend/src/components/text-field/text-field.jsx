import {
  BaseTextField,
  Container,
  Label,
  LabelContainer,
  TextFieldContainer,
} from "./text-field.styles";

export const TextField = (
  {
    placeholder,
    label,
    flexValue,
    name,
    value,
    hasError,
    handleBlur,
    setValues,
  },
) => {
  function onChange(event) {
    setValues((prev) => ({ ...prev, [name]: event.target.value }));
  }

  return (
    <Container hasError={hasError} flexValue={flexValue}>
      <TextFieldContainer>
        <BaseTextField
          onChange={onChange}
          onBlur={handleBlur}
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
