import { WarningContainer, WarningMessage } from './styles';

export const PrecisionWarningMessage = () => {
  return (
    <WarningContainer>
      <WarningMessage>
        Os resultados são mais específicos quanto mais informações forem
        fornecidas. <br /> Preencher mais campos reduz a chance de falsos
        positivos.
      </WarningMessage>
    </WarningContainer>
  );
};
