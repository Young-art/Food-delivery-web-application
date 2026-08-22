import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../common/Toast';
import { Badge, DietBadge } from '../common/Badge';
import { X, Check } from 'lucide-react';

const ADD_ON_OPTIONS = [
  { id: 'extra-cheese', name: 'Extra Mozzarella Cheese', price: 40 },
  { id: 'jalapenos', name: 'Spicy Pickled Jalapenos', price: 25 },
  { id: 'mushrooms', name: 'Grilled Button Mushrooms', price: 35 },
  { id: 'dip-garlic', name: 'Creamy Garlic Herb Dip', price: 30 }
];

export const CustomizerModal = ({ food, onClose }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!food) return null;

  const toggleAddOn = (addon) => {
    setSelectedAddOns(prev => {
      const exists = prev.some(a => a.id === addon.id);
      if (exists) return prev.filter(a => a.id !== addon.id);
      return [...prev, addon];
    });
  };

  const addOnTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const total = (food.price + addOnTotal) * quantity;

  const handleConfirm = () => {
    addToCart(food, quantity, selectedAddOns, instructions);
    showToast(`Added ${food.name} to cart!`, 'success');
    onClose();
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
        
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DietBadge isVeg={food.veg} />
            <h3 className="modal-title" style={{ fontSize: '1.15rem' }}>Customize Dish</h3>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
            <img 
              src={food.image} 
              alt={food.name} 
              style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} 
            />
            <div>
              <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '2px' }}>{food.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{food.description}</div>
              <div style={{ fontWeight: '800', color: 'var(--primary)', fontFamily: 'Outfit, sans-serif' }}>₹{food.price}</div>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px' }}>Select Add-ons</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ADD_ON_OPTIONS.map(addon => {
                const isSelected = selectedAddOns.some(a => a.id === addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddOn(addon)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'var(--primary-light)' : 'var(--surface)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: `1.5px solid ${isSelected ? 'var(--primary)' : '#94A3B8'}`,
                        background: isSelected ? 'var(--primary)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFF'
                      }}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>{addon.name}</span>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)' }}>+₹{addon.price}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '6px' }}>Special Cooking Instructions</div>
            <textarea
              placeholder="e.g. Extra napkins, less spicy, contactless delivery..."
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                outline: 'none',
                height: '65px',
                resize: 'none'
              }}
            />
          </div>
        </div>

        <div className="modal-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Total:</span>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}>₹{total}</span>
          </div>
          <button className="btn btn-primary" onClick={handleConfirm}>
            Add to Cart &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
