import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #f4ead1;
  color: #2f271f;
  width: 100%;
  padding: 3rem 1.5rem 2.5rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 1200px;
  text-align: left;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #b47b2a;
`;

const FooterLink = styled.a`
  color: inherit;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Caption = styled.p`
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.4;
`;

const FooterNote = styled.p`
  margin: 0;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #6c5a43;
`;

export const Footer = () => (
  <FooterContainer aria-label="rodapé de créditos">
    <Grid>
      <Section>
        <Title>Créditos</Title>
        <Caption>
          Idealizado e desenvolvido por{' '}
          <FooterLink
            href="https://link.orango.io/WYMyP"
            target="_blank"
            rel="noreferrer"
          >
            Dr Filipe Lopes
          </FooterLink>{' '}
          com apoio direto de colegas médicos (Dr. João Pedro Lopes Boulhosa · Dr. Gabriel Lima · Dra. Chuva Starteri · Dra. Juliana Pereira - curadoria de dados e atualização) e mais desenvolvedores <FooterLink
            href="https://github.com/brennoflavio"
            target="_blank"
            rel="noreferrer"
          >Brenno Almeida</FooterLink> · <FooterLink
            href="https://github.com/Henrique-Gomesz"
            target="_blank"
            rel="noreferrer"
          >Henrique Gomes</FooterLink>
        </Caption>
      </Section>
      <Section>
        <Title>Sobre</Title>
        <Caption>
           O acrônimo que leva o nome do projeto (Classificacao de Agravos Reais de forma Objetiva e Ligeira) é em referencia a uma colega que trabalhava na recepção de uma unidade de saúde em que estávamos e sempre tinha dificuldades de fazer a triagem técnica adequada para verificar necessidade de atendimento, pois não tinha conhecimento técnico para isso e os profissionais técnicos se encontravam frequentemente alocado em outras atividades. Sabemos que isso é um problema geral pois vivenciamos em nossa prática clínica. Por isso desenvolvemos o CAROL para comunidade, fique à vontade para usar, perguntar, colaborar. Entre em <FooterLink
            href="https://link.orango.io/WYMyP"
            target="_blank"
            rel="noreferrer"
          >contato
          </FooterLink>
          .
        </Caption>
      </Section>
            <Section>
        <Title>Referência</Title>
        <Caption>
          O Carol é um projeto de <FooterLink
            href="https://pt.wikipedia.org/wiki/C%C3%B3digo_aberto"
            target="_blank"
            rel="noreferrer"
          >código aberto</FooterLink> com base no <FooterLink
            href="/manual-acolhimento-classificacao-de-risco.pdf"
            target="_blank"
            rel="noreferrer"
          >Manual de acolhimento e classificação de risco
          </FooterLink>. Siga o projeto no <FooterLink
            href="https://github.com/ORANGO-IO/carol"
            target="_blank"
            rel="noreferrer"
          >Github</FooterLink>.
        </Caption>
      </Section>
    </Grid>
    <FooterNote>
       Um oferecimento{' '}
       <FooterLink href="https://orango.io" target="_blank" rel="noreferrer">
         <img src="/orango.png" alt="Orango logo" style={{width: '60px', height: 'auto', verticalAlign: 'middle'}} />
       </FooterLink>
    </FooterNote>
  </FooterContainer>
);
