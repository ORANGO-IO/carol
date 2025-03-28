import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid #2578fa;
  border-radius: 24px;
  max-width: 513px;
`;

export const FormRow = styled.div`
  gap: ${(props) => (props.gap ? props.gap : '5px')};
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

export const FormErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
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
  flex: 1 1 248px;
  max-width: 248px;
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
  padding: 10px;
`;

export const PatientSignsInputContainer = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

export const PatientSignsTitle = styled.p`
  font-weight: bold;
  color: #9c9c9c;
  font-size: 12x;
  line-height: 12px;
  font-weight: 700;
  margin: 0px;
  margin-bottom: 10px;
`;

export const PatientSignsRow = styled.div`
  flex-direction: row;
  display: flex;
`;

export const SubmitButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop),
})`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  background-color: ${(props) => (props.active ? '#2578fa' : '#ccc')};
  height: 50px;
  border: none;
  cursor: ${(props) => (props.active ? 'pointer' : 'not-allowed')};
  color: ${(props) => (props.active ? 'white' : '#666')};
  font-weight: 700;
  font-size: 18px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.active ? '#1e5fbc' : '#ccc'}; /* Muda a cor apenas se ativo */
  }

  &:active {
    background-color: ${(props) => (props.active ? '#0f4a9a' : '#ccc')};
  }
`;
