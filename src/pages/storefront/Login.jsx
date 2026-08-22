import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import { Badge } from '../../components/common/Badge';
import { ShoppingBag, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export const Login = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('thanushmasika@gmail.com');
  const [password, setPassword] = useState('Thanush@123');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      showToast('Please enter your email/phone and password', 'error');
      return;
    }
    const res = login(identifier, password);
    showToast(`Welcome back, ${res.user.name}!`, 'success');
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: '36px',
        maxWidth: '440px',
        width: '100%',
        boxShadow: 'var(--shadow-xl)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'Outfit, sans-serif', fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '8px' }}>
            <ShoppingBag size={24} color="#FF4B2B" />
            <span>Foodiez<span style={{ color: '#FF4B2B' }}>.</span></span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Welcome Back</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Login to access your orders, favorites and saved addresses.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>Email or Phone Number</label>
            <input
              type="text"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              placeholder="thanushmasika@gmail.com"
              style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none' }}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }}>
            Log In &rarr;
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '700' }}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};
