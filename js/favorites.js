/**
 * FOOD DELIVERY APP - FAVORITES ENGINE
 * Wishlist management and dual-tab view for saved Dishes and saved Restaurants.
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
          emptyView.querySelector("h3").textContent = "No Favorite Dishes Saved";
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
                ❤️
              </button>
            </div>
            <div class="food-card-content">
              <div class="food-card-header">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="badge-diet ${food.veg ? 'veg' : 'non-veg'}"></span>
                  <h4 class="food-card-title" onclick="window.location.href='food-details.html?id=${food.id}'" style="cursor:pointer;">${food.name}</h4>
                </div>
                <span class="rating-pill" style="font-size:0.75rem;">★ ${food.rating}</span>
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
          emptyView.querySelector("h3").textContent = "No Favorite Restaurants Saved";
        }
        return;
      }

      if (emptyView) emptyView.style.display = "none";

      restContainer.innerHTML = savedRests.map(r => `
        <div class="restaurant-card" onclick="window.location.href='restaurant-menu.html?id=${r.id}'" style="cursor: pointer;">
          <div class="restaurant-img-wrap">
            <img src="${r.image}" alt="${r.name}" class="restaurant-img">
            <div class="restaurant-offer-tag">🏷️ ${r.offer}</div>
            <button class="food-fav-btn active" 
              onclick="event.stopPropagation(); FavoritesPage.removeFavoriteRestaurant('${r.id}')" aria-label="Remove favorite">
              ❤️
            </button>
          </div>
          <div class="restaurant-content">
            <div class="restaurant-title-row">
              <h3 class="restaurant-name">${r.name}</h3>
              <span class="rating-pill">★ ${r.rating}</span>
            </div>
            <div class="restaurant-cuisine">${r.cuisine}</div>
            <div class="restaurant-meta">
              <span class="restaurant-meta-item">⏱️ ${r.deliveryTime}</span>
              <span class="restaurant-meta-item">📍 ${r.distance}</span>
              <span class="restaurant-meta-item">💰 ${r.priceForTwo}</span>
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
