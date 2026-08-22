import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Badge } from './Badge';
import { Star, Clock, Heart, Tag } from 'lucide-react';

export const RestaurantCard = ({ restaurant }) => {
  const { favorites, toggleFavoriteRestaurant } = useCart();
  const isFav = favorites.restaurantIds.includes(restaurant.id);

  return (
    <div className="food-card" style={{ cursor: 'pointer' }}>
      <div className="food-card-img-wrap" style={{ height: '180px' }}>
        <Link to={`/restaurant/${restaurant.id}`}>
          <img src={restaurant.image} alt={restaurant.name} className="food-card-img" />
        </Link>
        <div className="food-card-overlay-badge">
          <Badge variant="primary">{restaurant.cuisine.split(',')[0]}</Badge>
          {restaurant.isPromoted && <Badge variant="warning">PROMOTED</Badge>}
        </div>
        <button
          className={`food-card-fav-btn ${isFav ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavoriteRestaurant(restaurant.id);
          }}
          title="Save restaurant"
        >
          <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="food-card-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <Link to={`/restaurant/${restaurant.id}`}>
            <h4 className="food-card-title">{restaurant.name}</h4>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.85rem', fontWeight: '800', background: '#10B981', color: '#FFF', padding: '2px 6px', borderRadius: 'var(--radius-sm)' }}>
            <span>{restaurant.rating}</span>
            <Star size={11} fill="#FFF" color="#FFF" />
          </div>
        </div>

        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
          {restaurant.cuisine}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={13} color="var(--primary)" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <span>•</span>
          <div>{restaurant.priceForTwo}</div>
        </div>

        {restaurant.offer && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            paddingTop: '8px',
            borderTop: '1px dashed var(--border)',
            fontSize: '0.78rem',
            fontWeight: '700',
            color: '#DC2626'
          }}>
            <Tag size={13} />
            <span>{restaurant.offer}</span>
          </div>
        )}
      </div>
    </div>
  );
};
