import React, { useEffect, useState } from "react";
import "./noItemsDroppedToast.css";

const NoItemsDroppedToast = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000); // auto-close after 3s
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
      <span className="toast-message">
        Please Drop at least 1 item to generate an image.
      </span>
    </div>
  );
};

export default NoItemsDroppedToast;
