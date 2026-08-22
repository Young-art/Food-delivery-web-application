import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../components/common/Toast';
import { Badge, DietBadge } from '../../components/common/Badge';
import { ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

export const Cart = () => {
  const {
    cart,
    subtotal,
    deliveryFee,
    tax,
    discount,
    grandTotal,
    appliedCoupon,
    couponMessage,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCouponCode,
    removeCoupon
  } = useCart();

  const { showToast } = useToast();
  const navigate = useNavigate();

  const [inputCoupon, setInputCoupon] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCouponCode(inputCoupon);
    if (res.success) {
      showToast(res.message, 'success');
      setInputCoupon('');
    } else {
      showToast(res.message, 'error');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <ShoppingBag size={36} />
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }}>Your Cart is Empty</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
          Explore our wide menu of delicious pizzas, burgers, biryanis and treats!
        </p>
        <Link to="/category/pizza" className="btn btn-primary btn-lg">
          Browse Menu & Cravings <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '30px 20px 60px' }}>
      
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>Shopping Cart</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: '900' }}>
          Your Food Cart
        </h1>
        <button
          onClick={clearCart}
          className="btn btn-secondary btn-sm"
          style={{ color: '#EF4444' }}
        >
          <Trash2 size={14} /> Clear All
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Cart Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cart.map(item => (
            <div
              key={item.cartItemId}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <DietBadge isVeg={item.veg} />
                    <span style={{ fontWeight: '700', fontSize: '1rem' }}>{item.name}</span>
                  </div>
                  {item.addOns && item.addOns.length > 0 && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '2px' }}>
                      Add-ons: {item.addOns.map(a => a.name).join(', ')}
                    </div>
                  )}
                  {item.specialInstructions && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontStyle: 'italic' }}>
                      Note: {item.specialInstructions}
                    </div>
                  )}
                  <div style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '0.92rem' }}>
                    ₹{item.unitPrice}
                  </div>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'var(--surface-subtle)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border)',
                  padding: '3px 6px'
                }}>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, -1)}
                    style={{ width: '26px', height: '26px', borderRadius: '50%', border: 'none', background: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Minus size={12} />
                  </button>
                  <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: '800', fontSize: '0.9rem' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, 1)}
                    style={{ width: '26px', height: '26px', borderRadius: '50%', border: 'none', background: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <div style={{ fontWeight: '800', fontFamily: 'Outfit, sans-serif', fontSize: '1.15rem', minWidth: '60px', textAlign: 'right' }}>
                  ₹{item.unitPrice * item.quantity}
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Summary & Coupon Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Coupon Input */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px'
          }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tag size={16} color="var(--primary)" /> Apply Discount Promo
            </h4>

            {appliedCoupon ? (
              <div style={{
                background: 'var(--veg-light)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: '800', color: 'var(--veg-color)', fontSize: '0.9rem' }}>
                    {appliedCoupon} APPLIED
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#047857' }}>{couponMessage}</div>
                </div>
                <button
                  onClick={removeCoupon}
                  style={{ background: 'none', border: 'none', color: '#EF4444', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Enter code e.g. FOODIEZ50"
                  value={inputCoupon}
                  onChange={e => setInputCoupon(e.target.value.toUpperCase())}
                  style={{
                    flex: 1,
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    outline: 'none'
                  }}
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  Apply
                </button>
              </form>
            )}

            {/* Quick Promo Chips */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}>
              <Badge variant="primary" style={{ cursor: 'pointer' }} onClick={() => applyCouponCode('FOODIEZ50')}>
                FOODIEZ50 (50% OFF)
              </Badge>
              <Badge variant="warning" style={{ cursor: 'pointer' }} onClick={() => applyCouponCode('SUPER20')}>
                SUPER20 (20% OFF)
              </Badge>
            </div>
          </div>

          {/* Bill Calculation */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px'
          }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '16px' }}>
              Order Summary
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', borderBottom: '1px solid var(--border)', paddingBottom: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Item Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Delivery Partner Fee</span>
                <span>{deliveryFee === 0 ? <span style={{ color: 'var(--veg-color)', fontWeight: '700' }}>FREE</span> : `₹${deliveryFee}`}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Govt Taxes (GST 5%)</span>
                <span>₹{tax}</span>
              </div>

              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#DC2626', fontWeight: '700' }}>
                  <span>Coupon Discount ({appliedCoupon})</span>
                  <span>-₹{discount}</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: '800' }}>To Pay</span>
              <span style={{ fontSize: '1.6rem', fontWeight: '900', fontFamily: 'Outfit, sans-serif', color: 'var(--primary)' }}>
                ₹{grandTotal}
              </span>
            </div>

            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/checkout')}
              style={{ width: '100%' }}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
