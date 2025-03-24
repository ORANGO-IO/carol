import styled from 'styled-components';

export const Container = styled.div`
  max-width: 513px;
  margin-top: 35px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
  color: black;
`;

export const ResultContainer = styled.div`
  margin-top: 30px;
  flex-direction: column;
  justify-content: flex-start;
  text-align: start;
  display: flex;
  gap: 11px;
  padding: 23px;
  background-color: #ffb100;
  border: 1px solid #956d10;
  border-radius: 24px;
`;

export const ResultTitle = styled.p`
  font-size: 12px;
  line-height: 12px;
  font-weight: 700;
  color: #3a3a3a;
`;

export const ResultMessage = styled.p`
  color: #3a3a3a;
  line-height: 12px;
  font-size: 10px;
`;

export const CopyResult = styled.button`
  margin-top: 16px;
  background-color: #2578fa;
  color: white;
  border: none;
  border-radius: 8px;
  max-width: 200px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 12px;

  &:hover {
    background-color: #1354d8;
  }
`;

export const CopyMessage = styled.p.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop),
})`
  opacity: ${(props) => (props.active ? '1' : '0')};
  transition: opacity 0.2s;
  color: #2578fa;
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
`;
