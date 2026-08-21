/**
 * FOOD DELIVERY APP - DELIVERY PARTNER ENGINE
 * Manages Rider Availability, Available deliveries, Active delivery lifecycle & Earnings.
 */

const DeliveryPortal = {
  isOnline: true,
  activeDeliveryId: null,

  init: function() {
    this.renderKPIs();
    this.renderAvailableDeliveries();
    this.renderActiveDelivery();
  },

  toggleOnlineStatus: function() {
    this.isOnline = !this.isOnline;
    const badge = document.getElementById("rider-status-pill");
    if (badge) {
      if (this.isOnline) {
        badge.className = "status-badge success";
        badge.textContent = "🟢 Online & Receiving Orders";
      } else {
        badge.className = "status-badge danger";
        badge.textContent = "🔴 Offline";
      }
    }
    FoodApp.showToast(`Status: You are now ${this.isOnline ? 'Online' : 'Offline'}`, "info");
    this.renderAvailableDeliveries();
  },

  renderKPIs: function() {
    const orders = FoodAppStorage.getOrders();
    const completed = orders.filter(o => o.status === "Delivered");
    const earnings = completed.length * 45; // ₹45 per delivery fee

    const compEl = document.getElementById("rider-kpi-completed");
    if (compEl) compEl.textContent = completed.length;

    const earnEl = document.getElementById("rider-kpi-earnings");
    if (earnEl) earnEl.textContent = `₹${earnings + 250}`; // + Base incentive

    const ratingEl = document.getElementById("rider-kpi-rating");
    if (ratingEl) ratingEl.textContent = "⭐ 4.9 (142 ratings)";
  },

  renderAvailableDeliveries: function() {
    const container = document.getElementById("rider-available-orders-container");
    if (!container) return;

    if (!this.isOnline) {
      container.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--text-muted);">
          You are currently offline. Turn on your status to view nearby pickup requests.
        </div>
      `;
      return;
    }

    const orders = FoodAppStorage.getOrders();
    const available = orders.filter(o => o.status === "Restaurant Accepted" || o.status === "Order Placed");

    if (available.length === 0) {
      container.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--text-muted);">
          🎉 No pending orders right now. You're in a high-demand zone!
        </div>
      `;
      return;
    }

    container.innerHTML = available.map(order => `
      <div class="cart-items-card" style="margin-bottom: 16px; background: var(--surface);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div>
            <div style="font-weight:800; font-size:1.1rem;">Pickup: ${order.restaurantName || 'Artisan Restaurant'}</div>
            <div style="font-size:0.82rem; color:var(--text-muted);">Deliver to: ${order.address}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:1.2rem; font-weight:800; color:var(--veg-color); font-family:'Outfit', sans-serif;">+₹55</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">Est. Payout</div>
          </div>
        </div>

        <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:14px;">
          Items: ${order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
        </div>

        <button class="btn btn-primary btn-sm" style="width:100%;" onclick="DeliveryPortal.acceptOrder('${order.id}')">
          Accept Delivery Request 🛵
        </button>
      </div>
    `).join('');
  },

  acceptOrder: function(orderId) {
    const orders = FoodAppStorage.getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx > -1) {
      orders[idx].status = "Food Being Prepared";
      FoodAppStorage.saveOrders(orders);
      this.activeDeliveryId = orderId;
      FoodApp.showToast(`Accepted Delivery for ${orderId}! Heading to restaurant 🛵`, "success");
      this.renderAvailableDeliveries();
      this.renderActiveDelivery();
    }
  },

  renderActiveDelivery: function() {
    const orders = FoodAppStorage.getOrders();
    const activeOrder = orders.find(o => o.status === "Food Being Prepared" || o.status === "Out for Delivery") || null;
    const container = document.getElementById("rider-active-delivery-container");
    if (!container) return;

    if (!activeOrder) {
      container.innerHTML = `
        <div style="padding: 40px 20px; text-align: center; color: var(--text-muted);">
          No active delivery in progress. Accept an order above to start!
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="cart-items-card" style="border: 2px solid var(--primary); background: #FFFBF9;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; border-bottom:1px solid var(--border); padding-bottom:10px;">
          <div>
            <span class="chip" style="background:var(--primary-light); color:var(--primary); font-weight:800; font-size:0.75rem;">
              ● ACTIVE DELIVERY IN PROGRESS
            </span>
            <div style="font-size:1.2rem; font-weight:800; margin-top:4px;">Order ID: ${activeOrder.id}</div>
          </div>
          <span class="status-badge warning" style="font-size:0.85rem;">${activeOrder.status}</span>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
          <div style="background:var(--surface); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border);">
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">1. Pickup Restaurant</div>
            <div style="font-weight:700; font-size:0.95rem; margin:4px 0;">${activeOrder.restaurantName}</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">Indiranagar 100ft Road</div>
          </div>

          <div style="background:var(--surface); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border);">
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">2. Delivery Customer</div>
            <div style="font-weight:700; font-size:0.95rem; margin:4px 0;">Rahul Sharma (📞 +91 98765 43210)</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">${activeOrder.address}</div>
          </div>
        </div>

        <!-- Action Stage Advance -->
        <div style="display:flex; gap:12px; justify-content:flex-end;">
          ${activeOrder.status === 'Food Being Prepared' ? `
            <button class="btn btn-primary btn-sm" onclick="DeliveryPortal.updateActiveStatus('${activeOrder.id}', 'Out for Delivery')">
              📦 Order Picked Up & Out For Delivery
            </button>
          ` : `
            <button class="btn btn-primary btn-sm" style="background:var(--veg-color);" onclick="DeliveryPortal.updateActiveStatus('${activeOrder.id}', 'Delivered')">
              ✅ Confirm Order Delivered (OTP: 4821)
            </button>
          `}
        </div>
      </div>
    `;
  },

  updateActiveStatus: function(orderId, nextStatus) {
    const orders = FoodAppStorage.getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx > -1) {
      orders[idx].status = nextStatus;
      FoodAppStorage.saveOrders(orders);
      FoodApp.showToast(`Order status updated to: ${nextStatus} 🎉`, "success");
      this.renderActiveDelivery();
      this.renderKPIs();
    }
  }
};
