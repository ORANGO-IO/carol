import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  border: ${(
  props,
) => (props.hasError ? "1px solid red" : "1px solid #9c9c9c")};
  border-radius: 24px;
  background-color: white;
  width: 100%;
  justify-content: space-between;
  flex: ${(props) => props.flexValue || "1 1 150px"};
`;

export const TextFieldContainer = styled.div`
  padding: 10px;
  width: 100%;
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
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  width: 60px;
  max-width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.p`
  color: black;
  font-size: 12px;
`;
