import React, { useState } from 'react';
import { RESTAURANTS } from '../../data/mockData';
import { RestaurantCard } from '../../components/common/RestaurantCard';
import { Badge } from '../../components/common/Badge';
import { Search, Filter, Star, Clock } from 'lucide-react';

export const Restaurants = () => {
  const [search, setSearch] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');

  const cuisines = ['all', 'Italian', 'Burgers', 'Biryani', 'Chicken', 'Chinese', 'Mexican'];

  let filtered = RESTAURANTS.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.toLowerCase().includes(search.toLowerCase());
    const matchesCuisine = selectedCuisine === 'all' || r.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase());
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="container" style={{ padding: '30px 20px 60px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <Badge variant="primary">DINING PARTNERS</Badge>
          <Badge variant="warning">{filtered.length} RESTAURANTS OPEN</Badge>
        </div>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: '900' }}>
          Restaurants Delivering Near You
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Explore curated culinary destinations with fast 30-minute contact-free delivery.
        </p>
      </div>

      {/* Search & Cuisines Toolbar */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search restaurant by name or cuisine..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 14px 9px 38px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border)',
              background: 'var(--surface-subtle)',
              fontSize: '0.88rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Cuisine Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {cuisines.map(c => (
            <button
              key={c}
              className={`chip ${selectedCuisine === c ? 'active' : ''}`}
              onClick={() => setSelectedCuisine(c)}
              style={{ textTransform: 'capitalize', padding: '6px 14px' }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {filtered.map(r => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px', background: 'var(--surface)', borderRadius: 'var(--radius-xl)' }}>
          <h3>No restaurants found matching your criteria</h3>
          <button className="btn btn-primary btn-sm" style={{ marginTop: '12px' }} onClick={() => { setSearch(''); setSelectedCuisine('all'); }}>
            Clear Search
          </button>
        </div>
      )}

    </div>
  );
};
