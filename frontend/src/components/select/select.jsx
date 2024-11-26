import { OptionComponent, SelectComponent } from "./selec.styles";


export const Select = ({ options, placeholder }) => {
  return (
    <SelectComponent>
      <OptionComponent value="" hidden disabled selected>
        {placeholder}
      </OptionComponent>
      {options.map((option) => (
        <OptionComponent key={option} value={option}>
          {option}
        </OptionComponent>
      ))}
    </SelectComponent>
  );
};
