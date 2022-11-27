import { createContext } from "react";
import { useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    comments: "",
    newsletter: true,
  });

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("hello");
  }

  const exportData = { userData, setUserData, handleChange, handleSubmit };
  return (
    <UserContext.Provider value={exportData}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
