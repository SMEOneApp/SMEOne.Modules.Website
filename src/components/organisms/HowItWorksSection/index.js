import React from "react";
import { ReactComponent as LeafIcon } from "../../../assets/images/svg assets/leaf.svg";
import iphone15Pro from "../../../assets/images/iphone-15-pro.png";
import iPhoneAcct from "../../../assets/images/iPhone-accounting.png";
import iphone15Pro1 from "../../../assets/images/iphone-15-pro-1.png";
import viewCustomer from "../../../assets/images/view-customer.png";
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
