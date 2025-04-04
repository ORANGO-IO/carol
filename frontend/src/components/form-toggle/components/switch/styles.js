import styled from 'styled-components';

export const SwitchContainer = styled.div`
  width: 86px;
  height: 30px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  border-radius: 24px;
  background-color: #d9d9d9;
  transition: background-color 0.3s ease;
  cursor: pointer;
`;

export const SwitchChild = styled.div`
  width: 55px;
  height: 26px;
  background-color: #9c9c9c;
  border-radius: 24px;
  position: absolute;
  top: 2px;
  left: ${(props) => (props.isChecked ? '29px' : '2px')};
  transition: left 0.3s ease;
`;
