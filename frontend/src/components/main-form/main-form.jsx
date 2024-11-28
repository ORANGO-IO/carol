import { BirthdayField } from "../birthday-input/birthday-input";
import { MultiSelect } from "../multi-select/multi-select";
import { Select } from "../select/select";
import { Formik } from "formik";
import { TextField } from "../text-field/text-field";

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
import { FormSchema } from "./form-schema";

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

export const MainForm = () => {
  return (
    <Formik
      initialValues={{
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
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={FormSchema}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
      }) => (
        <Container onSubmit={handleSubmit}>
          {console.log(errors)}
          <PatientComplaintContainer>
            <Select
              hasError={errors.complaint ? true : false}
              options={stateOptions}
              onChange={handleChange}
              name="complaint"
              placeholder="QUEIXA PRINCIPAL"
            />
            <PatientComplaintRow>
              <BirthdayField
                ageValue={values.age}
                hasError={errors.birthday}
                onChange={handleChange}
                value={values.birthday}
                placeholder="D. NASCIMENTO"
              />
              <SelectContainer>
                <Select
                  hasError={errors.vulnarability}
                  onChange={handleChange}
                  options={stateOptions}
                  name="vulnarability"
                  placeholder="VULNERABILIDADE"
                />
              </SelectContainer>
            </PatientComplaintRow>
            <MultiSelect
              options={stateOptions}
              onChange={handleChange}
              name="symptoms"
              placeholder="SINTOMAS"
            />
          </PatientComplaintContainer>
          <PatientSignsContainer>
            <PatientSignsTitle>SINAIS</PatientSignsTitle>
            <FormRow>
              <TextField
                hasError={errors.systolicPressure}
                onChange={handleChange}
                value={values.systolicPressure}
                name="systolicPressure"
                flexValue={"1 1 200px"}
                label="mmHg"
                placeholder="PRESSÃO SISTÓLICA"
              />
              <TextField
                hasError={errors.diastolicPressure}
                onChange={handleChange}
                value={values.diastolicPressure}
                name="diastolicPressure"
                flexValue={"1 1 200px"}
                label="mmHg"
                placeholder="PRESSÃO DIASTÓLICA"
              />
            </FormRow>
            <FormRow>
              <TextField
                hasError={errors.heartRate}
                onChange={handleChange}
                value={values.heartRate}
                name="heartRate"
                label="bpm"
                placeholder="FC"
              />
              <TextField
                hasError={errors.respiratoryRate}
                onChange={handleChange}
                value={values.respiratoryRate}
                name="respiratoryRate"
                label="ipm"
                placeholder="FR"
              />
              <TextField
                hasError={errors.spO2}
                onChange={handleChange}
                value={values.spO2}
                name="spO2"
                label="%"
                placeholder="SpO2"
              />
              <TextField
                hasError={errors.temperature}
                onChange={handleChange}
                value={values.temperature}
                name="temperature"
                label="ºC"
                placeholder="Temp"
              />
            </FormRow>
            <FormRow>
              <TextField
                hasError={errors.glasgow}
                onChange={handleChange}
                value={values.glasgow}
                name="glasgow"
                label="/15"
                placeholder="Glasgow"
              />
              <TextField
                hasError={errors.hgt}
                onChange={handleChange}
                value={values.hgt}
                name="hgt"
                label="mg/dL"
                placeholder="HGT"
              />
              <TextField
                hasError={errors.pain}
                onChange={handleChange}
                value={values.pain}
                name="pain"
                label="/10"
                placeholder="Dor"
              />
            </FormRow>
          </PatientSignsContainer>
          <SubmitButton type="submit">RESULTADO</SubmitButton>
        </Container>
      )}
    </Formik>
  );
};
