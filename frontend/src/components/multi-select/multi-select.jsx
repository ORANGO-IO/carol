import SelectComponent from "react-select";

export const MultiSelect = (
  { placeholder, name, onChange, options },
) => {
  return (
    <SelectComponent
      name={name}
      isMulti
      onChange={(values) => {
        const event = {
          target: {
            name,
            value: values.map((value) => value.value),
          },
        };
        onChange(event);
      }}
      options={options}
      placeholder={placeholder}
      styles={{
        control: (provided) => ({
          ...provided,
          borderRadius: "24px",
          textAlign: "left",
          borderColor: "#9c9c9c",
          fontSize: 16,
          minHeight: 60,
        }),
        option: (provided) => ({
          ...provided,
          cursor: "pointer",
          borderRadius: "24px",
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: "24px",
        }),
        placeholder: (provided) => ({
          ...provided,
        }),
        multiValue: (provided) => ({
          ...provided,
          borderRadius: "24px",
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          borderRadius: "24px",
        }),
      }}
    />
  );
};
