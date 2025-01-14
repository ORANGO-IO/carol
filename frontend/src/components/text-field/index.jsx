import {
  BaseTextField,
  Container,
  Label,
  LabelContainer,
  TextFieldContainer,
} from "./styles";

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
    type = "text",
  },
) => {
  function onChange(event) {
    setValues((prev) => ({ ...prev, [name]: event.target.value }));
  }

  return (
    <Container hasError={hasError} flexValue={flexValue}>
      <TextFieldContainer>
        <BaseTextField
          type={type}
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
