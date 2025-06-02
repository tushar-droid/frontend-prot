import React from "react";
import "./GenerateButton.css";

const GenerateButton = () => {
  return (
    <button className="generate-button" aria-label="Generate">
      Generate
      <svg
        className="icon"
        viewBox="0 0 24 24"
        stroke="white"
        fill="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="lightning"
          d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
          fill="white"
          stroke="white"
          strokeWidth="1"
        />

        <circle
          className="particle particle1"
          cx="6"
          cy="8"
          r="1"
          fill="white"
        />
        <circle
          className="particle particle2"
          cx="18"
          cy="6"
          r="0.8"
          fill="white"
        />
        <circle
          className="particle particle3"
          cx="20"
          cy="12"
          r="1.2"
          fill="white"
        />
        <circle
          className="particle particle4"
          cx="4"
          cy="18"
          r="0.9"
          fill="white"
        />
        <circle
          className="particle particle5"
          cx="16"
          cy="20"
          r="0.7"
          fill="white"
        />
        <circle
          className="particle particle6"
          cx="8"
          cy="4"
          r="0.6"
          fill="white"
        />

        <circle className="spark spark1" cx="10" cy="7" r="0.4" fill="white" />
        <circle className="spark spark2" cx="14" cy="16" r="0.5" fill="white" />
        <circle className="spark spark3" cx="7" cy="12" r="0.3" fill="white" />
        <circle className="spark spark4" cx="17" cy="9" r="0.4" fill="white" />
      </svg>
    </button>
  );
};

export default GenerateButton;
