import React from 'react';

export const Badge = ({ children, variant = 'primary', className = '', style = {} }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'success': return 'badge-success';
      case 'warning': return 'badge-warning';
      case 'offer': return 'badge-offer';
      default: return 'badge-primary';
    }
  };

  return (
    <span className={`badge ${getVariantClass()} ${className}`} style={style}>
      {children}
    </span>
  );
};

export const DietBadge = ({ isVeg, className = '', style = {} }) => {
  return (
    <span 
      className={`badge-diet ${isVeg ? 'veg' : 'non-veg'} ${className}`} 
      title={isVeg ? 'Pure Veg' : 'Non-Veg'}
      style={style}
    />
  );
};
