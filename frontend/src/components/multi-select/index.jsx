import { useEffect } from 'react';
import SelectComponent from 'react-select';

export const MultiSelect = ({
  placeholder,
  name,
  options,
  setValues,
  handleBlur,
  value = [],
  onChange = () => {},
}) => {
  
  useEffect(() => {
    setValues((prev) => {
      return {
        ...prev,
        [name]: value.map((value) => value.value),
      };
    });
  }, [value]);

  return (
    <SelectComponent
      onBlur={handleBlur}
      name={name}
      isMulti={true}
      value={value}
      onChange={(values) => {
        onChange(values);
        setValues((prev) => {
          return {
            ...prev,
            [name]: values.map((value) => value.value),
          };
        });
      }}
      options={options}
      placeholder={placeholder}
      styles={{
        input: (provided) => ({
          ...provided,
          margin: 0,
        }),
        control: (provided) => ({
          ...provided,
          borderRadius: '24px',
          textAlign: 'left',
          borderColor: '#9c9c9c',
          fontSize: 12,
          minHeight: 57,
        }),
        option: (provided) => ({
          ...provided,
          cursor: 'pointer',
          borderRadius: '24px',
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: '24px',
        }),
        placeholder: (provided) => ({
          ...provided,
          color: '#9C9C9C',
        }),
        multiValue: (provided) => ({
          ...provided,
          borderRadius: '24px',
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          borderRadius: '24px',
        }),
        indicatorSeparator: (state) => ({
          display: 'none',
        }),
      }}
    />
  );
};
