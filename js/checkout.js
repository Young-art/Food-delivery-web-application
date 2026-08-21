/**
 * FOOD DELIVERY APP to CHECKOUT CONTROLLER
 * Manages Address selection & CRUD, Payment methods, and Order placement.
 */

const Checkout = {
  selectedAddressId: null,
  selectedPaymentMethod: "UPI",
  activeCoupon: null,

  init: function() {
    this.activeCoupon = localStorage.getItem("food_app_active_coupon") || null;
    this.ensureCartNotEmpty();
    this.renderAddresses();
    this.renderOrderSummary();
    this.bindPaymentTabs();
  },

  ensureCartNotEmpty: function() {
    const cart = Cart.getCart();
    if (cart.length === 0) {
      FoodApp.showToast("Your cart is empty. Redirecting...", "error");
      setTimeout(() => {
        window.location.href = "cart.html";
      }, 1500);
    }
  },

  // Address Selection & Management
  renderAddresses: function() {
    const addresses = FoodAppStorage.getAddresses();
    const container = document.getElementById("address-selection-container");
    if (!container) return;

    if (!this.selectedAddressId && addresses.length > 0) {
      this.selectedAddressId = addresses[0].id;
    }

    container.innerHTML = addresses.map(addr => `
      <div class="address-option-card ${addr.id === this.selectedAddressId ? 'selected' : ''}" 
        onclick="Checkout.selectAddress('${addr.id}')">
        <div class="addr-type-pill">${addr.tagIcon || '📍'} ${addr.type}</div>
        <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main); margin-bottom: 4px;">${addr.name}</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.45; margin-bottom: 6px;">
          ${addr.street}, ${addr.landmark}, ${addr.city} to ${addr.pincode}
        </div>
        <div style="font-size: 0.8rem; font-weight: 600; color: var(--text-main);">📞 ${addr.phone}</div>
      </div>
    `).join('');
  },

  selectAddress: function(addrId) {
    this.selectedAddressId = addrId;
    this.renderAddresses();
  },

  openAddAddressModal: function() {
    let modal = document.getElementById("add-address-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "add-address-modal";
      modal.className = "modal-overlay";
      modal.innerHTML = `
        <div class="modal-box">
          <div class="modal-header">
            <h3 class="modal-title">Add New Delivery Address</h3>
            <button class="modal-close" onclick="FoodApp.closeModal('add-address-modal')">&times;</button>
          </div>
          <div class="modal-body">
            <div style="margin-bottom: 12px;">
              <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Address Type</label>
              <div style="display:flex; gap:10px;">
                <label style="display:flex; align-items:center; gap:6px; font-size:0.9rem; font-weight:600;"><input type="radio" name="addr-type" value="Home" checked> 🏠 Home</label>
                <label style="display:flex; align-items:center; gap:6px; font-size:0.9rem; font-weight:600;"><input type="radio" name="addr-type" value="Work"> 💼 Work</label>
                <label style="display:flex; align-items:center; gap:6px; font-size:0.9rem; font-weight:600;"><input type="radio" name="addr-type" value="Other"> 📍 Other</label>
              </div>
            </div>
            <div style="margin-bottom: 12px;">
              <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Full Name</label>
              <input type="text" id="new-addr-name" placeholder="e.g. Thanush Masika" value="Thanush Masika" style="width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:var(--radius-sm); outline:none;">
            </div>
            <div style="margin-bottom: 12px;">
              <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Phone Number</label>
              <input type="tel" id="new-addr-phone" placeholder="e.g. +91 98765 43210" value="+91 98765 43210" style="width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:var(--radius-sm); outline:none;">
            </div>
            <div style="margin-bottom: 12px;">
              <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">House No. / Flat / Building / Street</label>
              <input type="text" id="new-addr-street" placeholder="e.g. Flat 301, Palm Grove Apts, 4th Cross" style="width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:var(--radius-sm); outline:none;">
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom: 12px;">
              <div>
                <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Landmark</label>
                <input type="text" id="new-addr-landmark" placeholder="e.g. Near Metro Station" style="width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:var(--radius-sm); outline:none;">
              </div>
              <div>
                <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Pincode</label>
                <input type="text" id="new-addr-pincode" placeholder="e.g. 560038" value="560038" style="width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:var(--radius-sm); outline:none;">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary btn-sm" onclick="FoodApp.closeModal('add-address-modal')">Cancel</button>
            <button class="btn btn-primary btn-sm" onclick="Checkout.saveNewAddress()">Save Address</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modal.classList.add("active");
  },

  saveNewAddress: function() {
    const typeEl = document.querySelector("input[name='addr-type']:checked");
    const type = typeEl ? typeEl.value : "Home";
    const name = document.getElementById("new-addr-name").value.trim();
    const phone = document.getElementById("new-addr-phone").value.trim();
    const street = document.getElementById("new-addr-street").value.trim();
    const landmark = document.getElementById("new-addr-landmark").value.trim();
    const pincode = document.getElementById("new-addr-pincode").value.trim();

    if (!name || !phone || !street || !pincode) {
      FoodApp.showToast("Please fill all required address fields", "error");
      return;
    }

    const newAddr = {
      id: "addr-" + Date.now(),
      type: type,
      tagIcon: type === "Home" ? "🏠" : type === "Work" ? "💼" : "📍",
      name: name,
      phone: phone,
      street: street,
      landmark: landmark,
      city: "Bangalore",
      pincode: pincode
    };

    const addresses = FoodAppStorage.getAddresses();
    addresses.push(newAddr);
    FoodAppStorage.saveAddresses(addresses);

    this.selectedAddressId = newAddr.id;
    this.renderAddresses();
    FoodApp.closeModal("add-address-modal");
    FoodApp.showToast("New delivery address added successfully! 📍", "success");
  },

  // Payment Selection
  bindPaymentTabs: function() {
    const tabs = document.querySelectorAll(".payment-tab-btn");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        this.selectedPaymentMethod = tab.getAttribute("data-method");
        this.renderPaymentPanel();
      });
    });
  },

  renderPaymentPanel: function() {
    const panel = document.getElementById("payment-details-panel");
    if (!panel) return;

    if (this.selectedPaymentMethod === "UPI") {
      panel.innerHTML = `
        <div style="font-size:0.9rem; font-weight:700; margin-bottom:12px;">Select UPI App / ID:</div>
        <div style="display:flex; gap:12px; margin-bottom:16px; flex-wrap:wrap;">
          <label style="display:flex; align-items:center; gap:8px; padding:10px 14px; border:1px solid var(--border); border-radius:var(--radius-md); background:var(--surface); cursor:pointer; font-weight:600; font-size:0.88rem;">
            <input type="radio" name="upi-app" value="Google Pay" checked> 🔵 Google Pay
          </label>
          <label style="display:flex; align-items:center; gap:8px; padding:10px 14px; border:1px solid var(--border); border-radius:var(--radius-md); background:var(--surface); cursor:pointer; font-weight:600; font-size:0.88rem;">
            <input type="radio" name="upi-app" value="PhonePe"> 🟣 PhonePe
          </label>
          <label style="display:flex; align-items:center; gap:8px; padding:10px 14px; border:1px solid var(--border); border-radius:var(--radius-md); background:var(--surface); cursor:pointer; font-weight:600; font-size:0.88rem;">
            <input type="radio" name="upi-app" value="Paytm"> 💠 Paytm
          </label>
        </div>
        <div style="font-size:0.85rem; color:var(--text-muted);">
          Instant UPI intent payment simulation will be activated upon placing order.
        </div>
      `;
    } else if (this.selectedPaymentMethod === "Card") {
      panel.innerHTML = `
        <div style="font-size:0.9rem; font-weight:700; margin-bottom:12px;">Credit / Debit Card:</div>
        <div style="display:flex; flex-direction:column; gap:10px;">
          <input type="text" placeholder="Card Number (e.g. 4532 •••• •••• 8901)" value="4532 8921 4455 8901" style="padding:10px 14px; border:1px solid var(--border); border-radius:var(--radius-sm); font-size:0.9rem; outline:none; background:var(--surface);">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <input type="text" placeholder="MM/YY" value="12/28" style="padding:10px 14px; border:1px solid var(--border); border-radius:var(--radius-sm); font-size:0.9rem; outline:none; background:var(--surface);">
            <input type="password" placeholder="CVV" value="888" maxlength="3" style="padding:10px 14px; border:1px solid var(--border); border-radius:var(--radius-sm); font-size:0.9rem; outline:none; background:var(--surface);">
          </div>
        </div>
      `;
    } else if (this.selectedPaymentMethod === "NetBanking") {
      panel.innerHTML = `
        <div style="font-size:0.9rem; font-weight:700; margin-bottom:12px;">Select Popular Bank:</div>
        <select style="width:100%; padding:10px 14px; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--surface); font-size:0.9rem; outline:none;">
          <option>HDFC Bank</option>
          <option>ICICI Bank</option>
          <option>State Bank of India (SBI)</option>
          <option>Axis Bank</option>
          <option>Kotak Mahindra Bank</option>
        </select>
      `;
    } else {
      panel.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px; color:var(--text-main); font-weight:600; font-size:0.9rem;">
          <span style="font-size:1.4rem;">💵</span> Pay with exact cash or UPI QR upon food delivery.
        </div>
      `;
    }
  },

  // Order Summary Recap
  renderOrderSummary: function() {
    const cart = Cart.getCart();
    const totals = Cart.getTotals(this.activeCoupon);

    const itemsContainer = document.getElementById("checkout-items-summary");
    if (itemsContainer) {
      itemsContainer.innerHTML = cart.map(item => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; font-size:0.9rem; border-bottom:1px solid var(--surface-subtle);">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="badge-diet ${item.veg ? 'veg' : 'non-veg'}"></span>
            <span style="font-weight:600;">${item.name} <span style="color:var(--text-muted);">x ${item.quantity}</span></span>
          </div>
          <span style="font-weight:700; font-family:'Outfit', sans-serif;">₹${item.unitPrice * item.quantity}</span>
        </div>
      `).join('');
    }

    document.getElementById("checkout-subtotal").textContent = `₹${totals.subtotal}`;
    document.getElementById("checkout-delivery-fee").textContent = totals.deliveryFee === 0 ? "FREE" : `₹${totals.deliveryFee}`;
    document.getElementById("checkout-tax").textContent = `₹${totals.tax}`;
    
    const discRow = document.getElementById("checkout-discount-row");
    if (totals.discount > 0) {
      discRow.style.display = "flex";
      document.getElementById("checkout-discount-amount").textContent = `-₹${totals.discount}`;
    } else {
      discRow.style.display = "none";
    }

    document.getElementById("checkout-grand-total").textContent = `₹${totals.total}`;
    document.getElementById("place-order-btn-total").textContent = `₹${totals.total}`;
  },

  // Place Order Simulation
  placeOrder: function() {
    const cart = Cart.getCart();
    if (cart.length === 0) {
      FoodApp.showToast("Cart is empty!", "error");
      return;
    }

    const addresses = FoodAppStorage.getAddresses();
    const selectedAddr = addresses.find(a => a.id === this.selectedAddressId) || addresses[0];
    const totals = Cart.getTotals(this.activeCoupon);
    
    // Generate Order ID (FDxxxxx)
    const orderId = "FD" + Math.floor(10000 + Math.random() * 90000);
    const orderDate = new Date().toISOString().replace("T", " ").substring(0, 16);

    const newOrder = {
      id: orderId,
      date: orderDate,
      restaurantName: "Bella Italia Artisan Pizzeria",
      restaurantImage: cart[0].image,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.unitPrice,
        addOns: item.addOns ? item.addOns.map(a => a.name) : []
      })),
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      tax: totals.tax,
      discount: totals.discount,
      total: totals.total,
      address: `${selectedAddr.street}, ${selectedAddr.city}`,
      paymentMethod: this.selectedPaymentMethod,
      status: "Order Placed",
      timeline: [
        { status: "Order Placed", time: "Just now", completed: true },
        { status: "Restaurant Accepted", time: "Pending", completed: false },
        { status: "Food Being Prepared", time: "Pending", completed: false },
        { status: "Out for Delivery", time: "Pending", completed: false },
        { status: "Delivered", time: "Pending", completed: false }
      ]
    };

    // Save order
    const allOrders = FoodAppStorage.getOrders();
    allOrders.unshift(newOrder);
    FoodAppStorage.saveOrders(allOrders);

    // Clear cart & applied coupon
    Cart.clearCart();
    localStorage.removeItem("food_app_active_coupon");
    localStorage.setItem("food_app_active_order_id", orderId);

    FoodApp.showToast(`Order Placed Successfully! Order ID: ${orderId} 🎉`, "success");

    // Redirect to Order Tracking
    setTimeout(() => {
      window.location.href = `order-tracking.html?id=${orderId}`;
    }, 1200);
  }
};

document.addEventListener("DOMContentLoaded", () => Checkout.init());
