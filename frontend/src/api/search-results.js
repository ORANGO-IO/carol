import axios from '@/axios-config';

export async function searchResult(values) {
  console.log('values', values);
  const queryParameters = {
    pas: values?.systolicPressure ?? '',
    pad: values?.diastolicPressure ?? '',
    fc: values?.heartRate ?? '',
    fr: values?.respiratoryRate ?? '',
    spo2: values?.spO2 ?? '',
    temp: values?.temperature ?? '',
    glasgow: values?.glasgow ?? '',
    glicemia: values?.hgt ?? '',
    sintomas: values?.symptoms ?? '',
    categoria: values?.vulnarability ?? ''
  };

  try {
    const url = `/filter?${Object.entries(queryParameters)
      .map((value) => {
        if (value[1] === '') {
          return '';
        }
        return `${value[0]}=${value[1]}&`
      })
      .join('')}`;
    console.log('url', url);
    const request = await axios.get(url);

    console.log(request.data);
    return request.data;
  } catch (error) {
    return [];
  }
}
