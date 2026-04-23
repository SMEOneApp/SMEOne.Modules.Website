import React, { useEffect } from "react";
import "./WaitlistModal.css";

const VARIANTS = {
  success: {
    icon: "🎉",
    title: "You're on the list!",
    btnLabel: "Awesome, thanks!",
  },
  duplicate: {
    icon: "👋",
    title: "You're already registered!",
    btnLabel: "Got it!",
  },
  error: {
    icon: "😕",
    title: "Something went wrong",
    btnLabel: "Try again",
  },
};

const WaitlistModal = ({ type, message, onClose }) => {
  const variant = VARIANTS[type] || VARIANTS.error;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="wl-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wl-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="wl-modal">
        <button
          className="wl-modal__close"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>

        <div className={`wl-modal__icon wl-modal__icon--${type}`}>
          {variant.icon}
        </div>

        <h2 className="wl-modal__title" id="wl-modal-title">
          {variant.title}
        </h2>

        <p className="wl-modal__message">{message}</p>

        <button
          className={`wl-modal__btn wl-modal__btn--${type}`}
          onClick={onClose}
        >
          {variant.btnLabel}
        </button>
      </div>
    </div>
  );
};

export default WaitlistModal;
