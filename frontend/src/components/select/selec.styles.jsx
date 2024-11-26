import styled from "styled-components";

export const SelectComponent = styled.select`
  padding: 10px;
  border: 1px solid #9c9c9c;
  border-radius: 24px;

  font-size: 16px;
  color: #9c9c9c;
  background-color: white;
  cursor: pointer;
  transition: 0.3s;
  &:focus {
    outline: none;
  }
  &:hover {
    border-color: #0883d7;
  }
`;

export const OptionComponent = styled.option``;
