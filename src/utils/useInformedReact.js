import { Form } from "informed";
import { Data } from "../statesData";

export const useInformedForm = (t) => {
  const stateOptions = Data.states.map((state) => ({
    value: state.state,
    label: state.state,
  }));

  const getDistrictOptions = (state) => {
    if (!state) return [];
    const stateData = Data.states.find((item) => item.state === state);
    return stateData
      ? stateData.districts.map((district) => ({
          value: district,
          label: district,
        }))
      : [];
  };

  const handleStateChange = (formApi, selectedOption) => {
    if (!selectedOption) {
      formApi.setValue("state", "");
      formApi.setValue("district", "");
      return;
    }

    formApi.setValue("state", selectedOption.value);
    formApi.setValue("district", "");
    formApi.setValue(
      "districtOptions",
      getDistrictOptions(selectedOption.value)
    );
  };

  const validateName = (value, fieldName) => {
    if (!value || !value.trim()) {
      return t("required");
    }
    if (/[^a-zA-Z\s]/.test(value.trim())) {
      return t("lettersOnly");
    }
    return undefined;
  };

  const validatePhone = (value) => {
    if (!value) return t("required");
    const cleanedValue = value.toString().replace(/\D/g, "");

    const finalValue = cleanedValue.startsWith("91")
      ? cleanedValue.slice(2)
      : cleanedValue;

    if (finalValue.length === 10) {
      return undefined;
    }
    return t("phoneValidation");
  };

  const validatePincode = (value) => {
    if (!value) return t("required");
    if (!/^\d{6}$/.test(value)) return t("pincodeValidation");
    return undefined;
  };

  const validateMessage = (value) => {
    if (!value) return undefined;
    if (value.trim().length < 5) return t("messageLength");
    return undefined;
  };

  const checkRequiredFields = (values) => {
    const requiredFields = [
      "firstName",
      "lastName",
      "street",
      "city",
      "phoneNumber",
      "pincode",
      "state",
      "district",
      "terms",
      "privacy",
    ];

    return requiredFields.every((field) => values[field]);
  };

  const formatPhoneNumber = (phoneNumber) => {
    let cleaned = phoneNumber.toString().replace(/\D/g, "");
    if (cleaned.startsWith("91")) {
      cleaned = cleaned.slice(2);
    }
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return cleaned;
  };


  
  const validateField = (fieldName, value, values) => {
    switch (fieldName) {
      case "firstName":
      case "lastName":
        return validateName(value);
      case "phoneNumber":
        return validatePhone(value);
      case "pincode":
        return validatePincode(value);
      case "message":
        return validateMessage(value);
      case "state":
      case "district":
      case "street":
      case "city":
        return !value ? t("required") : undefined;
      case "terms":
      case "privacy":
        return !value ? t("termsRequired") : undefined;
      case "preferredLocations":
        return !Object.values(values.preferredLocations || {}).some(Boolean)
          ? t("preferencesRequired")
          : undefined;
      default:
        return undefined;
    }
  };
  
  const formatField = (fieldName, value) => {
    switch (fieldName) {
      case "phoneNumber":
        return formatPhoneNumber(value);
      case "pincode":
        return value.replace(/\D/g, "").slice(0, 6);
      case "firstName":
      case "lastName":
        return value.replace(/[^a-zA-Z\s]/g, "");
      default:
        return value;
    }
  };



  
  const handleSubmit = (formState, formApi) => {
    const { values } = formState;
  
    // Order of fields before logging
    const orderedFields = [
      "firstName",
      "lastName",
      "street",
      "city",
      "phoneNumber",
      "pincode",
      "state",
      "district",
      "terms",
      "privacy",
    ];
  
    const orderedValues = {};
    orderedFields.forEach(field => {
      orderedValues[field] = values[field];
    });
  
    // Skip error messages for empty submissions
    if (!checkRequiredFields(values)) {
      formApi.validate();
      return;
    }
  
    const errors = formState.errors;
  
    if (Object.keys(errors || {}).length > 0) {
      return;
    }
  
    // Format phone number
    let phoneNumber = values.phoneNumber || "";
    phoneNumber = formatPhoneNumber(phoneNumber);
  
    // Get the selected preferred locations
    const selectedLocations = Object.keys(values.preferredLocations)
      .filter(location => values.preferredLocations[location]) // Filter out false values
      .map(location => location); // Get the location names that are selected
  
    // Include selected locations in the final submission
    const orderedSubmissionValues = { ...orderedValues, phoneNumber, selectedLocations };
  
    console.log(
      "Form submitted successfully:",
      JSON.stringify(orderedSubmissionValues, null, 2)
    );
  
    formApi.reset({
      country: "India",
      districtOptions: [],
      preferredLocations: {
        newYork: false,
        london: false,
        singapore: false,
        tokyo: false
      },
      terms: false,
      privacy: false,
    });
  
    return orderedSubmissionValues;
  };
  



  const resetForm = (formApi) => {
    formApi.reset({
      country: "India",
      districtOptions: [],
      preferredLocations: {
        newYork: false,
        london: false,
        singapore: false,
        tokyo: false
      },
      terms: false,
      privacy: false,
    });
  };

  return {
    stateOptions,
    handleStateChange,
    validateName,
    validatePhone,
    validatePincode,
    validateMessage,
    validateField,
    formatField,
    formatPhoneNumber,
    handleSubmit,
    getDistrictOptions,
    checkRequiredFields,
    resetForm
  };
};