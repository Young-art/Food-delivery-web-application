import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FOOD_ITEMS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../components/common/Toast';
import { Badge, DietBadge } from '../../components/common/Badge';
import { Star, Clock, Flame, Heart, Plus, Minus, ChevronRight, Check } from 'lucide-react';

export const FoodDetails = () => {
  const { id } = useParams();
  const food = FOOD_ITEMS.find(f => f.id === id) || FOOD_ITEMS[0];

  const { addToCart, favorites, toggleFavoriteFood } = useCart();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');

  const isFav = favorites.foodIds.includes(food.id);

  const handleAdd = () => {
    addToCart(food, quantity, [], instructions);
    showToast(`Added ${quantity}x ${food.name} to cart!`, 'success');
  };

  return (
    <div className="container" style={{ padding: '30px 20px 60px' }}>
      
      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to={`/category/${food.category}`}>{food.category.toUpperCase()}</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>{food.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
        
        {/* Image Card */}
        <div style={{ position: 'relative' }}>
          <img
            src={food.image}
            alt={food.name}
            style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)' }}
          />
          <button
            className={`food-card-fav-btn ${isFav ? 'active' : ''}`}
            onClick={() => toggleFavoriteFood(food.id)}
            style={{ width: '42px', height: '42px', top: '16px', right: '16px' }}
          >
            <Heart size={20} fill={isFav ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Details & Ordering */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <DietBadge isVeg={food.veg} />
            <Badge variant="primary">{food.category}</Badge>
            {food.isBestseller && <Badge variant="warning">BESTSELLER</Badge>}
          </div>

          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '8px' }}>
            {food.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '1rem', fontWeight: '800', color: '#D97706' }}>
              <Star size={18} fill="#F59E0B" color="#F59E0B" />
              <span>{food.rating} ({food.reviewsCount} customer reviews)</span>
            </div>
            <span>•</span>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{food.restaurantName}</div>
          </div>

          <div style={{ fontSize: '1.8rem', fontWeight: '900', fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)', marginBottom: '16px' }}>
            ₹{food.price}
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
            {food.description}
          </p>

          {/* Highlights */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Prep Time</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)' }}>{food.prepTime || '20 Mins'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Calories</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)' }}>{food.calories || '650 kcal'}</div>
            </div>
          </div>

          {/* Ingredients list */}
          {food.ingredients && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px' }}>Key Ingredients</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {food.ingredients.map((ing, i) => (
                  <Badge key={i} variant="primary">{ing}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--surface-subtle)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border)',
              padding: '4px'
            }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', background: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Minus size={14} />
              </button>
              <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: '800' }}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', background: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              className="btn btn-primary btn-lg"
              onClick={handleAdd}
              style={{ flex: 1 }}
            >
              Add {quantity} to Cart • ₹{food.price * quantity}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
