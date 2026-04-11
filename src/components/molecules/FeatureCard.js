import React from 'react';
import Label from '../atoms/Label';

const FeatureCard = ({ label, title, description, id }) => {
  return (
    <div className="feature-card" id={id}>
      <Label className="feature-label">{label}</Label>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;