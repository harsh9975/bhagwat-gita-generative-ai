import React, { useState } from "react";
import "./Input.css";
import showIcon from "../../assets/show-svgrepo-com.svg";
import hideIcon from "../../assets/hide-svgrepo-com.svg";

const Input = ({
  style,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div style={style} className="input-container">
      <label>{label}</label>
      <div style={{ width: "100%", position: "relative" }}>
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        ></input>
        {type === "password" ? (
          showPassword ? (
            <img
              src={showIcon}
              className="input-icon"
              alt=""
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <img
              src={hideIcon}
              className="input-icon"
              alt=""
              onClick={() => setShowPassword(true)}
            />
          )
        ) : null}
      </div>

      {error ? <p className="error-text">{error}</p> : null}
    </div>
  );
};

export default Input;
