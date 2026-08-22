import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../components/common/Toast';
import { Bike, Navigation, CheckCircle2, Phone, MapPin, DollarSign } from 'lucide-react';

export const DeliveryPortal = () => {
  const { orders } = useOrders();
  const { showToast } = useToast();
  const [isOnline, setIsOnline] = useState(true);

  const handleDeliver = (orderId) => {
    showToast(`Order ${orderId} marked as successfully delivered!`, 'success');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', paddingBottom: '60px' }}>
      
      {/* Rider Header */}
      <header style={{
        background: '#0F172A',
        color: '#FFF',
        padding: '20px 0',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
              <Bike size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Rider Vikram S. — Partner App</h2>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>KA-05-AB-1234 • Honda Activa</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              className="chip"
              onClick={() => setIsOnline(!isOnline)}
              style={{ background: isOnline ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: isOnline ? '#10B981' : '#EF4444', borderColor: 'transparent' }}
            >
              {isOnline ? '🟢 Online & Ready' : '🔴 Offline'}
            </button>
            <Link to="/" style={{ color: '#94A3B8', fontSize: '0.85rem', fontWeight: '600' }}>
              &larr; Exit
            </Link>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="container" style={{ marginTop: '28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <div style={{ background: 'var(--surface)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>Today's Earnings</div>
            <div style={{ fontSize: '1.6rem', fontWeight: '900', fontFamily: 'Outfit, sans-serif', color: 'var(--veg-color)' }}>₹1,450</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>14 Completed Deliveries</div>
          </div>

          <div style={{ background: 'var(--surface)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>Customer Rating</div>
            <div style={{ fontSize: '1.6rem', fontWeight: '900', fontFamily: 'Outfit, sans-serif', color: '#D97706' }}>⭐ 4.95</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Top Rated Champion Rider</div>
          </div>

          <div style={{ background: 'var(--surface)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>Tips Earned</div>
            <div style={{ fontSize: '1.6rem', fontWeight: '900', fontFamily: 'Outfit, sans-serif' }}>₹280</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>100% Payout to Partner</div>
          </div>
        </div>

        {/* Assigned Deliveries */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '16px' }}>Assigned Delivery Tasks</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {orders.map(order => (
            <div
              key={order.id}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                padding: '22px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>{order.id}</span>
                  <Badge variant="primary">PICKUP: {order.restaurantName}</Badge>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <MapPin size={15} color="var(--primary)" /> <strong>Delivery To:</strong> {order.address}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Customer: Thanush Masika • +91 8328247714 • Collect ₹{order.total} (Paid via {order.paymentMethod || 'UPI'})
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(order.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <Navigation size={14} /> Open GPS Navigation
                </a>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleDeliver(order.id)}
                >
                  <CheckCircle2 size={14} /> Mark Delivered
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
