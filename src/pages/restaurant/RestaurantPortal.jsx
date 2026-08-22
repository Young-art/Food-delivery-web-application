import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../components/common/Toast';
import { ChefHat, ArrowLeft, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const RestaurantPortal = () => {
  const { orders, advanceActiveOrderStage } = useOrders();
  const { showToast } = useToast();

  const handleUpdate = (orderId, newStatus) => {
    showToast(`Order ${orderId} marked as ${newStatus}`, 'success');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', paddingBottom: '60px' }}>
      
      {/* Header */}
      <header style={{
        background: '#1E293B',
        color: '#FFF',
        padding: '20px 0',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
              <ChefHat size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>La Pino'z Pizzeria — Kitchen Display System</h2>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Live Kitchen Order Dispatch & Prep Pipeline</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Badge variant="success">KITCHEN ONLINE</Badge>
            <Link to="/" style={{ color: '#94A3B8', fontSize: '0.85rem', fontWeight: '600' }}>
              &larr; Exit Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Orders Pipeline */}
      <div className="container" style={{ marginTop: '30px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '20px' }}>Incoming & Active Cooking Orders</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {orders.map(order => (
            <div
              key={order.id}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontWeight: '900', fontSize: '1.1rem' }}>{order.id}</span>
                <Badge variant={order.status === 'Delivered' ? 'success' : 'warning'}>{order.status}</Badge>
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                {order.date} • {order.address}
              </div>

              <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--radius-md)', padding: '12px', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Items to Cook</div>
                {order.items?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: '700', padding: '2px 0' }}>
                    <span>{item.quantity}x {item.name}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => handleUpdate(order.id, 'Preparing')}
                >
                  <Clock size={13} /> Start Cooking
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => handleUpdate(order.id, 'Ready for Pickup')}
                >
                  <CheckCircle2 size={13} /> Dispatch Rider
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
