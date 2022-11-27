import React, { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../useContext/userContext";

function Login() {
  const { handleChange, handleSubmit, userData, setUserData } =
    useContext(UserContext);

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
        <input
          type="text"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="confirm password"
          value={userData.confirmPassword}
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
      </form>
    </div>
  );
}

export default Login;
