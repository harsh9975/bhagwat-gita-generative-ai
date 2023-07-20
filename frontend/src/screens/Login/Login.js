// Login.js
import React, { useState } from "react";
import "./Login.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { isValidEmail, isValidPassword } from "../../utils";
import api from "../../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
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

    // Perform login validation here (e.g., API call or local validation)
    if (
      email.value !== "" &&
      password.value !== "" &&
      isValidEmail(email.value) &&
      isValidPassword(password.value)
    ) {
      // let data = {
      //   username: email.value,
      //   password: password.value,
      // };

      // Create a new FormData object and add the form fields
      const formData = new FormData();
      formData.append("username", email.value);
      formData.append("password", password.value);

      api
        .post("/auth/login", formData)
        .then((response) => {
          console.log(response.data);
          const { access_token, refresh_token } = response.data;
          dispatch(loginSuccess(access_token, refresh_token));
          navigate("/chat");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      console.log("Invalid email or password!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <Input
          label="Email"
          type="email"
          onChange={(e) => setEmail({ value: e.target.value, error: "" })}
          error={email.error}
          placeholder="Please enter email"
        />
        <Input
          label="Password"
          type="password"
          onChange={(e) => setPassword({ value: e.target.value, error: "" })}
          error={password.error}
          placeholder="Please enter password"
        />
        <Link to="/signup">Create Account</Link>
        <Button
          style={{ marginTop: "10px" }}
          label={"Login"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
