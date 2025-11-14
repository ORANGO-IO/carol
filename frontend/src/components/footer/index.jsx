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
          com apoio direto de toda a equipe médica. O projeto nasceu para apoiar
          os profissionais de acolhimento na triagem técnica.
        </Caption>
      </Section>
      <Section>
        <Title>Médicos</Title>
        <Caption>
          Dr. João Pedro Lopes Boulhosa · Dr. Gabriel Lima · Dra. Chuva
          Starteri · Dra. Juliana Pereira (Curadoria de dados e atualização)
        </Caption>
      </Section>
      <Section>
        <Title>Desenvolvedores</Title>
        <Caption>
          Brenno Almeida (
          <FooterLink
            href="https://github.com/brennoflavio"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </FooterLink>
          ) · Henrique Gomes (
          <FooterLink
            href="https://github.com/Henrique-Gomesz"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </FooterLink>
          )
        </Caption>
      </Section>
      <Section>
        <Title>Referência</Title>
        <Caption>
          Manual de acolhimento e classificação de risco (
          <FooterLink
            href="/manual-acolhimento-classificacao-de-risco.pdf"
            target="_blank"
            rel="noreferrer"
          >
            PDF
          </FooterLink>
          ) · Projeto de{' '}
          <FooterLink
            href="https://pt.wikipedia.org/wiki/C%C3%B3digo_aberto"
            target="_blank"
            rel="noreferrer"
          >
            código aberto
          </FooterLink>
        </Caption>
      </Section>
      <Section>
        <Title>Sobre</Title>
        <Caption>
          CAROL (Classificação de Agravos Reais de forma Objetiva e Ligeira)
          homenageia uma colega da recepção que lutava para triagens técnicas.
          Use, pergunte, colabore e entre em contato pelo mesmo{' '}
          <FooterLink
            href="https://link.orango.io/WYMyP"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </FooterLink>
          .
        </Caption>
      </Section>
    </Grid>
    <FooterNote>
      Um oferecimento{' '}
      <FooterLink href="https://orango.io" target="_blank" rel="noreferrer">
        Orango (logo orango)
      </FooterLink>
    </FooterNote>
  </FooterContainer>
);
