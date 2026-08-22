import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, FOOD_ITEMS, RESTAURANTS } from '../../data/mockData';
import { FoodCard } from '../../components/common/FoodCard';
import { RestaurantCard } from '../../components/common/RestaurantCard';
import { Badge } from '../../components/common/Badge';
import { AnimatedDeliveryRider } from '../../components/common/AnimatedDeliveryRider';
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
  TrendingUp,
  Clock,
  Award,
  Navigation
} from 'lucide-react';

const HERO_CAROUSEL_SLIDES = [
  {
    id: 'pizza',
    categoryName: 'Artisanal Pizza',
    slug: 'pizza',
    tag: 'WOOD-FIRED CRUSTS',
    headline: 'Hot, Fresh Wood-Fired Pizza',
    subtext: 'Authentic San Marzano tomato reduction, melting buffalo mozzarella, artisanal pepperoni & fresh sweet basil.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=85',
    deliveryTime: '20-25 Mins',
    offer: '50% OFF up to ₹100'
  },
  {
    id: 'biryani',
    categoryName: 'Dum Biryani',
    slug: 'biryani',
    tag: 'SLOW-COOKED SAFFRON',
    headline: 'Royal Hyderabadi Dum Biryani',
    subtext: 'Aromatic long-grain basmati rice layered with slow-cooked saffron spiced marinated cuts & mirchi ka salan.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1920&q=85',
    deliveryTime: '25-30 Mins',
    offer: 'Flat ₹125 OFF'
  },
  {
    id: 'burgers',
    categoryName: 'Gourmet Burgers',
    slug: 'burgers',
    tag: 'SMASHED & GRILLED',
    headline: 'Juicy Gourmet Smashed Burgers',
    subtext: 'Double grilled patties, melted aged cheddar, secret house smash sauce on toasted golden brioche buns.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1920&q=85',
    deliveryTime: '15-20 Mins',
    offer: 'Free Fries on ₹299+'
  },
  {
    id: 'chicken',
    categoryName: 'Crispy Chicken',
    slug: 'chicken',
    tag: 'CRUNCHY & JUICY',
    headline: 'Fiery Wings & Crispy Tenders',
    subtext: 'Southern style golden buttermilk fried chicken coated in secret spices with homemade garlic aioli.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1920&q=85',
    deliveryTime: '20 Mins',
    offer: '20% OFF on Buckets'
  },
  {
    id: 'chinese',
    categoryName: 'Chinese Bowls',
    slug: 'chinese',
    tag: 'WOK-TOSSED SPECIALS',
    headline: 'Sizzling Hakka Noodles & Dim Sums',
    subtext: 'Wok-charred wheat noodles tossed with crisp julienned veggies, spring onions and fiery Schezwan glaze.',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1920&q=85',
    deliveryTime: '20-25 Mins',
    offer: 'Free Dim Sum on ₹399+'
  },
  {
    id: 'mexican',
    categoryName: 'Mexican Cravings',
    slug: 'mexican',
    tag: 'ZESTY & LOADED',
    headline: 'Cheesy Loaded Nachos & Tacos',
    subtext: 'Crispy corn tortilla chips drowned in warm melted cheese sauce, refried beans, guacamole & zesty salsa.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1920&q=85',
    deliveryTime: '20 Mins',
    offer: 'Free Salsa Dip with Nachos'
  },
  {
    id: 'healthy-food',
    categoryName: 'Healthy Bowls',
    slug: 'healthy-food',
    tag: 'ORGANIC SUPERFOODS',
    headline: 'Nutrient-Packed Quinoa Bowls',
    subtext: 'Fresh organic Hass avocado, tri-color quinoa, cherry tomatoes, kalamata olives & lemon vinaigrette.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1920&q=85',
    deliveryTime: '15 Mins',
    offer: '100% Organic Ingredients'
  },
  {
    id: 'desserts',
    categoryName: 'Desserts & Gelato',
    slug: 'desserts',
    tag: 'SWEET CRAVINGS',
    headline: 'Molten Choco Lava & Gelato',
    subtext: 'Gushing dark Belgian chocolate fudge cake paired with authentic Italian vanilla bean gelato & brownies.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1920&q=85',
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
      
      {/* Full-Screen Fit Hero Section with Total Background Carousel & Text Overlay */}
      <section 
        className="hero-fullscreen-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Full-Screen Multi-Slide Food Background Layer */}
        <div className="hero-fullscreen-bg-layer">
          {HERO_CAROUSEL_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-fullscreen-bg-slide ${index === activeSlide ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${slide.image})`
              }}
            />
          ))}
          {/* Cinematic Dark Readability Overlay */}
          <div className="hero-fullscreen-overlay" />
        </div>

        {/* Previous & Next Arrow Navigation Overlay Controls */}
        <button 
          className="hero-nav-arrow-overlay hero-nav-arrow-prev" 
          onClick={handlePrevSlide}
          title="Previous Food Category"
        >
          <ChevronLeft size={26} />
        </button>
        <button 
          className="hero-nav-arrow-overlay hero-nav-arrow-next" 
          onClick={handleNextSlide}
          title="Next Food Category"
        >
          <ChevronRight size={26} />
        </button>

        {/* Text & Content Layer Overlaid Directly on Full-Screen Background */}
        <div className="container hero-fullscreen-content">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '40px'
          }}>
            
            {/* Left Content Column */}
            <div style={{ maxWidth: '680px' }}>
              
              {/* Badges Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <Badge variant="primary" style={{ padding: '6px 14px', fontSize: '0.78rem', background: '#FF4B2B', color: '#FFF', borderColor: 'transparent' }}>
                  EXPRESS 30 MIN DELIVERY
                </Badge>
                <Badge variant="warning" style={{ padding: '6px 14px', fontSize: '0.78rem', background: 'rgba(245, 158, 11, 0.25)', color: '#FCD34D', borderColor: 'rgba(245, 158, 11, 0.5)' }}>
                  {currentSlide.tag}
                </Badge>
                <Badge variant="success" style={{ padding: '6px 14px', fontSize: '0.78rem', background: 'rgba(16, 185, 129, 0.25)', color: '#6EE7B7', borderColor: 'rgba(16, 185, 129, 0.5)' }}>
                  {currentSlide.offer}
                </Badge>
              </div>

              {/* Main Headline */}
              <h1 style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(2.4rem, 5.2vw, 3.8rem)',
                fontWeight: '900',
                lineHeight: '1.12',
                color: '#FFFFFF',
                marginBottom: '18px',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
              }}>
                Hot, Fresh <span style={{ color: '#FF4B2B' }}>{currentSlide.categoryName}</span> Delivered to Your Doorstep.
              </h1>

              {/* Description Subtext */}
              <p style={{
                fontSize: '1.1rem',
                color: '#E2E8F0',
                lineHeight: '1.6',
                marginBottom: '28px',
                maxWidth: '620px',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)'
              }}>
                {currentSlide.subtext}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '36px' }}>
                <Link to={`/category/${currentSlide.slug}`} className="btn btn-primary btn-lg" style={{ padding: '14px 32px', fontSize: '1.05rem', boxShadow: '0 8px 25px rgba(255, 75, 43, 0.5)' }}>
                  Explore {currentSlide.categoryName} <ArrowRight size={18} />
                </Link>
                <Link 
                  to="/restaurants" 
                  className="btn btn-secondary btn-lg" 
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFFFFF',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    padding: '14px 28px'
                  }}
                >
                  Browse Restaurants
                </Link>
              </div>

              {/* KPIs & Live Feature Chips */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255, 75, 43, 0.25)', color: '#FF4B2B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Flame size={16} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.15rem', fontWeight: '800', color: '#FFF' }}>50+ Dishes</div>
                    <div style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>10 Fresh Categories</div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.25)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={16} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.15rem', fontWeight: '800', color: '#FFF' }}>30 Mins</div>
                    <div style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>Express Delivery Guarantee</div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.25)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Star size={16} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.15rem', fontWeight: '800', color: '#FFF' }}>4.9 / 5.0</div>
                    <div style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>Verified Customer Reviews</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Animated Scooter Delivery Rider Live Card */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                background: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 'var(--radius-2xl)',
                padding: '24px 28px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
                maxWidth: '420px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative'
              }}>
                
                {/* Live GPS Pulse Indicator */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginBottom: '14px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#10B981',
                      boxShadow: '0 0 10px #10B981',
                      display: 'inline-block'
                    }} />
                    <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#E2E8F0', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      LIVE FLEET TRACKING
                    </span>
                  </div>
                  <Badge variant="primary" style={{ fontSize: '0.72rem', background: '#FF4B2B', color: '#FFF' }}>
                    ON SCOOTER
                  </Badge>
                </div>

                {/* Animated Scooter Rider Component */}
                <AnimatedDeliveryRider size="medium" showRoad={true} />

                {/* Rider Status Details */}
                <div style={{ marginTop: '16px', width: '100%', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#FFFFFF' }}>
                      Vikram S. • Express Courier
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.25)', color: '#6EE7B7', padding: '2px 8px', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: '800' }}>
                      <Zap size={12} /> {currentSlide.deliveryTime}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} color="#10B981" />
                    <span>Holding insulated Foodiez bag • Contactless & Insulated</span>
                  </div>
                </div>

                <Link 
                  to={`/category/${currentSlide.slug}`}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', marginTop: '16px', borderRadius: 'var(--radius-lg)' }}
                >
                  Order {currentSlide.categoryName} Now &rarr;
                </Link>

              </div>
            </div>

          </div>

          {/* Spotlight Category Quick Tabs at the bottom */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '36px', overflowX: 'auto', paddingBottom: '6px', scrollbarWidth: 'none' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#CBD5E1', textTransform: 'uppercase', marginRight: '6px', whiteSpace: 'nowrap' }}>
              Spotlight Categories:
            </span>
            {HERO_CAROUSEL_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`hero-cat-pill-dark ${index === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
              >
                <span>{slide.categoryName}</span>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 10 Food Categories Grid */}
      <section className="container" style={{ marginTop: '50px', marginBottom: '50px' }}>
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
