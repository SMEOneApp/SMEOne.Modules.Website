import React from "react";
import WaitlistForm from "../../molecules/WaitlistForm";
import smilingGrey from "../../../assets/images/smiling-grey.png";
import "./styles.css";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/smeoneafrica/",
    icon: (
      <path d="M8 3.5c-2.49 0-4.5 2.01-4.5 4.5v8c0 2.49 2.01 4.5 4.5 4.5h8c2.49 0 4.5-2.01 4.5-4.5V8c0-2.49-2.01-4.5-4.5-4.5H8Zm0 1.5h8c1.66 0 3 1.34 3 3v8c0 1.66-1.34 3-3 3H8c-1.66 0-3-1.34-3-3V8c0-1.66 1.34-3 3-3Zm8.75 1.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 1.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" />
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61578468181199",
    icon: (
      <path d="M13.3 20v-6.62h2.24l.34-2.58H13.3V9.15c0-.74.21-1.25 1.27-1.25H16V5.59c-.24-.03-1.06-.09-2.02-.09-2 0-3.37 1.22-3.37 3.47v1.83H8.34v2.58h2.27V20h2.69Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/smeoneafrica",
    icon: (
      <path d="M6.53 8.94H3.56V20h2.97V8.94ZM5.05 7.57a1.72 1.72 0 1 0 0-3.44 1.72 1.72 0 0 0 0 3.44ZM20 13.22c0-3.37-1.8-4.94-4.2-4.94-1.93 0-2.8 1.06-3.28 1.81v-1.55H9.55c.04 1.03 0 11.46 0 11.46h2.97v-6.4c0-.34.02-.68.13-.92.27-.68.88-1.38 1.9-1.38 1.34 0 1.88 1.02 1.88 2.5V20H20v-6.78Z" />
    ),
  },
];

const SocialIcon = ({ children }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    {children}
  </svg>
);

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section" id="contact">
      <div
        className="footer-backdrop"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(14, 18, 75, 0.82), rgba(11, 14, 58, 0.85)), url(${smilingGrey})`,
        }}
      />
      <div className="footer-content">
        <div className="footer-top">
          <div>
            <div className="brand footer-brand">
              SME<span>One</span>
            </div>
            <p className="footer-tagline">
              "Your business growth partner - manage, sell, and get paid, all in
              one place."
            </p>
          </div>
          <a className="footer-cta" href="#hero">
            Join Waitlist
          </a>
        </div>

        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#problem">The Problem</a>
          <a href="#solution">The Solution</a>
          <a href="#works">How it Works</a>
          <a href="#contact">Contact us</a>
        </div>

        {/* <div className="footer-form-wrap">
          <WaitlistForm compact />
        </div> */}

        <div className="footer-socials" aria-label="Social media links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              title={link.label}
            >
              <SocialIcon>{link.icon}</SocialIcon>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
          <div className="footer-meta">
            <a href="#hero">License</a>
            <a href="#works">Changelog</a>
            <a href="#solution">Overview</a>
          </div>
          <p>© SMEOne. All rights reserved. {currentYear}</p>
      </div>
    </footer>
  );
};

export default FooterSection;
