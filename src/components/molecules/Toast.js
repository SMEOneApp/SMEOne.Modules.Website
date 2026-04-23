import React, { useEffect, useState } from "react";
import "./Toast.css";

const VARIANTS = {
  success:   { icon: "✅", title: "You're on the list!" },
  duplicate: { icon: "👋", title: "Already registered!" },
  error:     { icon: "❌", title: "Something went wrong" },
};

const Toast = ({ type, message, onClose }) => {
  const [exiting, setExiting] = useState(false);
  const variant = VARIANTS[type] || VARIANTS.error;

  const dismiss = () => {
    setExiting(true);
    setTimeout(onClose, 240);
  };

  useEffect(() => {
    const timer = setTimeout(dismiss, 5000);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="toast-container">
      <div
        className={`toast toast--${type}${exiting ? " toast--exit" : ""}`}
        role="alert"
        aria-live="assertive"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <span className="toast__icon">{variant.icon}</span>
        <div className="toast__body">
          <p className="toast__title">{variant.title}</p>
          <p className="toast__message">{message}</p>
        </div>
        <button className="toast__close" onClick={dismiss} aria-label="Close">
          ✕
        </button>
        <div className="toast__progress" />
      </div>
    </div>
  );
};

export default Toast;
