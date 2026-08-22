import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, FOOD_ITEMS, RESTAURANTS } from '../../data/mockData';
import { FoodCard } from '../../components/common/FoodCard';
import { RestaurantCard } from '../../components/common/RestaurantCard';
import { Badge } from '../../components/common/Badge';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Tag, 
  Flame, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp 
} from 'lucide-react';

const HERO_CAROUSEL_SLIDES = [
  {
    id: 'pizza',
    categoryName: 'Artisanal Pizza',
    slug: 'pizza',
    tag: 'WOOD-FIRED CRUSTS',
    headline: 'Hot, Fresh Wood-Fired Pizza',
    subtext: 'Crafted with authentic San Marzano tomato reduction, melting buffalo mozzarella & fresh sweet basil.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80',
    deliveryTime: '20-25 Mins',
    offer: '50% OFF up to ₹100'
  },
  {
    id: 'biryani',
    categoryName: 'Dum Biryani',
    slug: 'biryani',
    tag: 'SLOW-COOKED SAFFRON',
    headline: 'Royal Hyderabadi Dum Biryani',
    subtext: 'Aromatic basmati rice layered with slow-cooked marinated cuts, caramelized onions & spicy salan.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1600&q=80',
    deliveryTime: '25-30 Mins',
    offer: 'Flat ₹125 OFF'
  },
  {
    id: 'burgers',
    categoryName: 'Gourmet Burgers',
    slug: 'burgers',
    tag: 'SMASHED & GRILLED',
    headline: 'Juicy Gourmet Smashed Burgers',
    subtext: 'Double grilled patties, melted aged cheddar, secret house smash sauce on toasted golden brioche.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=80',
    deliveryTime: '15-20 Mins',
    offer: 'Free Fries with Burger'
  },
  {
    id: 'chicken',
    categoryName: 'Crispy Chicken',
    slug: 'chicken',
    tag: 'CRUNCHY & JUICY',
    headline: 'Fiery Wings & Crispy Tenders',
    subtext: 'Southern style buttermilk fried chicken coated in secret herbs with hot garlic dip.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1600&q=80',
    deliveryTime: '20 Mins',
    offer: '20% OFF on Buckets'
  },
  {
    id: 'chinese',
    categoryName: 'Chinese Bowls',
    slug: 'chinese',
    tag: 'WOK-TOSSED SPECIALS',
    headline: 'Sizzling Hakka Noodles & Dim Sums',
    subtext: 'Wok-charred noodles tossed with crisp julienned vegetables and fiery Schezwan glaze.',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1600&q=80',
    deliveryTime: '20-25 Mins',
    offer: 'Free Dim Sum on ₹399+'
  },
  {
    id: 'healthy-food',
    categoryName: 'Healthy Bowls',
    slug: 'healthy-food',
    tag: 'ORGANIC SUPERFOODS',
    headline: 'Nutrient-Packed Quinoa Bowls',
    subtext: 'Fresh organic Hass avocado, tri-color quinoa, cherry tomatoes, kalamata olives & lemon vinaigrette.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=80',
    deliveryTime: '15 Mins',
    offer: '100% Organic Ingredients'
  },
  {
    id: 'desserts',
    categoryName: 'Desserts & Gelato',
    slug: 'desserts',
    tag: 'SWEET CRAVINGS',
    headline: 'Molten Choco Lava & Gelato',
    subtext: 'Gushing dark Belgian chocolate fudge cake paired with authentic Italian vanilla bean gelato.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1600&q=80',
    deliveryTime: '10-15 Mins',
    offer: 'Buy 1 Get 1 on Scoops'
  }
];

export const Home = () => {
  const [filterDiet, setFilterDiet] = useState('all'); // all, veg, nonveg
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto rotate hero background carousel every 3.8 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % HERO_CAROUSEL_SLIDES.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSlide = HERO_CAROUSEL_SLIDES[activeSlide];

  const handlePrevSlide = () => {
    setActiveSlide(prev => (prev === 0 ? HERO_CAROUSEL_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide(prev => (prev + 1) % HERO_CAROUSEL_SLIDES.length);
  };

  const topDishes = FOOD_ITEMS.filter(f => {
    if (filterDiet === 'veg') return f.veg;
    if (filterDiet === 'nonveg') return !f.veg;
    return true;
  }).slice(0, 6);

  return (
    <div style={{ paddingBottom: '60px' }}>
      
      {/* Dynamic Total Background Food Carousel Hero Section */}
      <section 
        className="hero-carousel-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Multi-Slide Total Background Food Layers */}
        <div className="hero-bg-layer">
          {HERO_CAROUSEL_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-bg-slide ${index === activeSlide ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${slide.image})`
              }}
            />
          ))}
          {/* Ambient Lighting & Readability Gradient Overlay */}
          <div className="hero-bg-overlay" />
        </div>

        {/* Hero Interactive Content Layer */}
        <div className="container hero-content-layer">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '40px'
          }}>
            
            {/* Left Hero Messaging */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Badge variant="primary">EXPRESS 30 MIN DELIVERY</Badge>
                <Badge variant="warning">{currentSlide.tag}</Badge>
              </div>

              <h1 style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                fontWeight: '900',
                lineHeight: '1.15',
                color: 'var(--text-main)',
                marginBottom: '18px'
              }}>
                Hot, Fresh <span style={{ color: 'var(--primary)' }}>{currentSlide.categoryName}</span> Delivered to Your Doorstep.
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '28px', maxWidth: '520px' }}>
                {currentSlide.subtext}
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link to={`/category/${currentSlide.slug}`} className="btn btn-primary btn-lg">
                  Explore {currentSlide.categoryName} <ArrowRight size={18} />
                </Link>
                <Link to="/restaurants" className="btn btn-secondary btn-lg">
                  Browse Restaurants
                </Link>
              </div>

              {/* Quick Hero KPIs */}
              <div style={{ display: 'flex', gap: '24px', marginTop: '36px', paddingTop: '24px', borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
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

            {/* Right Food Showcase Card Carousel */}
            <div style={{ position: 'relative' }}>
              
              <div className="hero-showcase-box">
                {HERO_CAROUSEL_SLIDES.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`hero-showcase-slide ${index === activeSlide ? 'active' : ''}`}
                    style={{
                      backgroundImage: `url(${slide.image})`
                    }}
                  />
                ))}

                {/* Left & Right Arrow Controls */}
                <button 
                  className="hero-nav-arrow hero-nav-prev" 
                  onClick={handlePrevSlide}
                  title="Previous Category"
                >
                  <ChevronLeft size={22} />
                </button>
                <button 
                  className="hero-nav-arrow hero-nav-next" 
                  onClick={handleNextSlide}
                  title="Next Category"
                >
                  <ChevronRight size={22} />
                </button>

                {/* Active Category Overlay Card */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  padding: '14px 20px',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--primary)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Zap size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                        {currentSlide.categoryName}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Express {currentSlide.deliveryTime} • {currentSlide.offer}
                      </div>
                    </div>
                  </div>

                  <Link 
                    to={`/category/${currentSlide.slug}`}
                    className="btn btn-primary btn-sm"
                    style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)' }}
                  >
                    Order Now &rarr;
                  </Link>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Category Carousel Tabs / Ticker */}
          <div className="hero-category-dots">
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: '4px' }}>
              Spotlight Categories:
            </span>
            {HERO_CAROUSEL_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`hero-cat-pill ${index === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
              >
                <span>{slide.categoryName}</span>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 10 Food Categories Grid */}
      <section className="container" style={{ marginTop: '30px', marginBottom: '50px' }}>
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
