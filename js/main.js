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

  // Delivery Map & Location State
  deliveryMap: null,
  deliveryMarker: null,
  currentSelectedCoords: { lat: 12.9784, lng: 77.6408 },
  currentSelectedAddress: "Bangalore, Indiranagar",
  currentFullAddress: "100 Feet Road, Indiranagar, Bangalore, Karnataka 560038",
  isGpsActive: false,
  geocodeDebounceTimer: null,
  searchDebounceTimer: null,

  // Location Selector System
  bindLocationModal: function() {
    const currentLoc = localStorage.getItem("food_app_location") || "Bangalore, Indiranagar";
    this.currentSelectedAddress = currentLoc;
    const locElements = document.querySelectorAll(".current-location-text");
    locElements.forEach(el => el.textContent = currentLoc);

    const savedCoords = localStorage.getItem("food_app_coords");
    if (savedCoords) {
      try {
        this.currentSelectedCoords = JSON.parse(savedCoords);
      } catch (e) {}
    }

    const triggerBtns = document.querySelectorAll(".location-selector");
    triggerBtns.forEach(btn => {
      btn.addEventListener("click", () => this.openLocationModal());
    });
  },

  ensureLeafletLoaded: function(callback) {
    if (typeof window.L !== "undefined") {
      callback();
      return;
    }

    if (!document.getElementById("leaflet-css-bundle")) {
      const link = document.createElement("link");
      link.id = "leaflet-css-bundle";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const existingScript = document.getElementById("leaflet-js-bundle");
    if (existingScript) {
      existingScript.addEventListener("load", callback);
    } else {
      const script = document.createElement("script");
      script.id = "leaflet-js-bundle";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = callback;
      document.head.appendChild(script);
    }
  },

  openLocationModal: function() {
    let modal = document.getElementById("location-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "location-modal";
      modal.className = "modal-overlay";
      modal.innerHTML = `
        <div class="modal-box">
          <div class="modal-header">
            <div style="display:flex; align-items:center; gap:10px;">
              <h3 class="modal-title">Select Delivery Location</h3>
              <span class="badge badge-primary" style="font-size:0.75rem; padding:3px 8px;">LIVE GPS & MAP</span>
            </div>
            <button class="modal-close" onclick="FoodApp.closeModal('location-modal')">&times;</button>
          </div>
          <div class="modal-body" style="padding:18px 22px;">
            
            <!-- Real-time GPS Location Permission Card -->
            <div class="gps-permission-card" id="gps-permission-card">
              <div>
                <div style="font-weight:700; font-size:0.95rem; color:var(--text-main); margin-bottom:2px; display:flex; align-items:center; gap:6px;">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                  Real-Time Location Access
                </div>
                <div class="gps-status-text" id="gps-status-text">
                  Turn on your GPS location to pinpoint your exact delivery address in real time.
                </div>
              </div>
              <button class="gps-action-btn" id="request-gps-btn" onclick="FoodApp.requestUserLiveLocation()">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Use Current Location</span>
              </button>
            </div>

            <!-- Address Search Bar with Autocomplete -->
            <div class="map-search-box">
              <span class="map-search-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <input type="text" id="map-location-search" class="map-search-input" placeholder="Search street, area, landmark, or apartment..." oninput="FoodApp.handleSearchInput(this.value)">
              <button type="button" class="map-search-clear" id="map-search-clear-btn" onclick="FoodApp.clearMapSearch()">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <div class="map-search-results-dropdown" id="map-search-results"></div>
            </div>

            <!-- Real-Time Interactive Delivery Map -->
            <div class="delivery-map-wrapper">
              <div id="delivery-map-container"></div>
              <button class="map-recenter-btn" id="map-recenter-btn" title="Recenter to current location" onclick="FoodApp.recenterMapOnCurrentPin()">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>
              </button>
            </div>

            <!-- Selected Address Details Preview Card -->
            <div class="selected-address-card" id="selected-address-preview">
              <div class="selected-address-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div class="selected-address-details">
                <div class="selected-address-title" id="selected-address-title">${this.currentSelectedAddress}</div>
                <div class="selected-address-subtext" id="selected-address-subtext">${this.currentFullAddress}</div>
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                  <span class="badge badge-warning" id="selected-coords-badge" style="font-size:0.72rem; padding:2px 7px;">${this.currentSelectedCoords.lat.toFixed(4)}° N, ${this.currentSelectedCoords.lng.toFixed(4)}° E</span>
                  <span class="badge badge-success" style="font-size:0.72rem; padding:2px 7px;">30 MINS EXPRESS</span>
                </div>
              </div>
            </div>

            <!-- Quick City / Hubs Selection -->
            <div style="margin-top: 10px;">
              <div style="font-size:0.82rem; font-weight:700; color:var(--text-muted); margin-bottom:8px; text-transform:uppercase;">Popular Delivery Hubs</div>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                <button class="chip city-hub-btn active" onclick="FoodApp.selectQuickCity('Bangalore, Indiranagar', 12.9784, 77.6408, '100 Feet Road, Indiranagar, Bangalore, 560038', this)"><span class="badge badge-primary" style="font-size:0.68rem; padding:1px 5px;">BLR</span> Indiranagar</button>
                <button class="chip city-hub-btn" onclick="FoodApp.selectQuickCity('Bangalore, Koramangala', 12.9352, 77.6245, '80 Feet Road, 4th Block, Koramangala, Bangalore, 560034', this)"><span class="badge badge-primary" style="font-size:0.68rem; padding:1px 5px;">BLR</span> Koramangala</button>
                <button class="chip city-hub-btn" onclick="FoodApp.selectQuickCity('Mumbai, Bandra West', 19.0596, 72.8295, 'Hill Road, Bandra West, Mumbai, Maharashtra 400050', this)"><span class="badge badge-primary" style="font-size:0.68rem; padding:1px 5px;">BOM</span> Bandra West</button>
                <button class="chip city-hub-btn" onclick="FoodApp.selectQuickCity('Delhi NCR, Connaught Place', 28.6315, 77.2167, 'Inner Circle, Connaught Place, New Delhi 110001', this)"><span class="badge badge-primary" style="font-size:0.68rem; padding:1px 5px;">DEL</span> Connaught Place</button>
                <button class="chip city-hub-btn" onclick="FoodApp.selectQuickCity('Hyderabad, Hitec City', 17.4435, 78.3772, 'Madhapur Main Road, Hitec City, Hyderabad, 500081', this)"><span class="badge badge-primary" style="font-size:0.68rem; padding:1px 5px;">HYD</span> Hitec City</button>
                <button class="chip city-hub-btn" onclick="FoodApp.selectQuickCity('Pune, Koregaon Park', 18.5362, 73.8940, 'North Main Road, Koregaon Park, Pune, 411001', this)"><span class="badge badge-primary" style="font-size:0.68rem; padding:1px 5px;">PNQ</span> Koregaon Park</button>
              </div>
            </div>

          </div>
          <div class="modal-footer" style="padding:14px 22px;">
            <button class="btn btn-secondary btn-sm" onclick="FoodApp.closeModal('location-modal')">Cancel</button>
            <button class="btn btn-primary" onclick="FoodApp.confirmDeliveryLocation()" style="font-weight:700;">
              Confirm Delivery Location &rarr;
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modal.classList.add("active");

    // Initialize interactive Leaflet Map
    this.ensureLeafletLoaded(() => {
      setTimeout(() => {
        this.initDeliveryMap();
      }, 150);
    });
  },

  initDeliveryMap: function() {
    const container = document.getElementById("delivery-map-container");
    if (!container || typeof window.L === "undefined") return;

    const lat = this.currentSelectedCoords.lat;
    const lng = this.currentSelectedCoords.lng;

    if (this.deliveryMap) {
      this.deliveryMap.remove();
      this.deliveryMap = null;
    }

    this.deliveryMap = L.map('delivery-map-container', {
      zoomControl: true,
      attributionControl: false
    }).setView([lat, lng], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.deliveryMap);

    const pinIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div class="marker-pulse-ring"></div>
        <svg class="marker-pin-svg" viewBox="0 0 24 24" width="34" height="34" fill="#FF4B2B">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 34]
    });

    this.deliveryMarker = L.marker([lat, lng], {
      icon: pinIcon,
      draggable: true
    }).addTo(this.deliveryMap);

    this.deliveryMarker.on('dragend', (e) => {
      const pos = e.target.getLatLng();
      this.handleMapPositionChange(pos.lat, pos.lng);
    });

    this.deliveryMap.on('click', (e) => {
      this.deliveryMarker.setLatLng(e.latlng);
      this.handleMapPositionChange(e.latlng.lat, e.latlng.lng);
    });

    this.deliveryMap.invalidateSize();
  },

  requestUserLiveLocation: function() {
    const btn = document.getElementById("request-gps-btn");
    const statusText = document.getElementById("gps-status-text");

    if (!navigator.geolocation) {
      FoodApp.showToast("Geolocation is not supported by your browser.", "error");
      return;
    }

    if (btn) {
      btn.innerHTML = `<span class="gps-pulse-dot" style="background:#FFF;"></span> <span>Locating GPS...</span>`;
      btn.disabled = true;
    }
    if (statusText) {
      statusText.innerHTML = `<em>Requesting location permission from browser...</em>`;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = Math.round(position.coords.accuracy || 10);

        this.isGpsActive = true;
        this.currentSelectedCoords = { lat, lng };

        if (btn) {
          btn.innerHTML = `<span class="gps-pulse-dot"></span> <span>GPS Active</span>`;
          btn.style.background = "#10B981";
          btn.disabled = false;
        }
        if (statusText) {
          statusText.innerHTML = `<strong style="color:var(--veg-color);">Live Location Detected</strong> (Accuracy: ±${accuracy}m)`;
        }

        if (this.deliveryMap) {
          this.deliveryMap.flyTo([lat, lng], 17, { animate: true, duration: 1.2 });
          if (this.deliveryMarker) {
            this.deliveryMarker.setLatLng([lat, lng]);
          }
        }

        this.reverseGeocode(lat, lng);
        FoodApp.showToast("Live GPS Location detected successfully!", "success");
      },
      (error) => {
        if (btn) {
          btn.innerHTML = `<span>Retry GPS</span>`;
          btn.style.background = "var(--primary)";
          btn.disabled = false;
        }
        if (statusText) {
          if (error.code === error.PERMISSION_DENIED) {
            statusText.innerHTML = `<span style="color:var(--nonveg-color); font-weight:600;">Location permission was denied.</span> Please allow permission in your browser or drag the map pin.`;
          } else {
            statusText.innerHTML = `<span style="color:var(--nonveg-color); font-weight:600;">Unable to retrieve GPS.</span> Please drag the map pin or select an area below.`;
          }
        }
        FoodApp.showToast("Location permission was denied or unavailable. Please pick on the map.", "info");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  },

  handleMapPositionChange: function(lat, lng) {
    this.currentSelectedCoords = { lat, lng };
    const coordsBadge = document.getElementById("selected-coords-badge");
    if (coordsBadge) {
      coordsBadge.textContent = `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`;
    }

    clearTimeout(this.geocodeDebounceTimer);
    this.geocodeDebounceTimer = setTimeout(() => {
      this.reverseGeocode(lat, lng);
    }, 400);
  },

  reverseGeocode: function(lat, lng) {
    const titleEl = document.getElementById("selected-address-title");
    const subtextEl = document.getElementById("selected-address-subtext");
    if (subtextEl) subtextEl.textContent = "Fetching street address details...";

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
      .then(res => res.json())
      .then(data => {
        if (data && data.address) {
          const addr = data.address;
          const road = addr.road || addr.street || addr.pedestrian || addr.suburb || "Main Road";
          const locality = addr.suburb || addr.neighbourhood || addr.city_district || addr.residential || "";
          const city = addr.city || addr.town || addr.state_district || "Bangalore";
          const state = addr.state || "";
          const postcode = addr.postcode || "";

          const formattedTitle = locality ? `${city}, ${locality}` : (road ? `${city}, ${road}` : city);
          const fullFormatted = [road, locality, city, state, postcode].filter(Boolean).join(", ");

          this.currentSelectedAddress = formattedTitle;
          this.currentFullAddress = fullFormatted || data.display_name;

          if (titleEl) titleEl.textContent = this.currentSelectedAddress;
          if (subtextEl) subtextEl.textContent = this.currentFullAddress;
        } else {
          this.fallbackLocationName(lat, lng);
        }
      })
      .catch(() => {
        this.fallbackLocationName(lat, lng);
      });
  },

  fallbackLocationName: function(lat, lng) {
    const titleEl = document.getElementById("selected-address-title");
    const subtextEl = document.getElementById("selected-address-subtext");
    const nearest = this.getNearestCity(lat, lng);
    this.currentSelectedAddress = nearest.name;
    this.currentFullAddress = nearest.full;
    if (titleEl) titleEl.textContent = this.currentSelectedAddress;
    if (subtextEl) subtextEl.textContent = this.currentFullAddress;
  },

  getNearestCity: function(lat, lng) {
    const hubs = [
      { name: "Bangalore, Indiranagar", full: "100 Feet Road, Indiranagar, Bangalore, Karnataka 560038", lat: 12.9784, lng: 77.6408 },
      { name: "Bangalore, Koramangala", full: "80 Feet Road, 4th Block, Koramangala, Bangalore, Karnataka 560034", lat: 12.9352, lng: 77.6245 },
      { name: "Mumbai, Bandra West", full: "Hill Road, Bandra West, Mumbai, Maharashtra 400050", lat: 19.0596, lng: 72.8295 },
      { name: "Delhi NCR, Connaught Place", full: "Inner Circle, Connaught Place, New Delhi 110001", lat: 28.6315, lng: 77.2167 },
      { name: "Hyderabad, Hitec City", full: "Madhapur Main Road, Hitec City, Hyderabad, Telangana 500081", lat: 17.4435, lng: 78.3772 },
      { name: "Pune, Koregaon Park", full: "North Main Road, Koregaon Park, Pune, Maharashtra 411001", lat: 18.5362, lng: 73.8940 }
    ];

    let closest = hubs[0];
    let minDist = Infinity;
    hubs.forEach(hub => {
      const dist = Math.hypot(hub.lat - lat, hub.lng - lng);
      if (dist < minDist) {
        minDist = dist;
        closest = hub;
      }
    });
    return closest;
  },

  // Curated Comprehensive Indian Cities, Streets, Landmarks & Transit Database
  indianLandmarksDB: [
    // Andhra Pradesh / Visakhapatnam / Vizianagaram / Amaravati
    { title: "Main Road, Vizianagaram", sub: "Main Road, Near RTC Complex, Vizianagaram, Andhra Pradesh 535002", type: "STREET", lat: 18.1124, lng: 83.4074 },
    { title: "Vizianagaram Fort", sub: "Fort Area, Cantonment, Vizianagaram, Andhra Pradesh 535003", type: "LANDMARK", lat: 18.1171, lng: 83.4150 },
    { title: "RTC Complex, Vizianagaram", sub: "RTC Bus Stand, Vizianagaram, Andhra Pradesh 535002", type: "TRANSIT", lat: 18.1142, lng: 83.3985 },
    { title: "Balaji Nagar, Vizianagaram", sub: "Balaji Nagar, Vizianagaram, Andhra Pradesh 535003", type: "AREA", lat: 18.1210, lng: 83.4020 },
    { title: "Cantonment, Vizianagaram", sub: "Cantonment Area, Vizianagaram, Andhra Pradesh 535003", type: "AREA", lat: 18.1180, lng: 83.4190 },
    { title: "Phool Bagh, Vizianagaram", sub: "Phool Bagh Colony, Vizianagaram, Andhra Pradesh 535002", type: "AREA", lat: 18.1090, lng: 83.4010 },
    { title: "Gooty Petrol Bunk Junction, Vizianagaram", sub: "Kothavalasa Road, Vizianagaram, AP 535002", type: "STREET", lat: 18.1150, lng: 83.4050 },
    { title: "RK Beach, Visakhapatnam", sub: "Ramakrishna Beach Road, Pandurangapuram, Visakhapatnam, AP 530003", type: "LANDMARK", lat: 17.7126, lng: 83.3242 },
    { title: "Jagadamba Junction, Visakhapatnam", sub: "Jagadamba Centre, Visakhapatnam, Andhra Pradesh 530020", type: "LANDMARK", lat: 17.7118, lng: 83.3005 },
    { title: "MVP Colony, Visakhapatnam", sub: "MVP Colony Sector 1 to 12, Visakhapatnam, Andhra Pradesh 530017", type: "AREA", lat: 17.7420, lng: 83.3364 },
    { title: "Gajuwaka, Visakhapatnam", sub: "High School Road, Gajuwaka, Visakhapatnam, Andhra Pradesh 530026", type: "AREA", lat: 17.6904, lng: 83.2185 },
    { title: "Madhurawada, Visakhapatnam", sub: "IT SEZ Road, Madhurawada, Visakhapatnam, Andhra Pradesh 530048", type: "AREA", lat: 17.8016, lng: 83.3512 },
    { title: "Dwaraka Nagar, Visakhapatnam", sub: "Dwaraka Bus Station, Dwaraka Nagar, Visakhapatnam, AP 530016", type: "COMMERCIAL", lat: 17.7289, lng: 83.3101 },
    { title: "Rushikonda Beach, Visakhapatnam", sub: "Rushikonda IT Park Road, Visakhapatnam, AP 530045", type: "LANDMARK", lat: 17.7818, lng: 83.3853 },
    { title: "Benz Circle, Vijayawada", sub: "MG Road, Benz Circle, Vijayawada, Andhra Pradesh 520010", type: "LANDMARK", lat: 16.5003, lng: 80.6508 },
    { title: "Arundelpet, Guntur", sub: "Main Road, Arundelpet, Guntur, Andhra Pradesh 522002", type: "AREA", lat: 16.3067, lng: 80.4365 },

    // Hyderabad & Telangana
    { title: "Cyber Towers, Hitec City", sub: "Hitec City Main Road, Madhapur, Hyderabad, Telangana 500081", type: "COMMERCIAL", lat: 17.4504, lng: 78.3808 },
    { title: "Inorbit Mall, Hyderabad", sub: "Mindspace Road, Vittal Rao Nagar, Madhapur, Hyderabad 500081", type: "MALL", lat: 17.4344, lng: 78.3866 },
    { title: "Gachibowli Financial District", sub: "ISB Road, Financial District, Nanakramguda, Hyderabad 500032", type: "COMMERCIAL", lat: 17.4190, lng: 78.3486 },
    { title: "Jubilee Hills Check Post", sub: "Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033", type: "LANDMARK", lat: 17.4299, lng: 78.4116 },
    { title: "Banjara Hills Road No. 12", sub: "Ministers Colony, Banjara Hills, Hyderabad, Telangana 500034", type: "STREET", lat: 17.4123, lng: 78.4418 },
    { title: "Kukatpally KPHB Colony", sub: "JNTU Road, KPHB Phase 1 to 9, Hyderabad, Telangana 500072", type: "AREA", lat: 17.4933, lng: 78.3995 },
    { title: "Charminar", sub: "Char Kaman, Ghansi Bazaar, Hyderabad, Telangana 500002", type: "LANDMARK", lat: 17.3616, lng: 78.4747 },
    { title: "Madhapur Metro Station", sub: "Hitec City Road, Ayyappa Society, Madhapur, Hyderabad 500081", type: "TRANSIT", lat: 17.4390, lng: 78.3900 },
    { title: "Ameerpet Junction", sub: "Greenlands Road, Ameerpet, Hyderabad, Telangana 500016", type: "COMMERCIAL", lat: 17.4375, lng: 78.4483 },
    { title: "Kondapur", sub: "Botanical Garden Road, Kondapur, Hyderabad, Telangana 500084", type: "AREA", lat: 17.4699, lng: 78.3578 },

    // Bangalore
    { title: "100 Feet Road, Indiranagar", sub: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bangalore 560038", type: "STREET", lat: 12.9784, lng: 77.6408 },
    { title: "80 Feet Road, Koramangala", sub: "80 Feet Road, 4th Block, Koramangala, Bangalore 560034", type: "STREET", lat: 12.9352, lng: 77.6245 },
    { title: "Church Street, Bangalore", sub: "Church Street, Off Brigade Road, Shanthala Nagar, Bangalore 560001", type: "STREET", lat: 12.9749, lng: 77.6045 },
    { title: "MG Road Metro Station", sub: "Mahatma Gandhi Road, Bangalore, Karnataka 560001", type: "TRANSIT", lat: 12.9756, lng: 77.6066 },
    { title: "Whitefield ITPL", sub: "International Tech Park, Whitefield Main Road, Bangalore 560066", type: "COMMERCIAL", lat: 12.9863, lng: 77.7377 },
    { title: "Phoenix Marketcity Bangalore", sub: "Whitefield Main Road, Mahadevapura, Bangalore 560048", type: "MALL", lat: 12.9959, lng: 77.6965 },
    { title: "HSR Layout Sector 1 to 7", sub: "27th Main Road, HSR Layout, Bangalore, Karnataka 560102", type: "AREA", lat: 12.9121, lng: 77.6446 },
    { title: "Marathahalli Bridge", sub: "Outer Ring Road, Marathahalli, Bangalore, Karnataka 560037", type: "LANDMARK", lat: 12.9554, lng: 77.7011 },
    { title: "Electronic City Phase 1", sub: "Hosur Road, Infosys Campus, Electronic City, Bangalore 560100", type: "COMMERCIAL", lat: 12.8452, lng: 77.6602 },
    { title: "Jayanagar 4th Block Complex", sub: "9th Main Road, 4th Block, Jayanagar, Bangalore 560011", type: "COMMERCIAL", lat: 12.9298, lng: 77.5833 },
    { title: "JP Nagar 6th Phase", sub: "24th Main Road, JP Nagar 6th Phase, Bangalore 560078", type: "AREA", lat: 12.9063, lng: 77.5857 },
    { title: "Bellandur EcoSpace", sub: "Outer Ring Road, Bellandur, Bangalore, Karnataka 560103", type: "COMMERCIAL", lat: 12.9260, lng: 77.6762 },
    { title: "Sarjapur Road", sub: "Sarjapur Main Road, Carmelaram, Bangalore 560035", type: "STREET", lat: 12.9110, lng: 77.6830 },
    { title: "Orion Mall Rajajinagar", sub: "Dr Rajkumar Road, Malleshwaram West, Bangalore 560055", type: "MALL", lat: 13.0112, lng: 77.5550 },

    // Mumbai & MMR
    { title: "Hill Road, Bandra West", sub: "Hill Road, Bandra West, Mumbai, Maharashtra 400050", type: "STREET", lat: 19.0596, lng: 72.8295 },
    { title: "Carter Road Promenade", sub: "Carter Road, Bandra West, Mumbai, Maharashtra 400050", type: "LANDMARK", lat: 19.0664, lng: 72.8258 },
    { title: "Marine Drive Promenade", sub: "Netaji Subhash Chandra Bose Road, Nariman Point, Mumbai 400021", type: "LANDMARK", lat: 18.9438, lng: 72.8231 },
    { title: "Lokhandwala Complex", sub: "Lokhandwala Market, Andheri West, Mumbai 400053", type: "COMMERCIAL", lat: 19.1417, lng: 72.8258 },
    { title: "Juhu Beach", sub: "Juhu Tara Road, Juhu, Mumbai, Maharashtra 400049", type: "LANDMARK", lat: 19.0988, lng: 72.8264 },
    { title: "Hiranandani Gardens, Powai", sub: "Central Avenue, Powai, Mumbai, Maharashtra 400076", type: "AREA", lat: 19.1197, lng: 72.9051 },
    { title: "High Street Phoenix, Lower Parel", sub: "Senapati Bapat Marg, Lower Parel, Mumbai 400013", type: "MALL", lat: 18.9950, lng: 72.8242 },
    { title: "Colaba Causeway", sub: "Shahid Bhagat Singh Road, Colaba, Mumbai 400005", type: "STREET", lat: 18.9220, lng: 72.8317 },

    // Delhi NCR
    { title: "Connaught Place Inner Circle", sub: "Connaught Place, New Delhi, Delhi 110001", type: "LANDMARK", lat: 28.6315, lng: 77.2167 },
    { title: "Cyber Hub, Gurgaon", sub: "DLF Cyber City, Sector 24, Gurugram, Haryana 122002", type: "COMMERCIAL", lat: 28.4949, lng: 77.0895 },
    { title: "Hauz Khas Village", sub: "Deer Park, Hauz Khas, New Delhi, Delhi 110016", type: "LANDMARK", lat: 28.5535, lng: 77.1945 },
    { title: "Select Citywalk, Saket", sub: "District Centre, Sector 6, Pushp Vihar, Saket, New Delhi 110017", type: "MALL", lat: 28.5284, lng: 77.2195 },
    { title: "Sector 18 Mall of India, Noida", sub: "Sector 18, Noida, Uttar Pradesh 201301", type: "MALL", lat: 28.5677, lng: 77.3210 },
    { title: "Khan Market", sub: "Rabindra Nagar, New Delhi, Delhi 110003", type: "COMMERCIAL", lat: 28.6003, lng: 77.2270 },

    // Pune
    { title: "North Main Road, Koregaon Park", sub: "Koregaon Park, Pune, Maharashtra 411001", type: "STREET", lat: 18.5362, lng: 73.8940 },
    { title: "FC Road, Pune", sub: "Fergusson College Road, Shivajinagar, Pune 411004", type: "STREET", lat: 18.5236, lng: 73.8415 },
    { title: "Phoenix Marketcity, Viman Nagar", sub: "Viman Nagar, Pune, Maharashtra 411014", type: "MALL", lat: 18.5620, lng: 73.9167 },
    { title: "Hinjewadi IT Park Phase 1", sub: "Hinjewadi Main Road, Pune, Maharashtra 411057", type: "COMMERCIAL", lat: 18.5913, lng: 73.7389 },
    { title: "Baner High Street", sub: "Baner Road, Baner, Pune, Maharashtra 411045", type: "STREET", lat: 18.5590, lng: 73.7793 }
  ],

  handleSearchInput: function(query) {
    const clearBtn = document.getElementById("map-search-clear-btn");
    const resultsDropdown = document.getElementById("map-search-results");
    
    if (clearBtn) clearBtn.style.display = query ? "flex" : "none";
    if (!query || query.trim().length < 1) {
      if (resultsDropdown) resultsDropdown.style.display = "none";
      return;
    }

    clearTimeout(this.searchDebounceTimer);
    this.searchDebounceTimer = setTimeout(() => {
      this.searchLocations(query.trim());
    }, 250);
  },

  clearMapSearch: function() {
    const input = document.getElementById("map-location-search");
    const clearBtn = document.getElementById("map-search-clear-btn");
    const resultsDropdown = document.getElementById("map-search-results");
    if (input) input.value = "";
    if (clearBtn) clearBtn.style.display = "none";
    if (resultsDropdown) resultsDropdown.style.display = "none";
  },

  getIconForType: function(type) {
    switch (type) {
      case "LANDMARK":
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
      case "TRANSIT":
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/></svg>`;
      case "MALL":
      case "COMMERCIAL":
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>`;
      case "STREET":
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="2" x2="6" y2="22"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="10" x2="12" y2="14"/><line x1="12" y1="18" x2="12" y2="22"/></svg>`;
      default:
        return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>`;
    }
  },

  getBadgeForType: function(type) {
    switch (type) {
      case "LANDMARK":
        return `<span class="badge badge-warning" style="font-size:0.68rem; padding:1px 6px;">LANDMARK</span>`;
      case "TRANSIT":
        return `<span class="badge badge-primary" style="font-size:0.68rem; padding:1px 6px;">TRANSIT</span>`;
      case "MALL":
        return `<span class="badge badge-primary" style="font-size:0.68rem; padding:1px 6px;">MALL</span>`;
      case "COMMERCIAL":
        return `<span class="badge badge-primary" style="font-size:0.68rem; padding:1px 6px;">TECH PARK</span>`;
      case "STREET":
        return `<span class="badge badge-success" style="font-size:0.68rem; padding:1px 6px;">STREET</span>`;
      default:
        return `<span class="badge badge-primary" style="font-size:0.68rem; padding:1px 6px;">LOCATION</span>`;
    }
  },

  searchLocations: function(query) {
    const resultsDropdown = document.getElementById("map-search-results");
    if (!resultsDropdown) return;

    const qLower = query.toLowerCase();

    // 1. Instant Local Matching (Tier 1)
    const localMatches = this.indianLandmarksDB.filter(item => {
      return item.title.toLowerCase().includes(qLower) || item.sub.toLowerCase().includes(qLower);
    });

    // Render local matches immediately if found
    if (localMatches.length > 0) {
      this.renderSearchResults(localMatches, query);
    } else {
      resultsDropdown.innerHTML = `<div style="padding:12px; font-size:0.85rem; color:var(--text-muted); text-align:center;">Searching all streets, landmarks & areas...</div>`;
      resultsDropdown.style.display = "block";
    }

    // 2. Concurrently Query OpenStreetMap Geocoding (Photon & Nominatim)
    const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=8&lang=en`;
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=8&countrycodes=in&addressdetails=1`;

    fetch(photonUrl)
      .then(res => res.json())
      .then(data => {
        let externalMatches = [];
        if (data && data.features && data.features.length > 0) {
          externalMatches = data.features.map(f => {
            const props = f.properties || {};
            const name = props.name || props.street || props.city || "Location";
            const street = props.street || "";
            const locality = props.district || props.suburb || props.locality || "";
            const city = props.city || props.state || "";
            const state = props.state || "";
            const postcode = props.postcode || "";
            const fullDesc = [street, locality, city, state, postcode].filter(Boolean).join(", ") || props.formatted || name;

            let cat = "LOCATION";
            if (props.osm_key === "highway") cat = "STREET";
            else if (props.osm_key === "amenity" || props.osm_key === "tourism" || props.osm_key === "historic") cat = "LANDMARK";
            else if (props.osm_key === "railway" || props.osm_key === "public_transport") cat = "TRANSIT";
            else if (props.osm_key === "shop" || props.osm_key === "building") cat = "COMMERCIAL";

            return {
              title: name,
              sub: fullDesc,
              type: cat,
              lat: f.geometry.coordinates[1],
              lng: f.geometry.coordinates[0]
            };
          });
        }

        // Merge local and external matches (deduplicate)
        const combined = [...localMatches];
        externalMatches.forEach(em => {
          if (!combined.some(c => Math.abs(c.lat - em.lat) < 0.002 && Math.abs(c.lng - em.lng) < 0.002)) {
            combined.push(em);
          }
        });

        if (combined.length > 0) {
          this.renderSearchResults(combined, query);
        } else {
          // Fallback to Nominatim if Photon returned no results
          this.fetchNominatimFallback(nominatimUrl, query, localMatches);
        }
      })
      .catch(() => {
        this.fetchNominatimFallback(nominatimUrl, query, localMatches);
      });
  },

  fetchNominatimFallback: function(url, query, localMatches) {
    const resultsDropdown = document.getElementById("map-search-results");
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let matches = [...localMatches];
        if (data && data.length > 0) {
          data.forEach(item => {
            const parts = item.display_name.split(',');
            const title = parts[0].trim();
            const sub = item.display_name;
            const lat = parseFloat(item.lat);
            const lng = parseFloat(item.lon);
            if (!matches.some(m => Math.abs(m.lat - lat) < 0.002 && Math.abs(m.lng - lng) < 0.002)) {
              matches.push({
                title: title,
                sub: sub,
                type: item.type === "highway" ? "STREET" : (item.type === "administrative" ? "AREA" : "LANDMARK"),
                lat: lat,
                lng: lng
              });
            }
          });
        }

        if (matches.length > 0) {
          this.renderSearchResults(matches, query);
        } else {
          if (resultsDropdown) {
            resultsDropdown.innerHTML = `<div style="padding:14px; font-size:0.85rem; color:var(--text-muted); text-align:center;">No matching locations found for "${query}". Try searching an area or city name.</div>`;
            resultsDropdown.style.display = "block";
          }
        }
      })
      .catch(() => {
        if (localMatches.length > 0) {
          this.renderSearchResults(localMatches, query);
        } else if (resultsDropdown) {
          resultsDropdown.innerHTML = `<div style="padding:14px; font-size:0.85rem; color:var(--text-muted); text-align:center;">Pick directly on map or select a delivery hub below.</div>`;
          resultsDropdown.style.display = "block";
        }
      });
  },

  renderSearchResults: function(results, query) {
    const resultsDropdown = document.getElementById("map-search-results");
    if (!resultsDropdown) return;

    resultsDropdown.innerHTML = results.slice(0, 10).map(place => {
      const icon = this.getIconForType(place.type);
      const badge = this.getBadgeForType(place.type);
      const cleanSub = place.sub.replace(/'/g, "\\'");
      const cleanTitle = place.title.replace(/'/g, "\\'");

      return `
        <div class="map-search-result-item" onclick="FoodApp.selectSearchResult(${place.lat}, ${place.lng}, '${cleanTitle}', '${cleanSub}')">
          <div class="map-search-result-icon-box">
            ${icon}
          </div>
          <div class="map-search-result-content">
            <div class="map-search-result-heading">
              <span>${place.title}</span>
              ${badge}
            </div>
            <div class="map-search-result-desc">${place.sub}</div>
          </div>
        </div>
      `;
    }).join('');

    resultsDropdown.style.display = "block";
  },

  selectSearchResult: function(lat, lng, title, fullAddress) {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    this.currentSelectedCoords = { lat: latNum, lng: lngNum };
    
    this.currentSelectedAddress = title || "Selected Delivery Location";
    this.currentFullAddress = fullAddress || title;

    const titleEl = document.getElementById("selected-address-title");
    const subtextEl = document.getElementById("selected-address-subtext");
    const coordsBadge = document.getElementById("selected-coords-badge");
    const resultsDropdown = document.getElementById("map-search-results");
    const searchInput = document.getElementById("map-location-search");

    if (searchInput) searchInput.value = title;
    if (titleEl) titleEl.textContent = this.currentSelectedAddress;
    if (subtextEl) subtextEl.textContent = this.currentFullAddress;
    if (coordsBadge) coordsBadge.textContent = `${latNum.toFixed(4)}° N, ${lngNum.toFixed(4)}° E`;
    if (resultsDropdown) resultsDropdown.style.display = "none";

    if (this.deliveryMap) {
      this.deliveryMap.flyTo([latNum, lngNum], 16, { animate: true, duration: 1.2 });
      if (this.deliveryMarker) {
        this.deliveryMarker.setLatLng([latNum, lngNum]);
      }
    }
  },

  selectQuickCity: function(cityName, lat, lng, fullAddress, btn) {
    this.currentSelectedCoords = { lat, lng };
    this.currentSelectedAddress = cityName;
    this.currentFullAddress = fullAddress;

    const titleEl = document.getElementById("selected-address-title");
    const subtextEl = document.getElementById("selected-address-subtext");
    const coordsBadge = document.getElementById("selected-coords-badge");

    if (titleEl) titleEl.textContent = cityName;
    if (subtextEl) subtextEl.textContent = fullAddress;
    if (coordsBadge) coordsBadge.textContent = `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`;

    if (btn) {
      document.querySelectorAll(".city-hub-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    }

    if (this.deliveryMap) {
      this.deliveryMap.flyTo([lat, lng], 16, { animate: true, duration: 1.2 });
      if (this.deliveryMarker) {
        this.deliveryMarker.setLatLng([lat, lng]);
      }
    }
  },

  recenterMapOnCurrentPin: function() {
    if (this.deliveryMap && this.currentSelectedCoords) {
      this.deliveryMap.flyTo([this.currentSelectedCoords.lat, this.currentSelectedCoords.lng], 17, {
        animate: true,
        duration: 0.8
      });
    }
  },

  confirmDeliveryLocation: function() {
    const locName = this.currentSelectedAddress;
    localStorage.setItem("food_app_location", locName);
    localStorage.setItem("food_app_coords", JSON.stringify(this.currentSelectedCoords));
    localStorage.setItem("food_app_full_address", this.currentFullAddress);

    const locElements = document.querySelectorAll(".current-location-text");
    locElements.forEach(el => el.textContent = locName);

    this.closeModal("location-modal");
    this.showToast(`Delivery location set to: ${locName}`, "success");
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
