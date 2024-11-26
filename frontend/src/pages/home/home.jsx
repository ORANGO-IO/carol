import { Container, LogoContainer, Title } from "./home.styles";
import {FormSwitch} from '../../components/form-toggle/form-toggle'
import {MainForm} from '../../components/main-form/main-form'
import {Results} from '../../components/results/results'
import Logo from "../../assets/logo.png";

export const HomePage = () => {
  return (
    <Container>
      <LogoContainer>
        <img src={Logo} alt="logo" />
      </LogoContainer>
      <Title>CLASSIFICAÇÃO OBJETIVA EM SAÚDE</Title>
      <FormSwitch
        leftLabel="ATENÇÃO BÁSICA"
        rightLabel="HOSPITALAR"
        onToggle={() => {}}
      />
      <MainForm />
      <Results />
    </Container>
  );
}