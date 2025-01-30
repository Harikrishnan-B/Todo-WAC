import React from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import useAddressValidate from "../hooks/useAddressValidate";
import { Data } from "../statesData.js";
import "../assets/AddressForm.css";

function AddressForm() {
  const {
    formData,
    handleChange,
    handleSubmit,
    handleFileChange,
    errors,
    districts,
    selectedOptions,
    previewImage, // Import previewImage
  } = useAddressValidate(Data);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4 text-light font-weight-bold">
        Address Form
      </h1>
      <Form onSubmit={handleSubmit}>
        {/* First Name */}
        <Row className="mb-3">
          <Col>
            <Form.Label className="text-light">First Name</Form.Label>
            <FloatingLabel
              controlId="formFirstName"
              className="text-dark"
              label="Enter first name"
            >
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>

        {/* Last Name */}
        <Row className="mb-3">
          <Col>
            <Form.Label className="text-light">Last Name</Form.Label>
            <FloatingLabel
              controlId="formLastName"
              className="text-dark"
              label="Enter last name"
            >
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>

        {/* Phone Number */}
        <Row className="mb-3">
          <Col>
            <Form.Label className="text-light">Phone Number</Form.Label>
            <FloatingLabel controlId="formPhone" className="text-dark">
              <InputGroup className="custom-input-group">
                <InputGroup.Text className="custom-input-group-text">
                  +91
                </InputGroup.Text>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                  className="custom-form-control"
                />
              </InputGroup>
            </FloatingLabel>
            {errors.phone && (
              <div className="text-danger mt-1">{errors.phone}</div>
            )}
          </Col>

          {/* Street */}
          <Col>
            <Form.Label className="text-light">Street</Form.Label>
            <FloatingLabel
              controlId="formStreet"
              className="text-dark"
              label="Enter street"
            >
              <Form.Control
                type="text"
                placeholder="Enter street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                isInvalid={!!errors.street}
              />
              <Form.Control.Feedback type="invalid">
                {errors.street}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>

        {/* State and District Dropdown */}
        <Row className="mb-3">
          <Col>
            <Form.Label className="text-light">State</Form.Label>
            <FloatingLabel controlId="formState" className="text-dark">
              <Form.Control
                as="select"
                name="state"
                value={formData.state}
                onChange={handleChange}
                style={{ paddingTop: "17px" }}
              >
                <option value="">Select state</option>
                {Data.states.map((stateObj, index) => (
                  <option key={index} value={stateObj.state}>
                    {selectedOptions.states.has(stateObj.state) ? "✔ " : ""}
                    {stateObj.state}
                  </option>
                ))}
              </Form.Control>
            </FloatingLabel>
          </Col>

          <Col>
            <Form.Label className="text-light">District</Form.Label>
            <FloatingLabel controlId="formDistrict" className="text-dark">
              <Form.Control
                as="select"
                name="district"
                value={formData.district}
                onChange={handleChange}
                disabled={!formData.state}
                style={{ paddingTop: "17px" }}
              >
                <option value="">Select district</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {selectedOptions.districts.has(district) ? "✔ " : ""}
                    {district}
                  </option>
                ))}
              </Form.Control>
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label className="text-light">City</Form.Label>
            <FloatingLabel
              controlId="formCity"
              className="text-dark"
              label="Enter city"
            >
              <Form.Control
                type="text"
                placeholder="Enter city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col>
            <Form.Label className="text-light">Pincode</Form.Label>
            <FloatingLabel
              controlId="formPincode"
              className="text-dark"
              label="Enter pincode"
            >
              <Form.Control
                type="text"
                placeholder="Enter pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                isInvalid={!!errors.pincode}
              />
              <Form.Control.Feedback type="invalid">
                {errors.pincode}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label className="text-light">Country</Form.Label>
            <FloatingLabel
              controlId="formCountry"
              className="text-dark"
              label="Select country"
            >
              <Form.Control
                as="select"
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="India">India</option>
              </Form.Control>
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label className="text-light">Message</Form.Label>
            <FloatingLabel
              controlId="formMessage"
              className="text-dark"
              label="Enter your message"
            >
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                isInvalid={!!errors.message}
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>

        {/* File Upload */}
        <Row className="mb-3">
          <Col>
            <Form.Label className="text-light">Upload File</Form.Label>
            <Form.Control
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              isInvalid={!!errors.file}
            />
            <Form.Control.Feedback type="invalid">
              {errors.file}
            </Form.Control.Feedback>
            <small className="text-light">
              Allowed formats: JPG, PNG, WEBP | Max size: 5MB
            </small>
          </Col>
        </Row>

        {/* Image Preview */}
        {previewImage && (
          <Row className="mb-3">
            <Col>
              <Form.Label className="text-light">Image Preview</Form.Label>
              <img
                src={previewImage}
                alt="Image Preview"
                width={200}
                height={200}
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
            </Col>
          </Row>
        )}

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default AddressForm;
