import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #9c9c9c;
  border-radius: 24px;
  background-color: white;
`;

export const TextFieldContainer = styled.div`
  padding: 10px;
`;

export const BaseTextField = styled.input`
  background-color: white;
  color: black;
  outline: none;
  font-size: 16px;
  border: none;
  width: 100%;
`;

export const LabelContainer = styled.div`
  background-color: #e4e4e4;
  padding: 10px;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
`;

export const Label = styled.text`
  color: black;
  font-size: 12px;
`;
