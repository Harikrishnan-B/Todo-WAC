import React from "react";
import { useFormField } from "../../utils/useFormField.js";

// Error message component
const ErrorMessage = ({ error }) => (
  <div
    className="error-message"
    style={{ color: "red", fontSize: "0.875rem", marginTop: "0.25rem" }}
  >
    {error}
  </div>
);

// Input field component
const InputField = ({ informed, className, style, inputRef, ...rest }) => (
  <input
    {...rest}
    {...informed}
    ref={inputRef}
    className={`form-control ${className || ""}`}
    style={style}
  />
);

const FormFieldInformed = (props) => {
  const { render, informed, fieldState, userProps, ref } = useFormField(props);
  const { id, className, ...rest } = userProps;
  const { error, showError } = fieldState;
  const { label } = props;

  const inputStyle = {
    ...rest.style,
    borderColor: showError ? "red" : undefined,
    borderWidth: showError ? "2px" : "1px",
  };

  return render(
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      
      <InputField
        {...rest}
        informed={informed}
        inputRef={ref}
        className={className}
        style={inputStyle}
        
      />
      
      {showError && <ErrorMessage error={error} />}
    </div>
  );
};

export default FormFieldInformed;