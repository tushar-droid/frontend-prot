import React, { useEffect, useState } from "react";
import "./maxLimitToast.css"; // We'll define styles separately

const MaxLimitToast = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000); // auto-close after 4s
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="toast">
      <svg
        className="toast-icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <path d="M12 8v4" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
      <span className="toast-message">You can only add up to 5 elements.</span>
    </div>
  );
};

export default MaxLimitToast;
