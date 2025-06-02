import React from "react";
import "./ResetButton.css";
const ResetButton = () => {
  return (
    <button className="reset-button">
      <span className="icon" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          height="28"
          width="28"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v6h6M20 20v-6h-6M4 10a9 9 0 0115.5-5.5M20 14a9 9 0 01-15.5 5.5"
          />
        </svg>
      </span>
      Reset
    </button>
  );
};

export default ResetButton;
