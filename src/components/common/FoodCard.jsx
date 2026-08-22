import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Badge, DietBadge } from './Badge';
import { CustomizerModal } from '../modals/CustomizerModal';
import { Star, Heart, Plus } from 'lucide-react';

export const FoodCard = ({ food }) => {
  const { favorites, toggleFavoriteFood, addToCart } = useCart();
  const [showCustomizer, setShowCustomizer] = useState(false);

  const isFav = favorites.foodIds.includes(food.id);

  return (
    <>
      <div className="food-card">
        <div className="food-card-img-wrap">
          <Link to={`/food/${food.id}`}>
            <img src={food.image} alt={food.name} className="food-card-img" />
          </Link>
          <div className="food-card-overlay-badge">
            <Badge variant="primary">{food.category}</Badge>
            {food.isBestseller && <Badge variant="warning">BESTSELLER</Badge>}
          </div>
          <button
            className={`food-card-fav-btn ${isFav ? 'active' : ''}`}
            onClick={() => toggleFavoriteFood(food.id)}
            title="Save to favorites"
          >
            <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="food-card-body">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <DietBadge isVeg={food.veg} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.82rem', fontWeight: '700', color: '#D97706' }}>
              <Star size={13} fill="#F59E0B" color="#F59E0B" />
              <span>{food.rating} ({food.reviewsCount})</span>
            </div>
          </div>

          <Link to={`/food/${food.id}`}>
            <h4 className="food-card-title">{food.name}</h4>
          </Link>
          <p className="food-card-desc">{food.description}</p>

          <div className="food-card-footer">
            <div className="food-price">₹{food.price}</div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setShowCustomizer(true)}
              style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)' }}
            >
              <Plus size={14} /> Add
            </button>
          </div>
        </div>
      </div>

      {showCustomizer && (
        <CustomizerModal food={food} onClose={() => setShowCustomizer(false)} />
      )}
    </>
  );
};
