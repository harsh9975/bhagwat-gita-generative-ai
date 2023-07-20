// actions.js
import { LOGIN_SUCCESS, LOGOUT } from "./types";

export const loginSuccess = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return {
    type: LOGIN_SUCCESS,
    payload: { accessToken, refreshToken },
  };
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  return { type: LOGOUT };
};
