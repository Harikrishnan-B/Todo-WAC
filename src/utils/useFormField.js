

import { useField } from "informed";

export const useFormField = ({
  label,
  validate,
  validateOn,
  showErrorIfError,
  formatter,
  ...props
}) => {
  const validatePhoneNumber = (value) => {
    if (validate) {
      const baseValidation = validate(value);
      if (baseValidation) return baseValidation;
    }

    if (formatter && formatter.includes("+91")) {
      const phoneValue = value ? value.toString() : "";
      const cleanedValue = phoneValue.replace(/\D/g, "");

      const numberWithoutPrefix = cleanedValue.startsWith("91")
        ? cleanedValue.slice(2)
        : cleanedValue;

      if (numberWithoutPrefix.length !== 10) {
        return "Phone number must be exactly 10 digits";
      }
    }

    return undefined;
  };

  const fieldProps = useField({
    type: "text",
    validate: formatter?.includes("+91") ? validatePhoneNumber : validate,
    validateOn,
    showErrorIfError,
    formatter,
    ...props,
  });

  return {
    ...fieldProps,
    isPhoneInput: formatter?.includes("+91"),
  };
};