import React, { useId, useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const WaitlistForm = ({ compact = false }) => {
  const emailInputId = useId();
  const firstNameInputId = useId();
  const lastNameInputId = useId();
  const statusId = useId();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [step, setStep] = useState("email");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setStep("email");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (!trimmedEmail || !/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setStatus("Please enter a valid email address.");
      setStatusType("error");
      return;
    }

    if (step === "email") {
      setStatus("Add your first and last name to finish joining the waitlist.");
      setStatusType("idle");
      setStep("details");
      return;
    }

    if (!trimmedFirstName || !trimmedLastName) {
      setStatus("Please enter your first name and last name.");
      setStatusType("error");
      return;
    }

    setIsSubmitting(true);
    setStatus("Submitting your details...");
    setStatusType("idle");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.message || "Unable to join the waitlist.");
      }

      setStatus("You’re on the list. We’ll reach out before launch.");
      setStatusType("success");
      resetForm();
    } catch (error) {
      setStatus(error.message || "Unable to join the waitlist.");
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={`waitlist-form${compact ? " waitlist-form--compact" : ""}`}
      onSubmit={handleSubmit}
    >
      <div className="waitlist-form__controls">
        <Input
          id={emailInputId}
          type="email"
          value={email}
          placeholder="Enter your email"
          aria-label="Email address"
          aria-describedby={statusId}
          aria-invalid={statusType === "error"}
          autoComplete="email"
          required
          disabled={step === "details" || isSubmitting}
          onChange={(event) => setEmail(event.target.value)}
        />
        {step === "details" && (
          <>
            <Input
              id={firstNameInputId}
              type="text"
              value={firstName}
              placeholder="First name"
              aria-label="First name"
              autoComplete="given-name"
              required
              disabled={isSubmitting}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <Input
              id={lastNameInputId}
              type="text"
              value={lastName}
              placeholder="Last name"
              aria-label="Last name"
              autoComplete="family-name"
              required
              disabled={isSubmitting}
              onChange={(event) => setLastName(event.target.value)}
            />
          </>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {step === "email"
            ? "Join Waitlist"
            : isSubmitting
              ? "Submitting..."
              : "Complete Signup"}
        </Button>
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
