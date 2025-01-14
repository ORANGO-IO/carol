import React from "react";
import { SwitchChild, SwitchContainer } from "./styles";

const Switch = ({ onToggle, isChecked, opacity = 1 }) => {
  const toggleSwitch = () => {
    onToggle(!isChecked);
  };

  return (
    <SwitchContainer
      onClick={toggleSwitch}
      isChecked={isChecked}
      style={{ opacity }}
    >
      <SwitchChild isChecked={isChecked} />
    </SwitchContainer>
  );
};

export default Switch;
