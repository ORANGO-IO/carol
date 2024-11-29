import { Formik } from "formik";
import { BirthdayField } from "../birthday-input/birthday-input";
import { MultiSelect } from "../multi-select/multi-select";
import { Select } from "../select/select";
import { TextField } from "../text-field/text-field";

import { PrecisionWarningMessage } from "../precision-warning-message/precision-warning-message";
import { FormSchema } from "./form-schema";
import {
  Container,
  FormRow,
  PatientComplaintContainer,
  PatientComplaintRow,
  PatientSignsContainer,
  PatientSignsTitle,
  SelectContainer,
  SubmitButton,
} from "./main-form.styles";
import { FormErrors } from "../form-errors/form-errors";

export const stateOptions = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AS", label: "American Samoa" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District Of Columbia" },
  { value: "FM", label: "Federated States Of Micronesia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "GU", label: "Guam" },
  { value: "HI", label: "Hawaii" },
];

const MIN_INPUT_REQUIRED = 4;

const INITIAL_VALUES = {
  complaint: "",
  birthday: "",
  age: "",
  vulnarability: "",
  symptoms: [],
  systolicPressure: "",
  diastolicPressure: "",
  heartRate: "",
  respiratoryRate: "",
  spO2: "",
  temperature: "",
  glasgow: "",
  hgt: "",
  pain: "",
};

export const MainForm = () => {
  function checkInputFilled(values) {
    return Object.values(values).filter(
      (value) =>
        value !== "" && value !== null && value !== undefined &&
        value.length != 0,
    ).length;
  }

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={FormSchema}
    >
      {({
        values,
        errors,
        handleSubmit,
        handleBlur,
        isValid,
        setValues,
      }) => {
        return (
          <Container onSubmit={handleSubmit}>
            {console.log(errors)}
            <PatientComplaintContainer>
              <Select
                handleBlur={handleBlur}
                setValues={setValues}
                hasError={errors.complaint ? true : false}
                options={stateOptions}
                name="complaint"
                placeholder="QUEIXA PRINCIPAL"
              />
              <PatientComplaintRow>
                <BirthdayField
                  handleBlur={handleBlur}
                  setValues={setValues}
                  ageValue={values.age}
                  hasError={errors.birthday || errors.age}
                  value={values.birthday}
                  placeholder="D. NASCIMENTO"
                />
                <SelectContainer>
                  <Select
                    handleBlur={handleBlur}
                    setValues={setValues}
                    hasError={errors.vulnarability}
                    options={stateOptions}
                    name="vulnarability"
                    placeholder="VULNERABILIDADE"
                  />
                </SelectContainer>
              </PatientComplaintRow>
              <MultiSelect
                setValues={setValues}
                handleBlur={handleBlur}
                options={stateOptions}
                name="symptoms"
                placeholder="SINTOMAS"
              />
            </PatientComplaintContainer>
            <PatientSignsContainer>
              <PatientSignsTitle>SINAIS</PatientSignsTitle>
              <FormRow>
                <TextField
                  setValues={setValues}
                  hasError={errors.systolicPressure}
                  handleBlur={handleBlur}
                  value={values.systolicPressure}
                  name="systolicPressure"
                  flexValue={"1 1 200px"}
                  label="mmHg"
                  placeholder="PRESSÃO SISTÓLICA"
                />
                <TextField
                  setValues={setValues}
                  hasError={errors.diastolicPressure}
                  handleBlur={handleBlur}
                  value={values.diastolicPressure}
                  name="diastolicPressure"
                  flexValue={"1 1 200px"}
                  label="mmHg"
                  placeholder="PRESSÃO DIASTÓLICA"
                />
              </FormRow>
              <FormRow>
                <TextField
                  setValues={setValues}
                  hasError={errors.heartRate}
                  handleBlur={handleBlur}
                  value={values.heartRate}
                  name="heartRate"
                  label="bpm"
                  placeholder="FC"
                />
                <TextField
                  setValues={setValues}
                  hasError={errors.respiratoryRate}
                  handleBlur={handleBlur}
                  value={values.respiratoryRate}
                  name="respiratoryRate"
                  label="ipm"
                  placeholder="FR"
                />
                <TextField
                  setValues={setValues}
                  hasError={errors.spO2}
                  handleBlur={handleBlur}
                  value={values.spO2}
                  name="spO2"
                  label="%"
                  placeholder="SpO2"
                />
                <TextField
                  setValues={setValues}
                  hasError={errors.temperature}
                  handleBlur={handleBlur}
                  value={values.temperature}
                  name="temperature"
                  label="ºC"
                  placeholder="Temp"
                />
              </FormRow>
              <FormRow>
                <TextField
                  setValues={setValues}
                  hasError={errors.glasgow}
                  handleBlur={handleBlur}
                  value={values.glasgow}
                  name="glasgow"
                  label="/15"
                  placeholder="Glasgow"
                />
                <TextField
                  setValues={setValues}
                  hasError={errors.hgt}
                  handleBlur={handleBlur}
                  value={values.hgt}
                  name="hgt"
                  label="mg/dL"
                  placeholder="HGT"
                />
                <TextField
                  setValues={setValues}
                  hasError={errors.pain}
                  handleBlur={handleBlur}
                  value={values.pain}
                  name="pain"
                  label="/10"
                  placeholder="Dor"
                />
              </FormRow>
              <FormErrors errors={errors} />
              {checkInputFilled(values) < MIN_INPUT_REQUIRED && (
                <PrecisionWarningMessage />
              )}
            </PatientSignsContainer>
            <SubmitButton
              disabled={!isValid || !checkInputFilled(values)}
              active={isValid && checkInputFilled(values)}
              type="submit"
            >
              RESULTADO
            </SubmitButton>
          </Container>
        );
      }}
    </Formik>
  );
};
