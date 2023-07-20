import React, { useEffect } from "react";
import "./Homepage.css";
import gsap from "gsap";
import Button from "../../components/Button/Button";

const Homepage = () => {
  useEffect(() => {
    gsap.from(".hero-content h1", { opacity: 0, y: -50, duration: 1 });
    gsap.from(".hero-content h2", { opacity: 0, y: -50, duration: 1 });
    gsap.from(".hero-content button", { opacity: 0, y: -50, duration: 1 });
    gsap.from(".hero-image", { opacity: 0, x: 100, duration: 1 });
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>A New Way to Access the Wisdom of the Gita</h1>
        <h2>
          The Bhagavad Gita, an essential Hindu scripture, provides guidance on
          various aspects of life, from spirituality to daily living. Yet,
          understanding it can be tough, especially when seeking specific
          answers. Enter Bhagavad Gita GPT, an AI model designed to generate
          Gita-based responses to your questions. Just type your query, and get
          insightful answers instantly.
        </h2>

        {/* <button>Get Started</button> */}
        <Button label="Explore Now" />
      </div>
      <div className="hero-image"></div>
    </div>
  );
};

export default Homepage;
