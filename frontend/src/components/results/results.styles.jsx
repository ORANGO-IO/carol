import styled from "styled-components";

export const Container = styled.div`
  max-width: 768px;
`;

export const TitleContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: start;
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: 14px;
  color: black;
`;

export const ResultContainer = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  text-align: start;
  display: flex;
  gap: 12px;
  padding: 24px;
  background-color: #ffb100;
  border: 1px solid #956d10;
  border-radius: 24px;
`;

export const ResultTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: black;
`;

export const ResultMessage = styled.p`
  color: black;
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

  &:hover {
    background-color: #1354d8;
  }
`;

export const CopyMessage = styled.p.withConfig({
  shouldForwardProp: (prop) => !["active"].includes(prop),
})`
  opacity: ${(props) => (props.active ? "1" : "0")};
  transition: opacity 0.2s;
  color: #2578fa;
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
`;
