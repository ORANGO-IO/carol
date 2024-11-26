import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #2578fa;
  border-radius: 24px;

  max-width: 600px;
`;

export const FormRow = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PatientComplaintContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  gap: 12px;
  padding: 10px;
`;

export const PatientSignsContainer = styled.div`
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  flex-direction: column;
  background-color: #eeeeee;
  justify-content: center;
  align-items: center;
  display: flex;
  border: 1px solid #2578fa;

  gap: 12px;
  padding: 10px;
`;

export const PatientSignsTitle = styled.p`
  font-weight: bold;
  color: #9c9c9c;
  font-size: 14px;
`;

export const PatientSignsRow = styled.div`
  flex-direction: row;
  display: flex;
`;

export const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  background-color: #2578fa;
  height: 50px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #1e5fbc;
  }
  font-weight: bold;
  font-size: 18px;
  &:active {
    background-color: #0f4a9a;
  }
`;
