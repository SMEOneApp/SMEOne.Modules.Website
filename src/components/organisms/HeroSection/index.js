import React from "react";
import WaitlistForm from "../../molecules/WaitlistForm";
import avatar1 from "../../../assets/images/1.00.png";
import avatar2 from "../../../assets/images/2.00.png";
import avatar3 from "../../../assets/images/3.00.png";
import avatar4 from "../../../assets/images/4.00.png";
import avatar5 from "../../../assets/images/6.00.png";
import avatar6 from "../../../assets/images/5.00.png";
import mockup from "../../../assets/images/revenue.png";
import avatar_arrow from "../../../assets/images/avatar-arrow.png";
import "./styles.css";

const HeroSection = () => {
  return (
    <main className="hero-section section" id="hero">
      <div className="hero-grid-bg" />

      <div className="hero-analytics-card">
        <img src={mockup} alt="App dashboard" />
      </div>

      <div className="hero-portraits">
        <img src={avatar1} alt="" className="portrait portrait--1" />
        <img src={avatar2} alt="" className="portrait portrait--2" />
        <img src={avatar3} alt="" className="portrait portrait--3" />
        <img src={avatar4} alt="" className="portrait portrait--4" />
        <img src={avatar5} alt="" className="portrait portrait--5" />
        <img src={avatar6} alt="" className="portrait portrait--6" />
      </div>

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
        <div className="hero-assistant__avatar">
          <img src={avatar_arrow} alt="Assistant avatar" />
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
