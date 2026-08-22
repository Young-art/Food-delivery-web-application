import React, { createContext, useContext, useState, useEffect } from 'react';
import { COUPONS } from '../data/mockData';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('food_app_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    return localStorage.getItem('food_app_active_coupon') || null;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('food_app_favorites');
    return saved ? JSON.parse(saved) : { foodIds: ['pizza-1', 'biryani-1'], restaurantIds: ['rest-1'] };
  });

  useEffect(() => {
    localStorage.setItem('food_app_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('food_app_active_coupon', appliedCoupon);
    } else {
      localStorage.removeItem('food_app_active_coupon');
    }
  }, [appliedCoupon]);

  useEffect(() => {
    localStorage.setItem('food_app_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (food, quantity = 1, addOns = [], specialInstructions = '') => {
    const addOnTotal = addOns.reduce((sum, item) => sum + (item.price || 0), 0);
    const unitPrice = food.price + addOnTotal;
    const addOnKey = addOns.map(a => a.name).sort().join('-');
    const cartItemId = `${food.id}-${addOnKey}-${specialInstructions}`;

    setCart(prev => {
      const idx = prev.findIndex(item => item.cartItemId === cartItemId);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId,
          id: food.id,
          name: food.name,
          basePrice: food.price,
          unitPrice,
          image: food.image,
          veg: food.veg,
          restaurantId: food.restaurantId || 'rest-1',
          restaurantName: food.restaurantName || 'Artisan Kitchen',
          quantity,
          addOns,
          specialInstructions
        }
      ];
    });
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleFavoriteFood = (foodId) => {
    setFavorites(prev => {
      const exists = prev.foodIds.includes(foodId);
      return {
        ...prev,
        foodIds: exists ? prev.foodIds.filter(id => id !== foodId) : [...prev.foodIds, foodId]
      };
    });
  };

  const toggleFavoriteRestaurant = (restId) => {
    setFavorites(prev => {
      const exists = prev.restaurantIds.includes(restId);
      return {
        ...prev,
        restaurantIds: exists ? prev.restaurantIds.filter(id => id !== restId) : [...prev.restaurantIds, restId]
      };
    });
  };

  const applyCouponCode = (code) => {
    const clean = code.trim().toUpperCase();
    const found = COUPONS.find(c => c.code === clean);
    if (!found) {
      return { success: false, message: `Coupon "${clean}" is not valid.` };
    }
    const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    if (subtotal < found.minOrder) {
      return { success: false, message: `Min. order value of ₹${found.minOrder} required for coupon ${clean}.` };
    }
    setAppliedCoupon(clean);
    return { success: true, message: `Coupon "${clean}" applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculate bill totals
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotal > 499 || cart.length === 0 ? 0 : 35;
  const tax = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
  
  let discount = 0;
  let couponMessage = '';
  if (appliedCoupon && subtotal > 0) {
    const found = COUPONS.find(c => c.code === appliedCoupon);
    if (found && subtotal >= found.minOrder) {
      const calcDiscount = Math.round((subtotal * found.discountPercent) / 100);
      discount = Math.min(calcDiscount, found.maxDiscount);
      couponMessage = `You saved ₹${discount} with coupon ${appliedCoupon}!`;
    }
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee + tax - discount);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      count,
      subtotal,
      deliveryFee,
      tax,
      discount,
      grandTotal,
      appliedCoupon,
      couponMessage,
      favorites,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      applyCouponCode,
      removeCoupon,
      toggleFavoriteFood,
      toggleFavoriteRestaurant
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
