import React from 'react';

const Label = ({ children, className, ...props }) => {
  return (
    <span className={className || ''} {...props}>
      {children}
    </span>
  );
};

export default Label;