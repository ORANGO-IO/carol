import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid #2578fa;
  border-radius: 24px;
  max-width: 768px;
`;

export const FormRow = styled.div`
  gap: 8px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const PatientComplaintContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
  padding: 10px;
`;

export const PatientComplaintRow = styled.div`
flex-direction: row;
flex-wrap: wrap;
display: flex;
gap: 12px;
justify-content: space-between;
`;

export const SelectContainer = styled.div`
  width: 100%;
  flex: 1 1 240px;
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
  font-size: 16px;
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
  color:white;

  &:hover {
    background-color: #1e5fbc;
  }
  font-weight: bold;
  font-size: 18px;
  &:active {
    background-color: #0f4a9a;
  }
`;
