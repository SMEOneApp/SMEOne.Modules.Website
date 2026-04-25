import React from "react";
import { ReactComponent as LeafIcon } from "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777083095/leaf_goaken.svg";
import iphone15Pro from "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082010/iphone-15-pro_ngbtlv.png";
import iPhoneAcct from "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082011/iPhone-accounting_rtm4yq.png";
import iphone15Pro1 from "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082010/iphone-15-pro_ngbtlv.png";
import viewCustomer from "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082015/view-customer_qoecwi.png";
import "./styles.css";

const steps = [
  {
    number: "01",
    title: "Set Up Your Business",
    description:
      "Create an account and add your business details and preferences in minutes.",
    image: iphone15Pro,
    className: "step-card step-card--tall",
  },
  {
    number: "02",
    title: "Add Products & Customers",
    description: "Upload your inventory and import customer information.",
    image: viewCustomer,
    className: "step-card step-card--split",
  },
  {
    number: "03",
    title: "Record Your Sales",
    description: "Start logging transactions and accept payments instantly.",
    image: iphone15Pro1,
    className: "step-card step-card--tall",
  },
  {
    number: "04",
    title: "Track Your Growth",
    description: "Monitor insights, reports, and make data-driven decisions.",
    image: iPhoneAcct,
    className: "step-card step-card--angled",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="section section--how" id="works">
      <div className="section-heading section-heading--center">
        <span className="label-pill problem-label">
            <LeafIcon aria-hidden="true" />
            How it Works
          </span>
        <h2>
          Get started with <span>SMEOne</span> in minutes
        </h2>
      </div>

      <div className="steps-grid">
        {steps.map((step) => (
          <article key={step.number} className={step.className}>
            <span className="step-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>

            <div className="step-visual">
              <img src={step.image} alt={step.title} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
