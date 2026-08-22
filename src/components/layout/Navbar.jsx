import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useLocation } from '../../context/LocationContext';
import { FOOD_ITEMS, RESTAURANTS } from '../../data/mockData';
import { MapPin, Search, ShoppingBag, Heart, User, ChevronDown, LogOut, Shield, ChefHat, Bike, Clock } from 'lucide-react';

export const Navbar = () => {
  const { user } = useAuth();
  const { count, favorites } = useCart();
  const { selectedLocation, setIsLocationModalOpen } = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleSearch = (val) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }
    const q = val.toLowerCase();
    const matchedFoods = FOOD_ITEMS.filter(f => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)).slice(0, 4);
    const matchedRests = RESTAURANTS.filter(r => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)).slice(0, 3);
    setSearchResults([...matchedFoods, ...matchedRests]);
  };

  const handleSelectResult = (item) => {
    setSearchQuery('');
    setSearchResults([]);
    if (item.cuisine) {
      navigate(`/restaurant/${item.id}`);
    } else {
      navigate(`/food/${item.id}`);
    }
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        
        {/* Brand Logo & Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
        <div className="nav-search-bar">
          <Search size={16} className="nav-search-icon" />
          <input
            type="text"
            className="nav-search-input"
            placeholder="Search pizza, biryani, burgers, restaurants..."
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              right: 0,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-xl)',
              zIndex: 100,
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {searchResults.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleSelectResult(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer'
                  }}
                >
                  <img src={item.image} alt={item.name} style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.cuisine || `${item.category} • ₹${item.price}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Actions */}
        <div className="nav-actions">
          <Link to="/favorites" className="chip" style={{ padding: '8px 12px' }} title="Wishlist">
            <Heart size={16} color={favorites.foodIds.length > 0 ? '#FF4B2B' : 'currentColor'} />
            <span style={{ fontSize: '0.82rem' }}>Favourites</span>
          </Link>

          <Link to="/orders" className="chip" style={{ padding: '8px 12px' }} title="My Orders">
            <Clock size={16} />
            <span style={{ fontSize: '0.82rem' }}>Orders</span>
          </Link>

          <Link to="/cart" className="cart-btn-badge">
            <ShoppingBag size={18} color="var(--primary)" />
            <span>Cart</span>
            {count > 0 && <span className="cart-count-pill">{count}</span>}
          </Link>

          {/* User Profile Dropdown */}
          <div style={{ position: 'relative' }}>
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
                  width: '210px',
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
