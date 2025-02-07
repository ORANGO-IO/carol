import { FormSwitch } from '@/components/form-toggle';
import { MainForm } from '@/components/main-form';
import { Results } from '@/components/results';
import { MedicalDisclaimer } from '@/components/medical-disclaimer';
import { Logo } from '@/components/logo';
import { Container, Title } from './styles';
import { useState } from 'react';

export const HomePage = () => {
  const [swtichState, setSwitchState] = useState('VULNERABILIDADE');
  
  const handleSwitch = (isChecked) => {
    setSwitchState(isChecked ? 'CONDIÇÕES ESPECIAIS' : 'VULNERABILIDADE');
  }

  return (
    <Container>
      <Logo />
      <Title>CLASSIFICAÇÃO OBJETIVA EM SAÚDE</Title>
      <FormSwitch
        leftLabel="ATENÇÃO BÁSICA"
        rightLabel="HOSPITALAR"
        onToggle={handleSwitch}
      />
      <MainForm switchState={swtichState} />
      <Results />
      <MedicalDisclaimer />
    </Container>
  );
};
