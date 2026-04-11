import React, { useId, useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const WaitlistForm = ({ compact = false }) => {
  const inputId = useId();
  const statusId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("idle");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setStatus("Please enter a valid email address.");
      setStatusType("error");
      return;
    }

    setStatus("You’re on the list. We’ll reach out before launch.");
    setStatusType("success");
    setEmail("");
  };

  return (
    <form
      className={`waitlist-form${compact ? " waitlist-form--compact" : ""}`}
      onSubmit={handleSubmit}
    >
      <div className="waitlist-form__controls">
        <Input
          id={inputId}
          type="email"
          value={email}
          placeholder="Enter your email"
          aria-label="Email address"
          aria-describedby={statusId}
          aria-invalid={statusType === "error"}
          autoComplete="email"
          required
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button type="submit">Join Waitlist</Button>
      </div>
      <p
        id={statusId}
        className={`waitlist-form__status waitlist-form__status--${statusType}`}
        aria-live="polite"
      >
        {status || "No spam. Early access only."}
      </p>
    </form>
  );
};

export default WaitlistForm;
