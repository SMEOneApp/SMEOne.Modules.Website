import React from "react";
import WaitlistForm from "../../molecules/WaitlistForm";
import "./styles.css";

// Cloudinary-hosted assets — passed straight to <img src> so no module import needed.
const avatar1 = "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082002/1.00_c4yny5.png";
const avatar2 = "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082003/2.00_kgm9qx.png";
const avatar3 = "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082003/3.00_jiwzcl.png";
const avatar4 = "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082004/4.00_usfuoo.png";
const avatar5 = "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082004/5.00_kizsos.png";
const avatar6 = "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082005/6.00_qsjsbr.png";
const mockup = "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082012/revenue_ki8xmc.png";
const avatar_arrow = "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082005/avatar-arrow_mrzv9p.png";

const HeroSection = () => {
  return (
    <main className="hero-section section" id="hero">
      <div className="hero-grid-bg" />

      <div className="hero-analytics-card">
        <img
          src={mockup}
          alt="SMEOne app dashboard showing ₦42,500 net revenue — business analytics for Nigerian SMEs"
        />
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
