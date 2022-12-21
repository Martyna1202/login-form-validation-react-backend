import React from "react";
import { useContext } from "react";
import { UserContext } from "../hooks/userContext";

function Overview() {
  const user = useContext(UserContext);
  console.log(user.user);
  return (
    <div>
      <h1>Your User data</h1>
      {<h2>user.user</h2>}
    </div>
  );
}

export default Overview;
