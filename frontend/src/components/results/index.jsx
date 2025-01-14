import { useAtomValue } from "jotai";
import { useState } from "react";
import { formAtom } from "@/store/main-store";
import {
  Container,
  CopyMessage,
  CopyResult,
  ResultContainer,
  ResultMessage,
  ResultTitle,
  Title,
  TitleContainer,
} from "./styles";
import { calculateAge } from "@/utils/calculate-age-from-date";

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
  birthday,
) {
  function getAgeMessage() {
    let parsedAge;
    if (
      age == undefined || age == "" && birthday == undefined || birthday == ""
    ) {
      return "";
    }

    if (age !== undefined && age !== "") {
      parsedAge = age;
    }

    if (birthday !== undefined && birthday !== "") {
      parsedAge = calculateAge(birthday);
    }

    return ` ${parsedAge} anos,`;
  }

  function getComplaintMessage() {
    if (complaint !== undefined && complaint !== "") {
      return ` com queixa de ${complaint}`;
    }
    return "";
  }

  function getSymptomsMessage() {
    if (symptoms !== undefined && symptoms.length > 0) {
      return ` apresenta ${symptoms.join(", ")}`;
    }
    return "";
  }

  function getPhysicalExamMessage() {
    if (
      systolicPressure !== undefined && systolicPressure !== "" &&
      diastolicPressure !== undefined && diastolicPressure !== ""
    ) {
      return `PA ${systolicPressure}/${diastolicPressure}mmHg, `;
    }
    return "";
  }

  function getHeartRateMessage() {
    if (heartRate !== undefined && heartRate !== "") {
      return `FC ${heartRate}bpm, `;
    }
    return "";
  }

  function getRespiratoryRateMessage() {
    if (respiratoryRate !== undefined && respiratoryRate !== "") {
      return `FR ${respiratoryRate}irpm, `;
    }
    return "";
  }

  function getSpO2Message() {
    if (spO2 !== undefined && spO2 !== "") {
      return `SpO2 ${spO2}%, `;
    }
    return "";
  }

  function getTemperatureMessage() {
    if (temperature !== undefined && temperature !== "") {
      return `temperatura ${temperature}°C, `;
    }
    return "";
  }

  function getGlasgowMessage() {
    if (glasgow !== undefined && glasgow !== "") {
      return `escala de Glasgow ${glasgow}, `;
    }
    return "";
  }

  function getHgtMessage() {
    if (hgt !== undefined && hgt !== "") {
      return `HGT ${hgt}mg/dL, `;
    }
    return "";
  }

  function getPainMessage() {
    if (pain !== undefined && pain !== "") {
      return `dor ${pain}/10`;
    }
    return "";
  }

  return `Paciente${getAgeMessage()}${getComplaintMessage()}${getSymptomsMessage()}. Exame físico: ${getPhysicalExamMessage()}${getHeartRateMessage()}${getRespiratoryRateMessage()}${getSpO2Message()}${getTemperatureMessage()}${getGlasgowMessage()}${getHgtMessage()}${getPainMessage()}.`;
}

export const Results = () => {
  const form = useAtomValue(formAtom);
  const [copyMessage, setCopyMessage] = useState(false);

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
        form.birthday,
      ),
    );

    setCopyMessage(true);
    setTimeout(() => {
      setCopyMessage(false);
    }, 800);
  }

  return (
    <Container>
      <Title>RESULTADO MAIS SENSÍVEL CARREGADO</Title>
      <ResultContainer>
        <TitleContainer>
          <ResultTitle>TÍTULO DA SUGESTÃO DE</ResultTitle>
        </TitleContainer>
        <ResultMessage>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          convallis, nulla a gravida auctor, arcu eros aliquet elit, eu maximus
          dolor libero in ipsum. Curabitur in nisi purus. Aenean a hendrerit
          massa. Donec condimentum eu ante non egestas. Morbi non venenatis
          lacus. Vivamus faucibus enim sapien, eu vehicula augue venenatis ut.
          Ut malesuada mi ac risus iaculis, ac vulputate risus elementum. Donec
          vel orci egestas, ullamcorper nibh id, facilisis est. Proin aliquet
          tellus a ultricies tincidunt. Integer vulputate convallis orci id
          posuere. Maecenas at pharetra elit, nec consectetur massa. Proin
          finibus lacus ante, vitae tincidunt quam efficitur id. Nunc semper
          facilisis ipsum sit amet molestie. Vivamus eget convallis mauris. Sed
          ac sapien luctus, vestibulum erat eget, fringilla quam.
        </ResultMessage>
      </ResultContainer>
      <CopyResult onClick={onCopyResult}>Copiar</CopyResult>
      <CopyMessage active={copyMessage}>Resultado copiado!</CopyMessage>
    </Container>
  );
};
