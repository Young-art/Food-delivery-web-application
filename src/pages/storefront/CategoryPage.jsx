import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, FOOD_ITEMS } from '../../data/mockData';
import { FoodCard } from '../../components/common/FoodCard';
import { Badge, DietBadge } from '../../components/common/Badge';
import { ChevronRight, Filter, Star, Sparkles, Tag, ArrowUpDown } from 'lucide-react';

export const CategoryPage = () => {
  const { slug } = useParams();
  const currentCategory = CATEGORIES.find(c => c.slug === slug) || CATEGORIES[0];

  const [activeFilter, setActiveFilter] = useState('all'); // all, veg, nonveg, rating4, under250, discount
  const [sortBy, setSortBy] = useState('popular'); // popular, priceLow, priceHigh, rating

  // Filter items in this category
  let categoryItems = FOOD_ITEMS.filter(f => f.category === currentCategory.slug);

  // Apply filters
  if (activeFilter === 'veg') {
    categoryItems = categoryItems.filter(f => f.veg);
  } else if (activeFilter === 'nonveg') {
    categoryItems = categoryItems.filter(f => !f.veg);
  } else if (activeFilter === 'rating4') {
    categoryItems = categoryItems.filter(f => f.rating >= 4.8);
  } else if (activeFilter === 'under250') {
    categoryItems = categoryItems.filter(f => f.price <= 250);
  } else if (activeFilter === 'discount') {
    categoryItems = categoryItems.filter(f => f.price > 300);
  }

  // Apply sorting
  if (sortBy === 'priceLow') {
    categoryItems.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'priceHigh') {
    categoryItems.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    categoryItems.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="container" style={{ padding: '30px 20px 60px' }}>
      
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <span>Categories</span>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>{currentCategory.name}</span>
      </div>

      {/* Hero Category Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 75, 43, 0.1) 0%, rgba(255, 65, 108, 0.05) 100%)',
        border: '1px solid rgba(255, 75, 43, 0.15)',
        borderRadius: 'var(--radius-xl)',
        padding: '36px',
        marginBottom: '32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        alignItems: 'center',
        gap: '24px'
      }}>
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <Badge variant="primary">EXPLORE CATEGORY</Badge>
            <Badge variant="warning">{categoryItems.length} DISHES AVAILABLE</Badge>
          </div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.4rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '10px' }}>
            {currentCategory.name} Delivery
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5', maxWidth: '480px' }}>
            {currentCategory.description}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={currentCategory.image}
            alt={currentCategory.name}
            style={{ width: '220px', height: '160px', borderRadius: 'var(--radius-lg)', objectFit: 'cover', boxShadow: 'var(--shadow-lg)' }}
          />
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div style={{
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '24px',
        scrollbarWidth: 'none'
      }}>
        {CATEGORIES.map(cat => (
          <Link
            key={cat.id}
            to={`/category/${cat.slug}`}
            className={`chip ${cat.slug === currentCategory.slug ? 'active' : ''}`}
            style={{ flexShrink: 0, padding: '8px 16px' }}
          >
            <span style={{ fontWeight: '700' }}>{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* Filter Toolbar */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '14px 18px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Filter size={15} /> Filters:
          </span>
          <button className={`chip ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>
            All Dishes
          </button>
          <button className={`chip ${activeFilter === 'veg' ? 'active' : ''}`} onClick={() => setActiveFilter('veg')}>
            <DietBadge isVeg={true} /> Veg Only
          </button>
          <button className={`chip ${activeFilter === 'nonveg' ? 'active' : ''}`} onClick={() => setActiveFilter('nonveg')}>
            <DietBadge isVeg={false} /> Non Veg
          </button>
          <button className={`chip ${activeFilter === 'rating4' ? 'active' : ''}`} onClick={() => setActiveFilter('rating4')}>
            <Badge variant="warning" style={{ fontSize: '0.68rem', padding: '1px 5px' }}>4.8+</Badge> Top Rated
          </button>
          <button className={`chip ${activeFilter === 'under250' ? 'active' : ''}`} onClick={() => setActiveFilter('under250')}>
            <Badge variant="primary" style={{ fontSize: '0.68rem', padding: '1px 5px' }}>₹250</Badge> Budget Friendly
          </button>
        </div>

        {/* Sorting Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600' }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              background: 'var(--surface-subtle)',
              fontSize: '0.82rem',
              fontWeight: '600',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="popular">Popularity</option>
            <option value="rating">Rating: High to Low</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Dishes Grid */}
      {categoryItems.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {categoryItems.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px' }}>No dishes match the selected filter</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Try resetting your filter to view all delicious options.</p>
          <button className="btn btn-primary btn-sm" onClick={() => setActiveFilter('all')}>
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
