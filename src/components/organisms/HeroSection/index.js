import React from "react";
import WaitlistForm from "../../molecules/WaitlistForm";
import afroGuy from "../../../assets/images/afro-guy.png";
import denimGirl from "../../../assets/images/denim-girl.png";
import dreadGuy from "../../../assets/images/dread-guy.png";
import emoji from "../../../assets/images/emoji.png";
import ipadGuy from "../../../assets/images/ipad-guy.png";
import revenue from "../../../assets/images/revenue.png";
import smiling from "../../../assets/images/smiling.png";
import "./styles.css";

const portraits = [
  {
    src: denimGirl,
    alt: "Business owner smiling",
    className: "portrait portrait--1",
  },
  {
    src: ipadGuy,
    alt: "Business owner holding an iPad",
    className: "portrait portrait--2",
  },
  {
    src: afroGuy,
    alt: "Business owner seated outdoors",
    className: "portrait portrait--3",
  },
  {
    src: smiling,
    alt: "Business owner holding a tablet",
    className: "portrait portrait--4",
  },
  {
    src: dreadGuy,
    alt: "Business owner reviewing inventory",
    className: "portrait portrait--5",
  },
  {
    src: denimGirl,
    alt: "Business owner portrait",
    className: "portrait portrait--6",
  },
];

const HeroSection = () => {
  return (
    <main className="hero-section section" id="hero">
      <div className="hero-grid-bg" />
      <div className="hero-analytics-card">
        <img src={revenue} alt="Revenue versus expenses insight" />
      </div>

      {portraits.map((portrait) => (
        <div key={portrait.className} className={portrait.className}>
          <img src={portrait.src} alt={portrait.alt} />
        </div>
      ))}

      <div className="hero-copy">
        <h1>
          Run Your Business
          <span>Smarter, Not Harder</span>
        </h1>
        <p>
          Manage your sales, customers, finances, and payments all in one
          simple app built for SMEs.
        </p>
        <WaitlistForm />
      </div>

      <div className="hero-assistant">
        <span className="hero-assistant__arrow">↶</span>
        <div className="hero-assistant__avatar">
          <img src={emoji} alt="Assistant avatar" />
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
