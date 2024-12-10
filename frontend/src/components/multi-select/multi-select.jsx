import SelectComponent from "react-select";

export const MultiSelect = (
  { placeholder, name, options, setValues, handleBlur },
) => {
  return (
    <SelectComponent
      onBlur={handleBlur}
      name={name}
      isMulti
      onChange={(values) => {
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
