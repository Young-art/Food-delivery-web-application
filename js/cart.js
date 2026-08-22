/**
 * FOOD DELIVERY APP to SHOPPING CART LOGIC
 * Manages cart state in LocalStorage, quantities, add-ons, coupons, and pricing calculations.
 */

const Cart = {
  getCart: function() {
    const saved = localStorage.getItem("food_app_cart");
    return saved ? JSON.parse(saved) : [];
  },

  saveCart: function(cart) {
    localStorage.setItem("food_app_cart", JSON.stringify(cart));
    if (typeof FoodApp !== "undefined" && FoodApp.updateCartBadge) {
      FoodApp.updateCartBadge();
    }
  },

  // Add food item with selected add-ons and optional custom notes
  addItem: function(food, quantity = 1, selectedAddOns = [], specialInstructions = "") {
    let cart = this.getCart();
    
    // Create unique key based on item ID and chosen add-ons
    const addOnNames = selectedAddOns.map(a => a.name).sort().join("|");
    const cartItemId = `${food.id}_${addOnNames ? addOnNames : "base"}`;

    const existingIndex = cart.findIndex(item => item.cartItemId === cartItemId);
    
    // Calculate single item unit price with add-ons
    const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
    const unitPrice = Number(food.price) + addOnsTotal;

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        cartItemId: cartItemId,
        id: food.id,
        name: food.name,
        category: food.category,
        image: food.image,
        basePrice: Number(food.price),
        unitPrice: unitPrice,
        veg: food.veg,
        quantity: quantity,
        addOns: selectedAddOns,
        specialInstructions: specialInstructions,
        restaurantId: food.restaurantId || "rest-1"
      });
    }

    this.saveCart(cart);
    if (typeof FoodApp !== "undefined") {
      FoodApp.showToast(`Added ${food.name} to your cart!`, "success");
    }
  },

  // Update item quantity (+1 or -1)
  updateQuantity: function(cartItemId, delta) {
    let cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.cartItemId === cartItemId);

    if (itemIndex > -1) {
      cart[itemIndex].quantity += delta;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
        if (typeof FoodApp !== "undefined") {
          FoodApp.showToast("Item removed from cart", "info");
        }
      }
      this.saveCart(cart);
    }
  },

  // Remove specific item from cart
  removeItem: function(cartItemId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    this.saveCart(cart);
    if (typeof FoodApp !== "undefined") {
      FoodApp.showToast("Item removed from cart", "info");
    }
  },

  // Clear entire cart
  clearCart: function() {
    this.saveCart([]);
  },

  // Get total item count for badge
  getCount: function() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  // Dynamic calculation for subtotal, taxes, delivery fee & discount
  getTotals: function(appliedCouponCode = null) {
    const cart = this.getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    
    // Default delivery fee: ₹30, free if subtotal > ₹500
    let deliveryFee = subtotal > 0 ? (subtotal >= 500 ? 0 : 30) : 0;
    
    // GST & Restaurant Packaging (5%)
    const tax = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
    
    let discount = 0;
    let couponMessage = "";
    let isCouponValid = false;

    if (appliedCouponCode && subtotal > 0) {
      const allCoupons = FoodAppStorage.getCoupons();
      const coupon = allCoupons.find(c => c.code.toUpperCase() === appliedCouponCode.toUpperCase());

      if (coupon) {
        if (subtotal < coupon.minOrder) {
          couponMessage = `Minimum order amount of ₹${coupon.minOrder} required for ${coupon.code}`;
        } else {
          isCouponValid = true;
          if (coupon.freeDelivery) {
            discount = deliveryFee;
            deliveryFee = 0;
            couponMessage = "Free Delivery Applied!";
          } else if (coupon.discountAmount) {
            discount = coupon.discountAmount;
            couponMessage = `Flat ₹${discount} discount applied!`;
          } else if (coupon.discountPercent) {
            const calculated = Math.round((subtotal * coupon.discountPercent) / 100);
            discount = coupon.maxDiscount ? Math.min(calculated, coupon.maxDiscount) : calculated;
            couponMessage = `${coupon.discountPercent}% discount applied (Saved ₹${discount})!`;
          }
        }
      } else {
        couponMessage = "Invalid coupon code";
      }
    }

    const total = Math.max(0, subtotal + deliveryFee + tax to discount);

    return {
      subtotal,
      deliveryFee,
      tax,
      discount,
      total,
      couponMessage,
      isCouponValid,
      itemCount: cart.length
    };
  }
};
