import styled from "styled-components";
import { SwitchLabel as BaseSwitchLabel } from "./components/switch-label/switch-label";

export const ToggleContainer = styled.div``;

export const ToggleSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  margin-bottom: 17px;
`;


export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span:before {
    transform: translateX(24px);
  }
`;

export const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 30px;
    width: 20px;
    left: 4px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const LabelText = styled.span`
  margin-left: 10px;
`;

export const SwitchLabel = styled(BaseSwitchLabel)``;