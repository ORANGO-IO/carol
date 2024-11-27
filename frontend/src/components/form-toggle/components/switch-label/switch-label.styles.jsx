import styled from "styled-components";

export const Container = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Label = styled.p`
  color: ${(props) => (props.enabled ? props.color ?? "black" : "#ccc")};
  transition: 0.2s;
`;

export const RightImage = styled.img``;

export const LeftImage = styled.img``;
