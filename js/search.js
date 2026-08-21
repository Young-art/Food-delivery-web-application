/**
 * FOOD DELIVERY APP - GLOBAL SEARCH ENGINE
 * Autocomplete search suggestions across Food Items, Categories, and Restaurants.
 */

const GlobalSearch = {
  init: function() {
    const searchInputs = document.querySelectorAll(".global-search-input");
    searchInputs.forEach(input => {
      const parent = input.closest(".header-search") || input.parentElement;
      let dropdown = parent.querySelector(".search-results-dropdown");
      if (!dropdown) {
        dropdown = document.createElement("div");
        dropdown.className = "search-results-dropdown";
        parent.appendChild(dropdown);
      }

      input.addEventListener("input", (e) => this.handleSearchInput(e.target.value, dropdown));
      input.addEventListener("focus", (e) => {
        if (e.target.value.trim().length > 0) {
          this.handleSearchInput(e.target.value, dropdown);
        }
      });

      // Close on outside click
      document.addEventListener("click", (e) => {
        if (!parent.contains(e.target)) {
          dropdown.classList.remove("show");
        }
      });
    });
  },

  handleSearchInput: function(query, dropdown) {
    const cleanQuery = query.trim().toLowerCase();
    if (cleanQuery.length < 1) {
      dropdown.classList.remove("show");
      dropdown.innerHTML = "";
      return;
    }

    const items = FoodAppStorage.getFoodItems();
    const restaurants = FoodAppStorage.getRestaurants();
    const categories = FoodData.categories;
    const root = FoodApp.getRootPath();

    // Match Food Items
    const matchedFoods = items.filter(f => 
      f.name.toLowerCase().includes(cleanQuery) || 
      f.category.toLowerCase().includes(cleanQuery) ||
      (f.ingredients && f.ingredients.some(ing => ing.toLowerCase().includes(cleanQuery)))
    ).slice(0, 4);

    // Match Categories
    const matchedCats = categories.filter(c => 
      c.name.toLowerCase().includes(cleanQuery) || 
      c.id.toLowerCase().includes(cleanQuery)
    ).slice(0, 2);

    // Match Restaurants
    const matchedRests = restaurants.filter(r => 
      r.name.toLowerCase().includes(cleanQuery) || 
      r.cuisine.toLowerCase().includes(cleanQuery)
    ).slice(0, 2);

    if (matchedFoods.length === 0 && matchedCats.length === 0 && matchedRests.length === 0) {
      dropdown.innerHTML = `
        <div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          No matching dishes, categories or restaurants found for "<strong>${cleanQuery}</strong>".
        </div>
      `;
      dropdown.classList.add("show");
      return;
    }

    let html = "";

    // Render Categories matches
    if (matchedCats.length > 0) {
      html += `<div style="padding: 8px 14px; font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; background: var(--surface-subtle);">Food Categories</div>`;
      matchedCats.forEach(cat => {
        html += `
          <div class="search-item" onclick="window.location.href='${root}pages/${cat.page}'">
            <span style="font-size: 1.5rem;">${cat.icon}</span>
            <div class="search-item-info">
              <div class="search-item-title">${cat.name} Category</div>
              <div class="search-item-meta">${cat.tagline}</div>
            </div>
            <span style="font-size: 0.8rem; color: var(--primary); font-weight: 700;">Explore &rarr;</span>
          </div>
        `;
      });
    }

    // Render Food matches
    if (matchedFoods.length > 0) {
      html += `<div style="padding: 8px 14px; font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; background: var(--surface-subtle);">Dishes</div>`;
      matchedFoods.forEach(food => {
        html += `
          <div class="search-item" onclick="window.location.href='${root}pages/food-details.html?id=${food.id}'">
            <img src="${food.image}" class="search-item-img" alt="${food.name}">
            <div class="search-item-info">
              <div style="display:flex; align-items:center; gap:6px;">
                <span class="badge-diet ${food.veg ? 'veg' : 'non-veg'}"></span>
                <span class="search-item-title">${food.name}</span>
              </div>
              <div class="search-item-meta">₹${food.price} • ${food.category.toUpperCase()}</div>
            </div>
            <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); FoodApp.openCustomizerModal('${food.id}')">
              Add +
            </button>
          </div>
        `;
      });
    }

    // Render Restaurant matches
    if (matchedRests.length > 0) {
      html += `<div style="padding: 8px 14px; font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; background: var(--surface-subtle);">Restaurants</div>`;
      matchedRests.forEach(rest => {
        html += `
          <div class="search-item" onclick="window.location.href='${root}pages/restaurant-menu.html?id=${rest.id}'">
            <img src="${rest.image}" class="search-item-img" alt="${rest.name}">
            <div class="search-item-info">
              <div class="search-item-title">${rest.name}</div>
              <div class="search-item-meta">⭐ ${rest.rating} • ${rest.cuisine}</div>
            </div>
            <span style="font-size: 0.8rem; color: var(--primary); font-weight: 700;">View Menu &rarr;</span>
          </div>
        `;
      });
    }

    dropdown.innerHTML = html;
    dropdown.classList.add("show");
  }
};

document.addEventListener("DOMContentLoaded", () => GlobalSearch.init());
