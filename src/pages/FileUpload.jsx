import React, { useState } from "react";

const FileUpload = () => {
  const [formValues, setFormValues] = useState({
    file: null,
    options: [],
  });

  const handleFileChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setFormValues((prev) => {
      if (checked) {
        return { ...prev, options: [...prev.options, value] };
      } else {
        return {
          ...prev,
          options: prev.options.filter((option) => option !== value),
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", formValues);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">File Upload & Checkbox Form</h1>
      <form onSubmit={handleSubmit}>
        {/* File Upload */}
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="file">
            Upload File:
          </label>
          <input
            id="file"
            type="file"
            className="border rounded px-2 py-1 w-full"
            onChange={handleFileChange}
          />
        </div>

        {/* Multiple Checkboxes */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Select Options:</label>
          <div>
            <input
              type="checkbox"
              id="option1"
              value="option1"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="option1" className="ml-2">
              Option 1
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="option2"
              value="option2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="option2" className="ml-2">
              Option 2
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="option3"
              value="option3"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="option3" className="ml-2">
              Option 3
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
