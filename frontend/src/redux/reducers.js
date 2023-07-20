// reducers.js
import { LOGIN_SUCCESS, LOGOUT } from "./types";

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case LOGOUT:
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};

export default authReducer;
