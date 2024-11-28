import styled from "styled-components";

export const Container = styled.div`
  border: ${(
  { hasError },
) => (hasError ? "1px solid red" : "1px solid #9c9c9c")};
  border-radius: 24px;
  font-size: 16px;
  background-color: white;
  transition: 0.2s;
  flex-direction: row;
  align-items: center;
  display: flex;
  gap: 6px;
  padding: 0px 10px;
  width: 100%;
  flex: 1 1 240px;
  height: 40px;
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

export const PatientAge = styled.p`
  color: #9C9C9C;
`;

export const PatientAgeInput = styled.input`
   width: 100%;
  background-color: white;
  color: black;
  outline: none;
  font-size: 16px;
  border: none;
`;
