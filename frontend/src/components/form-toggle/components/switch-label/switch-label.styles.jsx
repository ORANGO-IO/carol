import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Label = styled.p.withConfig({
  shouldForwardProp: (prop) => !["enabled", "color"].includes(prop),
})`
flex:1;
  color: ${(props) => (props.enabled ? props.color ?? "black" : "#ccc")};
  transition: 0.2s;
  margin:0px;
  width:110px;
  flex-wrap:wrap;
  padding: 0px;
`;

export const RightImage = styled.img``;

export const LeftImage = styled.img``;
