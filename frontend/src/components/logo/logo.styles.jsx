import styled from "styled-components";

export const LogoContainer = styled.div`

position: relative;
`;

export const LogoComponent = styled.img``;

export const About = styled.img`
position: absolute;
top: 0px;
right: 0px;
cursor: pointer;
width: 14px;
`;

export const Popup = styled.div.withConfig({
  shouldForwardProp: (prop) => !["showPopup"].includes(prop),
})`
opacity: ${(props) => (props.showPopup ? "1" : "0")};
transition: 0.2s;
z-index: 1;
position: absolute;
top: 24px;
right: -75px;
min-width: 300px;
border-radius: 24px;
padding: 16px;
background-color: white;
border: 1px solid #9c9c9c;
`;

export const PopupText = styled.p`

`;
