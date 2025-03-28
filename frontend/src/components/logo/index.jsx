import {
  About,
  LogoComponent,
  LogoContainer,
  Popup,
  PopupText,
} from './styles';
import LogoImage from '@/assets/logo.png';
import AboutIcon from '@/assets/about.svg';
import { useState } from 'react';

export const Logo = () => {
  const [showPopup, setShowPopup] = useState(false);

  function handlePopup() {
    setShowPopup(!showPopup);
  }

  return (
    <LogoContainer>
      <LogoComponent src={LogoImage} alt="logo CAROL" />

      <About onClick={handlePopup} src={AboutIcon} alt="sobre CAROL" />
      <Popup showPopup={showPopup}>
        <PopupText>
          Esse projeto iniciou como uma intervenção no internato de medicina da
          UFBA no Vale do Capão - Chapada Diamantina/BA. A recepcionista Carol
          fazia um 'acolhimento' verificando a gravidade dos casos, o que
          inspirou o sistema.
        </PopupText>
      </Popup>
    </LogoContainer>
  );
};
