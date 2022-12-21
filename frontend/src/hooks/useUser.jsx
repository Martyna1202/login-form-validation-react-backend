// import { createContext } from "react";
// import { useState } from "react";

// const UserContext = createContext({
//   user: null,
//   loading: false,
//   register: async () => false, // 500
//   login: async () => false, // 500
//   logout: () => null,
// });

// const UserContextProvider = ({ children }) => {
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     comments: "",
//     newsletter: true,
//   });

//   const [loading, setLoading] = useState(true);
//   //  errors sollen sein: [password: password to weak]
//   const [errors, setErrors] = useState([]);
//   const [isRegistered, setIsRegistered] = useState(false);

//   //  CHANGE WHILE TYPING TO INPUT FIELDS
//   function handleChange(e) {
//     const { name, type, value, checked } = e.target;
//     setUserData((prev) => {
//       return {
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       };
//     });
//   }

//   //  SUBMIT
//   function handleSubmit(e) {
//     e.preventDefault();
//     console.log("name", userData.name);
//     console.log("mail", userData.email);
//     console.log("password", userData.password);
//   }

//   const exportData = { userData, setUserData, handleChange, handleSubmit };
//   return (
//     <UserContext.Provider value={exportData}>{children}</UserContext.Provider>
//   );
// };

// export { UserContext, UserContextProvider };
