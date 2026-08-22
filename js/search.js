/**
 * FOOD DELIVERY APP - GLOBAL SEARCH ENGINE
 * Autocomplete search suggestions across Food Items, Categories, and Restaurants.
 * Supports Enter key direct navigation, keyboard arrow cycling, and quick dish modals.
 */

const GlobalSearch = {
  activeIdx: -1,

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

      // Input event for live matching
      input.addEventListener("input", (e) => {
        this.activeIdx = -1;
        this.handleSearchInput(e.target.value, dropdown);
      });

      // Focus event to reopen if not empty
      input.addEventListener("focus", (e) => {
        if (e.target.value.trim().length > 0) {
          this.handleSearchInput(e.target.value, dropdown);
        }
      });

      // Keyboard navigation (Enter, ArrowDown, ArrowUp, Escape)
      input.addEventListener("keydown", (e) => {
        const items = dropdown.querySelectorAll(".search-item");
        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (items.length > 0) {
            this.activeIdx = (this.activeIdx + 1) % items.length;
            this.updateActiveItem(items);
          }
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (items.length > 0) {
            this.activeIdx = (this.activeIdx - 1 + items.length) % items.length;
            this.updateActiveItem(items);
          }
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (this.activeIdx >= 0 && items[this.activeIdx]) {
            items[this.activeIdx].click();
          } else {
            this.handleDirectSearchSubmit(input.value.trim());
          }
        } else if (e.key === "Escape") {
          dropdown.classList.remove("show");
          input.blur();
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

  updateActiveItem: function(items) {
    items.forEach((item, idx) => {
      if (idx === this.activeIdx) {
        item.classList.add("active");
        item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } else {
        item.classList.remove("active");
      }
    });
  },

  // Direct Enter Key Navigation
  handleDirectSearchSubmit: function(query) {
    if (!query) return;
    const clean = query.toLowerCase();
    const root = FoodApp.getRootPath();
    const categories = FoodData.categories;
    const items = FoodAppStorage.getFoodItems();
    const restaurants = FoodAppStorage.getRestaurants();

    // 1. Direct match on category
    const matchedCat = categories.find(c => c.name.toLowerCase() === clean || c.id.toLowerCase() === clean || clean.includes(c.id));
    if (matchedCat) {
      window.location.href = `${root}pages/${matchedCat.page}`;
      return;
    }

    // 2. Direct match on dish
    const matchedFood = items.find(f => f.name.toLowerCase().includes(clean) || f.category.toLowerCase().includes(clean));
    if (matchedFood) {
      window.location.href = `${root}pages/food-details.html?id=${matchedFood.id}`;
      return;
    }

    // 3. Direct match on restaurant
    const matchedRest = restaurants.find(r => r.name.toLowerCase().includes(clean) || r.cuisine.toLowerCase().includes(clean));
    if (matchedRest) {
      window.location.href = `${root}pages/restaurant-menu.html?id=${matchedRest.id}`;
      return;
    }

    // Fallback: navigate to restaurants discovery page
    window.location.href = `${root}pages/restaurants.html?search=${encodeURIComponent(query)}`;
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

    // Match Categories
    const matchedCats = categories.filter(c => 
      c.name.toLowerCase().includes(cleanQuery) || 
      c.id.toLowerCase().includes(cleanQuery)
    ).slice(0, 3);

    // Match Food Items
    const matchedFoods = items.filter(f => 
      f.name.toLowerCase().includes(cleanQuery) || 
      f.category.toLowerCase().includes(cleanQuery) ||
      (f.ingredients && f.ingredients.some(ing => ing.toLowerCase().includes(cleanQuery)))
    ).slice(0, 5);

    // Match Restaurants
    const matchedRests = restaurants.filter(r => 
      r.name.toLowerCase().includes(cleanQuery) || 
      r.cuisine.toLowerCase().includes(cleanQuery)
    ).slice(0, 3);

    if (matchedFoods.length === 0 && matchedCats.length === 0 && matchedRests.length === 0) {
      dropdown.innerHTML = `
        <div style="padding: 24px 16px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          <div style="margin-bottom: 8px; color:var(--text-muted);">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </div>
          No matching dishes or restaurants for "<strong>${cleanQuery}</strong>".
          <div style="font-size: 0.8rem; margin-top: 6px; color: var(--primary);">Try searching "Pizza", "Biryani", "Burger", or "Cake"</div>
        </div>
      `;
      dropdown.classList.add("show");
      return;
    }

    let html = "";

    // Render Categories matches
    if (matchedCats.length > 0) {
      html += `<div style="padding: 6px 14px; font-size: 0.72rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; background: var(--surface-subtle); letter-spacing:0.5px;">Food Categories</div>`;
      matchedCats.forEach(cat => {
        html += `
          <div class="search-item" onclick="window.location.href='${root}pages/${cat.page}'">
            <span style="display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:8px; background:var(--primary-light); color:var(--primary);">${cat.icon}</span>
            <div class="search-item-info">
              <div class="search-item-title">${cat.name} Category</div>
              <div class="search-item-meta">${cat.count} delicious dishes • View Page &rarr;</div>
            </div>
            <span style="font-size: 0.78rem; color: var(--primary); font-weight: 700; background:var(--primary-light); padding:3px 8px; border-radius:var(--radius-full);">Explore</span>
          </div>
        `;
      });
    }

    // Render Food matches
    if (matchedFoods.length > 0) {
      html += `<div style="padding: 6px 14px; font-size: 0.72rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; background: var(--surface-subtle); letter-spacing:0.5px;">Dishes</div>`;
      matchedFoods.forEach(food => {
        html += `
          <div class="search-item" onclick="window.location.href='${root}pages/food-details.html?id=${food.id}'">
            <img src="${food.image}" class="search-item-img" alt="${food.name}">
            <div class="search-item-info">
              <div style="display:flex; align-items:center; gap:6px;">
                <span class="badge-diet ${food.veg ? 'veg' : 'non-veg'}"></span>
                <span class="search-item-title">${food.name}</span>
              </div>
              <div class="search-item-meta">
                ₹${food.price} • ${food.category.toUpperCase()} • 
                <span class="rating-pill" style="font-size:0.7rem; padding:1px 5px;">
                  <svg viewBox="0 0 24 24" width="9" height="9" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ${food.rating}
                </span>
              </div>
            </div>
            <button class="btn btn-sm btn-primary" style="padding:4px 10px; font-size:0.8rem;" onclick="event.stopPropagation(); FoodApp.openCustomizerModal('${food.id}')">
              Add +
            </button>
          </div>
        `;
      });
    }

    // Render Restaurant matches
    if (matchedRests.length > 0) {
      html += `<div style="padding: 6px 14px; font-size: 0.72rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; background: var(--surface-subtle); letter-spacing:0.5px;">Restaurants</div>`;
      matchedRests.forEach(rest => {
        html += `
          <div class="search-item" onclick="window.location.href='${root}pages/restaurant-menu.html?id=${rest.id}'">
            <img src="${rest.image}" class="search-item-img" alt="${rest.name}">
            <div class="search-item-info">
              <div class="search-item-title">${rest.name}</div>
              <div class="search-item-meta">
                <span class="rating-pill" style="font-size:0.7rem; padding:1px 5px;">
                  <svg viewBox="0 0 24 24" width="9" height="9" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ${rest.rating}
                </span>
                • ${rest.cuisine} • ${rest.deliveryTime}
              </div>
            </div>
            <span style="font-size: 0.78rem; color: var(--primary); font-weight: 700;">Menu &rarr;</span>
          </div>
        `;
      });
    }

    dropdown.innerHTML = html;
    dropdown.classList.add("show");
  }
};

document.addEventListener("DOMContentLoaded", () => GlobalSearch.init());
