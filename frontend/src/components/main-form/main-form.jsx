import { BirthdayField } from "@/components/birthday-input/birthday-input";
import { MultiSelect } from "@/components/multi-select/multi-select";
import { Select } from "@/components/select/select";
import { TextField } from "@/components/text-field/text-field";
import { Formik } from "formik";

import { getMainComplaints } from "@/api/get-main-complaints";
import { FormErrors } from "@/components/form-errors/form-errors";
import { PrecisionWarningMessage } from "@/components/precision-warning-message/precision-warning-message";
import { formAtom, mainComplaintsAtom } from "@/store/main-store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { FormSchema } from "./form-schema";
import {
  Container,
  FormErrorContainer,
  FormRow,
  PatientComplaintContainer,
  PatientComplaintRow,
  PatientSignsContainer,
  PatientSignsInputContainer,
  PatientSignsTitle,
  SelectContainer,
  SubmitButton
} from "./main-form.styles";

const MIN_INPUT_REQUIRED = 4;

export const MainForm = () => {
  const [form, setForm] = useAtom(formAtom);
  const [mainComplaints, setMainComplaints] = useAtom(mainComplaintsAtom);
  const [isLoadingMainComplaints, setIsLoadingMainComplaints] = useState(true);

  function checkInputFilled(values) {
    return Object.values(values).filter(
      (value) =>
        value !== "" && value !== null && value !== undefined &&
        value.length != 0,
    ).length;
  }

  useEffect(() => {
    getMainComplaints().then((mainComplaints) => {
      setMainComplaints(mainComplaints.map((item) => {
        return {
          label: item.sintoma.toLocaleUpperCase(),
          value: item.sintoma,
        };
      }));
    }, []).finally(() => {
      setIsLoadingMainComplaints(false);
    });
  }, []);

  return (
    <Formik
      initialValues={form}
      onSubmit={(values) => {
        setForm(values);
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
            <PatientComplaintContainer>
                <Select
                  isLoading={isLoadingMainComplaints}
                  handleBlur={handleBlur}
                  setValues={setValues}
                  hasError={errors.complaint ? true : false}
                  options={mainComplaints}
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
                    options={mainComplaints}
                    name="vulnarability"
                    placeholder="VULNERABILIDADE"
                  />
                </SelectContainer>
              </PatientComplaintRow>
              <MultiSelect
                setValues={setValues}
                handleBlur={handleBlur}
                options={mainComplaints}
                name="symptoms"
                placeholder="SINTOMAS"
              />
            </PatientComplaintContainer>
            <PatientSignsContainer>
              <PatientSignsTitle>SINAIS</PatientSignsTitle>
              <PatientSignsInputContainer>
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
                    flexValue={"1 1 108px"}
                    label="bpm"
                    placeholder="FC"
                  />
                  <TextField
                    setValues={setValues}
                    hasError={errors.respiratoryRate}
                    handleBlur={handleBlur}
                    flexValue={"1 1 126px"}
                    value={values.respiratoryRate}
                    name="respiratoryRate"
                    label="ipm"
                    placeholder="FR"
                  />
                  <TextField
                    setValues={setValues}
                    hasError={errors.spO2}
                    handleBlur={handleBlur}
                    flexValue={"1 1 122px"}
                    value={values.spO2}
                    name="spO2"
                    label="%"
                    placeholder="SpO2"
                  />
                  <TextField
                    type="number"
                    setValues={setValues}
                    hasError={errors.temperature}
                    handleBlur={handleBlur}
                    value={values.temperature}
                    flexValue={"1 1 116px"}
                    name="temperature"
                    label="ºC"
                    placeholder="Temp"
                  />
                </FormRow>
                <FormRow gap="12px">
                  <TextField
                    type="number"
                    flexValue={"1 1 154px"}
                    setValues={setValues}
                    hasError={errors.glasgow}
                    handleBlur={handleBlur}
                    value={values.glasgow}
                    name="glasgow"
                    label="/15"
                    placeholder="Glasgow"
                  />
                  <TextField
                    type="number"
                    flexValue={"1 1 154px"}
                    setValues={setValues}
                    hasError={errors.hgt}
                    handleBlur={handleBlur}
                    value={values.hgt}
                    name="hgt"
                    label="mg/dL"
                    placeholder="HGT"
                  />
                  <TextField
                    maxLength={2}
                    type="number"
                    flexValue={"1 1 154px"}
                    setValues={setValues}
                    hasError={errors.pain}
                    handleBlur={handleBlur}
                    value={values.pain}
                    name="pain"
                    label="/10"
                    placeholder="Dor"
                  />
                </FormRow>
              </PatientSignsInputContainer>
              <FormErrorContainer>
                <FormErrors errors={errors} />
                {checkInputFilled(values) < MIN_INPUT_REQUIRED && (
                  <PrecisionWarningMessage />
                )}
              </FormErrorContainer>
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
