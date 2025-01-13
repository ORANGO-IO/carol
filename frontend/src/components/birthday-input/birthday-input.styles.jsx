import styled from "styled-components";

export const Container = styled.div.withConfig({
  shouldForwardProp: (props) => props !== "hasError",
})`
  border: ${(
  { hasError },
) => (hasError ? "1px solid #D40000" : "1px solid #9c9c9c")};
  border-radius: 24px;
  background-color: white;
  transition: 0.2s;
  flex-direction: row;
  align-items: center;
  display: flex;
  gap: 6px;
  padding: 0px 10px;
  width: 100%;
  flex: 1 1 24px;
  max-height: 31px;
  max-width: 248px;
  height: 40px;
  &:focus-within {
    border: ${(
  { hasError },
) => (hasError ? "1px solid #D40000" : "1px solid #0074d9")};
  }
`;

export const InputContainer = styled.div`
  width: 50%;
`;

export const BirthdayInput = styled.input`
  width: 100%;
  background-color: white;
  color: #3A3A3A;
  outline: none;
  font-size: 12px;
  border: none;
`;

export const Divider = styled.div`
  height: 100%;
  width: 1px;
  background-color: #ccc;
`;

export const PatientAgeContainer = styled.div`
width: 50%;
text-align: start;
`;

export const PatientAge = styled.p`
  color: #9C9C9C;
  font-size: 12px;
`;

export const PatientAgeInputContainer = styled.div`
width: 50%;
`;

export const PatientAgeInput = styled.input`
   width: 100%;
  background-color: white;
  color: #3A3A3A;
  outline: none;
  border: none;
  font-size: 12px;
`;
