import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { formAtom, searchResultsAtom } from '@/store/main-store';
import {
  Container,
  CopyMessage,
  CopyResult,
  MoreResults,
  ResultContainer,
  ResultMessage,
  ResultTitle,
  Title,
  TitleContainer,
} from './styles';
import { calculateAge } from '@/utils/calculate-age-from-date';

function getCopyMessage(
  age,
  complaint,
  symptoms,
  systolicPressure,
  diastolicPressure,
  heartRate,
  respiratoryRate,
  spO2,
  temperature,
  glasgow,
  hgt,
  pain,
  birthday
) {
  function getAgeMessage() {
    let parsedAge;
    if (
      age == undefined ||
      (age == '' && birthday == undefined) ||
      birthday == ''
    ) {
      return '';
    }

    if (age !== undefined && age !== '') {
      parsedAge = age;
    }

    if (birthday !== undefined && birthday !== '') {
      parsedAge = calculateAge(birthday);
    }

    return ` ${parsedAge} anos,`;
  }

  function getComplaintMessage() {
    if (complaint !== undefined && complaint !== '') {
      return ` com queixa de ${complaint}`;
    }
    return '';
  }

  function getSymptomsMessage() {
    if (symptoms !== undefined && symptoms.length > 0) {
      return ` apresenta ${symptoms.join(', ')}`;
    }
    return '';
  }

  function getPhysicalExamMessage() {
    if (
      systolicPressure !== undefined &&
      systolicPressure !== '' &&
      diastolicPressure !== undefined &&
      diastolicPressure !== ''
    ) {
      return `PA ${systolicPressure}/${diastolicPressure}mmHg, `;
    }
    return '';
  }

  function getHeartRateMessage() {
    if (heartRate !== undefined && heartRate !== '') {
      return `FC ${heartRate}bpm, `;
    }
    return '';
  }

  function getRespiratoryRateMessage() {
    if (respiratoryRate !== undefined && respiratoryRate !== '') {
      return `FR ${respiratoryRate}irpm, `;
    }
    return '';
  }

  function getSpO2Message() {
    if (spO2 !== undefined && spO2 !== '') {
      return `SpO2 ${spO2}%, `;
    }
    return '';
  }

  function getTemperatureMessage() {
    if (temperature !== undefined && temperature !== '') {
      return `temperatura ${temperature}°C, `;
    }
    return '';
  }

  function getGlasgowMessage() {
    if (glasgow !== undefined && glasgow !== '') {
      return `escala de Glasgow ${glasgow}, `;
    }
    return '';
  }

  function getHgtMessage() {
    if (hgt !== undefined && hgt !== '') {
      return `HGT ${hgt}mg/dL, `;
    }
    return '';
  }

  function getPainMessage() {
    if (pain !== undefined && pain !== '') {
      return `dor ${pain}/10`;
    }
    return '';
  }

  return `Paciente${getAgeMessage()}${getComplaintMessage()}${getSymptomsMessage()}. Exame físico: ${getPhysicalExamMessage()}${getHeartRateMessage()}${getRespiratoryRateMessage()}${getSpO2Message()}${getTemperatureMessage()}${getGlasgowMessage()}${getHgtMessage()}${getPainMessage()}.`;
}

export const Results = ({switchState}) => {
  const form = useAtomValue(formAtom);
  const result = useAtomValue(searchResultsAtom);
  const [copyMessage, setCopyMessage] = useState(false);
  const [showOtherResults, setShowOtherResults] = useState(false);

  function onCopyResult() {
    navigator.clipboard.writeText(
      getCopyMessage(
        form.age,
        form.complaint,
        form.symptoms,
        form.systolicPressure,
        form.diastolicPressure,
        form.heartRate,
        form.respiratoryRate,
        form.spO2,
        form.temperature,
        form.glasgow,
        form.hgt,
        form.pain,
        form.birthday
      )
    );

    setCopyMessage(true);
    setTimeout(() => {
      setCopyMessage(false);
    }, 800);
  }

  return (
    <Container>
      <CopyResult onClick={onCopyResult}>Copiar</CopyResult>
      <CopyMessage active={copyMessage}>Resultado copiado!</CopyMessage>
      <Title>RESULTADO MAIS SENSÍVEL CARREGADO</Title>
      <ResultContainer swtichState={switchState}>
        <TitleContainer>
          <ResultTitle switchState={switchState}>{`TÍTULO DA SUGESTÃO DE ${result.resultados[0].sintoma}`}</ResultTitle>
        </TitleContainer>
        <ResultMessage switchState={switchState}>{result.resultados[0].observacao}</ResultMessage>
      </ResultContainer>
      <MoreResults onClick={() => setShowOtherResults((prev) => !prev)}>
        OUTROS RESULTADOS ⬇️
      </MoreResults>
      {showOtherResults && (
        <>
          {result.sugestoes.map((sugestao, index) => (
            <ResultContainer key={index} swtichState={switchState}>
              <TitleContainer>
                <ResultTitle switchState={switchState}>{`${sugestao.sintoma}`}</ResultTitle>
              </TitleContainer>
              <ResultMessage switchState={switchState}>{sugestao.observacao}</ResultMessage>
            </ResultContainer>
          ))}
        </>
      )}
    </Container>
  );
};
