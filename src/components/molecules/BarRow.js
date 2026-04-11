import React from 'react';

const BarRow = ({ label, barClass, value }) => {
  return (
    <div className="bar-row">
      <span>{label}</span>
      <div className={`bar ${barClass}`}></div>
      <span>{value}</span>
    </div>
  );
};

export default BarRow;