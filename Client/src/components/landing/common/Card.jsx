import React from 'react';

const Card = ({ 
  children, 
  variant = 'default',
  className = '',
  ...props 
}) => {
  const baseStyles = 'rounded-xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white shadow-md hover:shadow-lg',
    elevated: 'bg-white shadow-lg hover:shadow-xl',
    flat: 'bg-gray-50',
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card; 