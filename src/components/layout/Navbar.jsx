import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useLocation } from '../../context/LocationContext';
import { CATEGORIES, FOOD_ITEMS, RESTAURANTS } from '../../data/mockData';
import { Badge, DietBadge } from '../common/Badge';
import { 
  MapPin, 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  ChevronDown, 
  Shield, 
  ChefHat, 
  Bike, 
  Clock, 
  Home, 
  LayoutGrid, 
  UtensilsCrossed,
  X,
  Star,
  Flame,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

const TRENDING_SEARCHES = [
  "Margherita Pizza",
  "Dum Biryani",
  "Smash Burger",
  "Chicken Wings",
  "Hakka Noodles",
  "Avocado Bowl",
  "Choco Lava",
  "Cold Coffee"
];

const SEARCH_CAROUSEL_WORDS = [
  'pizza',
  'biryani',
  'burger',
  'noodles',
  'chicken',
  'cake',
  'coffee',
  'pasta',
  'tacos',
  'ice cream'
];

export const Navbar = () => {
  const { user } = useAuth();
  const { count, favorites } = useCart();
  const { selectedLocation, setIsLocationModalOpen } = useLocation();
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [matchedDishes, setMatchedDishes] = useState([]);
  const [matchedRests, setMatchedRests] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  const searchBoxRef = useRef(null);
  const userMenuRef = useRef(null);
  const categoriesMenuRef = useRef(null);

  // Rotate single-word carousel every 2.4 seconds from right to left
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % SEARCH_CAROUSEL_WORDS.length);
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  // Close popovers on click / tap outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
      if (categoriesMenuRef.current && !categoriesMenuRef.current.contains(event.target)) {
        setShowCategoriesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  const executeSearch = (val) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setMatchedDishes([]);
      setMatchedRests([]);
      return;
    }
    const q = val.toLowerCase().trim();

    // Search across food items
    const foods = FOOD_ITEMS.filter(f => {
      const inName = f.name.toLowerCase().includes(q);
      const inCat = f.category.toLowerCase().includes(q);
      const inDesc = f.description.toLowerCase().includes(q);
      const inRest = f.restaurantName.toLowerCase().includes(q);
      const inIng = f.ingredients?.some(i => i.toLowerCase().includes(q));
      return inName || inCat || inDesc || inRest || inIng;
    }).slice(0, 5);

    // Search across restaurants
    const rests = RESTAURANTS.filter(r => {
      const inName = r.name.toLowerCase().includes(q);
      const inCuisine = r.cuisine.toLowerCase().includes(q);
      const inOffer = r.offer?.toLowerCase().includes(q);
      return inName || inCuisine || inOffer;
    }).slice(0, 3);

    setMatchedDishes(foods);
    setMatchedRests(rests);
    setShowSearchDropdown(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim()) {
        setShowSearchDropdown(false);
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  const handleSelectFood = (food) => {
    setSearchQuery('');
    setShowSearchDropdown(false);
    navigate(`/food/${food.id}`);
  };

  const handleSelectRestaurant = (rest) => {
    setSearchQuery('');
    setShowSearchDropdown(false);
    navigate(`/restaurant/${rest.id}`);
  };

  const handleSelectTrending = (tag) => {
    setSearchQuery(tag);
    executeSearch(tag);
  };

  const handleViewAllResults = () => {
    setShowSearchDropdown(false);
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const isHomeActive = routerLocation.pathname === '/';
  const isCategoriesActive = routerLocation.pathname.startsWith('/category');
  const isFavoritesActive = routerLocation.pathname === '/favorites';
  const isOrdersActive = routerLocation.pathname === '/orders';

  return (
    <header className="navbar">
      <div className="container nav-container">
        
        {/* Brand Logo & Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link to="/" className="brand-logo">
            <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
              <ShoppingBag size={24} />
            </span>
            <span>Foodiez<span className="dot">.</span></span>
          </Link>

          <button className="location-selector-btn" onClick={() => setIsLocationModalOpen(true)}>
            <MapPin size={16} color="var(--primary)" />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selectedLocation}
            </span>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>
        </div>

        {/* Global Live Search Bar */}
        <div className="nav-search-bar" ref={searchBoxRef}>
          <Search size={17} className="nav-search-icon" />

          {/* Animated Right-to-Left Single Word Placeholder Carousel */}
          {!searchQuery && (
            <div className="search-carousel-placeholder">
              <span className="search-carousel-static">Search</span>
              <div className="search-carousel-track">
                <span key={carouselIndex} className="search-carousel-word">
                  {SEARCH_CAROUSEL_WORDS[carouselIndex]}
                </span>
              </div>
            </div>
          )}

          <input
            type="text"
            className="nav-search-input"
            value={searchQuery}
            onChange={e => executeSearch(e.target.value)}
            onFocus={() => setShowSearchDropdown(true)}
            onKeyDown={handleKeyDown}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setMatchedDishes([]);
                setMatchedRests([]);
              }}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
                zIndex: 2
              }}
            >
              <X size={15} />
            </button>
          )}

          {/* Search Dropdown Popover */}
          {showSearchDropdown && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 20px 35px -8px rgba(0, 0, 0, 0.2), 0 8px 16px -4px rgba(0, 0, 0, 0.08)',
              zIndex: 300,
              maxHeight: '440px',
              overflowY: 'auto',
              padding: '12px'
            }}>
              
              {/* If search query is empty, show Trending Searches */}
              {!searchQuery.trim() ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', padding: '0 6px' }}>
                    <TrendingUp size={14} color="var(--primary)" /> Popular Cravings
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '0 4px' }}>
                    {TRENDING_SEARCHES.map(item => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSelectTrending(item)}
                        className="chip"
                        style={{ fontSize: '0.82rem', padding: '6px 12px' }}
                      >
                        <Search size={12} color="var(--primary)" /> {item}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (matchedDishes.length === 0 && matchedRests.length === 0) ? (
                <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                  <p style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                    No quick results for "{searchQuery}"
                  </p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    Press Enter to view full search catalog
                  </p>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleViewAllResults}
                  >
                    View All Results &rarr;
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  
                  {/* Matched Dishes */}
                  {matchedDishes.length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px', padding: '0 6px' }}>
                        Dishes ({matchedDishes.length})
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {matchedDishes.map(food => (
                          <div
                            key={food.id}
                            onClick={() => handleSelectFood(food)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 10px',
                              borderRadius: 'var(--radius-md)',
                              cursor: 'pointer',
                              transition: 'background 0.15s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-subtle)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img
                                src={food.image}
                                alt={food.name}
                                style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                              />
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                  <DietBadge isVeg={food.veg} />
                                  <span style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-main)' }}>{food.name}</span>
                                </div>
                                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                                  {food.restaurantName} • <Badge variant="primary" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>{food.category}</Badge>
                                </div>
                              </div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontWeight: '800', fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                                ₹{food.price}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.72rem', color: '#D97706', fontWeight: '700' }}>
                                <Star size={10} fill="#F59E0B" /> {food.rating}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matched Restaurants */}
                  {matchedRests.length > 0 && (
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px', padding: '0 6px' }}>
                        Restaurants ({matchedRests.length})
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {matchedRests.map(rest => (
                          <div
                            key={rest.id}
                            onClick={() => handleSelectRestaurant(rest)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 10px',
                              borderRadius: 'var(--radius-md)',
                              cursor: 'pointer',
                              transition: 'background 0.15s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-subtle)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img
                                src={rest.image}
                                alt={rest.name}
                                style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                              />
                              <div>
                                <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-main)' }}>{rest.name}</div>
                                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{rest.cuisine}</div>
                              </div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: '#10B981', color: '#FFF', padding: '1px 6px', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: '800' }}>
                                <span>{rest.rating}</span>
                                <Star size={9} fill="#FFF" />
                              </div>
                              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>{rest.deliveryTime}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* View All Results Button */}
                  <button
                    onClick={handleViewAllResults}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', marginTop: '6px', borderRadius: 'var(--radius-md)' }}
                  >
                    View All Results for "{searchQuery}" <ArrowRight size={14} />
                  </button>

                </div>
              )}

            </div>
          )}
        </div>

        {/* Navigation Actions (Home, Categories, Favourites, Orders, Cart, Profile) */}
        <div className="nav-actions">
          
          {/* Home Option */}
          <Link 
            to="/" 
            className={`chip ${isHomeActive ? 'active' : ''}`} 
            style={{ padding: '8px 12px' }} 
            title="Storefront Home"
          >
            <Home size={16} />
            <span style={{ fontSize: '0.82rem' }}>Home</span>
          </Link>

          {/* Categories Option with Popover Menu */}
          <div style={{ position: 'relative' }} ref={categoriesMenuRef}>
            <button
              onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
              className={`chip ${isCategoriesActive || showCategoriesDropdown ? 'active' : ''}`}
              style={{ padding: '8px 12px', cursor: 'pointer' }}
              title="Explore Food Categories"
            >
              <LayoutGrid size={16} />
              <span style={{ fontSize: '0.82rem' }}>Categories</span>
              <ChevronDown 
                size={13} 
                style={{ 
                  transform: showCategoriesDropdown ? 'rotate(180deg)' : 'rotate(0deg)', 
                  transition: 'transform 0.2s' 
                }} 
              />
            </button>

            {/* Categories Popover Menu */}
            {showCategoriesDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  width: '280px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  zIndex: 200,
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  maxHeight: '380px',
                  overflowY: 'auto'
                }}
                onClick={() => setShowCategoriesDropdown(false)}
              >
                <div style={{ padding: '6px 10px', fontSize: '0.72rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Explore 10 Categories</span>
                  <Badge variant="primary">FRESH</Badge>
                </div>

                {CATEGORIES.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="portal-menu-item"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                    <span style={{ flex: 1, fontWeight: '700', fontSize: '0.85rem' }}>{cat.name}</span>
                    <Badge variant="primary" style={{ fontSize: '0.62rem' }}>{cat.count} DISHES</Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Favourites Option */}
          <Link 
            to="/favorites" 
            className={`chip ${isFavoritesActive ? 'active' : ''}`} 
            style={{ padding: '8px 12px' }} 
            title="Wishlist"
          >
            <Heart size={16} color={favorites.foodIds.length > 0 ? '#FF4B2B' : 'currentColor'} />
            <span style={{ fontSize: '0.82rem' }}>Favourites</span>
          </Link>

          {/* Orders Option */}
          <Link 
            to="/orders" 
            className={`chip ${isOrdersActive ? 'active' : ''}`} 
            style={{ padding: '8px 12px' }} 
            title="My Orders"
          >
            <Clock size={16} />
            <span style={{ fontSize: '0.82rem' }}>Orders</span>
          </Link>

          {/* Cart Badge Button */}
          <Link to="/cart" className="cart-btn-badge">
            <ShoppingBag size={18} color="var(--primary)" />
            <span>Cart</span>
            {count > 0 && <span className="cart-count-pill">{count}</span>}
          </Link>

          {/* User Profile Dropdown */}
          <div style={{ position: 'relative' }} ref={userMenuRef}>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid var(--border)', objectFit: 'cover' }}
              />
              <span style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                {user.name.split(' ')[0]}
              </span>
              <ChevronDown size={14} color="var(--text-muted)" />
            </button>

            {showUserDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '220px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  zIndex: 200,
                  padding: '6px'
                }}
                onClick={() => setShowUserDropdown(false)}
              >
                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', marginBottom: '4px' }}>
                  <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>{user.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                </div>

                <Link to="/profile" className="portal-menu-item">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><User size={15} /> My Profile</span>
                </Link>
                <Link to="/orders" className="portal-menu-item">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={15} /> Order History</span>
                </Link>
                <Link to="/admin" className="portal-menu-item">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Shield size={15} color="var(--primary)" /> Admin Portal</span>
                </Link>
                <Link to="/restaurant-portal" className="portal-menu-item">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ChefHat size={15} color="#D97706" /> Restaurant Kitchen</span>
                </Link>
                <Link to="/delivery-partner" className="portal-menu-item">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Bike size={15} color="#10B981" /> Rider Partner</span>
                </Link>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
