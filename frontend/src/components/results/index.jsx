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
  ClassificationBadge,
  ClassificationInfo,
  PriorityLabel,
} from './styles';
import { calculateAge } from '@/utils/calculate-age-from-date';

// Helper function to get priority name based on priority number
function getPriorityName(priority) {
  const priorityMap = {
    1: 'VERMELHO',
    2: 'LARANJA', 
    3: 'AMARELO',
    4: 'VERDE',
    5: 'AZUL'
  };
  return priorityMap[priority] || 'NÃO CLASSIFICADO';
}

// Helper function to get color based on priority  
function getPriorityColor(priority, colorHex) {
  // Use color from database if available
  if (colorHex) {
    return `#${colorHex}`;
  }
  
  // Fallback to Manchester Protocol standard colors
  const colorMap = {
    1: '#D40000', // Vermelho - Emergência
    2: '#FF7700', // Laranja - Muito urgente  
    3: '#FFD700', // Amarelo - Urgente
    4: '#00C851', // Verde - Pouco urgente
    5: '#0099CC'  // Azul - Não urgente
  };
  return colorMap[priority] || '#808080';
}

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
      <ResultContainer 
        priority={result.triagem?.prioridade || result.resultados[0]?.prioridade}
        colorHex={result.triagem?.cor_hex || result.resultados[0]?.cor_hex}
        switchState={switchState}
      >
        <TitleContainer>
          <ResultTitle>
            {`${result.triagem?.sintoma || result.resultados[0]?.sintoma}`}
          </ResultTitle>
          <ClassificationBadge 
            priority={result.triagem?.prioridade || result.resultados[0]?.prioridade}
            colorHex={result.triagem?.cor_hex || result.resultados[0]?.cor_hex}
          >
            <PriorityLabel>
              {result.triagem?.classificacao?.classificacao || result.resultados[0]?.classificacao?.classificacao}
            </PriorityLabel>
          </ClassificationBadge>
        </TitleContainer>
        <ResultMessage>
          {result.triagem?.observacao || result.resultados[0]?.observacao}
        </ResultMessage>
        <ClassificationInfo>
          <span>Tempo de atendimento: <strong>{result.triagem?.classificacao?.tempo_atendimento || result.resultados[0]?.classificacao?.tempo_atendimento}</strong></span>
          <span>{result.triagem?.classificacao?.descritor || result.resultados[0]?.classificacao?.descritor}</span>
        </ClassificationInfo>
      </ResultContainer>
      <MoreResults onClick={() => setShowOtherResults((prev) => !prev)}>
        OUTROS RESULTADOS ⬇️
      </MoreResults>
      {showOtherResults && (
        <>
          {result.sugestoes.map((sugestao, index) => (
            <ResultContainer 
              key={index} 
              priority={sugestao.prioridade}
              colorHex={sugestao.cor_hex}
              switchState={switchState}
            >
              <TitleContainer>
                <ResultTitle>
                  {`${sugestao.sintoma}`}
                </ResultTitle>
                <ClassificationBadge 
                  priority={sugestao.prioridade}
                  colorHex={sugestao.cor_hex}
                >
                  <PriorityLabel>
                    {getPriorityName(sugestao.prioridade)}
                  </PriorityLabel>
                </ClassificationBadge>
              </TitleContainer>
              <ResultMessage>{sugestao.observacao}</ResultMessage>
            </ResultContainer>
          ))}
        </>
      )}
    </Container>
  );
};
