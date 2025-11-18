import { useMemo } from 'react';
import {
  Overlay,
  ModalContainer,
  Header,
  Title,
  Subtitle,
  CloseButton,
  Content,
  SectionTitle,
  ClassificationCard,
  ClassificationHeader,
  ClassificationName,
  ClassificationMeta,
  ItemList,
  ItemRow,
  ItemTitle,
  ItemDescription,
  EmptyState,
  LoadingState,
} from './styles';

const PRIORITY_ORDER = ['VERMELHO', 'LARANJA', 'AMARELO', 'VERDE', 'AZUL'];

function normalizeKey(key) {
  if (!key) return '';
  return key
    .normalize('NFD')
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase();
}

function formatRange(sinal) {
  const unidade = sinal?.sinal?.unidade ? ` ${sinal.sinal.unidade}` : '';
  const minText = sinal?.min ? `≤ ${sinal.min}${unidade}` : '';
  const maxText = sinal?.max ? `≥ ${sinal.max}${unidade}` : '';
  if (minText && maxText) {
    return `${minText} · ${maxText}`;
  }
  return minText || maxText || '';
}

export const ComplaintDetailsModal = ({ isOpen, complaint, onClose, isLoading }) => {
  if (!isOpen) {
    return null;
  }

  const complaintData = Array.isArray(complaint) ? complaint?.[0] : complaint;

  const classificationEntries = useMemo(() => {
    if (!complaintData?.classificacao) {
      return [];
    }

    const entries = Object.entries(complaintData.classificacao);
    return entries.sort((a, b) => {
      const normalizedA = normalizeKey(a[0]);
      const normalizedB = normalizeKey(b[0]);
      const indexA = PRIORITY_ORDER.indexOf(normalizedA);
      const indexB = PRIORITY_ORDER.indexOf(normalizedB);
      if (indexA === -1 && indexB === -1) {
        return a[0].localeCompare(b[0]);
      }
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [complaintData]);

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(event) => event.stopPropagation()}>
        <Header>
          <div>
            <Title>{complaintData?.sintoma || 'QUEIXA PRINCIPAL'}</Title>
            {complaintData?.observacao ? (
              <Subtitle>{complaintData.observacao}</Subtitle>
            ) : null}
          </div>
          <CloseButton aria-label="Fechar detalhes" onClick={onClose}>
            ×
          </CloseButton>
        </Header>
        {isLoading ? (
          <LoadingState>Carregando detalhes...</LoadingState>
        ) : classificationEntries.length === 0 ? (
          <EmptyState>
            Não existem detalhes cadastrados para esta queixa no momento.
          </EmptyState>
        ) : (
          <Content>
            {classificationEntries.map(([classificationName, data]) => (
              <ClassificationCard key={classificationName} color={data?.cor}>
                <ClassificationHeader>
                  <ClassificationName>{classificationName}</ClassificationName>
                  <ClassificationMeta>
                    {data?.sinais?.length || 0} sinais ·{' '}
                    {data?.sintomas?.length || 0} sintomas
                  </ClassificationMeta>
                </ClassificationHeader>

                {data?.sinais?.length ? (
                  <>
                    <SectionTitle>Sinais</SectionTitle>
                    <ItemList>
                      {data.sinais.map((sinal) => (
                        <ItemRow key={`sinal-${sinal.ID || sinal.id}`}> 
                          <ItemTitle>{sinal?.sinal?.nome || 'Sinal'}</ItemTitle>
                          <ItemDescription>
                            {formatRange(sinal)}
                            {sinal?.descritor ? <span>{sinal.descritor}</span> : null}
                          </ItemDescription>
                        </ItemRow>
                      ))}
                    </ItemList>
                  </>
                ) : null}

                {data?.sintomas?.length ? (
                  <>
                    <SectionTitle>Sintomas</SectionTitle>
                    <ItemList>
                      {data.sintomas.map((sintoma) => (
                        <ItemRow key={`sintoma-${sintoma.ID || sintoma.id}`}>
                          <ItemTitle>{sintoma?.sintoma || 'Sintoma'}</ItemTitle>
                          {sintoma?.descritor ? (
                            <ItemDescription>{sintoma.descritor}</ItemDescription>
                          ) : null}
                        </ItemRow>
                      ))}
                    </ItemList>
                  </>
                ) : null}
              </ClassificationCard>
            ))}
          </Content>
        )}
      </ModalContainer>
    </Overlay>
  );
};

