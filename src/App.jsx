

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";  
import TaskDatabase from "./pages/TaskDatabase";  
import TaskLocalStorage from "./pages/TaskLocalStorage";  
import StepScrolling from "./pages/StepScrolling";  
import InfiniteScrolling from "./pages/InfiniteScrolling"; 
import InfiniteScrollingSWR from "./pages/InfiniteScrollingSWR";  
import AddressForm from "./pages/AddressForm";
import InformedReact from "./pages/Informed_Components/InformedReact"
import FilterUI from "./pages/FilterPanel";
import FileUpload from "./pages/FileUpload.jsx";
import "./utils/i18n.js"



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Database" element={<TaskDatabase />} />
        <Route path="/localstorage" element={<TaskLocalStorage />} />
        <Route path="/StepScrolling" element={<StepScrolling />} />
        <Route path="/InfiniteScrolling" element={<InfiniteScrolling />} />
        <Route path="/InfiniteScrollingSWR" element={<InfiniteScrollingSWR />} />
        <Route path="/AddressForm" element={<AddressForm />} />
        <Route path="/InformedReact" element={<InformedReact />} />
        <Route path="/FilterUI" element={<FilterUI />} />
        <Route path="/FileUpload" element={<FileUpload />} />
      </Routes> 
    </Router>
  );
}

export default App;
