

import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { ButtonGroup, ToggleButton } from "react-bootstrap"; // Importing Bootstrap's button group and toggle button
import "../assets/Home.css"; // Import your custom styles

function Home() {
  return (
    <div className="home-container">
      <h1 className="page-title">My Todos</h1>

      <ButtonGroup vertical className="button-container">
        {/* Navigation buttons as toggle buttons */}
        <Link to="/Database">
          <ToggleButton
            className="navigate-btn"
            type="radio"
            name="options"
            value="1"
          >
            Database
          </ToggleButton>
        </Link>
        <Link to="/localstorage">
          <ToggleButton
            className="navigate-btn"
            type="radio"
            name="options"
            value="2"
          >
            LocalStorage
          </ToggleButton>
        </Link>
        <Link to="/StepScrolling">
          <ToggleButton
            className="navigate-btn"
            type="radio"
            name="options"
            value="3"
          >
            Step Scrolling
          </ToggleButton>
        </Link>
        <Link to="/InfiniteScrolling">
          <ToggleButton
            className="navigate-btn"
            type="radio"
            name="options"
            value="4"
          >
            Infinite Scrolling
          </ToggleButton>
        </Link>
        <Link to="/InfiniteScrollingSWR">
          <ToggleButton
            className="navigate-btn"
            type="radio"
            name="options"
            value="5"
          >
            Infinite Scrolling SWR
          </ToggleButton>
        </Link>
        <Link to="/AddressForm">
          <ToggleButton
            className="navigate-btn"
            type="radio"
            name="options"
            value="5"
          >
            Address Form
          </ToggleButton>
        </Link>
        <Link to="/InformedReact">
          <ToggleButton
            className="navigate-btn"
            type="radio"
            name="options"
            value="5"
          >
            Informed React
          </ToggleButton>
        </Link>
        <Link to="/FilterUI">
          <ToggleButton
            className="navigate-btn"
            type="radio"
            name="options"
            value="5"
          >
            FilterUI
          </ToggleButton>
        </Link>
        <Link to="/InformedFormat">
          <ToggleButton
            className="navigate-btn"
            type="radio"
            name="options"
            value="5"
          >
            Informed Format
          </ToggleButton>
        </Link>
      </ButtonGroup>
    </div>
  );
}

export default Home;
