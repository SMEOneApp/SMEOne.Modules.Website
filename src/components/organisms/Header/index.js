import React from "react";
import "./styles.css";

const Header = () => {
  return (
    <header className="site-header">
      <div className="top-bar">
        <a className="brand" href="#hero">
          SME<span>One</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          <a href="#features">Features</a>
          <a href="#problem">The Problem</a>
          <a href="#solution">Solution</a>
          <a href="#works">How it works</a>
        </nav>

        <a className="nav-button" href="#hero">
          Join Waitlist
        </a>
      </div>
    </header>
  );
};

export default Header;
