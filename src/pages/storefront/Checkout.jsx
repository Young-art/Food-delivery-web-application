import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { useLocation } from '../../context/LocationContext';
import { useToast } from '../../components/common/Toast';
import { Badge } from '../../components/common/Badge';
import { MapPin, Plus, Edit2, CreditCard, Smartphone, Banknote, ShieldCheck, Check, ChevronRight, ArrowRight, X } from 'lucide-react';

export const Checkout = () => {
  const { user, addresses, addAddress, updateAddress } = useAuth();
  const { cart, subtotal, deliveryFee, tax, discount, grandTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { selectedLocation } = useLocation();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [selectedAddrId, setSelectedAddrId] = useState(addresses[0]?.id || 'addr-1');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, cod, netbanking
  const [upiApp, setUpiApp] = useState('gpay'); // gpay, phonepe, paytm
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Address form state
  const [formData, setFormData] = useState({
    type: 'Home',
    name: user.name || 'Thanush Masika',
    phone: user.phone || '8328247714',
    street: '',
    landmark: '',
    city: 'Bangalore',
    pincode: '560034'
  });

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleOpenAddAddress = () => {
    setEditingAddress(null);
    setFormData({
      type: 'Home',
      name: user.name || 'Thanush Masika',
      phone: user.phone || '8328247714',
      street: '',
      landmark: '',
      city: 'Bangalore',
      pincode: '560034'
    });
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr, e) => {
    e.stopPropagation();
    setEditingAddress(addr);
    setFormData(addr);
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!formData.street || !formData.pincode) {
      showToast('Please enter street and pincode', 'error');
      return;
    }
    if (editingAddress) {
      updateAddress(editingAddress.id, formData);
      showToast('Address updated successfully', 'success');
    } else {
      const newAddr = addAddress(formData);
      setSelectedAddrId(newAddr.id);
      showToast('New address added', 'success');
    }
    setIsAddressModalOpen(false);
  };

  const handlePlaceOrder = () => {
    const chosenAddress = addresses.find(a => a.id === selectedAddrId) || addresses[0];
    const newOrder = placeOrder({
      restaurantName: cart[0]?.restaurantName || "La Pino'z Pizzeria",
      restaurantId: cart[0]?.restaurantId || "rest-1",
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.unitPrice,
        addOns: item.addOns
      })),
      total: grandTotal,
      address: `${chosenAddress.street}, ${chosenAddress.landmark ? chosenAddress.landmark + ', ' : ''}${chosenAddress.city} ${chosenAddress.pincode}`,
      paymentMethod: paymentMethod.toUpperCase()
    });

    clearCart();
    showToast('Order placed successfully! Redirecting to live tracking...', 'success');
    setTimeout(() => {
      navigate(`/order-tracking/${newOrder.id}`);
    }, 800);
  };

  return (
    <div className="container" style={{ padding: '30px 20px 60px' }}>
      
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/cart">Cart</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>Checkout</span>
      </div>

      <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: '900', marginBottom: '28px' }}>
        Select Delivery Address & Payment
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Address Section */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>1. Delivery Address</h3>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={handleOpenAddAddress}>
                <Plus size={14} /> Add New Address
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {addresses.map(addr => {
                const isSelected = selectedAddrId === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddrId(addr.id)}
                    style={{
                      border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-lg)',
                      padding: '16px',
                      background: isSelected ? 'var(--primary-light)' : 'var(--surface-subtle)',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <Badge variant="primary">{addr.type}</Badge>
                      <button
                        onClick={(e) => handleOpenEditAddress(addr, e)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: '700' }}
                      >
                        <Edit2 size={13} /> Edit
                      </button>
                    </div>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '2px' }}>{addr.name}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '6px' }}>
                      {addr.street}, {addr.landmark ? addr.landmark + ', ' : ''}{addr.city} {addr.pincode}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: '600' }}>
                      Phone: {addr.phone}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Section */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
              <CreditCard size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>2. Payment Method</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* UPI */}
              <div
                onClick={() => setPaymentMethod('upi')}
                style={{
                  border: `1.5px solid ${paymentMethod === 'upi' ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  background: paymentMethod === 'upi' ? 'var(--primary-light)' : 'var(--surface-subtle)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: paymentMethod === 'upi' ? '12px' : '0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Smartphone size={20} color="var(--primary)" />
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Instant UPI (GPay, PhonePe, Paytm)</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Fastest 1-tap payment from your bank account</div>
                    </div>
                  </div>
                  <Badge variant="success">FAST & SECURE</Badge>
                </div>

                {paymentMethod === 'upi' && (
                  <div style={{ display: 'flex', gap: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255, 75, 43, 0.15)' }}>
                    {['gpay', 'phonepe', 'paytm'].map(app => (
                      <button
                        key={app}
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setUpiApp(app); }}
                        className={`chip ${upiApp === app ? 'active' : ''}`}
                        style={{ textTransform: 'uppercase', fontSize: '0.78rem' }}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cards */}
              <div
                onClick={() => setPaymentMethod('card')}
                style={{
                  border: `1.5px solid ${paymentMethod === 'card' ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  background: paymentMethod === 'card' ? 'var(--primary-light)' : 'var(--surface-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <CreditCard size={20} color="var(--primary)" />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Credit / Debit Card</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Visa, Mastercard, RuPay & Amex supported</div>
                </div>
              </div>

              {/* COD */}
              <div
                onClick={() => setPaymentMethod('cod')}
                style={{
                  border: `1.5px solid ${paymentMethod === 'cod' ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  background: paymentMethod === 'cod' ? 'var(--primary-light)' : 'var(--surface-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <Banknote size={20} color="var(--primary)" />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>Cash on Delivery (COD)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Pay cash or scan QR upon doorstep arrival</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Order Bill Summary */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '18px' }}>
            Final Bill Breakdown
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', borderBottom: '1px solid var(--border)', paddingBottom: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Items Total ({cart.length} items)</span>
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
                <span>Coupon Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: '800' }}>Total Amount</span>
            <span style={{ fontSize: '1.6rem', fontWeight: '900', fontFamily: 'Outfit, sans-serif', color: 'var(--primary)' }}>
              ₹{grandTotal}
            </span>
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={handlePlaceOrder}
            style={{ width: '100%', fontWeight: '800' }}
          >
            Pay ₹{grandTotal} & Place Order <ArrowRight size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '16px' }}>
            <ShieldCheck size={16} color="#10B981" />
            <span>256-Bit SSL Encrypted & Bank-Grade Security</span>
          </div>
        </div>

      </div>

      {/* Add / Edit Address Modal */}
      {isAddressModalOpen && (
        <div className="modal-overlay active" onClick={() => setIsAddressModalOpen(false)}>
          <div className="modal-box" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingAddress ? 'Edit Address' : 'Add Delivery Address'}</h3>
              <button className="modal-close" onClick={() => setIsAddressModalOpen(false)}><X size={16} /></button>
            </div>
            <form onSubmit={handleSaveAddress}>
              <div className="modal-body">
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>Address Type</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {['Home', 'Work', 'Other'].map(type => (
                      <button
                        type="button"
                        key={type}
                        className={`chip ${formData.type === type ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, type }))}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>House / Flat / Street Address</label>
                  <input
                    type="text"
                    placeholder="e.g. Flat 402, Sunshine Heights, 15th Main"
                    value={formData.street}
                    onChange={e => setFormData(prev => ({ ...prev, street: e.target.value }))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none' }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>Pincode</label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={e => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none' }}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsAddressModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">{editingAddress ? 'Save Changes' : 'Add Address'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
