import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useToast } from '../../components/common/Toast';
import { Badge } from '../../components/common/Badge';
import { User, Mail, Phone, Lock, MapPin, Edit2, Plus, Trash2, CheckCircle2, Shield } from 'lucide-react';

export const Profile = () => {
  const { user, updateProfile, addresses, updateAddress, deleteAddress, setDefaultAddress, addAddress } = useAuth();
  const { orders } = useOrders();
  const { showToast } = useToast();

  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: user.password || 'Thanush@123'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditing(false);
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="container" style={{ padding: '30px 20px 60px' }}>
      
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
          <Badge variant="primary">ACCOUNT SETTINGS</Badge>
        </div>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: '900' }}>
          My Account & Saved Addresses
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Personal Details Form */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid var(--border)', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>{user.name}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Customer Account</span>
              </div>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit2 size={13} /> {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <form onSubmit={handleProfileSave}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>Full Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profileForm.name}
                  onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    background: isEditing ? 'var(--surface)' : 'var(--surface-subtle)',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>Email Address</label>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={profileForm.email}
                  onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    background: isEditing ? 'var(--surface)' : 'var(--surface-subtle)',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>Mobile Number</label>
                <input
                  type="tel"
                  disabled={!isEditing}
                  value={profileForm.phone}
                  onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    background: isEditing ? 'var(--surface)' : 'var(--surface-subtle)',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>Password</label>
                <input
                  type="password"
                  disabled={!isEditing}
                  value={profileForm.password}
                  onChange={e => setProfileForm({ ...profileForm, password: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    background: isEditing ? 'var(--surface)' : 'var(--surface-subtle)',
                    outline: 'none'
                  }}
                />
              </div>

              {isEditing && (
                <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
                  Save Profile Changes
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Saved Addresses Section */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Saved Addresses</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {addresses.map(addr => (
              <div
                key={addr.id}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  background: 'var(--surface-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Badge variant="primary">{addr.type}</Badge>
                    {addr.isDefault && <Badge variant="success">DEFAULT</Badge>}
                  </div>
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '2px' }}>{addr.name}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '8px' }}>
                  {addr.street}, {addr.city} {addr.pincode}
                </div>

                {!addr.isDefault && (
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                    onClick={() => setDefaultAddress(addr.id)}
                  >
                    Set as Default
                  </button>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
