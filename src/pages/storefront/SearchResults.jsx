import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FOOD_ITEMS, RESTAURANTS, CATEGORIES } from '../../data/mockData';
import { FoodCard } from '../../components/common/FoodCard';
import { RestaurantCard } from '../../components/common/RestaurantCard';
import { Badge, DietBadge } from '../../components/common/Badge';
import { Search, Filter, Sparkles, ChevronRight, Utensils, Store } from 'lucide-react';

export const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [activeDiet, setActiveDiet] = useState('all'); // all, veg, nonveg, topRated, under250
  const [tab, setTab] = useState('all'); // all, dishes, restaurants

  const cleanQuery = query.toLowerCase().trim();

  // Search logic across items
  let matchedFoods = FOOD_ITEMS.filter(f => {
    if (!cleanQuery) return true;
    const inName = f.name.toLowerCase().includes(cleanQuery);
    const inCat = f.category.toLowerCase().includes(cleanQuery);
    const inDesc = f.description.toLowerCase().includes(cleanQuery);
    const inRest = f.restaurantName.toLowerCase().includes(cleanQuery);
    const inIng = f.ingredients?.some(i => i.toLowerCase().includes(cleanQuery));
    return inName || inCat || inDesc || inRest || inIng;
  });

  // Search logic across restaurants
  let matchedRestaurants = RESTAURANTS.filter(r => {
    if (!cleanQuery) return true;
    const inName = r.name.toLowerCase().includes(cleanQuery);
    const inCuisine = r.cuisine.toLowerCase().includes(cleanQuery);
    const inOffer = r.offer?.toLowerCase().includes(cleanQuery);
    return inName || inCuisine || inOffer;
  });

  // Dietary filters
  if (activeDiet === 'veg') {
    matchedFoods = matchedFoods.filter(f => f.veg);
  } else if (activeDiet === 'nonveg') {
    matchedFoods = matchedFoods.filter(f => !f.veg);
  } else if (activeDiet === 'topRated') {
    matchedFoods = matchedFoods.filter(f => f.rating >= 4.8);
  } else if (activeDiet === 'under250') {
    matchedFoods = matchedFoods.filter(f => f.price <= 250);
  }

  const totalMatches = matchedFoods.length + matchedRestaurants.length;

  return (
    <div className="container" style={{ padding: '30px 20px 60px' }}>
      
      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <span>Search</span>
        {query && (
          <>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>"{query}"</span>
          </>
        )}
      </div>

      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <Badge variant="primary">SEARCH RESULTS</Badge>
          <Badge variant={totalMatches > 0 ? 'success' : 'warning'}>
            {totalMatches} RESULTS FOUND
          </Badge>
        </div>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: '900' }}>
          {query ? `Showing results for "${query}"` : 'Explore All Food & Restaurants'}
        </h1>
      </div>

      {/* Filters Toolbar */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '14px 20px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        {/* Result Type Tabs */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`chip ${tab === 'all' ? 'active' : ''}`}
            onClick={() => setTab('all')}
          >
            All Results ({totalMatches})
          </button>
          <button
            className={`chip ${tab === 'dishes' ? 'active' : ''}`}
            onClick={() => setTab('dishes')}
          >
            Dishes ({matchedFoods.length})
          </button>
          <button
            className={`chip ${tab === 'restaurants' ? 'active' : ''}`}
            onClick={() => setTab('restaurants')}
          >
            Restaurants ({matchedRestaurants.length})
          </button>
        </div>

        {/* Dietary Quick Filter Chips */}
        {tab !== 'restaurants' && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button className={`chip ${activeDiet === 'all' ? 'active' : ''}`} onClick={() => setActiveDiet('all')}>
              All Dishes
            </button>
            <button className={`chip ${activeDiet === 'veg' ? 'active' : ''}`} onClick={() => setActiveDiet('veg')}>
              <DietBadge isVeg={true} /> Pure Veg
            </button>
            <button className={`chip ${activeDiet === 'nonveg' ? 'active' : ''}`} onClick={() => setActiveDiet('nonveg')}>
              <DietBadge isVeg={false} /> Non Veg
            </button>
            <button className={`chip ${activeDiet === 'topRated' ? 'active' : ''}`} onClick={() => setActiveDiet('topRated')}>
              ⭐ 4.8+ Top Rated
            </button>
            <button className={`chip ${activeDiet === 'under250' ? 'active' : ''}`} onClick={() => setActiveDiet('under250')}>
              ₹ Under ₹250
            </button>
          </div>
        )}
      </div>

      {/* Results Content */}
      {totalMatches > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* Dishes Section */}
          {(tab === 'all' || tab === 'dishes') && matchedFoods.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <Utensils size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Matched Dishes ({matchedFoods.length})</h3>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {matchedFoods.map(food => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            </div>
          )}

          {/* Restaurants Section */}
          {(tab === 'all' || tab === 'restaurants') && matchedRestaurants.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <Store size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Matched Restaurants ({matchedRestaurants.length})</h3>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px'
              }}>
                {matchedRestaurants.map(rest => (
                  <RestaurantCard key={rest.id} restaurant={rest} />
                ))}
              </div>
            </div>
          )}

        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '70px 20px', background: 'var(--surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}>
          <Search size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px' }}>No exact matches found for "{query}"</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>Try searching for popular terms like Pizza, Biryani, Burgers, Wings or Ice Cream.</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', maxWidth: '600px', margin: '0 auto' }}>
            {CATEGORIES.map(cat => (
              <Link key={cat.id} to={`/category/${cat.slug}`} className="chip" style={{ fontWeight: '700' }}>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
