


import { useField } from "informed";

export const useFormSelect = ({
  name,
  validate,
  validateOn,
  showErrorIfError,
  options,
  onChange
}) => {
  const { fieldState, fieldApi } = useField({
    name,
    validate,
    validateOn,
    showErrorIfError
  });

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: fieldState.showError ? 'red' : (state.isFocused ? '#2684FF' : '#ccc'),
      boxShadow: fieldState.showError ? '0 0 0 1px red' : base.boxShadow,
      '&:hover': {
        borderColor: fieldState.showError ? 'red' : (state.isFocused ? '#2684FF' : '#ccc')
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      zIndex: 2
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      padding: '0',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? '#2684FF' 
        : (state.isFocused ? '#f0f0f0' : '#fff'),
      color: state.isSelected ? 'white' : 'black',
      '&:active': {
        backgroundColor: state.isSelected ? '#2684FF' : '#e0e0e0'
      },
      '&:hover': {
        backgroundColor: state.isSelected ? '#2684FF' : '#f0f0f0'
      }
    }),
    input: (provided) => ({
      ...provided,
      color: 'black'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black'
    })
  };

  const handleChange = (selectedOption) => {
    fieldApi.setValue(selectedOption ? selectedOption.value : '');
    if (onChange) {
      onChange(selectedOption);
    }
  };

  const selectedOption = options?.find(opt => opt.value === fieldState.value) || null;

  return {
    fieldState,
    customStyles,
    handleChange,
    selectedOption
  };
};