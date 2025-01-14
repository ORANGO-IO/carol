import { FormSwitch } from '@/components/form-toggle';
import { MainForm } from '@/components/main-form';
import { Results } from '@/components/results';
import { MedicalDisclaimer } from '@/components/medical-disclaimer';
import { Logo } from '@/components/logo';
import { Container, Title } from './styles';

export const HomePage = () => {
  return (
    <Container>
      <Logo />
      <Title>CLASSIFICAÇÃO OBJETIVA EM SAÚDE</Title>
      <FormSwitch
        leftLabel="ATENÇÃO BÁSICA"
        rightLabel="HOSPITALAR"
        onToggle={() => {}}
      />
      <MainForm />
      <Results />
      <MedicalDisclaimer />
    </Container>
  );
};
