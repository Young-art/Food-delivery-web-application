import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '../common/Badge';
import { LayoutDashboard, Utensils, Store, Tag, Users, Truck, BarChart3, ArrowLeft, Shield } from 'lucide-react';

export const AdminLayout = ({ children, title, subtitle }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Food Items', path: '/admin/food', icon: Utensils },
    { label: 'Restaurants', path: '/admin/restaurants', icon: Store },
    { label: 'Coupons & Offers', path: '/admin/coupons', icon: Tag },
    { label: 'Customer Users', path: '/admin/users', icon: Users },
    { label: 'Delivery Fleet', path: '/admin/delivery', icon: Truck },
    { label: 'Analytics Reports', path: '/admin/reports', icon: BarChart3 },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
      
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: '#0F172A',
        color: '#F8FAFC',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        flexShrink: 0
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Shield size={22} color="#FF4B2B" />
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.3rem', fontWeight: '900', color: '#FFF' }}>
              Foodiez<span style={{ color: '#FF4B2B' }}>.</span>
            </span>
          </div>
          <Badge variant="primary" style={{ fontSize: '0.65rem' }}>ADMINISTRATION PORTAL</Badge>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.86rem',
                  fontWeight: '600',
                  color: isActive ? '#FFF' : '#94A3B8',
                  background: isActive ? 'linear-gradient(135deg, #FF4B2B 0%, #FF416C 100%)' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#94A3B8',
              fontSize: '0.82rem',
              fontWeight: '600'
            }}
          >
            <ArrowLeft size={15} /> Back to Storefront
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Header */}
        <header style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '18px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}>{title}</h2>
            {subtitle && <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{subtitle}</p>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Badge variant="success">LIVE API CONNECTED</Badge>
            <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>Admin Thanush</span>
          </div>
        </header>

        <main style={{ padding: '30px', flex: 1, overflowY: 'auto' }}>
          {children}
        </main>

      </div>

    </div>
  );
};
