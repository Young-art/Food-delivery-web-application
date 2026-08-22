/**
 * FOOD DELIVERY APP to RESTAURANT DASHBOARD ENGINE
 * Metrics, Live Kitchen Order Pipeline, and Menu Item CRUD.
 */

const RestaurantPortal = {
  activeRestaurantId: "rest-1",

  // ==========================================
  // DASHBOARD OVERVIEW
  // ==========================================
  initDashboard: function() {
    const orders = FoodAppStorage.getOrders();
    const items = FoodAppStorage.getFoodItems();

    const pendingOrders = orders.filter(o => o.status !== "Delivered");
    const completedOrders = orders.filter(o => o.status === "Delivered");
    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);

    const pendingEl = document.getElementById("rest-kpi-pending");
    if (pendingEl) pendingEl.textContent = pendingOrders.length;

    const completedEl = document.getElementById("rest-kpi-completed");
    if (completedEl) completedEl.textContent = completedOrders.length;

    const revenueEl = document.getElementById("rest-kpi-revenue");
    if (revenueEl) revenueEl.textContent = `₹${totalRevenue}`;

    const totalOrdersEl = document.getElementById("rest-kpi-total");
    if (totalOrdersEl) totalOrdersEl.textContent = orders.length;

    this.renderRecentOrdersTable();
  },

  renderRecentOrdersTable: function() {
    const orders = FoodAppStorage.getOrders().slice(0, 5);
    const tbody = document.getElementById("rest-recent-orders-tbody");
    if (!tbody) return;

    tbody.innerHTML = orders.map(order => `
      <tr>
        <td><strong>${order.id}</strong></td>
        <td>
          ${order.items.map(i => `${i.name} (${i.quantity})`).join(', ')}
        </td>
        <td><strong>₹${order.total}</strong></td>
        <td><span class="status-badge ${order.status === 'Delivered' ? 'success' : 'info'}">${order.status}</span></td>
        <td>
          <a href="orders.html" class="btn btn-secondary btn-sm" style="padding:4px 10px; font-size:0.8rem;">Manage &rarr;</a>
        </td>
      </tr>
    `).join('');
  },

  // ==========================================
  // MENU MANAGEMENT (CRUD)
  // ==========================================
  initMenu: function() {
    this.renderMenuItems();
  },

  renderMenuItems: function() {
    const allItems = FoodAppStorage.getFoodItems();
    const tbody = document.getElementById("rest-menu-tbody");
    if (!tbody) return;

    tbody.innerHTML = allItems.map(item => `
      <tr id="menu-row-${item.id}">
        <td>
          <div style="display:flex; align-items:center; gap:12px;">
            <img src="${item.image}" alt="${item.name}" style="width:48px; height:48px; border-radius:8px; object-fit:cover;">
            <div>
              <div style="font-weight:700; display:flex; align-items:center; gap:6px;">
                <span class="badge-diet ${item.veg ? 'veg' : 'non veg'}"></span>
                <span>${item.name}</span>
              </div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${item.category.toUpperCase()}</div>
            </div>
          </div>
        </td>
        <td>
          <div style="display:flex; align-items:center; gap:6px;">
            <span>₹</span>
            <input type="number" value="${item.price}" id="price-input-${item.id}" 
              style="width:75px; padding:4px 8px; border:1px solid var(--border); border-radius:4px; font-weight:700;"
              onchange="RestaurantPortal.updateItemPrice('${item.id}', this.value)">
          </div>
        </td>
        <td>⭐ ${item.rating} (${item.ratingCount || 100})</td>
        <td>
          <label class="switch">
            <input type="checkbox" checked onchange="FoodApp.showToast('Item availability updated', 'info')">
            <span class="slider"></span>
          </label>
        </td>
        <td>
          <button class="btn btn-secondary btn-sm" style="color:var(--nonveg-color); padding:4px 8px;" onclick="RestaurantPortal.deleteItem('${item.id}')">
            🗑️ Delete
          </button>
        </td>
      </tr>
    `).join('');
  },

  updateItemPrice: function(itemId, newPrice) {
    let items = FoodAppStorage.getFoodItems();
    const idx = items.findIndex(i => i.id === itemId);
    if (idx > -1) {
      items[idx].price = Number(newPrice);
      localStorage.setItem("food_app_items", JSON.stringify(items));
      FoodApp.showToast(`Updated price to ₹${newPrice} ✅`, "success");
    }
  },

  deleteItem: function(itemId) {
    if (confirm("Are you sure you want to remove this dish from the menu?")) {
      let items = FoodAppStorage.getFoodItems();
      items = items.filter(i => i.id !== itemId);
      localStorage.setItem("food_app_items", JSON.stringify(items));
      FoodApp.showToast("Item deleted from menu", "info");
      this.renderMenuItems();
    }
  },

  openAddDishModal: function() {
    let modal = document.getElementById("add-dish-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "add-dish-modal";
      modal.className = "modal-overlay";
      modal.innerHTML = `
        <div class="modal-box">
          <div class="modal-header">
            <h3 class="modal-title">Add New Dish to Menu</h3>
            <button class="modal-close" onclick="FoodApp.closeModal('add-dish-modal')">&times;</button>
          </div>
          <div class="modal-body">
            <div style="margin-bottom:12px;">
              <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Dish Name</label>
              <input type="text" id="new-dish-name" placeholder="e.g. Truffle Mushroom Pizza" style="width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:var(--radius-sm); outline:none;">
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
              <div>
                <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Category</label>
                <select id="new-dish-category" style="width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:var(--radius-sm); outline:none; background:var(--surface);">
                  <option value="pizza">Pizza</option>
                  <option value="burgers">Burgers</option>
                  <option value="biryani">Biryani</option>
                  <option value="chicken">Chicken</option>
                  <option value="chinese">Chinese</option>
                  <option value="mexican">Mexican</option>
                  <option value="healthy-food">Healthy Food</option>
                  <option value="desserts">Desserts</option>
                  <option value="beverages">Beverages</option>
                  <option value="ice-cream">Ice Cream</option>
                </select>
              </div>
              <div>
                <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Price (₹)</label>
                <input type="number" id="new-dish-price" placeholder="e.g. 299" style="width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:var(--radius-sm); outline:none;">
              </div>
            </div>
            <div style="margin-bottom:12px;">
              <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Food Type</label>
              <div style="display:flex; gap:16px;">
                <label style="display:flex; align-items:center; gap:6px; font-weight:600;"><input type="radio" name="new-dish-veg" value="true" checked> 🟢 Veg</label>
                <label style="display:flex; align-items:center; gap:6px; font-weight:600;"><input type="radio" name="new-dish-veg" value="false"> 🔴 Non Veg</label>
              </div>
            </div>
            <div style="margin-bottom:12px;">
              <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Description</label>
              <textarea id="new-dish-desc" placeholder="Appetizing description of ingredients and preparation..." style="width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:var(--radius-sm); outline:none; height:60px;"></textarea>
            </div>
            <div>
              <label style="display:block; font-size:0.85rem; font-weight:700; margin-bottom:4px;">Image URL (Unsplash or direct link)</label>
              <input type="url" id="new-dish-img" value="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80" style="width:100%; padding:9px 12px; border:1px solid var(--border); border-radius:var(--radius-sm); outline:none;">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary btn-sm" onclick="FoodApp.closeModal('add-dish-modal')">Cancel</button>
            <button class="btn btn-primary btn-sm" onclick="RestaurantPortal.saveNewDish()">Add to Menu</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modal.classList.add("active");
  },

  saveNewDish: function() {
    const name = document.getElementById("new-dish-name").value.trim();
    const category = document.getElementById("new-dish-category").value;
    const price = Number(document.getElementById("new-dish-price").value) || 199;
    const veg = document.querySelector("input[name='new-dish-veg']:checked").value === "true";
    const desc = document.getElementById("new-dish-desc").value.trim() || "Chef handcrafted recipe made with premium ingredients.";
    const img = document.getElementById("new-dish-img").value.trim();

    if (!name) {
      FoodApp.showToast("Please enter a dish name", "error");
      return;
    }

    const newDish = {
      id: "dish-" + Date.now(),
      name: name,
      category: category,
      price: price,
      discount: 10,
      rating: 4.8,
      ratingCount: 1,
      veg: veg,
      popular: true,
      description: desc,
      image: img,
      ingredients: ["Fresh Ingredients", "Chef Secret Spices"],
      addOns: [{ name: "Extra Cheese", price: 30 }]
    };

    const items = FoodAppStorage.getFoodItems();
    items.unshift(newDish);
    localStorage.setItem("food_app_items", JSON.stringify(items));

    FoodApp.closeModal("add-dish-modal");
    FoodApp.showToast(`"${name}" added to menu successfully! 🎉`, "success");
    this.renderMenuItems();
  },

  // ==========================================
  // LIVE ORDERS FULFILLMENT PIPELINE
  // ==========================================
  initOrders: function() {
    this.renderLiveOrders();
  },

  renderLiveOrders: function() {
    const orders = FoodAppStorage.getOrders();
    const container = document.getElementById("rest-live-orders-container");
    if (!container) return;

    if (orders.length === 0) {
      container.innerHTML = `
        <div style="padding:60px 20px; text-align:center; background:var(--surface); border-radius:var(--radius-xl);">
          <h3>No incoming orders right now</h3>
        </div>
      `;
      return;
    }

    container.innerHTML = orders.map(order => `
      <div class="cart-items-card" style="margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:12px; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-size:1.15rem; font-weight:800;">Order ID: ${order.id}</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">Placed at: ${order.date} • Address: ${order.address}</div>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="status-badge ${order.status === 'Delivered' ? 'success' : order.status === 'Order Placed' ? 'warning' : 'info'}" style="font-size:0.85rem; padding:6px 12px;">
              ● ${order.status}
            </span>
            <span style="font-size:1.2rem; font-weight:800; color:var(--primary); font-family:'Outfit', sans-serif;">₹${order.total}</span>
          </div>
        </div>

        <div style="margin-bottom:16px;">
          ${order.items.map(i => `
            <div style="font-size:0.92rem; font-weight:600; color:var(--text-main); margin-bottom:4px;">
              • ${i.name} <span style="color:var(--primary);">x ${i.quantity}</span> (₹${i.price * i.quantity})
            </div>
          `).join('')}
        </div>

        <div style="display:flex; gap:10px; justify-content:flex-end; border-top:1px solid var(--surface-subtle); padding-top:12px; flex-wrap:wrap;">
          ${order.status === 'Order Placed' ? `
            <button class="btn btn-primary btn-sm" onclick="RestaurantPortal.changeOrderStatus('${order.id}', 'Restaurant Accepted')">
              Accept Order
            </button>
            <button class="btn btn-secondary btn-sm" style="color:var(--nonveg-color);" onclick="RestaurantPortal.changeOrderStatus('${order.id}', 'Cancelled')">
              Reject
            </button>
          ` : ''}

          ${order.status === 'Restaurant Accepted' ? `
            <button class="btn btn-primary btn-sm" onclick="RestaurantPortal.changeOrderStatus('${order.id}', 'Food Being Prepared')">
              Start Cooking
            </button>
          ` : ''}

          ${order.status === 'Food Being Prepared' ? `
            <button class="btn btn-primary btn-sm" onclick="RestaurantPortal.changeOrderStatus('${order.id}', 'Out for Delivery')">
              Handover to Rider (Ready)
            </button>
          ` : ''}

          ${order.status === 'Out for Delivery' ? `
            <span style="font-size:0.85rem; color:var(--text-muted); font-weight:600; padding:6px 10px;">
              Rider Vikram is delivering to customer...
            </span>
          ` : ''}

          ${order.status === 'Delivered' ? `
            <span class="badge badge-success" style="padding:6px 12px;">
              Order Completed
            </span>
          ` : ''}
        </div>
      </div>
    `).join('');
  },

  changeOrderStatus: function(orderId, newStatus) {
    const orders = FoodAppStorage.getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx > -1) {
      orders[idx].status = newStatus;
      FoodAppStorage.saveOrders(orders);
      FoodApp.showToast(`Order ${orderId} transitioned to "${newStatus}"!`, "success");
      this.renderLiveOrders();
    }
  }
};
