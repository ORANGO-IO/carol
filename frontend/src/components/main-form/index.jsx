import { BirthdayField } from '@/components/birthday-input';
import { MultiSelect } from '@/components/multi-select';
import { Select } from '@/components/select';
import { TextField } from '@/components/text-field';
import { Formik } from 'formik';

import { getMainComplaints } from '@/api/get-main-complaints';
import { FormErrors } from '@/components/form-errors';
import { PrecisionWarningMessage } from '@/components/precision-warning-message';
import {
  formAtom,
  isLoadingAtom,
  mainComplaintsAtom,
  searchResultsAtom,
} from '@/store/main-store';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { FormSchema } from './form-schema';
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
  SubmitButton,
} from './styles';
import { getSymptoms } from '@/api/get-symptom';
import { searchResult } from '@/api/search-results';

const MIN_INPUT_REQUIRED = 4;

export const MainForm = ({ switchState }) => {
  const setSearchResults = useSetAtom(searchResultsAtom);
  const [form, setForm] = useAtom(formAtom);
  const setIsLoading = useSetAtom(isLoadingAtom);
  const [mainComplaints, setMainComplaints] = useAtom(mainComplaintsAtom);
  const [vulnerabilities, setVulnerabilities] = useState([
    {
      label: "GESTANTE",
      value: 1,
      id: 1,
    },
    {
      label: "CRIANÇA",
      value: 3,
      id: 3,
    },
  ]);
  const [isLoadingMainComplaints, setIsLoadingMainComplaints] = useState(true);
  const [isLoadingVulnerabilities, setIsLoadingVulnerabilities] =
    useState(false);
  const [isLoadingSymptoms, setIsLoadingSymptoms] = useState(true);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [formValues, setFormValues] = useState({});

  const [symptoms, setSymptoms] = useState([]);

  function areInputsFilled(values) {
    return Object.values(values).filter(
      (value) =>
        value !== '' &&
        value !== null &&
        value !== undefined &&
        value.length != 0
    ).length;
  }

  useEffect(() => {
    getMainComplaints()
      .then((mainComplaints) => {
        setMainComplaints(
          mainComplaints.map((item) => {
            return {
              label: item.queixa_principal.toLocaleUpperCase(),
              sinonimos: item.sinonimos,
              sintomas: item.sintomas,
              value: item.queixa_principal,
              id: item.id,
            };
          })
        );
      }, [])
      .finally(() => {
        setIsLoadingMainComplaints(false);
      });

    getSymptoms()
      .then((s) => {
        setSymptoms(
          s.map((item) => {
            return {
              label: item.sintoma,
              value: item.sintoma,
              id: item.id,
            };
          })
        );
      })
      .finally(() => {
        setIsLoadingSymptoms(false);
      });
  }, []);

  function onSelectQp(value) {
    if (!value || !value.sintomas) return;
    setSelectedSymptoms((prev) => {
      const sintomas = value.sintomas
        .map((sintoma) => {
          if (prev.find((item) => item.label === sintoma) == undefined) {
            return symptoms.find((item) => item.label === sintoma);
          }
        })
        .filter(Boolean);
      return [...prev, ...sintomas];
    });
  }

  function onSelectSymptoms(value) {
    setSelectedSymptoms(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setForm(formValues);
    searchResult(formValues)
      .then((result) => {
        setSearchResults(result);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Formik initialValues={form} validationSchema={FormSchema}>
      {({ errors, handleBlur, setValues }) => {
        return (
          <Container onSubmit={(e) => handleSubmit(e)}>
            <PatientComplaintContainer>
              <Select
                onSelect={onSelectQp}
                isLoading={isLoadingMainComplaints}
                handleBlur={handleBlur}
                setValues={(values) => {
                  setFormValues(values);
                  setValues(values);
                }}
                hasError={errors.complaint ? true : false}
                options={mainComplaints}
                name="complaint"
                placeholder="QUEIXA PRINCIPAL"
              />
              <PatientComplaintRow>
                <BirthdayField
                  handleBlur={handleBlur}
                  setValues={(values) => {
                    setFormValues(values);
                    setValues(values);
                  }}
                  ageValue={formValues.age}
                  hasError={errors.birthday || errors.age}
                  value={formValues.birthday}
                  placeholder="D. NASCIMENTO"
                />
                <SelectContainer>
                  <Select
                    isLoading={isLoadingVulnerabilities}
                    handleBlur={handleBlur}
                    setValues={(values) => {
                      setFormValues(values);
                      setValues(values);
                    }}
                    hasError={errors.vulnarability}
                    options={vulnerabilities}
                    name="vulnarability"
                    placeholder={switchState}
                  />
                </SelectContainer>
              </PatientComplaintRow>
              <MultiSelect
                onChange={onSelectSymptoms}
                value={selectedSymptoms}
                isLoading={isLoadingSymptoms}
                setValues={(values) => {
                  setFormValues(values);
                  setValues(values);
                }}
                handleBlur={handleBlur}
                options={symptoms}
                name="symptoms"
                placeholder="SINTOMAS"
              />
            </PatientComplaintContainer>
            <PatientSignsContainer>
              <PatientSignsTitle>SINAIS</PatientSignsTitle>
              <PatientSignsInputContainer>
                <FormRow>
                  <TextField
                    setValues={(values) => {
                      setFormValues(values);
                      setValues(values);
                    }}
                    hasError={errors.systolicPressure}
                    handleBlur={handleBlur}
                    value={formValues.systolicPressure}
                    name="systolicPressure"
                    flexValue={'1 1 200px'}
                    label="mmHg"
                    placeholder="PRESSÃO SISTÓLICA"
                  />
                  <TextField
                    setValues={(values) => {
                      setFormValues(values);
                      setValues(values);
                    }}
                    hasError={errors.diastolicPressure}
                    handleBlur={handleBlur}
                    value={formValues.diastolicPressure}
                    name="diastolicPressure"
                    flexValue={'1 1 200px'}
                    label="mmHg"
                    placeholder="PRESSÃO DIASTÓLICA"
                  />
                </FormRow>
                <FormRow>
                  <TextField
                    setValues={(values) => {
                      setFormValues(values);
                      setValues(values);
                    }}
                    hasError={errors.heartRate}
                    handleBlur={handleBlur}
                    value={formValues.heartRate}
                    name="heartRate"
                    flexValue={'1 1 108px'}
                    label="bpm"
                    placeholder="FC"
                  />
                  <TextField
                    setValues={(values) => {
                      setFormValues(values);
                      setValues(values);
                    }}
                    hasError={errors.respiratoryRate}
                    handleBlur={handleBlur}
                    flexValue={'1 1 126px'}
                    value={formValues.respiratoryRate}
                    name="respiratoryRate"
                    label="ipm"
                    placeholder="FR"
                  />
                  <TextField
                    setValues={(values) => {
                      setFormValues(values);
                      setValues(values);
                    }}
                    hasError={errors.spO2}
                    handleBlur={handleBlur}
                    flexValue={'1 1 122px'}
                    value={formValues.spO2}
                    name="spO2"
                    label="%"
                    placeholder="SpO2"
                  />
                  <TextField
                    type="number"
                    setValues={(values) => {
                      setFormValues(values);
                      setValues(values);
                    }}
                    hasError={errors.temperature}
                    handleBlur={handleBlur}
                    value={formValues.temperature}
                    flexValue={'1 1 116px'}
                    name="temperature"
                    label="ºC"
                    placeholder="Temp"
                  />
                </FormRow>
                <FormRow gap="12px">
                  <TextField
                    type="number"
                    flexValue={'1 1 154px'}
                    setValues={(values) => {
                      setFormValues(values);
                      setValues(values);
                    }}
                    hasError={errors.glasgow}
                    handleBlur={handleBlur}
                    value={formValues.glasgow}
                    name="glasgow"
                    label="/15"
                    placeholder="Glasgow"
                  />
                  <TextField
                    type="number"
                    flexValue={'1 1 154px'}
                    setValues={(values) => {
                      setFormValues(values);
                      setValues(values);
                    }}
                    hasError={errors.hgt}
                    handleBlur={handleBlur}
                    value={formValues.hgt}
                    name="hgt"
                    label="mg/dL"
                    placeholder="HGT"
                  />
                  <TextField
                    maxLength={2}
                    type="number"
                    flexValue={'1 1 154px'}
                    setValues={(values) => {
                      setFormValues(values);
                      setValues(values);
                    }}
                    hasError={errors.pain}
                    handleBlur={handleBlur}
                    value={formValues.pain}
                    name="pain"
                    label="/10"
                    placeholder="Dor"
                  />
                </FormRow>
              </PatientSignsInputContainer>
              <FormErrorContainer>
                <FormErrors errors={errors} />
                {areInputsFilled(formValues) < MIN_INPUT_REQUIRED && (
                  <PrecisionWarningMessage />
                )}
              </FormErrorContainer>
            </PatientSignsContainer>
            <SubmitButton
              disabled={!areInputsFilled(formValues)}
              active={areInputsFilled(formValues)}
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
