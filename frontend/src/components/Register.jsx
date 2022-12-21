import React from "react";
import { useContext } from "react";
import useUser, { UserContext } from "../hooks/userContext";
import { useState } from "react";

function Register() {
  const user = useUser();

  const { errors, status } = useContext(UserContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    birthday: "",
    address: "",
    favMusic: "",
    // comments: "",
    // newsletter: true,
  });

  //  errors sollen sein: [password: password to weak]
  const [error, setError] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  // const [isRegistered, setIsRegistered] = useState(false);

  //  CHANGE WHILE TYPING TO INPUT FIELDS
  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
        // [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  //  SUBMIT
  // async function handleSubmit(e) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("name", userData.name);
    console.log("mail", userData.email);
    console.log("password", userData.password);
    const success = await user.register(
      userData.name,
      userData.email,
      userData.password,
      userData.birthday,
      userData.address,
      userData.favMusic
    );

    if (!success) setError(true);
    if (success) setShowStatus(true);
  };
  console.log(status);
  console.log(!error);

  return (
    <div>
      <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
        {/* <label htmlFor="name">Your Name</label> */}
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          value={userData.name}
          onChange={handleChange}
        />
        {/* <label htmlFor="email">Your Email</label> */}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          value={userData.email}
          onChange={handleChange}
        />
        {/* <label htmlFor="password">Your Password</label> */}
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Your password"
          value={userData.password}
          onChange={handleChange}
        />
        {/* <label htmlFor="password">Your Password</label> */}
        <input
          type="date"
          name="birthday"
          id="birthday"
          placeholder="Your birthday"
          value={userData.birthday}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Your address"
          value={userData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="favMusic"
          id="favMusic"
          placeholder="Your favorite Music"
          //    enum: dropdown???
          value={userData.favMusic}
          onChange={handleChange}
        />
        <button>Send</button>
        {error && <p className="error">{errors}</p>}
        {showStatus && <p className="error">{status}</p>}
      </form>
    </div>
  );
}

export default Register;
