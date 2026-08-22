import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RESTAURANTS, FOOD_ITEMS, CATEGORIES } from '../../data/mockData';
import { FoodCard } from '../../components/common/FoodCard';
import { Badge } from '../../components/common/Badge';
import { Star, Clock, MapPin, Tag, Search, ChevronRight, Utensils } from 'lucide-react';

export const RestaurantMenu = () => {
  const { id } = useParams();
  const restaurant = RESTAURANTS.find(r => r.id === id) || RESTAURANTS[0];

  const [activeCategory, setActiveCategory] = useState('all');
  const [dishSearch, setDishSearch] = useState('');

  // Filter dishes for this restaurant or general items
  let dishes = FOOD_ITEMS.filter(f => f.restaurantId === restaurant.id || f.restaurantId === 'rest-1');

  if (activeCategory !== 'all') {
    dishes = dishes.filter(f => f.category === activeCategory);
  }

  if (dishSearch.trim()) {
    dishes = dishes.filter(f => f.name.toLowerCase().includes(dishSearch.toLowerCase()) || f.description.toLowerCase().includes(dishSearch.toLowerCase()));
  }

  return (
    <div className="container" style={{ padding: '30px 20px 60px' }}>
      
      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/restaurants">Restaurants</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>{restaurant.name}</span>
      </div>

      {/* Restaurant Hero Card */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-lg)', objectFit: 'cover' }}
          />
          <div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: '900', marginBottom: '4px' }}>
              {restaurant.name}
            </h1>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              {restaurant.cuisine}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} color="var(--primary)" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <span>•</span>
              <div>{restaurant.priceForTwo}</div>
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--surface-subtle)',
          padding: '12px 20px',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
          border: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '1.3rem', fontWeight: '800', color: '#D97706' }}>
            <Star size={18} fill="#F59E0B" color="#F59E0B" />
            <span>{restaurant.rating}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>
            {restaurant.reviewsCount}+ verified ratings
          </div>
        </div>
      </div>

      {/* Menu Layout: Sidebar Categories + Dishes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Category Sidebar */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px',
          position: 'sticky',
          top: '90px'
        }}>
          <div style={{ fontWeight: '800', fontSize: '0.88rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Utensils size={14} /> Menu Categories
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              className={`portal-menu-item ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
              style={{
                background: activeCategory === 'all' ? 'var(--primary-light)' : 'transparent',
                color: activeCategory === 'all' ? 'var(--primary)' : 'var(--text-main)',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span>All Dishes</span>
              <Badge variant="primary">{FOOD_ITEMS.length}</Badge>
            </button>

            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`portal-menu-item ${activeCategory === cat.slug ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.slug)}
                style={{
                  background: activeCategory === cat.slug ? 'var(--primary-light)' : 'transparent',
                  color: activeCategory === cat.slug ? 'var(--primary)' : 'var(--text-main)',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>{cat.name}</span>
                <Badge variant="primary" style={{ fontSize: '0.62rem' }}>{cat.count}</Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Main Dishes Content */}
        <div>
          {/* In-Menu Search */}
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder={`Search dishes in ${restaurant.name}...`}
              value={dishSearch}
              onChange={e => setDishSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Dishes Grid */}
          {dishes.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px'
            }}>
              {dishes.map(food => (
                <FoodCard key={food.id} food={food} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '50px', background: 'var(--surface)', borderRadius: 'var(--radius-lg)' }}>
              <h4>No dishes found matching your search</h4>
              <button className="btn btn-primary btn-sm" style={{ marginTop: '10px' }} onClick={() => setDishSearch('')}>
                Clear Search
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
