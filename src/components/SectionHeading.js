import React from 'react';
import '../assets/css/section_heading.css';

const SectionHeading = ({ children, className }) => {
  return (
    <div className={`slider-block-heading ${className}`}>
      {children}
    </div>
  );
};

export default SectionHeading;