import { useSearchParams } from 'react-router-dom';

export const useFilters = (filtersData) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (category, value) => {
    const currentParams = new URLSearchParams(searchParams);
    const currentValues = currentParams.getAll(category);

    if (currentValues.includes(value)) {
      const newValues = currentValues.filter(v => v !== value);
      currentParams.delete(category);
      newValues.forEach(v => currentParams.append(category, v));
    } else {
      currentParams.append(category, value);
    }

    setSearchParams(currentParams);
  };

  const isChecked = (category, value) => {
    return searchParams.getAll(category).includes(value);
  };
 
  const handleRemoveFilter = (category, value) => {
    const currentParams = new URLSearchParams(searchParams);
    const currentValues = currentParams.getAll(category);
    const newValues = currentValues.filter(v => v !== value);
    
    currentParams.delete(category);
    newValues.forEach(v => currentParams.append(category, v));

    setSearchParams(currentParams);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchParams({});
  };

  const selectedFilters = () => {
    const selectedFiltersList = [];
    Object.entries(filtersData).forEach(([category, options]) => {
      options.forEach(option => {
        if (isChecked(category, option.value)) {
          selectedFiltersList.push({ category, label: option.label, value: option.value });
        }
      });
    });

    return selectedFiltersList;
  };

  return {
    searchParams,
    handleFilterChange,
    isChecked,
    handleRemoveFilter,
    selectedFilters,
    clearAllFilters // Returning the clearAllFilters function
  };
};
