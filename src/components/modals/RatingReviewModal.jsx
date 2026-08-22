import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useToast } from '../common/Toast';
import { Star, X } from 'lucide-react';

export const RatingReviewModal = ({ order, onClose }) => {
  const { addOrderRating } = useOrders();
  const { showToast } = useToast();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');

  if (!order) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrderRating(order.id, rating, review);
    showToast('Thank you for your rating & feedback!', 'success');
    onClose();
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
        
        <div className="modal-header">
          <h3 className="modal-title" style={{ fontSize: '1.15rem' }}>Rate Order {order.id}</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: '700', fontSize: '1.05rem', marginBottom: '4px' }}>
              {order.restaurantName}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
              How was the taste and delivery experience?
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: (hoverRating || rating) >= star ? '#F59E0B' : '#CBD5E1',
                    transform: (hoverRating || rating) >= star ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 0.15s'
                  }}
                >
                  <Star size={32} fill={(hoverRating || rating) >= star ? '#F59E0B' : 'none'} />
                </button>
              ))}
            </div>

            <div style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                Write a quick review
              </label>
              <textarea
                placeholder="Delicious flavor, hot packaging, fast delivery partner..."
                value={review}
                onChange={e => setReview(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  height: '75px',
                  resize: 'none'
                }}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Submit Review
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
