import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '../common/Badge';
import { Shield, ChefHat, Bike, Store, Sparkles, ChevronUp } from 'lucide-react';

export const PortalSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getCurrentPortalName = () => {
    if (location.pathname.startsWith('/admin')) return 'Admin Portal';
    if (location.pathname.startsWith('/restaurant-portal')) return 'Restaurant Kitchen';
    if (location.pathname.startsWith('/delivery-partner')) return 'Delivery Partner';
    return 'Customer Storefront';
  };

  return (
    <div className="portal-switcher-floating">
      <button className="portal-switcher-btn" onClick={() => setIsOpen(!isOpen)}>
        <Badge variant="primary" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>PORTALS</Badge>
        <span style={{ fontSize: '0.85rem' }}>{getCurrentPortalName()}</span>
        <ChevronUp size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
      </button>

      {isOpen && (
        <div className="portal-menu-dropdown" onClick={() => setIsOpen(false)}>
          <div style={{ padding: '6px 10px', fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Switch System Portal
          </div>
          <Link to="/" className="portal-menu-item">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Store size={15} color="var(--primary)" /> Customer Storefront</span>
          </Link>
          <Link to="/admin" className="portal-menu-item">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Shield size={15} color="#DC2626" /> Super Admin Portal</span>
          </Link>
          <Link to="/restaurant-portal" className="portal-menu-item">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ChefHat size={15} color="#D97706" /> Restaurant Kitchen</span>
          </Link>
          <Link to="/delivery-partner" className="portal-menu-item">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Bike size={15} color="#10B981" /> Delivery Rider Partner</span>
          </Link>
        </div>
      )}
    </div>
  );
};
