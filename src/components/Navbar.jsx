import React from "react";
import { Link } from "react-router-dom"; // for linking to routes
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure Bootstrap CSS is included

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Brand name with Home route */}
        <Link className="navbar-brand" to="/">
          My Todos
        </Link>

        {/* Dropdown for navigation */}
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Todo App Navigation
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {/* Home route */}
            <Dropdown.Item as={Link} to="/">
              Home
            </Dropdown.Item>

            {/* Other routes */}
            <Dropdown.Item as={Link} to="/Database">
              Task Database
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/localstorage">
              LocalStorage
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/StepScrolling">
              Step Scrolling
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/InfiniteScrolling">
              Infinite Scrolling
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/InfiniteScrollingSWR">
              Infinite Scrolling SWR
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/AddressForm">
              Address Form
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/InformedReact">
              Informed React
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/FilterUI">
            FilterUI
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/FileUpload">
            FileUpload
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
}

export default Navbar;
