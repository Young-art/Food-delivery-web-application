import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../components/common/Toast';
import { Badge } from '../../components/common/Badge';
import { RatingReviewModal } from '../../components/modals/RatingReviewModal';
import { FOOD_ITEMS } from '../../data/mockData';
import { Clock, RotateCcw, Star, ChevronRight, ShoppingBag } from 'lucide-react';

export const OrderHistory = () => {
  const { orders } = useOrders();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [ratingOrder, setRatingOrder] = useState(null);

  const handleReorder = (order) => {
    order.items?.forEach(pastItem => {
      const match = FOOD_ITEMS.find(f => f.name.toLowerCase() === pastItem.name.toLowerCase()) || {
        id: `item-${Math.random()}`,
        name: pastItem.name,
        price: pastItem.price,
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
        veg: true
      };
      addToCart(match, pastItem.quantity);
    });

    showToast('Items added to cart from past order!', 'success');
    navigate('/cart');
  };

  return (
    <div className="container" style={{ padding: '30px 20px 60px' }}>
      
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>Order History</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
            <Badge variant="primary">MY ACTIVITY</Badge>
            <Badge variant="warning">{orders.length} ORDERS</Badge>
          </div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: '900' }}>
            Past Orders & Invoices
          </h1>
        </div>
      </div>

      {orders.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>{order.restaurantName}</h3>
                    <Badge variant={order.status === 'Delivered' ? 'success' : 'primary'}>{order.status}</Badge>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {order.date} • ID: {order.id}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: '900', fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)' }}>
                    ₹{order.total}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{order.items?.length} items</div>
                </div>
              </div>

              {/* Items List */}
              <div style={{
                background: 'var(--surface-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                marginBottom: '16px',
                fontSize: '0.85rem'
              }}>
                {order.items?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span>{item.quantity}x {item.name}</span>
                    <span style={{ fontWeight: '700' }}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Actions & Ratings */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  {order.rating ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: '700', color: '#D97706' }}>
                      <Star size={15} fill="#F59E0B" />
                      <span>Rated {order.rating}/5</span>
                      {order.review && <span style={{ color: 'var(--text-muted)', fontWeight: '400', fontStyle: 'italic', marginLeft: '6px' }}>"{order.review}"</span>}
                    </div>
                  ) : (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setRatingOrder(order)}
                    >
                      <Star size={14} color="#D97706" /> Rate & Review Meal
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link to={`/order-tracking/${order.id}`} className="btn btn-secondary btn-sm">
                    View Live Tracker
                  </Link>
                  <button className="btn btn-primary btn-sm" onClick={() => handleReorder(order)}>
                    <RotateCcw size={14} /> Reorder
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--surface)', borderRadius: 'var(--radius-xl)' }}>
          <ShoppingBag size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
          <h3>No past orders yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>Order your first hot meal and track it in real time!</p>
          <Link to="/category/pizza" className="btn btn-primary">Start Ordering</Link>
        </div>
      )}

      {ratingOrder && (
        <RatingReviewModal order={ratingOrder} onClose={() => setRatingOrder(null)} />
      )}

    </div>
  );
};
