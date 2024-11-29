import { useState } from "react";
import {
  Container,
  CopyMessage,
  CopyResult,
  ResultContainer,
  ResultMessage,
  ResultTitle,
  Title,
  TitleContainer,
} from "./results.styles";

export const Results = () => {
  const [copyMessage, setCopyMessage] = useState(false);

  function onCopyResult() {
    navigator.clipboard.writeText(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer convallis}",
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
