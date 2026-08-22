import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FOOD_ITEMS, RESTAURANTS } from '../../data/mockData';
import { FoodCard } from '../../components/common/FoodCard';
import { RestaurantCard } from '../../components/common/RestaurantCard';
import { Badge } from '../../components/common/Badge';
import { Heart, ChevronRight, ShoppingBag } from 'lucide-react';

export const Favorites = () => {
  const { favorites } = useCart();
  const [tab, setTab] = useState('dishes'); // dishes, restaurants

  const savedFoods = FOOD_ITEMS.filter(f => favorites.foodIds.includes(f.id));
  const savedRestaurants = RESTAURANTS.filter(r => favorites.restaurantIds.includes(r.id));

  return (
    <div className="container" style={{ padding: '30px 20px 60px' }}>
      
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>Favourites</span>
      </div>

      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
          <Badge variant="primary">SAVED WISHLIST</Badge>
        </div>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: '900' }}>
          Your Favorite Cravings & Kitchens
        </h1>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
        <button
          className={`chip ${tab === 'dishes' ? 'active' : ''}`}
          onClick={() => setTab('dishes')}
          style={{ padding: '8px 18px', fontWeight: '700' }}
        >
          <span>Saved Dishes</span>
          <Badge variant="primary">{savedFoods.length}</Badge>
        </button>

        <button
          className={`chip ${tab === 'restaurants' ? 'active' : ''}`}
          onClick={() => setTab('restaurants')}
          style={{ padding: '8px 18px', fontWeight: '700' }}
        >
          <span>Saved Restaurants</span>
          <Badge variant="primary">{savedRestaurants.length}</Badge>
        </button>
      </div>

      {tab === 'dishes' ? (
        savedFoods.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {savedFoods.map(food => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '70px', background: 'var(--surface)', borderRadius: 'var(--radius-xl)' }}>
            <Heart size={44} color="#FF4B2B" style={{ marginBottom: '14px' }} />
            <h3>No saved dishes yet</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px' }}>Click the heart icon on any food item to save your top cravings here.</p>
            <Link to="/category/pizza" className="btn btn-primary btn-sm">Explore Menu</Link>
          </div>
        )
      ) : (
        savedRestaurants.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {savedRestaurants.map(rest => (
              <RestaurantCard key={rest.id} restaurant={rest} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '70px', background: 'var(--surface)', borderRadius: 'var(--radius-xl)' }}>
            <Heart size={44} color="#FF4B2B" style={{ marginBottom: '14px' }} />
            <h3>No saved restaurants yet</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px' }}>Save your favorite dining partners for quick access.</p>
            <Link to="/restaurants" className="btn btn-primary btn-sm">Explore Restaurants</Link>
          </div>
        )
      )}

    </div>
  );
};
