import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { RESTAURANTS } from '../../data/mockData';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../components/common/Toast';
import { Plus, Store, Star, Clock } from 'lucide-react';

export const AdminRestaurants = () => {
  const [restaurants, setRestaurants] = useState(RESTAURANTS);
  const { showToast } = useToast();

  const toggleStatus = (id) => {
    setRestaurants(prev => prev.map(r => r.id === id ? { ...r, isOpen: r.isOpen === false ? true : false } : r));
    showToast('Restaurant status updated', 'info');
  };

  return (
    <AdminLayout title="Restaurant Dining Partners" subtitle="Onboard restaurants, verify hygiene & manage active status">
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {restaurants.map(r => (
          <div
            key={r.id}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
              <img src={r.image} alt={r.name} style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '800' }}>{r.name}</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.cuisine}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '12px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700', color: '#D97706' }}>
                <Star size={14} fill="#F59E0B" /> {r.rating} ({r.reviewsCount} reviews)
              </div>
              <button
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                onClick={() => toggleStatus(r.id)}
              >
                {r.isOpen === false ? '🔴 Mark Open' : '🟢 Open Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

    </AdminLayout>
  );
};
