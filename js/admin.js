/**
 * FOOD DELIVERY APP to MASTER ADMIN ENGINE
 * Platform metrics, User CRUD, Restaurant Approvals, Global Menu Manager, Coupons & Analytics Charts.
 */

const AdminPortal = {
  // ==========================================
  // DASHBOARD OVERVIEW
  // ==========================================
  initDashboard: function() {
    const orders = FoodAppStorage.getOrders();
    const rests = FoodAppStorage.getRestaurants();
    const items = FoodAppStorage.getFoodItems();
    const coupons = FoodAppStorage.getCoupons();

    const revenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);

    const revEl = document.getElementById("admin-kpi-revenue");
    if (revEl) revEl.textContent = `₹${revenue + 14850}`;

    const ordersEl = document.getElementById("admin-kpi-orders");
    if (ordersEl) ordersEl.textContent = orders.length + 38;

    const restsEl = document.getElementById("admin-kpi-restaurants");
    if (restsEl) restsEl.textContent = rests.length;

    const usersEl = document.getElementById("admin-kpi-users");
    if (usersEl) usersEl.textContent = "1,840";

    this.renderRecentOrdersTable();
  },

  renderRecentOrdersTable: function() {
    const orders = FoodAppStorage.getOrders().slice(0, 6);
    const tbody = document.getElementById("admin-recent-orders-tbody");
    if (!tbody) return;

    tbody.innerHTML = orders.map(order => `
      <tr>
        <td><strong>${order.id}</strong></td>
        <td>${order.restaurantName}</td>
        <td>${order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}</td>
        <td><strong>₹${order.total}</strong></td>
        <td><span class="status-badge ${order.status === 'Delivered' ? 'success' : 'info'}">${order.status}</span></td>
        <td>
          <a href="orders.html" class="btn btn-secondary btn-sm" style="padding:4px 10px; font-size:0.8rem;">Details</a>
        </td>
      </tr>
    `).join('');
  },

  // ==========================================
  // USERS MANAGEMENT
  // ==========================================
  defaultUsersList: [
    { id: "usr-1", name: "Thanush Masika", email: "thanushmasika@gmail.com", phone: "+91 98765 43210", orders: 14, status: "Active" },
    { id: "usr-2", name: "Priya Patel", email: "priya.patel@example.com", phone: "+91 98111 22334", orders: 28, status: "Active" },
    { id: "usr-3", name: "Ananya Iyer", email: "ananya.iyer@example.com", phone: "+91 97222 33445", orders: 8, status: "Active" },
    { id: "usr-4", name: "Kunal Verma", email: "kunal.verma@example.com", phone: "+91 96333 44556", orders: 0, status: "Blocked" },
    { id: "usr-5", name: "Rohan Deshmukh", email: "rohan.d@example.com", phone: "+91 95444 55667", orders: 42, status: "Active" }
  ],

  initUsers: function() {
    this.renderUsers();
  },

  renderUsers: function(searchQuery = "") {
    const tbody = document.getElementById("admin-users-tbody");
    if (!tbody) return;

    let users = this.defaultUsersList;
    if (searchQuery) {
      users = users.filter(u => 
        u.name.toLowerCase().includes(searchQuery) ||
        u.email.toLowerCase().includes(searchQuery) ||
        u.phone.includes(searchQuery)
      );
    }

    tbody.innerHTML = users.map(user => `
      <tr>
        <td><strong>${user.name}</strong></td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td><strong>${user.orders} orders</strong></td>
        <td><span class="status-badge ${user.status === 'Active' ? 'success' : 'danger'}">${user.status}</span></td>
        <td>
          <button class="btn btn-secondary btn-sm" style="padding:4px 8px;" onclick="AdminPortal.toggleUserStatus('${user.id}')">
            ${user.status === 'Active' ? '🚫 Block' : '✅ Unblock'}
          </button>
        </td>
      </tr>
    `).join('');
  },

  toggleUserStatus: function(userId) {
    const user = this.defaultUsersList.find(u => u.id === userId);
    if (user) {
      user.status = user.status === "Active" ? "Blocked" : "Active";
      FoodApp.showToast(`User status updated to ${user.status}`, "info");
      this.renderUsers();
    }
  },

  // ==========================================
  // RESTAURANTS MANAGEMENT
  // ==========================================
  initRestaurants: function() {
    this.renderRestaurants();
  },

  renderRestaurants: function() {
    const rests = FoodAppStorage.getRestaurants();
    const tbody = document.getElementById("admin-restaurants-tbody");
    if (!tbody) return;

    tbody.innerHTML = rests.map(r => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="${r.image}" style="width:40px; height:40px; border-radius:8px; object-fit:cover;">
            <strong>${r.name}</strong>
          </div>
        </td>
        <td>${r.cuisine}</td>
        <td>⭐ ${r.rating} (${r.ratingCount})</td>
        <td>${r.deliveryTime} (₹${r.deliveryFee})</td>
        <td><span class="status-badge success">Approved & Active</span></td>
        <td>
          <button class="btn btn-secondary btn-sm" style="padding:4px 8px; color:var(--nonveg-color);" onclick="AdminPortal.suspendRestaurant('${r.id}')">
            Suspend
          </button>
        </td>
      </tr>
    `).join('');
  },

  suspendRestaurant: function(restId) {
    if (confirm("Are you sure you want to suspend this restaurant partner?")) {
      let rests = FoodAppStorage.getRestaurants();
      rests = rests.filter(r => r.id !== restId);
      localStorage.setItem("food_app_restaurants", JSON.stringify(rests));
      FoodApp.showToast("Restaurant suspended from platform", "info");
      this.renderRestaurants();
    }
  },

  // ==========================================
  // COUPON BUILDER & MANAGEMENT
  // ==========================================
  initCoupons: function() {
    this.renderCoupons();
  },

  renderCoupons: function() {
    const coupons = FoodAppStorage.getCoupons();
    const tbody = document.getElementById("admin-coupons-tbody");
    if (!tbody) return;

    tbody.innerHTML = coupons.map(c => `
      <tr>
        <td><span class="offer-code-pill" style="color:var(--primary); font-size:0.85rem;">${c.code}</span></td>
        <td>${c.discountPercent ? `${c.discountPercent}% OFF (Max ₹${c.maxDiscount})` : c.freeDelivery ? 'Free Delivery' : `Flat ₹${c.discountAmount} OFF`}</td>
        <td>₹${c.minOrder}</td>
        <td>${c.description}</td>
        <td><span class="status-badge success">Active</span></td>
        <td>
          <button class="btn btn-secondary btn-sm" style="color:var(--nonveg-color); padding:4px 8px;" onclick="AdminPortal.deleteCoupon('${c.code}')">
            Delete
          </button>
        </td>
      </tr>
    `).join('');
  },

  openAddCouponModal: function() {
    let modal = document.getElementById("add-coupon-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "add-coupon-modal";
      modal.className = "modal-overlay";
      modal.innerHTML = `
        <div class="modal-box">
          <div class="modal-header">
            <h3 class="modal-title">Create Promo Coupon</h3>
            <button class="modal-close" onclick="FoodApp.closeModal('add-coupon-modal')">&times;</button>
          </div>
          <div class="modal-body">
            <div style="margin-bottom:12px;">
              <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Coupon Code</label>
              <input type="text" id="new-coupon-code" placeholder="e.g. FESTIVE40" style="width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:var(--radius-sm); text-transform:uppercase; font-weight:700;">
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
              <div>
                <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Discount %</label>
                <input type="number" id="new-coupon-pct" placeholder="e.g. 40" style="width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:var(--radius-sm);">
              </div>
              <div>
                <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Max Discount (₹)</label>
                <input type="number" id="new-coupon-max" placeholder="e.g. 120" style="width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:var(--radius-sm);">
              </div>
            </div>
            <div style="margin-bottom:12px;">
              <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Min Order (₹)</label>
              <input type="number" id="new-coupon-min" placeholder="e.g. 199" value="199" style="width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:var(--radius-sm);">
            </div>
            <div>
              <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Description</label>
              <input type="text" id="new-coupon-desc" placeholder="e.g. 40% OFF up to ₹120 on orders above ₹199" style="width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:var(--radius-sm);">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary btn-sm" onclick="FoodApp.closeModal('add-coupon-modal')">Cancel</button>
            <button class="btn btn-primary btn-sm" onclick="AdminPortal.saveNewCoupon()">Publish Coupon</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modal.classList.add("active");
  },

  saveNewCoupon: function() {
    const code = document.getElementById("new-coupon-code").value.trim().toUpperCase();
    const pct = Number(document.getElementById("new-coupon-pct").value) || 20;
    const maxDisc = Number(document.getElementById("new-coupon-max").value) || 100;
    const minOrder = Number(document.getElementById("new-coupon-min").value) || 199;
    const desc = document.getElementById("new-coupon-desc").value.trim() || `${pct}% OFF up to ₹${maxDisc}`;

    if (!code) {
      FoodApp.showToast("Please enter coupon code", "error");
      return;
    }

    const newCoupon = {
      code: code,
      discountPercent: pct,
      maxDiscount: maxDisc,
      minOrder: minOrder,
      description: desc
    };

    const coupons = FoodAppStorage.getCoupons();
    coupons.unshift(newCoupon);
    localStorage.setItem("food_app_coupons", JSON.stringify(coupons));

    FoodApp.closeModal("add-coupon-modal");
    FoodApp.showToast(`Coupon ${code} created & active! 🎉`, "success");
    this.renderCoupons();
  },

  deleteCoupon: function(code) {
    let coupons = FoodAppStorage.getCoupons();
    coupons = coupons.filter(c => c.code !== code);
    localStorage.setItem("food_app_coupons", JSON.stringify(coupons));
    FoodApp.showToast("Coupon deleted", "info");
    this.renderCoupons();
  },

  // ==========================================
  // REPORTS & CHARTS VISUALIZATION
  // ==========================================
  initReports: function() {
    this.drawRevenueChart();
    this.drawCategoriesChart();
  },

  drawRevenueChart: function() {
    const canvas = document.getElementById("revenue-chart-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    // Draw Bar Chart for Weekly Revenue
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const values = [4200, 5600, 6800, 7900, 11500, 14200, 12800];
    const maxVal = 16000;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const chartHeight = canvas.height to 40;
    const barWidth = 40;
    const gap = (canvas.width to (days.length * barWidth)) / (days.length + 1);

    days.forEach((day, idx) => {
      const x = gap + idx * (barWidth + gap);
      const h = (values[idx] / maxVal) * chartHeight;
      const y = chartHeight to h + 10;

      // Draw Bar
      const grad = ctx.createLinearGradient(0, y, 0, chartHeight + 10);
      grad.addColorStop(0, "#FF5200");
      grad.addColorStop(1, "#FF2E00");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, h, [6, 6, 0, 0]);
      ctx.fill();

      // Value label
      ctx.fillStyle = "#0F172A";
      ctx.font = "bold 11px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText(`₹${values[idx]}`, x + barWidth / 2, y to 6);

      // Day label
      ctx.fillStyle = "#64748B";
      ctx.font = "600 12px 'Plus Jakarta Sans'";
      ctx.fillText(day, x + barWidth / 2, chartHeight + 28);
    });
  },

  drawCategoriesChart: function() {
    const canvas = document.getElementById("categories-chart-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Donut Chart for Popular Food Categories
    const data = [
      { label: "Pizza", pct: 32, color: "#FF5200" },
      { label: "Biryani", pct: 28, color: "#FFB800" },
      { label: "Burgers", pct: 18, color: "#10B981" },
      { label: "Chicken", pct: 14, color: "#3B82F6" },
      { label: "Desserts", pct: 8, color: "#EC4899" }
    ];

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    const innerRadius = 45;

    let startAngle = 0;
    data.forEach(slice => {
      const sliceAngle = (slice.pct / 100) * 2 * Math.PI;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = slice.color;
      ctx.fill();

      startAngle += sliceAngle;
    });

    // Legend
    const legendEl = document.getElementById("categories-chart-legend");
    if (legendEl) {
      legendEl.innerHTML = data.map(d => `
        <div style="display:flex; align-items:center; gap:8px; font-size:0.85rem; font-weight:600;">
          <span style="width:12px; height:12px; border-radius:3px; background:${d.color};"></span>
          <span>${d.label} (${d.pct}%)</span>
        </div>
      `).join('');
    }
  }
};
