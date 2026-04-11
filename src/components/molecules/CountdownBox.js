import React from 'react';

const CountdownBox = ({ value, label }) => {
  return (
    <div className="countdown-box">
      <strong>{String(value).padStart(2, "0")}</strong>
      <span>{label}</span>
    </div>
  );
};

export default CountdownBox;