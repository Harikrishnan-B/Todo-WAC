import React, { useState } from 'react';  // Import useState
import { useFilters } from '../hooks/useFilters';
import SelectedFilters from './SelectedFilters';
import filtersData from '../urldata.json';
import "../assets/FilterPanel.css";

const FilterSection = ({ title, category, options, isChecked, handleFilterChange, activeFilter, setActiveFilter }) => {
  const [visibleItems, setVisibleItems] = useState(5); // Initially show only 5 items
  const [searchQuery, setSearchQuery] = useState("");  // State to hold the search input

  const handleLoadMore = () => {
    setVisibleItems((prevVisible) => prevVisible + 5); // Show 5 more items
  };

  const handleShowLess = () => {
    setVisibleItems(5); // Reset to showing only the first 5 items
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);  // Update the search query
  };

  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchQuery.toLowerCase()) // Filter options based on search query
  );

  const displayOptions = filteredOptions.slice(0, visibleItems); // Get the first 'visibleItems' filtered options

  const toggleFilter = () => {
    setActiveFilter(activeFilter === category ? null : category);  // Toggle between open and close
  };

  return (
    <div className="filter-section">
      <label htmlFor={`${category}-toggle`} className="dropdown-label" onClick={toggleFilter}>
        {title}
        <span className="dropdown-arrow">&#9660;</span>
      </label>
      <input type="checkbox" id={`${category}-toggle`} className="dropdown-toggle" checked={activeFilter === category} readOnly />
      <div className={`dropdown-content ${activeFilter === category ? 'open' : ''}`}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        {displayOptions.length > 0 ? (
          displayOptions.map((option) => (
            <div key={option.value} className="checkbox-container">
              <input
                type="checkbox"
                id={`${category}-${option.value}`}
                checked={isChecked(category, option.value)}
                onChange={() => handleFilterChange(category, option.value)}
              />
              <label htmlFor={`${category}-${option.value}`}>{option.label}</label>
            </div>
          ))
        ) : (
          <div className="no-items-found">No items found</div>  // Display when no items match the search query
        )}

        {visibleItems < filteredOptions.length ? (
          <button className="show-more-button" onClick={handleLoadMore}>
            Load More
          </button>
        ) : (
          <button className="show-more-button" onClick={handleShowLess}>
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

const FilterPanel = () => {
  const {
    handleFilterChange,
    isChecked,
    handleRemoveFilter,
    selectedFilters,
    clearAllFilters,  // Using clearAllFilters here
  } = useFilters(filtersData);

  const [activeFilter, setActiveFilter] = useState(null); // State for tracking active filter

  return (
    <div className="filter-panel-layout">
      <div className="filters-container">
        {Object.entries(filtersData).map(([category, options]) => (
          <FilterSection
            key={category}
            title={category.charAt(0).toUpperCase() + category.slice(1)}
            category={category}
            options={options}
            isChecked={isChecked}
            handleFilterChange={handleFilterChange}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}  // Pass the activeFilter state and setter function
          />
        ))}
      </div>

      <div className="main-content">
        <div className="filter-panel-header">
          <h1 className="header-title">URL State</h1>
        </div>
        <div className="selected-filters">
          <h4>Selected Filters</h4>
          <div className="selected-filters-row">
            <SelectedFilters
              selectedFilters={selectedFilters()}
              handleRemoveFilter={handleRemoveFilter}
            />
          </div>
        </div>

        <div className="clear-all-container">
          <button className="clear-all-button" onClick={clearAllFilters}>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
