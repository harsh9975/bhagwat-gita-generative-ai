// Login.js
import React, { useState } from "react";
import "./Signup.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { isValidEmail, isValidPassword } from "../../utils";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const Login = () => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [name, setName] = useState({ value: "", error: "" });
  const [username, setUserName] = useState({ value: "", error: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.value === "") {
      setEmail({ value: "", error: "Please enter email" });
    } else if (email.value !== "" && !isValidEmail(email.value)) {
      setEmail({ value: "", error: "Please enter valid email" });
    }
    if (password.value === "") {
      setPassword({ value: "", error: "Please enter password" });
    } else if (password.value !== "" && !isValidPassword(password.value)) {
      setPassword({ value: "", error: "Please enter valid password" });
    }

    if (name.value === "") {
      setName({ value: "", error: "Please enter name" });
    }

    if (username.value === "") {
      setUserName({ value: "", error: "Please enter username" });
    }

    // Perform login validation here (e.g., API call or local validation)
    if (
      email.value !== "" &&
      password.value !== "" &&
      isValidEmail(email.value) &&
      isValidPassword(password.value) &&
      name.value !== "" &&
      username.value !== ""
    ) {
      let data = {
        email: email.value,
        password: password.value,
        username: username.value,
        first_name: name.value,
      };
      api
        .post("/users/create", data)
        .then((response) => {
          console.log("navigate", response.data);
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      console.log("Logged in successfully!", data);
    } else {
      console.log("Invalid email or password!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Signup</h2>
        <Input
          label="Name"
          type="text"
          onChange={(e) => setName({ value: e.target.value, error: "" })}
          error={name.error}
          placeholder="Enter name"
        />
        <Input
          label="Username"
          type="text"
          onChange={(e) => setUserName({ value: e.target.value, error: "" })}
          error={username.error}
          placeholder="Enter username"
        />
        <Input
          label="Email"
          type="email"
          onChange={(e) => setEmail({ value: e.target.value, error: "" })}
          error={email.error}
          placeholder="Enter email"
        />
        <Input
          label="Password"
          type="password"
          onChange={(e) => setPassword({ value: e.target.value, error: "" })}
          error={password.error}
          placeholder="Enter password"
        />
        <Link to="/login">Already have an Account</Link>
        <Button
          label={"Create Account"}
          style={{ marginTop: "10px" }}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
