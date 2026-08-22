import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Zap, Heart, Award } from 'lucide-react';
import { Badge } from '../common/Badge';

export const Footer = () => {
  return (
    <footer style={{ background: '#0F172A', color: '#F8FAFC', padding: '60px 0 30px', marginTop: '60px' }}>
      <div className="container">
        
        {/* Trust Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          paddingBottom: '40px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255, 75, 43, 0.15)', color: '#FF4B2B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={20} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>30 Min Superfast Delivery</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Hot and fresh directly from kitchen</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>256-Bit SSL Encrypted</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>100% Secure digital payments</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={20} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Verified Hygiene Kitchens</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>100+ daily safety sanitization audits</div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '30px', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: '900', color: '#FFF', marginBottom: '12px' }}>
              <ShoppingBag size={22} color="#FF4B2B" />
              <span>Foodiez<span style={{ color: '#FF4B2B' }}>.</span></span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: '1.5', marginBottom: '16px' }}>
              Discover the most delicious cravings from verified kitchens delivered right to your doorstep in 30 minutes.
            </p>
          </div>

          <div>
            <h5 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '14px', color: '#FFF' }}>Top Categories</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: '#94A3B8' }}>
              <li><Link to="/category/pizza">Artisanal Pizza</Link></li>
              <li><Link to="/category/biryani">Dum Biryani</Link></li>
              <li><Link to="/category/burgers">Gourmet Burgers</Link></li>
              <li><Link to="/category/chinese">Chinese & Noodles</Link></li>
              <li><Link to="/category/healthy-food">Healthy Bowls</Link></li>
            </ul>
          </div>

          <div>
            <h5 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '14px', color: '#FFF' }}>Quick Portals</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: '#94A3B8' }}>
              <li><Link to="/admin">Admin Dashboard</Link></li>
              <li><Link to="/restaurant-portal">Restaurant Kitchen Portal</Link></li>
              <li><Link to="/delivery-partner">Delivery Partner Portal</Link></li>
              <li><Link to="/orders">Order History & Tracking</Link></li>
            </ul>
          </div>

          <div>
            <h5 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '14px', color: '#FFF' }}>Download Mobile App</h5>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '12px' }}>
              Get extra discounts on our iOS and Android mobile apps.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Badge variant="primary" style={{ padding: '6px 12px' }}>APP STORE</Badge>
              <Badge variant="success" style={{ padding: '6px 12px' }}>GOOGLE PLAY</Badge>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ textAlign: 'center', fontSize: '0.78rem', color: '#64748B', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          © {new Date().getFullYear()} Foodiez Delivery Inc. Made with precision for Thanush Masika.
        </div>

      </div>
    </footer>
  );
};
