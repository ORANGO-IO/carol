import styled from 'styled-components';

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !['flexValue', 'hasError', 'hasAgeError'].includes(prop), // Prevent flexValue from being forwarded to the DOM
})`
  display: flex;
  flex-direction: row;
  border: ${(props) =>
    props.hasError ? '1px solid #D40000' : '1px solid #9c9c9c'};
  border-radius: 24px;
  background-color: white;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex: ${(props) => props.flexValue || '1 1 150px'};
  max-height: 31px;
  background-color: ${(props) => (props.hasAgeError ? '#FFB100' : 'white')};
  
  &:focus-within {
    border: ${(props) =>
      props.hasError ? '1px solid #D40000' : '1px solid #0074d9'};
  }
`;

export const TextFieldContainer = styled.div`
  width: 100%;
  margin-left: 10px;
`;

export const BaseTextField = styled.input.withConfig({
  shouldForwardProp: (prop) => !['hasError'].includes(prop), // Prevent hasError from being forwarded to the DOM
})`
  background-color: ${(props) => (props.hasError ? '#FFB100' : 'white')};
  color: #3a3a3a;
  outline: none;
  border: none;
  width: 100%;
  font-weight: 400;
  font-size: 12px;
  max-height: 31px;

`;

export const LabelContainer = styled.div`
  background-color: #e4e4e4;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  width: 60px;
  max-width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Label = styled.p`
  color: #3a3a3a;
  font-size: 9px;
`;
