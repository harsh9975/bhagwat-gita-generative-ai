import React from "react";
import "./Button.css";

const Button = ({ label, onClick, style }) => {
  return (
    <div style={style} className="button-div">
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

export default Button;
