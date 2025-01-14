import styled from "styled-components";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !["flexValue", "hasError"].includes(prop), // Prevent flexValue from being forwarded to the DOM
})`
  display: flex;
  flex-direction: row;
  border: ${(props) => props.hasError ? "1px solid #D40000" : "1px solid #9c9c9c"};
  border-radius: 24px;
  background-color: white;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex: ${(props) => props.flexValue || "1 1 150px"};
  max-height: 31px;
  
  &:focus-within {
    border: ${(props) => props.hasError ? "1px solid #D40000" : "1px solid #0074d9"};
  }
`;

export const TextFieldContainer = styled.div`
  padding: 10px;
  width: 100%;
`;

export const BaseTextField = styled.input`
  background-color: white;
  color: #3A3A3A;
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
  color: #3A3A3A;
  font-size: 9px;
`;
