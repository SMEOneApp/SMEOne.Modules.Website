import React from "react";
import CountdownBox from "../../molecules/CountdownBox";
import "./styles.css";

const CountdownSection = ({ timeLeft }) => {
  return (
    <section className="countdown-section" id="countdown">
      <div className="countdown-copy section">
        <span className="countdown-kicker">SMEOne launch countdown timer</span>
        <h2>
          Watch this <span>space</span>
        </h2>
      </div>

      <div className="countdown-panel-wrap section">
        <div className="countdown-panel">
          <CountdownBox value={timeLeft.days} label="DAYS" />
          <span className="countdown-separator">:</span>
          <CountdownBox value={timeLeft.hours} label="HOURS" />
          <span className="countdown-separator">:</span>
          <CountdownBox value={timeLeft.minutes} label="MINUTES" />
          <span className="countdown-separator">:</span>
          <CountdownBox value={timeLeft.seconds} label="SECONDS" />
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
