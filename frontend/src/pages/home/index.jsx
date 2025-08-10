import { FormSwitch } from '@/components/form-toggle';
import { MainForm } from '@/components/main-form';
import { Results } from '@/components/results';
import { MedicalDisclaimer } from '@/components/medical-disclaimer';
import { Logo } from '@/components/logo';
import { Container, Title } from './styles';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { isLoadingAtom, searchResultsAtom } from '@/store/main-store';
import Loading from '@/components/loading';

export const HomePage = () => {
  const [swtichState, setSwitchState] = useState('VULNERABILIDADE');
  const results = useAtomValue(searchResultsAtom);
  const loading = useAtomValue(isLoadingAtom);
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
      {results.resultados.length > 0 && <Results />}
      <MedicalDisclaimer />
      {loading && <Loading />}
    </Container>
  );
};
