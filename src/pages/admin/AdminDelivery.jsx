import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../components/common/Toast';
import { Truck, Bike, Phone, Star } from 'lucide-react';

export const AdminDelivery = () => {
  const [riders, setRiders] = useState([
    { id: "drv-1", name: "Vikram S.", phone: "+91 98765 43210", vehicle: "Honda Activa (KA-05-AB-1234)", status: "On Delivery", activeOrder: "ORD-94821", rating: 4.9, completed: 342 },
    { id: "drv-2", name: "Rahul M.", phone: "+91 98123 45678", vehicle: "TVS Jupiter (KA-01-CD-5678)", status: "Available", activeOrder: "None", rating: 4.8, completed: 218 },
    { id: "drv-3", name: "Suresh K.", phone: "+91 97654 32109", vehicle: "Hero Splendor (KA-03-EF-9012)", status: "Available", activeOrder: "None", rating: 4.9, completed: 412 },
    { id: "drv-4", name: "Ajay P.", phone: "+91 96543 21098", vehicle: "Ather 450X (KA-04-GH-3456)", status: "On Delivery", activeOrder: "ORD-73918", rating: 4.7, completed: 189 }
  ]);

  const { showToast } = useToast();

  const toggleRiderStatus = (id) => {
    setRiders(prev => prev.map(r => {
      if (r.id === id) {
        const next = r.status === 'Available' ? 'Offline' : 'Available';
        showToast(`Rider ${r.name} is now ${next}`, 'info');
        return { ...r, status: next };
      }
      return r;
    }));
  };

  return (
    <AdminLayout title="Delivery Partner Fleet" subtitle="Rider assignments, active logistics & live tracking status">
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {riders.map(r => (
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bike size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800' }}>{r.name}</h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{r.phone}</div>
                </div>
              </div>
              <Badge variant={r.status === 'On Delivery' ? 'warning' : r.status === 'Available' ? 'success' : 'primary'}>
                {r.status}
              </Badge>
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: '1.4' }}>
              <div><strong>Vehicle:</strong> {r.vehicle}</div>
              <div><strong>Active Order:</strong> {r.activeOrder}</div>
              <div><strong>Total Deliveries:</strong> {r.completed} orders</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontWeight: '700', fontSize: '0.82rem', color: '#D97706' }}>
                <Star size={13} fill="#F59E0B" /> {r.rating}
              </div>
              <button
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                onClick={() => toggleRiderStatus(r.id)}
              >
                Toggle Status
              </button>
            </div>
          </div>
        ))}
      </div>

    </AdminLayout>
  );
};
