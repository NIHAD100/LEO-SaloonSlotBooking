import React from "react";
import Login from "../../assets/Login.jpg";

function SignImageSection() {
  return (
    <div className="hidden sm:block md:w-3/6">
      <img src={Login} alt="" />
    </div>
  );
}

export default SignImageSection;
