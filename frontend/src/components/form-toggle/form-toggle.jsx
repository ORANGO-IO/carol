import { useState } from "react";

import {
  SwitchInput,
  SwitchInputContainer,
  SwitchLabel,
  SwitchSlider,
  ToggleSwitchContainer,
} from "./form-toggle.styles";
import HospitalImage from "../../assets/hospital.png";
import BasicAttendence from "../../assets/basic.png";

export const FormSwitch = ({ onToggle, leftLabel, rightLabel }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
    onToggle(!isChecked);
  };

  return (
    <ToggleSwitchContainer>
      {leftLabel && (
        <SwitchLabel
          enabled={!isChecked}
          textColor="#0883D7"
          rightImage={BasicAttendence}
          text={leftLabel}
        />
      )}
      <SwitchInputContainer>
        <SwitchInput
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
        />
        <SwitchSlider />
      </SwitchInputContainer>
      {rightLabel && (
        <SwitchLabel
          enabled={isChecked}
          textColor="#D40000"
          leftImage={HospitalImage}
          text={rightLabel}
        />
      )}
    </ToggleSwitchContainer>
  );
};
