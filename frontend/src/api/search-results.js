import axios from '@/axios-config';

export async function searchResult(values) {
  const queryParameters = {
    pas: values?.systolicPressure ?? '',
    pad: values?.diastolicPressure ?? '',
    fc: values?.heartRate ?? '',
    fr: values?.respiratoryRate ?? '',
    spo2: values?.spO2 ?? '',
    temp: values?.temperature ?? '',
    glasgow: values?.glasgow ?? '',
    glicemia: values?.hgt ?? '',
    sintomas: values?.symptoms?.join(',') ?? '',
    categoria: 1,
    vulnerabilidade: values?.vulnerability ?? false,
    queixa_principal: values?.mainComplaint ?? ''
  };

  try {
    const url = `/filter?${Object.entries(queryParameters)
      .map((value) => `${value[0]}=${value[1]}&`)
      .join('')}`;
    const request = await axios.get(url);

    console.log(request.data);
    return request.data;
  } catch (error) {
    return [];
  }
}
