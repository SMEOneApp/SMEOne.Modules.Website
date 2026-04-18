import React, { useState, useEffect } from "react";
import logo from "../../../assets/logo.svg";
import "./styles.css";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "The Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "How it works", href: "#works" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <a href="#hero" className="navbar__logo">
          <img src={logo} alt="SMEOne" width={100} />
        </a>

        <ul className={`navbar__links${menuOpen ? " navbar__links--open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#hero" className="btn btn--teal navbar__cta">
          Join Waitlist
        </a>

        <button
          className={`navbar__burger${menuOpen ? " navbar__burger--open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
};

export default Header;
