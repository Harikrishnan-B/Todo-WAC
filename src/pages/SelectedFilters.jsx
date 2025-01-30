
import React from 'react';

const SelectedFilters = ({ selectedFilters, handleRemoveFilter }) => {
  return selectedFilters.map((filter) => (
    <div
      key={`${filter.category}-${filter.value}`}
      className="filter-tag"
    >
      {filter.label}
      <button onClick={() => handleRemoveFilter(filter.category, filter.value)}>
        &#x2715;
      </button>
    </div>
  ));
};

export default SelectedFilters;