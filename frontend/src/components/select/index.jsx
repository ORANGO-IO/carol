import SelectComponent from 'react-select';

export const Select = ({
  placeholder,
  name,
  options,
  hasError,
  setValues,
  handleBlur,
  isLoading = false,
  onSelect = () => {},
}) => {
  return (
    <SelectComponent
      isLoading={isLoading}
      onBlur={handleBlur}
      options={options}
      isClearable
      onChange={(value) => {
        if (value === null)
          return setValues((values) => {
            return {
              ...values,
              [name]: '',
            };
          });

        onSelect(value);
        setValues((values) => {
          return {
            ...values,
            [name]: value.value,
          };
        });
      }}
      name={name}
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
          borderColor: hasError ? '#D40000' : '#9c9c9c',
          fontSize: 12,
          minHeight: 31,
          height: 31,
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          height: '31px',
          padding: '0 6px',
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
        indicatorSeparator: (state) => ({
          display: 'none',
        }),
        indicatorsContainer: (provided, state) => ({
          ...provided,
          height: '31px',
        }),
        placeholder: (provided) => ({
          ...provided,
          color: '#9C9C9C',
        }),
      }}
    />
  );
};
