import { useState } from 'react';

import BasicAttendence from '@/assets/basic.png';
import HospitalImage from '@/assets/hospital.png';
import { SwitchLabel, ToggleSwitchContainer } from './styles';
import Switch from './components/switch';

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
      <Switch onToggle={handleToggle} isChecked={isChecked} />
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
