import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, FOOD_ITEMS, RESTAURANTS } from '../../data/mockData';
import { FoodCard } from '../../components/common/FoodCard';
import { RestaurantCard } from '../../components/common/RestaurantCard';
import { Badge } from '../../components/common/Badge';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Tag, Flame, Star, Search } from 'lucide-react';

export const Home = () => {
  const [filterDiet, setFilterDiet] = useState('all'); // all, veg, nonveg

  const topDishes = FOOD_ITEMS.filter(f => {
    if (filterDiet === 'veg') return f.veg;
    if (filterDiet === 'nonveg') return !f.veg;
    return true;
  }).slice(0, 6);

  return (
    <div style={{ paddingBottom: '60px' }}>
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, rgba(255, 241, 235, 0.7) 0%, rgba(248, 250, 252, 0) 100%)',
        padding: '50px 0 60px'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '40px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Badge variant="primary">EXPRESS 30 MIN DELIVERY</Badge>
              <Badge variant="warning">50% OFF FIRST ORDER</Badge>
            </div>

            <h1 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: '900',
              lineHeight: '1.15',
              color: 'var(--text-main)',
              marginBottom: '18px'
            }}>
              Hot, Fresh Food Delivered to Your <span style={{ color: 'var(--primary)' }}>Doorstep</span>.
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '28px', maxWidth: '520px' }}>
              Order your favorite wood-fired pizzas, dum biryanis, gourmet burgers, sizzling Chinese bowls and healthy meals from verified top kitchens.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/category/pizza" className="btn btn-primary btn-lg">
                Explore Cravings <ArrowRight size={18} />
              </Link>
              <Link to="/restaurants" className="btn btn-secondary btn-lg">
                Browse Restaurants
              </Link>
            </div>

            {/* Quick Hero KPIs */}
            <div style={{ display: 'flex', gap: '24px', marginTop: '36px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>50+</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Curated Dishes</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>30 Mins</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Delivery Promise</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>4.9 / 5.0</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Customer Satisfaction</div>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
              alt="Delicious food feast"
              style={{
                width: '100%',
                maxHeight: '440px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl)'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              padding: '12px 18px',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--primary)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={20} />
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '0.9rem' }}>Fast Delivery</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Live Driver Tracking Enabled</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Food Categories Grid */}
      <section className="container" style={{ marginTop: '20px', marginBottom: '50px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Sparkles size={16} color="var(--primary)" />
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase' }}>Inspiration For Your Cravings</span>
            </div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: '800' }}>Explore Popular Categories</h2>
          </div>
          <Link to="/category/pizza" style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View All <ArrowRight size={15} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
          gap: '16px'
        }}>
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px 10px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'var(--primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-main)' }}>{cat.name}</div>
              <Badge variant="primary" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>{cat.count} DISHES</Badge>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated Featured Dishes */}
      <section className="container" style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Flame size={16} color="var(--primary)" />
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase' }}>Chef's Recommendations</span>
            </div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: '800' }}>Top Rated Dishes Delivering Now</h2>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className={`chip ${filterDiet === 'all' ? 'active' : ''}`} onClick={() => setFilterDiet('all')}>All Dishes</button>
            <button className={`chip ${filterDiet === 'veg' ? 'active' : ''}`} onClick={() => setFilterDiet('veg')}>Pure Veg</button>
            <button className={`chip ${filterDiet === 'nonveg' ? 'active' : ''}`} onClick={() => setFilterDiet('nonveg')}>Non Veg</button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: '24px'
        }}>
          {topDishes.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>

      {/* Popular Restaurant Chains */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Star size={16} color="#D97706" />
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#D97706', textTransform: 'uppercase' }}>Verified Dining Partners</span>
            </div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: '800' }}>Popular Restaurants in Town</h2>
          </div>
          <Link to="/restaurants" style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            All Restaurants <ArrowRight size={15} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {RESTAURANTS.map(rest => (
            <RestaurantCard key={rest.id} restaurant={rest} />
          ))}
        </div>
      </section>

    </div>
  );
};
