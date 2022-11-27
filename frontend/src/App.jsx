import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>Welcome</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/books" element={<Login />} /> */}
      </Routes>
    </div>
  );
}

export default App;
