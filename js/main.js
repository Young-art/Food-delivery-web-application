/**
 * FOOD DELIVERY APP to MAIN APPLICATION ENGINE
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

  // Vector Icon & Badge Component Library
  icons: {
    logo: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M3 11h18a7 7 0 0 0-14-3.5A7 7 0 0 0 3 11zm-1 3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-1H2v1zm1 3h18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v0z"/></svg>`,
    location: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>`,
    search: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
    cart: `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    heartOutline: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    star: `<svg viewBox="0 0 24 24" width="12" height="12" fill="#F59E0B"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    tag: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1"/></svg>`,
    copy: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    flash: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    wallet: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 10h20"/><circle cx="16" cy="15" r="1"/></svg>`,
    chevronDown: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
    user: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    orders: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    check: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    warning: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    info: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    home: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    work: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    edit: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    delete: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`
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
    
    let iconSvg = this.icons.info;
    if (type === "success") iconSvg = this.icons.check;
    if (type === "error") iconSvg = this.icons.warning;
    if (type === "cart") iconSvg = this.icons.cart;

    toast.innerHTML = `<span style="display:inline-flex; align-items:center;">${iconSvg}</span> <span>${message}</span>`;
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
              <button class="city-opt-btn chip active" onclick="FoodApp.selectLocation('Bangalore, Indiranagar')" style="display:inline-flex; align-items:center; gap:8px;"><span class="badge badge-primary" style="font-size:0.7rem; padding:2px 6px;">BLR</span> Bangalore, Indiranagar</button>
              <button class="city-opt-btn chip" onclick="FoodApp.selectLocation('Bangalore, Koramangala')" style="display:inline-flex; align-items:center; gap:8px;"><span class="badge badge-primary" style="font-size:0.7rem; padding:2px 6px;">BLR</span> Bangalore, Koramangala</button>
              <button class="city-opt-btn chip" onclick="FoodApp.selectLocation('Mumbai, Bandra West')" style="display:inline-flex; align-items:center; gap:8px;"><span class="badge badge-primary" style="font-size:0.7rem; padding:2px 6px;">BOM</span> Mumbai, Bandra West</button>
              <button class="city-opt-btn chip" onclick="FoodApp.selectLocation('Delhi NCR, Connaught Place')" style="display:inline-flex; align-items:center; gap:8px;"><span class="badge badge-primary" style="font-size:0.7rem; padding:2px 6px;">DEL</span> Delhi NCR, Connaught Place</button>
              <button class="city-opt-btn chip" onclick="FoodApp.selectLocation('Hyderabad, Hitec City')" style="display:inline-flex; align-items:center; gap:8px;"><span class="badge badge-primary" style="font-size:0.7rem; padding:2px 6px;">HYD</span> Hyderabad, Hitec City</button>
              <button class="city-opt-btn chip" onclick="FoodApp.selectLocation('Pune, Koregaon Park')" style="display:inline-flex; align-items:center; gap:8px;"><span class="badge badge-primary" style="font-size:0.7rem; padding:2px 6px;">PNQ</span> Pune, Koregaon Park</button>
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
            <span class="badge-diet ${food.veg ? 'veg' : 'non veg'}"></span>
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
            Add to Cart &rarr;
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
      this.showToast("Saved to your favorites", "success");
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
      this.showToast("Restaurant saved to favorites", "success");
    }
    FoodAppStorage.saveFavorites(favs);
  },

  // Toast Notification System
  showToast: function(message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    let iconSvg = "";
    if (type === "success") {
      iconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (type === "error") {
      iconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    } else {
      iconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="display:flex; align-items:center;">${iconSvg}</span>
        <span>${message}</span>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  // Floating Multi-Portal Navigation helper for easy demoing
  injectPortalSwitcher: function() {
    const isLocal = window.location.protocol === "file:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (!isLocal && !window.location.hostname.includes("github.io")) return;

    const currentPath = window.location.pathname;
    let root = "";
    if (currentPath.includes("/pages/") || currentPath.includes("/admin/") || currentPath.includes("/restaurant/") || currentPath.includes("/delivery/")) {
      root = "../";
    }

    const bar = document.createElement("div");
    bar.id = "dev-portal-switcher";
    bar.style.cssText = `
      position: fixed;
      bottom: 16px;
      right: 16px;
      background: rgba(15, 23, 42, 0.9);
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
      <span class="badge badge-primary" style="font-size:0.72rem; padding:2px 7px;">PORTALS</span>
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
