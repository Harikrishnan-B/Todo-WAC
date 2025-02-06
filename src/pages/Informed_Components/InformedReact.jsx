
import React from "react";
import { Form, Checkbox } from "informed";
import { useTranslation } from "react-i18next";
import { useInformedForm } from "../../utils/useInformedReact.js";
import FormFieldInformed from "./FormFieldInformed.jsx";
import FormSelectInformed from "./FormSelectInformed.jsx";
import "../../assets/InformedReact.css";

const InformedReact = () => {
  const { t, i18n } = useTranslation();
  const {
    stateOptions,
    handleStateChange,
    validateField,
    validatePhone,
    handleSubmit,
  } = useInformedForm(t);          

  const validateTerms = (value) => {
    if (!value) {
      return t("termsRequired");
    }
  };

  const validatePreferences = (formState) => {
    const preferences = formState.values.preferences || {};
    if (!Object.values(preferences).some((value) => value)) {
      return t("preferencesRequired");
    }
  };

  return (
    <div className="form-container">
      <div
        className="language-selector"
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          justifyContent: "flex-start",
        }}
      >
        <button
          onClick={() => i18n.changeLanguage("en")}
          style={{
            padding: "8px 16px",
            backgroundColor: i18n.language === "en" ? "#4a90e2" : "#ffffff",
            color: i18n.language === "en" ? "#ffffff" : "#000000",
            border: "1px solid #4a90e2",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          English
        </button>
        <button
          onClick={() => i18n.changeLanguage("ta")}
          style={{
            padding: "8px 16px",
            backgroundColor: i18n.language === "ta" ? "#4a90e2" : "#ffffff",
            color: i18n.language === "ta" ? "#ffffff" : "#000000",
            border: "1px solid #4a90e2",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          தமிழ்
        </button>
      </div>
      <h2>{t("addressForm")}</h2>
      <Form
        initialValues={{
          country: "India",
          districtOptions: [],
          preferences: {
            newsletter: false,
            updates: false,
            marketing: false,
          },
        }}
      >
        {({ formApi, formState }) => (
          <>
            {/* Personal Information */}
            <div className="form-row" style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <FormFieldInformed
                  name="firstName"
                  label={t("firstName")}
                  validate={(value) => validateField("firstName", value)}
                  validateOn="change"
                  showErrorIfError
                />
              </div>
              <div style={{ flex: 1 }}>
                <FormFieldInformed
                  name="lastName"
                  label={t("lastName")}
                  validate={(value) => validateField("lastName", value)}
                  validateOn="change"
                  showErrorIfError
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="form-row" style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <FormFieldInformed
                  name="phoneNumber"
                  label={t("phoneNumber")}
                  validateOn="change"
                  formatter="+91  #### ## ####"
                  validate={(value) => validatePhone(value, t)}
                  showErrorIfError
                />
              </div>
              <div style={{ flex: 1 }}>
                <FormFieldInformed
                  name="pincode"
                  label={t("pincode")}
                  validate={(value) =>
                    !/^\d{6}$/.test(value) ? t("pincodeValidation") : undefined
                  }
                  validateOn="change"
                  showErrorIfError
                  maxLength={6}
                />
              </div>
            </div>

            {/* Address Fields */}
            <FormFieldInformed
              name="street"
              label={t("street")}
              validate={(value) => (!value ? t("required") : undefined)}
              validateOn="change"
              showErrorIfError
            />

            <div className="form-row" style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <FormFieldInformed
                  name="city"
                  label={t("city")}
                  validate={(value) => (!value ? t("required") : undefined)}
                  validateOn="change"
                  showErrorIfError
                />
              </div>
              <div style={{ flex: 1 }}>
                <FormSelectInformed
                  name="state"
                  label={t("state")}
                  options={stateOptions}
                  onChange={(value) => handleStateChange(formApi, value)}
                  validate={(value) => (!value ? t("required") : undefined)}
                  validateOn="change"
                  showErrorIfError
                />
              </div>
            </div>

            <div className="form-row" style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <FormSelectInformed
                  name="district"
                  label={t("district")}
                  options={formState.values.districtOptions || []}
                  validateOn="change"
                  showErrorIfError
                  validate={(value) => (!value ? t("required") : undefined)}
                />
              </div>
              <div style={{ flex: 1 }}>
                <FormSelectInformed
                  name="country"
                  label={t("country")}
                  options={[{ value: "India", label: "India" }]}
                  showErrorIfError
                  defaultValue="India"
                  validateOn="change"
                />
              </div>
            </div>

            <FormFieldInformed
              name="message"
              label={t("message")}
              validate={(value) =>
                value && value.trim().length < 5
                  ? t("messageLength")
                  : undefined
              }
              validateOn="change"
            />

            <div className="checkbox-section" style={{ marginTop: "20px" }}>
              <h3>{t("termsAndConditions")}</h3>
              <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
                <Checkbox
                  name="terms"
                  label={t("acceptTerms")}
                  validate={(value) =>
                    !value ? t("termsRequired") : undefined
                  }
                  validateOn="change"
                />
                <Checkbox
                  name="privacy"
                  label={t("acceptPrivacy")}
                  validate={(value) =>
                    !value ? t("termsRequired") : undefined
                  }
                  validateOn="change"
                />
              </div>

              {(formState.errors?.terms || formState.errors?.privacy) && (
                <span
                  style={{ color: "red", display: "block", marginTop: "5px" }}
                >
                  {t("termsRequired")}
                </span>
              )}
            </div>

            <div className="checkbox-section" style={{ marginTop: "20px" }}>
              <h3>{t("PreferredLocations")}</h3>
              <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
                {["New York", "London", "Singapore", "Tokyo"].map((city) => (
                  <Checkbox
                    key={city} // Unique key for React
                    name={`preferredLocations.${city.toLowerCase()}`} // Convert name to lowercase for form handling
                    label={city} // Display name
                    validateOn="change"
                  />
                ))}
              </div>
              {formState.errors?.preferredLocations && (
                <span
                  style={{ color: "red", display: "block", marginTop: "5px" }}
                >
                  {t("preferencesRequired")}
                </span>
              )}
            </div>

            <div className="button-container" style={{ marginTop: "20px" }}>
              <button
                type="button"
                className="submit-button"
                onClick={() => {
                  formApi.validate(); // Trigger validation

                  if (Object.keys(formState.errors || {}).length > 0) {
                    console.error("Validation errors:", formState.errors);
                    return;
                  }

                  const submittedValues = handleSubmit(formState, formApi);
                  if (submittedValues) {
                    console.log("Final Form Submission Data:", submittedValues);
                  }
                }}
              >
                {t("submit")}
              </button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};

export default InformedReact;
