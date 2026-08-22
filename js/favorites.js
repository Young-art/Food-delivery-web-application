/**
 * FOOD DELIVERY APP to FAVORITES ENGINE
 * Wishlist management and dual-tab view for saved Dishes and saved Restaurants.
 * Uses clean SVG icons and badges.
 */

const FavoritesPage = {
  activeTab: "food",

  init: function() {
    this.bindTabs();
    this.render();
  },

  bindTabs: function() {
    const tabBtns = document.querySelectorAll(".fav-tab-btn");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeTab = btn.getAttribute("data-tab");
        this.render();
      });
    });
  },

  render: function() {
    const favs = FoodAppStorage.getFavorites();
    const foodContainer = document.getElementById("fav-food-grid");
    const restContainer = document.getElementById("fav-restaurants-grid");
    const emptyView = document.getElementById("fav-empty-view");

    if (this.activeTab === "food") {
      if (foodContainer) foodContainer.style.display = "grid";
      if (restContainer) restContainer.style.display = "none";

      const allFood = FoodAppStorage.getFoodItems();
      const savedFoods = allFood.filter(f => favs.foodIds.includes(f.id));

      if (savedFoods.length === 0) {
        if (foodContainer) foodContainer.style.display = "none";
        if (emptyView) {
          emptyView.style.display = "block";
          emptyView.querySelector("h3").textContent = "No Favourite Dishes Saved";
        }
        return;
      }

      if (emptyView) emptyView.style.display = "none";

      foodContainer.innerHTML = savedFoods.map(food => {
        const originalPrice = Math.round(food.price * (1 + (food.discount / 100)));
        return `
          <div class="food-card" id="food-card-${food.id}">
            <div class="food-card-img-wrapper" onclick="window.location.href='food-details.html?id=${food.id}'" style="cursor: pointer;">
              <img src="${food.image}" alt="${food.name}" class="food-card-img">
              ${food.discount > 0 ? `<div class="food-discount-badge">${food.discount}% OFF</div>` : ''}
              <button class="food-fav-btn active" 
                onclick="event.stopPropagation(); FavoritesPage.removeFavoriteFood('${food.id}')" aria-label="Remove favorite">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
            <div class="food-card-content">
              <div class="food-card-header">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="badge-diet ${food.veg ? 'veg' : 'non-veg'}"></span>
                  <h4 class="food-card-title" onclick="window.location.href='food-details.html?id=${food.id}'" style="cursor:pointer;">${food.name}</h4>
                </div>
                <span class="rating-pill" style="font-size:0.75rem;">
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ${food.rating}
                </span>
              </div>
              <p class="food-card-desc">${food.description}</p>
              <div class="food-card-footer">
                <div class="food-price-box">
                  <span class="food-current-price">₹${food.price}</span>
                  ${food.discount > 0 ? `<span class="food-original-price">₹${originalPrice}</span>` : ''}
                </div>
                <button class="food-add-btn" onclick="FoodApp.openCustomizerModal('${food.id}')">
                  Add +
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');

    } else {
      if (foodContainer) foodContainer.style.display = "none";
      if (restContainer) restContainer.style.display = "grid";

      const allRests = FoodAppStorage.getRestaurants();
      const savedRests = allRests.filter(r => favs.restaurantIds.includes(r.id));

      if (savedRests.length === 0) {
        if (restContainer) restContainer.style.display = "none";
        if (emptyView) {
          emptyView.style.display = "block";
          emptyView.querySelector("h3").textContent = "No Favourite Restaurants Saved";
        }
        return;
      }

      if (emptyView) emptyView.style.display = "none";

      restContainer.innerHTML = savedRests.map(r => `
        <div class="restaurant-card" onclick="window.location.href='restaurant-menu.html?id=${r.id}'" style="cursor: pointer;">
          <div class="restaurant-img-wrap">
            <img src="${r.image}" alt="${r.name}" class="restaurant-img">
            <div class="restaurant-offer-tag">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1"/></svg>
              ${r.offer}
            </div>
            <button class="food-fav-btn active" 
              onclick="event.stopPropagation(); FavoritesPage.removeFavoriteRestaurant('${r.id}')" aria-label="Remove favorite">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
          <div class="restaurant-content">
            <div class="restaurant-title-row">
              <h3 class="restaurant-name">${r.name}</h3>
              <span class="rating-pill">
                <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ${r.rating}
              </span>
            </div>
            <div class="restaurant-cuisine">${r.cuisine}</div>
            <div class="restaurant-meta">
              <span class="restaurant-meta-item">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ${r.deliveryTime}
              </span>
              <span class="restaurant-meta-item">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
                ${r.distance}
              </span>
              <span class="restaurant-meta-item">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 10h20"/><circle cx="16" cy="15" r="1"/></svg>
                ${r.priceForTwo}
              </span>
            </div>
          </div>
        </div>
      `).join('');
    }
  },

  removeFavoriteFood: function(foodId) {
    FoodApp.toggleFavoriteFood(foodId, null);
    this.render();
  },

  removeFavoriteRestaurant: function(restId) {
    FoodApp.toggleFavoriteRestaurant(restId, null);
    this.render();
  }
};
