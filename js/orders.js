/**
 * FOOD DELIVERY APP to ORDERS ENGINE
 * Live order tracking simulation, status pipeline, order history, re-ordering, and 5-star ratings.
 */

const OrderManager = {
  activeOrder: null,
  autoProgressTimer: null,

  // ==========================================
  // ORDER TRACKING LOGIC
  // ==========================================
  initTracking: function() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("id") || localStorage.getItem("food_app_active_order_id") || "FD10192";
    
    const orders = FoodAppStorage.getOrders();
    this.activeOrder = orders.find(o => o.id === orderId) || orders[0];

    this.renderTrackingDetails();
    this.updateStepperUI();
  },

  renderTrackingDetails: function() {
    const order = this.activeOrder;
    if (!order) return;

    const idEl = document.getElementById("track-order-id");
    if (idEl) idEl.textContent = order.id;

    const restEl = document.getElementById("track-restaurant-name");
    if (restEl) restEl.textContent = order.restaurantName || "Artisan Restaurant";

    const totalEl = document.getElementById("track-order-total");
    if (totalEl) totalEl.textContent = `₹${order.total}`;

    const itemsEl = document.getElementById("track-order-items");
    if (itemsEl) {
      itemsEl.innerHTML = order.items.map(item => `
        <div style="display:flex; justify-content:space-between; padding:6px 0; font-size:0.9rem; border-bottom:1px solid var(--surface-subtle);">
          <span>${item.name} x ${item.quantity}</span>
          <span style="font-weight:700;">₹${item.price * item.quantity}</span>
        </div>
      `).join('');
    }

    const addrEl = document.getElementById("track-delivery-address");
    if (addrEl) addrEl.textContent = order.address || "Bangalore, Indiranagar";
  },

  updateStepperUI: function() {
    const order = this.activeOrder;
    if (!order) return;

    const statusStages = [
      "Order Placed",
      "Restaurant Accepted",
      "Food Being Prepared",
      "Out for Delivery",
      "Delivered"
    ];

    const currentStageIndex = statusStages.indexOf(order.status) > -1 ? statusStages.indexOf(order.status) : 0;
    
    // Update Stepper Progress Bar
    const progressBar = document.getElementById("tracking-progress-bar");
    if (progressBar) {
      const pct = (currentStageIndex / (statusStages.length to 1)) * 100;
      progressBar.style.width = `${pct}%`;
    }

    // Update node status
    statusStages.forEach((stage, idx) => {
      const node = document.getElementById(`step-node-${idx}`);
      if (node) {
        node.classList.remove("completed", "active");
        if (idx < currentStageIndex) {
          node.classList.add("completed");
        } else if (idx === currentStageIndex) {
          node.classList.add("active");
        }
      }
    });

    // Update Live Status Headline
    const statusHeadline = document.getElementById("track-current-status-headline");
    const statusSubtext = document.getElementById("track-current-status-subtext");
    const etaEl = document.getElementById("track-eta-time");

    if (statusHeadline) statusHeadline.textContent = order.status;
    
    if (currentStageIndex === 0) {
      if (statusSubtext) statusSubtext.textContent = "Your order has been sent to the restaurant.";
      if (etaEl) etaEl.textContent = "25 to 30 Mins";
    } else if (currentStageIndex === 1) {
      if (statusSubtext) statusSubtext.textContent = "Chef has confirmed your order and is reviewing the ingredients.";
      if (etaEl) etaEl.textContent = "20 to 25 Mins";
    } else if (currentStageIndex === 2) {
      if (statusSubtext) statusSubtext.textContent = "Your delicious meal is sizzling on the stove / oven!";
      if (etaEl) etaEl.textContent = "15 to 20 Mins";
    } else if (currentStageIndex === 3) {
      if (statusSubtext) statusSubtext.textContent = "Delivery partner Vikram is riding to your address!";
      if (etaEl) etaEl.textContent = "8 to 12 Mins";
    } else if (currentStageIndex === 4) {
      if (statusSubtext) statusSubtext.textContent = "Order delivered hot & fresh! Enjoy your meal.";
      if (etaEl) etaEl.textContent = "Delivered";
    }
  },

  // Advance Status Simulation
  advanceStatusSimulation: function() {
    const statusStages = [
      "Order Placed",
      "Restaurant Accepted",
      "Food Being Prepared",
      "Out for Delivery",
      "Delivered"
    ];

    let currentStageIndex = statusStages.indexOf(this.activeOrder.status);
    if (currentStageIndex < statusStages.length - 1) {
      currentStageIndex++;
      this.activeOrder.status = statusStages[currentStageIndex];

      // Update in LocalStorage
      const orders = FoodAppStorage.getOrders();
      const idx = orders.findIndex(o => o.id === this.activeOrder.id);
      if (idx > -1) {
        orders[idx].status = this.activeOrder.status;
        FoodAppStorage.saveOrders(orders);
      }

      this.updateStepperUI();
      FoodApp.showToast(`Order status updated to: ${this.activeOrder.status}`, "info");
    } else {
      FoodApp.showToast("Order is already Delivered!", "success");
    }
  },

  // ==========================================
  // ORDER HISTORY & REVIEWS
  // ==========================================
  initHistory: function() {
    this.renderHistory();
  },

  renderHistory: function() {
    const orders = FoodAppStorage.getOrders();
    const container = document.getElementById("order-history-list-container");
    if (!container) return;

    if (orders.length === 0) {
      container.innerHTML = `
        <div style="padding: 60px 20px; text-align: center; background: var(--surface); border-radius: var(--radius-lg); border: 1px solid var(--border);">
          <div style="margin-bottom: 12px; color: var(--text-muted);">
            <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 6px;">No past orders found</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Place your first order and track it live!</p>
          <a href="../index.html" class="btn btn-primary btn-sm">Explore Food &rarr;</a>
        </div>
      `;
      return;
    }

    container.innerHTML = orders.map(order => {
      const isDelivered = order.status === "Delivered";
      const hasReviewed = !!order.rating;

      return `
        <div class="cart-items-card" style="margin-bottom: 20px;" id="order-card-${order.id}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--surface-subtle); padding-bottom: 14px; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
            <div>
              <div style="font-weight: 800; font-size: 1.1rem; color: var(--text-main);">${order.restaurantName || 'Food Delivery'}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Order ID: <strong>${order.id}</strong> • ${order.date}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="badge ${isDelivered ? 'badge-success' : 'badge-primary'}">
                ${order.status}
              </span>
              <span style="font-size: 1.15rem; font-weight: 800; font-family: 'Outfit', sans-serif;">₹${order.total}</span>
            </div>
          </div>

          <div style="margin-bottom: 14px;">
            ${order.items.map(item => `
              <div style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 4px;">
                • ${item.name} x ${item.quantity} ${item.addOns && item.addOns.length > 0 ? `(+${item.addOns.join(', ')})` : ''}
              </div>
            `).join('')}
          </div>

          ${hasReviewed ? `
            <div style="background: var(--surface-subtle); border-radius: var(--radius-sm); padding: 10px 14px; font-size: 0.85rem; margin-bottom: 14px; display:flex; align-items:center; gap:8px;">
              <span class="badge badge-warning">
                <svg viewBox="0 0 24 24" width="10" height="10" fill="#F59E0B"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ${order.rating}/5 Rated
              </span>
              <span style="color:var(--text-muted);">"${order.review}"</span>
            </div>
          ` : ''}

          <div style="display: flex; justify-content: flex-end; gap: 10px; flex-wrap: wrap; border-top: 1px solid var(--surface-subtle); padding-top: 12px;">
            <a href="order-tracking.html?id=${order.id}" class="btn btn-secondary btn-sm" style="gap:6px;">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
              Track Order
            </a>
            
            <button class="btn btn-secondary btn-sm" style="gap:6px;" onclick="OrderManager.reorder('${order.id}')">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
              Reorder
            </button>

            ${isDelivered && !hasReviewed ? `
              <button class="btn btn-primary btn-sm" style="gap:6px;" onclick="OrderManager.openRatingModal('${order.id}')">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Rate & Review
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  },

  // Re-order past items
  reorder: function(orderId) {
    const orders = FoodAppStorage.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const allFoodItems = FoodAppStorage.getFoodItems();
    
    order.items.forEach(pastItem => {
      const match = allFoodItems.find(f => f.name.toLowerCase() === pastItem.name.toLowerCase()) || {
        id: "item-" + Math.random(),
        name: pastItem.name,
        price: pastItem.price,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
        veg: true
      };
      Cart.addItem(match, pastItem.quantity);
    });

    FoodApp.showToast("Items added to your cart from past order!", "success");
    setTimeout(() => {
      window.location.href = "cart.html";
    }, 1000);
  },

  // 5-Star Rating & Review Modal
  openRatingModal: function(orderId) {
    let modal = document.getElementById("rating-review-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "rating-review-modal";
      modal.className = "modal-overlay";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-box" style="max-width: 460px;">
        <div class="modal-header">
          <h3 class="modal-title">Rate & Review Order</h3>
          <button class="modal-close" onclick="FoodApp.closeModal('rating-review-modal')">&times;</button>
        </div>
        <div class="modal-body">
          <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:16px;">
            How was your meal from this order? Your feedback helps us improve.
          </p>

          <div style="display:flex; justify-content:center; gap:10px; font-size:2rem; margin-bottom:20px; cursor:pointer;" id="star-rating-stars">
            <span onclick="OrderManager.setStars(1)">⭐</span>
            <span onclick="OrderManager.setStars(2)">⭐</span>
            <span onclick="OrderManager.setStars(3)">⭐</span>
            <span onclick="OrderManager.setStars(4)">⭐</span>
            <span onclick="OrderManager.setStars(5)">⭐</span>
          </div>
          <input type="hidden" id="selected-star-val" value="5">

          <div>
            <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:6px;">Write a Review</label>
            <textarea id="order-review-text" placeholder="Taste, food temperature, packaging, delivery speed..." 
              style="width:100%; border:1px solid var(--border); border-radius:var(--radius-md); padding:10px 14px; font-size:0.88rem; resize:none; height:80px; outline:none;"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary btn-sm" onclick="FoodApp.closeModal('rating-review-modal')">Cancel</button>
          <button class="btn btn-primary btn-sm" onclick="OrderManager.submitReview('${orderId}')">Submit Review</button>
        </div>
      </div>
    `;

    modal.classList.add("active");
  },

  setStars: function(num) {
    document.getElementById("selected-star-val").value = num;
    const starSpans = document.querySelectorAll("#star-rating-stars span");
    starSpans.forEach((s, idx) => {
      s.style.opacity = idx < num ? "1" : "0.3";
    });
  },

  submitReview: function(orderId) {
    const rating = Number(document.getElementById("selected-star-val").value) || 5;
    const review = document.getElementById("order-review-text").value.trim() || "Delicious food and prompt delivery!";

    const orders = FoodAppStorage.getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx > -1) {
      orders[idx].rating = rating;
      orders[idx].review = review;
      FoodAppStorage.saveOrders(orders);
    }

    FoodApp.closeModal("rating-review-modal");
    FoodApp.showToast("Thank you for your rating & review! ⭐", "success");
    this.renderHistory();
  }
};
