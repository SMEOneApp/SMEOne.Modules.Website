import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/organisms/Header";
import HeroSection from "./components/organisms/HeroSection";
import HowItWorksSection from "./components/organisms/HowItWorksSection";
import CountdownSection from "./components/organisms/CountdownSection";
import ProblemSection from "./components/organisms/ProblemSection";
import FeatureSection from "./components/organisms/FeatureSection";
import FooterSection from "./components/organisms/FooterSection";

const launchDate = new Date("2026-06-01T00:00:00Z");

const getTimeLeft = () => {
  const now = Date.now();
  const diff = Math.max(0, launchDate - now);

  return {
    days: Math.floor(diff / 1000 / 60 / 60 / 24),
    hours: Math.floor((diff / 1000 / 60 / 60) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app-shell">
      <Header />
      <HeroSection />
      <CountdownSection timeLeft={timeLeft} />
      <ProblemSection />
      <FeatureSection />
      <HowItWorksSection />
      <FooterSection />
    </div>
  );
}

export default App;
