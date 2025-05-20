import { Container, Error } from './styles';

export const FormErrors = ({ errors }) => {
  return (
    <Container>
      {Object.keys(errors).map((key) => {
        // não exibir erros de idade
        if (errors[key].includes(["[AGE]"])) {
          return;
        }

        return <Error key={key}>{errors[key]}</Error>;
      })}
    </Container>
  );
};
