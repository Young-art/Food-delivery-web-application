import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LocationProvider } from './context/LocationContext';
import { OrderProvider } from './context/OrderContext';
import { ToastProvider } from './components/common/Toast';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PortalSwitcher } from './components/layout/PortalSwitcher';
import { LocationMapModal } from './components/modals/LocationMapModal';

// Storefront Pages
import { Home } from './pages/storefront/Home';
import { CategoryPage } from './pages/storefront/CategoryPage';
import { Restaurants } from './pages/storefront/Restaurants';
import { RestaurantMenu } from './pages/storefront/RestaurantMenu';
import { FoodDetails } from './pages/storefront/FoodDetails';
import { Cart } from './pages/storefront/Cart';
import { Checkout } from './pages/storefront/Checkout';
import { OrderTracking } from './pages/storefront/OrderTracking';
import { OrderHistory } from './pages/storefront/OrderHistory';
import { Favorites } from './pages/storefront/Favorites';
import { Profile } from './pages/storefront/Profile';
import { Login } from './pages/storefront/Login';
import { Signup } from './pages/storefront/Signup';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminFood } from './pages/admin/AdminFood';
import { AdminRestaurants } from './pages/admin/AdminRestaurants';
import { AdminCoupons } from './pages/admin/AdminCoupons';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminDelivery } from './pages/admin/AdminDelivery';
import { AdminReports } from './pages/admin/AdminReports';

// Partner Pages
import { RestaurantPortal } from './pages/restaurant/RestaurantPortal';
import { DeliveryPortal } from './pages/delivery/DeliveryPortal';

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isPartner = location.pathname.startsWith('/restaurant-portal') || location.pathname.startsWith('/delivery-partner');

  return (
    <>
      {!isAdmin && !isPartner && <Navbar />}

      <main className="main-content">
        <Routes>
          {/* Storefront Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurant/:id" element={<RestaurantMenu />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Portal Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/food" element={<AdminFood />} />
          <Route path="/admin/restaurants" element={<AdminRestaurants />} />
          <Route path="/admin/coupons" element={<AdminCoupons />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/delivery" element={<AdminDelivery />} />
          <Route path="/admin/reports" element={<AdminReports />} />

          {/* Restaurant & Delivery Partner Portals */}
          <Route path="/restaurant-portal" element={<RestaurantPortal />} />
          <Route path="/delivery-partner" element={<DeliveryPortal />} />
        </Routes>
      </main>

      {!isAdmin && !isPartner && <Footer />}

      <LocationMapModal />
      <PortalSwitcher />
    </>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <LocationProvider>
          <OrderProvider>
            <ToastProvider>
              <AppContent />
            </ToastProvider>
          </OrderProvider>
        </LocationProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
