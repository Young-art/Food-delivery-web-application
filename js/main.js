/**
 * FOOD DELIVERY APP - MAIN APPLICATION ENGINE
 * Central UI controller, dynamic modals, toast system, and navigation sync.
 */

const FoodApp = {
  // Determine relative root path depending on folder depth
  getRootPath: function() {
    const path = window.location.pathname;
    if (path.includes("/pages/") || path.includes("/restaurant/") || path.includes("/delivery/") || path.includes("/admin/")) {
      return "../";
    }
    return "./";
  },

  // Initialize common UI components
  init: function() {
    this.ensureToastContainer();
    this.updateCartBadge();
    this.bindLocationModal();
    this.bindUserDropdown();
    this.bindMobileMenu();
    this.injectRoleSwitcher();
  },

  // Toast Notification System
  ensureToastContainer: function() {
    if (!document.getElementById("toast-container")) {
      const container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }
  },

  showToast: function(message, type = "info") {
    this.ensureToastContainer();
    const container = document.getElementById("toast-container");
    
    const toast = document.createElement("div");
    toast.className = `toast ${type === "success" ? "toast-success" : type === "error" ? "toast-error" : ""}`;
    
    let icon = "🔔";
    if (type === "success") icon = "✅";
    if (type === "error") icon = "⚠️";
    if (type === "cart") icon = "🛒";

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("hide");
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  },

  // Update Cart Count Badge in Header
  updateCartBadge: function() {
    const badges = document.querySelectorAll(".cart-count");
    const count = typeof Cart !== "undefined" ? Cart.getCount() : 0;
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-flex" : "inline-flex";
    });
  },

  // Location Selector System
  bindLocationModal: function() {
    const currentLoc = localStorage.getItem("food_app_location") || "Bangalore, Indiranagar";
    const locElements = document.querySelectorAll(".current-location-text");
    locElements.forEach(el => el.textContent = currentLoc);

    const triggerBtns = document.querySelectorAll(".location-selector");
    triggerBtns.forEach(btn => {
      btn.addEventListener("click", () => this.openLocationModal());
    });
  },

  openLocationModal: function() {
    let modal = document.getElementById("location-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "location-modal";
      modal.className = "modal-overlay";
      modal.innerHTML = `
        <div class="modal-box" style="max-width: 480px;">
          <div class="modal-header">
            <h3 class="modal-title">Select Delivery Location</h3>
            <button class="modal-close" onclick="FoodApp.closeModal('location-modal')">&times;</button>
          </div>
          <div class="modal-body">
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">
              Choose your city to discover restaurants & top dishes delivering to you.
            </p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <button class="city-opt-btn chip active" onclick="FoodApp.selectLocation('Bangalore, Indiranagar')">📍 Bangalore, Indiranagar</button>
              <button class="city-opt-btn chip" onclick="FoodApp.selectLocation('Bangalore, Koramangala')">📍 Bangalore, Koramangala</button>
              <button class="city-opt-btn chip" onclick="FoodApp.selectLocation('Mumbai, Bandra West')">📍 Mumbai, Bandra West</button>
              <button class="city-opt-btn chip" onclick="FoodApp.selectLocation('Delhi NCR, Connaught Place')">📍 Delhi NCR, Connaught Place</button>
              <button class="city-opt-btn chip" onclick="FoodApp.selectLocation('Hyderabad, Hitec City')">📍 Hyderabad, Hitec City</button>
              <button class="city-opt-btn chip" onclick="FoodApp.selectLocation('Pune, Koregaon Park')">📍 Pune, Koregaon Park</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modal.classList.add("active");
  },

  selectLocation: function(locName) {
    localStorage.setItem("food_app_location", locName);
    const locElements = document.querySelectorAll(".current-location-text");
    locElements.forEach(el => el.textContent = locName);
    this.closeModal("location-modal");
    this.showToast(`Delivery location set to: ${locName}`, "success");
  },

  // Modal Closer Helper
  closeModal: function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
  },

  // User Profile Dropdown Toggle
  bindUserDropdown: function() {
    const user = FoodAppStorage.getUser();
    const userNames = document.querySelectorAll(".user-name-text");
    userNames.forEach(el => el.textContent = user.name.split(" ")[0]);

    document.addEventListener("click", (e) => {
      const dropdown = document.querySelector(".dropdown-menu");
      const userBtn = document.querySelector(".user-avatar-btn");
      if (dropdown && userBtn) {
        if (userBtn.contains(e.target)) {
          dropdown.classList.toggle("show");
        } else if (!dropdown.contains(e.target)) {
          dropdown.classList.remove("show");
        }
      }
    });
  },

  // Mobile Menu Toggle
  bindMobileMenu: function() {
    const menuBtn = document.querySelector(".mobile-menu-btn");
    const nav = document.querySelector(".header-nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", () => {
        nav.classList.toggle("mobile-active");
      });
    }
  },

  // Customization & Add-on Modal for Food Items
  openCustomizerModal: function(foodId) {
    const items = FoodAppStorage.getFoodItems();
    const food = items.find(item => item.id === foodId);
    if (!food) return;

    let modal = document.getElementById("food-customizer-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "food-customizer-modal";
      modal.className = "modal-overlay";
      document.body.appendChild(modal);
    }

    const addOns = food.addOns || [];
    const root = this.getRootPath();

    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-header">
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="badge-diet ${food.veg ? 'veg' : 'non-veg'}"></span>
            <h3 class="modal-title">${food.name}</h3>
          </div>
          <button class="modal-close" onclick="FoodApp.closeModal('food-customizer-modal')">&times;</button>
        </div>
        <div class="modal-body">
          <div style="display:flex; gap:16px; margin-bottom:18px;">
            <img src="${food.image}" alt="${food.name}" style="width:100px; height:80px; border-radius:12px; object-fit:cover;">
            <div>
              <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.4; margin-bottom:6px;">${food.description}</p>
              <div style="font-size:1.1rem; font-weight:800; color:var(--primary); font-family:'Outfit', sans-serif;">₹${food.price}</div>
            </div>
          </div>

          ${addOns.length > 0 ? `
            <div class="addon-group">
              <div class="addon-group-title">
                <span>Select Add-ons / Customizations</span>
                <span style="font-size:0.8rem; color:var(--text-muted); font-weight:500;">Optional</span>
              </div>
              <div id="modal-addon-list">
                ${addOns.map((addon, idx) => `
                  <label class="addon-item" for="addon-${idx}">
                    <div class="addon-label">
                      <input type="checkbox" id="addon-${idx}" value="${addon.price}" data-name="${addon.name}" onchange="FoodApp.recalcModalPrice(${food.price})">
                      <span>${addon.name}</span>
                    </div>
                    <span class="addon-price">+₹${addon.price}</span>
                  </label>
                `).join('')}
              </div>
            </div>
          ` : `
            <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:16px;">This item has no additional custom add-ons. Standard chef preparation applies.</p>
          `}

          <div style="margin-top:16px;">
            <label style="display:block; font-size:0.88rem; font-weight:700; margin-bottom:6px; color:var(--text-main);">
              Special Cooking Instructions (Optional)
            </label>
            <textarea id="modal-instructions" placeholder="e.g. Less spicy, extra napkins, contact-free delivery..." 
              style="width:100%; border:1px solid var(--border); border-radius:var(--radius-md); padding:10px 14px; font-size:0.88rem; resize:none; height:60px; outline:none;"></textarea>
          </div>
        </div>

        <div class="modal-footer">
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">Total:</span>
            <span id="modal-total-display" style="font-size:1.3rem; font-weight:800; font-family:'Outfit', sans-serif; color:var(--text-main);">₹${food.price}</span>
          </div>
          <button class="btn btn-primary" onclick="FoodApp.confirmCustomizedAdd('${food.id}')">
            Add to Cart 🛒
          </button>
        </div>
      </div>
    `;

    modal.classList.add("active");
  },

  recalcModalPrice: function(basePrice) {
    const checkboxes = document.querySelectorAll("#modal-addon-list input[type='checkbox']:checked");
    let total = basePrice;
    checkboxes.forEach(cb => {
      total += Number(cb.value);
    });
    const totalDisplay = document.getElementById("modal-total-display");
    if (totalDisplay) totalDisplay.textContent = `₹${total}`;
  },

  confirmCustomizedAdd: function(foodId) {
    const items = FoodAppStorage.getFoodItems();
    const food = items.find(item => item.id === foodId);
    if (!food) return;

    const checkboxes = document.querySelectorAll("#modal-addon-list input[type='checkbox']:checked");
    const selectedAddOns = [];
    checkboxes.forEach(cb => {
      selectedAddOns.push({
        name: cb.getAttribute("data-name"),
        price: Number(cb.value)
      });
    });

    const instructionsEl = document.getElementById("modal-instructions");
    const instructions = instructionsEl ? instructionsEl.value.trim() : "";

    Cart.addItem(food, 1, selectedAddOns, instructions);
    this.closeModal("food-customizer-modal");
  },

  // Toggle Favorite Item or Restaurant
  toggleFavoriteFood: function(foodId, btnElement) {
    const favs = FoodAppStorage.getFavorites();
    const idx = favs.foodIds.indexOf(foodId);
    if (idx > -1) {
      favs.foodIds.splice(idx, 1);
      if (btnElement) btnElement.classList.remove("active");
      this.showToast("Removed from favorites", "info");
    } else {
      favs.foodIds.push(foodId);
      if (btnElement) btnElement.classList.add("active");
      this.showToast("Saved to your favorites! ❤️", "success");
    }
    FoodAppStorage.saveFavorites(favs);
  },

  toggleFavoriteRestaurant: function(restId, btnElement) {
    const favs = FoodAppStorage.getFavorites();
    const idx = favs.restaurantIds.indexOf(restId);
    if (idx > -1) {
      favs.restaurantIds.splice(idx, 1);
      if (btnElement) btnElement.classList.remove("active");
      this.showToast("Restaurant removed from favorites", "info");
    } else {
      favs.restaurantIds.push(restId);
      if (btnElement) btnElement.classList.add("active");
      this.showToast("Restaurant saved to favorites! ❤️", "success");
    }
    FoodAppStorage.saveFavorites(favs);
  },

  // Quick Switch Role Helper Bar for easy role navigation
  injectRoleSwitcher: function() {
    const root = this.getRootPath();
    const bar = document.createElement("div");
    bar.id = "role-quick-switcher";
    bar.style.cssText = `
      position: fixed;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 999px;
      padding: 6px 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 999;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
      font-size: 0.8rem;
      font-weight: 600;
      color: #94A3B8;
    `;

    bar.innerHTML = `
      <span style="color:#FFF; display:flex; align-items:center; gap:4px;">✨ Portal Switcher:</span>
      <a href="${root}index.html" style="color:#FFF; padding:3px 8px; border-radius:99px; background:${window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') ? 'var(--primary)' : 'rgba(255,255,255,0.1)'};">Customer</a>
      <a href="${root}restaurant/dashboard.html" style="color:#FFF; padding:3px 8px; border-radius:99px; background:${window.location.pathname.includes('/restaurant/') ? 'var(--primary)' : 'rgba(255,255,255,0.1)'};">Restaurant</a>
      <a href="${root}delivery/dashboard.html" style="color:#FFF; padding:3px 8px; border-radius:99px; background:${window.location.pathname.includes('/delivery/') ? 'var(--primary)' : 'rgba(255,255,255,0.1)'};">Delivery Partner</a>
      <a href="${root}admin/dashboard.html" style="color:#FFF; padding:3px 8px; border-radius:99px; background:${window.location.pathname.includes('/admin/') ? 'var(--primary)' : 'rgba(255,255,255,0.1)'};">Admin</a>
    `;

    document.body.appendChild(bar);
  }
};

// Auto-run on DOM Ready
document.addEventListener("DOMContentLoaded", () => FoodApp.init());
