import { useState, useEffect } from "react";
import { Data } from "../statesData.js";

const useAddressValidate = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    district: "",
    country: "India", // Default country value
    pincode: "",
    message: "",
    file: null, // Store the uploaded file
  });

  const [previewImage, setPreviewImage] = useState(null); // Store preview URL
  const [errors, setErrors] = useState({});
  const [districts, setDistricts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    states: new Set(),
    districts: new Set(),
  });

  const nameRegex = /^[A-Za-z\s]*$/;
  const phoneRegex = /^[0-9]{10}$/;
  const pincodeRegex = /^[0-9]{6}$/;

  // Update districts when the state changes
  useEffect(() => {
    const selectedState = Data.states.find(
      (stateObj) => stateObj.state === formData.state
    );
    if (selectedState) {
      setDistricts(selectedState.districts);
    } else {
      setDistricts([]);
    }
  }, [formData.state]);

  // Field validation logic
  const validateFields = (fieldName, value) => {
    const errors = {};

    switch (fieldName) {
      case "firstName":
      case "lastName":
        if (!nameRegex.test(value)) {
          errors[fieldName] = "Only letters and spaces are allowed.";
        } else if (value.trim() === "") {
          errors[fieldName] = `${
            fieldName === "firstName" ? "First" : "Last"
          } name is required.`;
        }
        break;

      case "phone":
        if (value.length < 10) {
          errors.phone = "";
        } else if (!phoneRegex.test(value)) {
          errors.phone = "Enter a valid 10-digit phone number.";
        }
        break;

      case "pincode":
        if (!pincodeRegex.test(value)) {
          errors.pincode = "Pincode must be exactly 6 digits.";
        }
        break;

      case "street":
      case "city":
        if (value.trim() === "") {
          errors[fieldName] = `${
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          } is required.`;
        }
        break;

      default:
        break;
    }

    return errors;
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          file: "Only JPG, PNG, and WEBP formats are allowed.",
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB max size
        setErrors((prevErrors) => ({
          ...prevErrors,
          file: "File size must be less than 5MB.",
        }));
        return;
      }

      // Convert file to URL for preview
      const fileURL = URL.createObjectURL(file);
      setPreviewImage(fileURL);

      // Update formData
      setFormData((prevData) => ({
        ...prevData,
        file,
      }));

      // Clear errors
      setErrors((prevErrors) => ({
        ...prevErrors,
        file: "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const validationErrors = validateFields(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...validationErrors,
    }));

    // Update selected options for state and district
    if (name === "state") {
      setFormData((prevData) => ({
        ...prevData,
        district: "", // Reset district
      }));

      setSelectedOptions((prev) => ({
        ...prev,
        states: new Set([...prev.states, value]), // Add selected state
        districts: new Set(), // Reset districts
      }));
    }

    if (name === "district") {
      setSelectedOptions((prev) => ({
        ...prev,
        districts: new Set([...prev.districts, value]), // Add selected district
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const validationErrors = {
      ...validateFields("firstName", formData.firstName),
      ...validateFields("lastName", formData.lastName),
      ...validateFields("phone", formData.phone),
      ...validateFields("street", formData.street),
      ...validateFields("city", formData.city),
      ...validateFields("state", formData.state),
      ...validateFields("district", formData.district),
      ...validateFields("pincode", formData.pincode),
    };

    if (Object.values(validationErrors).some((error) => error !== "")) {
      setErrors(validationErrors);
      return;
    }


    const fieldOrder = [
      "firstName",
      "lastName",
      "phone",
      "street",
      "state",
      "district",
      "city",
      "pincode",
      "country",
      "message",
      "file"
    ];

    
    const orderedData = fieldOrder.map((field) => ({
      field,
      value: formData[field],
    }));
  
    console.log("Form Data in Order:");
    orderedData.forEach(({ field, value }) => {
      console.log(`${field}: ${value}`);
    });

    console.log("Form submitted successfully:", formData);

    // Reset form and selected options
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      district: "",
      country: "India",
      pincode: "",
      message: "",
      file: null, // Reset the file
    });

    setSelectedOptions({ states: new Set(), districts: new Set() });
    setErrors({});
    setPreviewImage(null); // Reset the image preview
  };

  return {
    formData,
    handleChange,
    handleFileChange,  // Ensure this is returned
    handleSubmit,
    errors,
    previewImage, // Return preview image state
    districts,
    selectedOptions,
  };
};

export default useAddressValidate;
