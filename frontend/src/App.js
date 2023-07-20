import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Chat from "./screens/Chat/Chat";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import Homepage from "./screens/Homepage/Homepage";
import "./App.css";

// Mock function to check if the user is logged in
const isLoggedIn = () => {
  const accessToken = localStorage.getItem("accessToken");
  return !!accessToken;
};

// Higher-order component to protect the Chat component
const ProtectedChat = () => {
  return isLoggedIn() ? <Chat /> : <Navigate to="/login" replace />;
};

// Function to render Login component only if the user is not logged in
const RenderLogin = () => {
  return isLoggedIn() ? <Navigate to="/chat" replace /> : <Login />;
};

// Function to render Signup component only if the user is not logged in
const RenderSignup = () => {
  return isLoggedIn() ? <Navigate to="/chat" replace /> : <Signup />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/login" element={<RenderLogin />} />
          <Route path="/signup" element={<RenderSignup />} />
          <Route path="/chat" element={<ProtectedChat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
