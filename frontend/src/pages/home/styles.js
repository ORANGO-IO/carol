import styled from 'styled-components';

export const PageShell = styled.main`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 3rem 1.25rem 4rem;
  gap: 1.5rem;
`;

export const Title = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: black;
  line-height: 14px;
`;

export const FormContainer = styled.div``;
