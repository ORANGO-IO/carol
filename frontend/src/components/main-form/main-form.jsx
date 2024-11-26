import { BirthdayField } from "../birthday-input/birthday-input";
import { Select } from "../select/select";
import { TextField } from "../text-field/text-field";
import {
  Container,
  FormRow,
  PatientComplaintContainer,
  PatientSignsContainer,
  PatientSignsTitle,
  SubmitButton,
} from "./main-form.styles";

const PatientComplaint = [
  "Falta de ar (dispneia)",
  "Tosse persistente",
  "Asma exacerbada",
  "Bronquite",
  "Pneumonia",
  "Dor no peito ao respirar",
  "Dor no peito (angina)",
  "Palpitações",
  "Pressão alta (hipertensão)",
  "Inchaço nas pernas",
];

export const MainForm = () => {
  return (
    <Container>
      <PatientComplaintContainer>
        <Select placeholder="QUEIXA PRINCIPAL" options={PatientComplaint} />
        <FormRow>
          <BirthdayField placeholder="D. NASCIMENTO" />
          <Select placeholder="VULNERABILIDADE" options={PatientComplaint} />
        </FormRow>
        <Select placeholder="SINTOMAS" options={PatientComplaint} />
      </PatientComplaintContainer>
      <PatientSignsContainer>
        <PatientSignsTitle>SINAIS</PatientSignsTitle>
        <FormRow>
          <TextField label="mmHg" placeholder="PRESSÃO SISTÓLICA" />
          <TextField label="mmHg" placeholder="PRESSÃO DIASTÓLICA" />
         
        </FormRow>
        <FormRow>
          <TextField label="bpm" placeholder="FC" />
          <TextField label="ipm" placeholder="FR" />
          <TextField label="%" placeholder="SpO2" />
          <TextField label="ºC" placeholder="Temp" />
        </FormRow>
        <FormRow>
          <TextField label="/15" placeholder="Glasgow" />
          <TextField label="mg/dL" placeholder="HGT" />
          <TextField label="/10" placeholder="Dor" />
        </FormRow>
      </PatientSignsContainer>
      <SubmitButton>RESULTADO</SubmitButton>
    </Container>
  );
};
