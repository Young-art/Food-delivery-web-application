import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders, ORDER_STAGES } from '../../context/OrderContext';
import { useToast } from '../../components/common/Toast';
import { Badge } from '../../components/common/Badge';
import { RatingReviewModal } from '../../components/modals/RatingReviewModal';
import { CheckCircle2, Clock, MapPin, Phone, ChefHat, Bike, ShieldCheck, ChevronRight, Star, RefreshCw } from 'lucide-react';

export const OrderTracking = () => {
  const { orderId } = useParams();
  const { orders, activeOrder, advanceActiveOrderStage } = useOrders();
  const { showToast } = useToast();

  const [showRatingModal, setShowRatingModal] = useState(false);

  const order = (activeOrder && activeOrder.id === orderId) ? activeOrder : orders.find(o => o.id === orderId) || orders[0];
  const currentStageIndex = ORDER_STAGES.indexOf(order?.status || 'Order Placed');

  const handleAdvance = () => {
    const nextStatus = advanceActiveOrderStage();
    showToast(`Order status advanced to: ${nextStatus}`, 'info');
  };

  const getSubtext = () => {
    switch (currentStageIndex) {
      case 0: return "Your order has been placed and received by the kitchen!";
      case 1: return "The restaurant has confirmed your order and is selecting fresh ingredients.";
      case 2: return "Chef is actively cooking and packaging your hot, fresh meal.";
      case 3: return "Delivery rider Vikram is riding to your address!";
      case 4: return "Order delivered hot & fresh! Enjoy your meal.";
      default: return "Processing your order...";
    }
  };

  const getEta = () => {
    switch (currentStageIndex) {
      case 0: return "25 to 30 Mins";
      case 1: return "20 to 25 Mins";
      case 2: return "15 to 20 Mins";
      case 3: return "8 to 12 Mins";
      case 4: return "Delivered";
      default: return "25 Mins";
    }
  };

  return (
    <div className="container" style={{ padding: '30px 20px 60px' }}>
      
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/orders">Orders</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>Live Tracking ({order.id})</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Progress Card & Map */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Header Progress Card */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '28px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Badge variant="primary">LIVE TRACKING</Badge>
                  <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>{order.id}</span>
                </div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)' }}>
                  {order.status}
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{getSubtext()}</p>
              </div>

              <div style={{
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '12px 20px',
                textAlign: 'right'
              }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Estimated Arrival</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary)', fontFamily: 'Outfit, sans-serif' }}>
                  {getEta()}
                </div>
              </div>
            </div>

            {/* Visual Stepper */}
            <div style={{ position: 'relative', margin: '40px 0 20px' }}>
              {/* Progress Line */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                height: '4px',
                background: '#E2E8F0',
                zIndex: 1
              }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #FF4B2B, #10B981)',
                  width: `${(currentStageIndex / (ORDER_STAGES.length - 1)) * 100}%`,
                  transition: 'width 0.4s ease'
                }} />
              </div>

              {/* Stepper Nodes */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                position: 'relative',
                zIndex: 2
              }}>
                {ORDER_STAGES.map((stage, idx) => {
                  const isDone = idx <= currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div key={stage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '80px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: isDone ? (idx === 4 ? '#10B981' : '#FF4B2B') : '#FFF',
                        border: `2px solid ${isDone ? (idx === 4 ? '#10B981' : '#FF4B2B') : '#CBD5E1'}`,
                        color: isDone ? '#FFF' : '#94A3B8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '8px',
                        boxShadow: isCurrent ? '0 0 0 4px rgba(255, 75, 43, 0.2)' : 'none',
                        transition: 'all 0.3s'
                      }}>
                        {isDone ? <CheckCircle2 size={20} /> : <Clock size={18} />}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontWeight: isCurrent ? '800' : '600', color: isCurrent ? 'var(--text-main)' : 'var(--text-muted)' }}>
                        {stage}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Advance Status Simulation Trigger */}
            <div style={{
              marginTop: '30px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Simulate kitchen & rider progress in real time
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {currentStageIndex === 4 && (
                  <button className="btn btn-secondary btn-sm" onClick={() => setShowRatingModal(true)}>
                    <Star size={14} color="#D97706" /> Rate Meal
                  </button>
                )}
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleAdvance}
                  disabled={currentStageIndex === 4}
                >
                  <RefreshCw size={14} /> {currentStageIndex === 4 ? 'Order Complete' : 'Advance Stage &rarr;'}
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Partner Details Card */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bike size={24} />
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '1rem' }}>{order.driver?.name || 'Vikram S.'}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Delivery Partner • {order.driver?.vehicle || 'Honda Activa'}
                </div>
              </div>
            </div>

            <a
              href={`tel:${order.driver?.phone || '+919876543210'}`}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              <Phone size={14} /> Call Partner
            </a>
          </div>

        </div>

        {/* Order Details & Summary */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '16px' }}>
            Order Information
          </h3>

          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Delivering From</div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{order.restaurantName}</div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Delivery Address</div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.4' }}>{order.address}</div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>Items in this Order</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {order.items?.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                  <span>{item.quantity}x {item.name}</span>
                  <span style={{ fontWeight: '700' }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '800' }}>Total Paid</span>
            <span style={{ fontSize: '1.4rem', fontWeight: '900', fontFamily: 'Outfit, sans-serif', color: 'var(--primary)' }}>
              ₹{order.total}
            </span>
          </div>

        </div>

      </div>

      {showRatingModal && (
        <RatingReviewModal order={order} onClose={() => setShowRatingModal(false)} />
      )}

    </div>
  );
};
