import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #ccc;
  border-radius: 24px;
  font-size: 16px;
  background-color: white;
  transition: 0.2s;
  padding: 10px;
  flex-direction: row;
  display: flex;
  gap: 6px;
`;

export const InputContainer = styled.div`
  width: 50%;
`;

export const BirthdayInput = styled.input`
  width: 100%;
  background-color: white;
  color: black;
  outline: none;
  font-size: 16px;
  border: none;
`;

export const Divider = styled.div`
  height: 100%;
  width: 1px;
  background-color: #ccc;
`;

export const PatientAgeContainer = styled.div``;

export const PatientAge = styled.text`
  color: black;
`;
