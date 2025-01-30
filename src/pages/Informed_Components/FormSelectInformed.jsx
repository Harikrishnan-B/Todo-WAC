import React from "react";
import Select from "react-select";
import { useFormSelect } from "../../utils/useFormSelect.js";

const ErrorMessage = ({ error }) => (
  <div
    className="error-message"
    style={{ 
      color: 'red', 
      fontSize: '0.875rem', 
      marginTop: '0.25rem' 
    }}
  >
    {error}
  </div>
);

const SelectField = ({ 
  value,
  onChange,
  options,
  styles,
  label,
  ...props 
}) => (
  <Select
    {...props}
    value={value}
    onChange={onChange}
    options={options}
    styles={styles}
    className="react-select-container"
    classNamePrefix="react-select"
    placeholder={`Select ${label}`}
    isClearable
  />
);

const FormSelectInformed = ({ label, options, ...props }) => {
  const {
    fieldState,
    customStyles,
    handleChange,
    selectedOption
  } = useFormSelect({ options, ...props });

  const { error, showError } = fieldState;

  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      
      <SelectField
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        label={label}
        {...props}
      />
      
      {showError && error && <ErrorMessage error={error} />}
    </div>
  );
};

export default FormSelectInformed;