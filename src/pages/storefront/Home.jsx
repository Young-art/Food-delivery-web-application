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
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  Utensils
} from 'lucide-react';

const HERO_SLIDES = [
  {
    category: "Artisanal Pizza",
    slug: "pizza",
    badge: "WOOD-FIRED CRUST",
    title: "Classic Margherita & Truffle Mushroom Special",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
    rating: "4.9",
    prepTime: "20 Mins",
    offer: "Flat 50% OFF"
  },
  {
    category: "Dum Biryani",
    slug: "biryani",
    badge: "ROYAL HYDERABADI",
    title: "Slow Dum-Cooked Saffron Basmati Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
    rating: "4.9",
    prepTime: "25 Mins",
    offer: "Royal Feast Special"
  },
  {
    category: "Gourmet Burgers",
    slug: "burgers",
    badge: "CRISPY & SMASHED",
    title: "Double Cheddar Smash Patty Brioche Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    rating: "4.8",
    prepTime: "15 Mins",
    offer: "Buy 1 Get 1"
  },
  {
    category: "Crispy Chicken",
    slug: "chicken",
    badge: "HOT & SPICY",
    title: "Southern Fried Crispy Wings & Tenders",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80",
    rating: "4.8",
    prepTime: "20 Mins",
    offer: "20% OFF Buckets"
  },
  {
    category: "Chinese Bowls",
    slug: "chinese",
    badge: "WOK-TOSSED",
    title: "Sichuan Hakka Noodles & Crispy Spring Rolls",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1200&q=80",
    rating: "4.7",
    prepTime: "15 Mins",
    offer: "Free Dim Sums"
  },
  {
    category: "Desserts & Gelato",
    slug: "desserts",
    badge: "MOLTEN CHOCO",
    title: "Belgian Molten Lava Cake & Italian Gelato",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",
    rating: "4.9",
    prepTime: "10 Mins",
    offer: "Sweet Delight"
  }
];

export const Home = () => {
  const [filterDiet, setFilterDiet] = useState('all'); // all, veg, nonveg
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play carousel every 3.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 3800);

    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const topDishes = FOOD_ITEMS.filter(f => {
    if (filterDiet === 'veg') return f.veg;
    if (filterDiet === 'nonveg') return !f.veg;
    return true;
  }).slice(0, 6);

  const activeFoodSlide = HERO_SLIDES[currentSlide];

  return (
    <div style={{ paddingBottom: '60px' }}>
      
      {/* Hero Section with Food Photos Carousel Background & Foreground */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '50px 0 65px',
        background: 'linear-gradient(180deg, rgba(255, 241, 235, 0.75) 0%, rgba(248, 250, 252, 0.95) 100%)'
      }}>
        
        {/* Ambient Carousel Backdrop Glow */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '55%',
          backgroundImage: `url(${activeFoodSlide.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
          filter: 'blur(30px)',
          transition: 'background-image 0.8s ease-in-out',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '40px',
          flexWrap: 'wrap'
        }}>
          
          {/* Left Text Container - Guaranteed Non-Shrinking Layout */}
          <div style={{
            flex: '1 1 520px',
            minWidth: '320px',
            maxWidth: '620px',
            flexShrink: 0
          }}>
            
            {/* Top Badges Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <Badge variant="primary">EXPRESS 30 MIN DELIVERY</Badge>
              <Badge variant="warning">50% OFF FIRST ORDER</Badge>
              <Badge variant="success" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={11} /> {activeFoodSlide.category.toUpperCase()}
              </Badge>
            </div>

            {/* Main Non-Shrinking Heading */}
            <h1 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(2.3rem, 4.5vw, 3.5rem)',
              fontWeight: '900',
              lineHeight: '1.15',
              color: 'var(--text-main)',
              marginBottom: '18px',
              letterSpacing: '-0.5px'
            }}>
              Hot, Fresh Food Delivered to Your <span style={{ color: 'var(--primary)' }}>Doorstep</span>.
            </h1>

            {/* Description Subtitle */}
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              lineHeight: '1.6',
              marginBottom: '28px',
              maxWidth: '540px'
            }}>
              Order your favorite wood-fired pizzas, dum biryanis, gourmet burgers, sizzling Chinese bowls and healthy meals from verified top kitchens.
            </p>

            {/* Action CTA Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '36px' }}>
              <Link to={`/category/${activeFoodSlide.slug}`} className="btn btn-primary btn-lg">
                Explore {activeFoodSlide.category} <ArrowRight size={18} />
              </Link>
              <Link to="/restaurants" className="btn btn-secondary btn-lg">
                Browse Restaurants
              </Link>
            </div>

            {/* Quick Hero KPIs */}
            <div style={{
              display: 'flex',
              gap: '28px',
              paddingTop: '24px',
              borderTop: '1px solid var(--border)',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-main)' }}>50+</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Curated Dishes</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-main)' }}>30 Mins</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Delivery Promise</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-main)' }}>4.9 / 5.0</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Customer Rating</div>
              </div>
            </div>

          </div>

          {/* Right Hero Food Carousel Showcase */}
          <div style={{
            flex: '1 1 440px',
            minWidth: '320px',
            maxWidth: '560px',
            position: 'relative'
          }}>
            
            {/* Main Visual Card Container */}
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              background: '#0F172A',
              aspectRatio: '4 / 3',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              
              {/* Carousel Image with Smooth Fade */}
              <img
                key={activeFoodSlide.slug}
                src={activeFoodSlide.image}
                alt={activeFoodSlide.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  animation: 'fadeIn 0.5s ease-in-out'
                }}
              />

              {/* Gradient Overlay for text contrast */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.4) 60%, rgba(15, 23, 42, 0.85) 100%)'
              }} />

              {/* Top Category Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                display: 'flex',
                gap: '8px'
              }}>
                <Badge variant="primary" style={{ padding: '6px 12px', fontSize: '0.75rem', fontWeight: '800' }}>
                  {activeFoodSlide.badge}
                </Badge>
                <Badge variant="warning" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                  {activeFoodSlide.offer}
                </Badge>
              </div>

              {/* Bottom Details Banner */}
              <div style={{
                position: 'absolute',
                bottom: '18px',
                left: '18px',
                right: '18px',
                color: '#FFF'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Star size={13} fill="#F59E0B" /> {activeFoodSlide.rating} Rating
                  </span>
                  <span>•</span>
                  <span style={{ fontSize: '0.8rem', color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Clock size={13} color="var(--primary)" /> {activeFoodSlide.prepTime}
                  </span>
                </div>

                <Link to={`/category/${activeFoodSlide.slug}`}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '800',
                    fontFamily: 'Outfit, sans-serif',
                    color: '#FFF',
                    marginBottom: '8px',
                    lineHeight: '1.3'
                  }}>
                    {activeFoodSlide.title} &rarr;
                  </h3>
                </Link>

                {/* Progress Indicators & Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {HERO_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        style={{
                          width: idx === currentSlide ? '24px' : '8px',
                          height: '8px',
                          borderRadius: 'var(--radius-full)',
                          background: idx === currentSlide ? 'var(--primary)' : 'rgba(255, 255, 255, 0.4)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={handlePrevSlide}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(4px)',
                        border: 'none',
                        color: '#FFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <button
                      onClick={handleNextSlide}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(4px)',
                        border: 'none',
                        color: '#FFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Floating Live Delivery Badge */}
            <div style={{
              position: 'absolute',
              bottom: '-16px',
              left: '-14px',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(10px)',
              padding: '10px 16px',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 10
            }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Zap size={18} />
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '0.85rem' }}>Fast Delivery</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>30 Mins Hot to Doorstep</div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* 10 Food Categories Grid */}
      <section className="container" style={{ marginTop: '24px', marginBottom: '50px' }}>
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
