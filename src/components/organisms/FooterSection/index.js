import React from "react";
import smilingGrey from "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777082004/4.00_usfuoo.png";
import linkedInLogo from "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777069143/linkedin_axvdlx.svg";
import facebookLogo from "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777069143/facebook_efeij7.svg";
import instagramLogo from "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777069143/instagram_egsfm4.svg";
import "./styles.css";

const xLogo = "https://res.cloudinary.com/dojx1kdh2/image/upload/v1777081959/twitter_duo550.png";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/smeone.africa/",
    logo: instagramLogo,
    iconOnly: true,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61578468181199",
    logo: facebookLogo,
    iconOnly: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/smeoneafrica",
    logo: linkedInLogo,
    iconOnly: true,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/smeoneafrica",
    logo: xLogo,
    iconOnly: true,
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
          {socialLinks.map((link) =>
            link.iconOnly ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                title={link.label}
                className="footer-social--icon-only"
              >
                <img src={link.logo} alt={link.label} width="28" height="28" />
              </a>
            ) : (
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
            )
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© SMEOne. All rights reserved. {currentYear}</p>
          <div className="footer-meta">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
