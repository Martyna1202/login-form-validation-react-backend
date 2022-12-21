import { Route, Routes } from "react-router-dom";
import "./App.css";
import Account from "./components/Account";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Overview from "./components/Overview";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>Welcome</h1>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
