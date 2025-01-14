import { Container, Label, LeftImage, RightImage } from "./styles";

export const SwitchLabel = ({
  text,
  leftImage,
  rightImage,
  textColor,
  enabled = true,
}) => {
  return (
    <Container>
      {leftImage && <LeftImage src={leftImage} alt="leftImage" />}
      <Label   
          width={23}
          height={23}
          enabled={enabled} color={textColor}>
        {text}
      </Label>
      {rightImage && (
        <RightImage
          width={23}
          height={23}
          src={rightImage}
          alt="rightImage"
        />
      )}
    </Container>
  );
};
