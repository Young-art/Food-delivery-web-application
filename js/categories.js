/**
 * FOOD DELIVERY APP - CATEGORY PAGE CONTROLLER
 * Dynamic filtering, in-category search, sorting, and food item rendering.
 */

const CategoryPage = {
  currentCategory: null,
  activeFilters: {
    vegOnly: false,
    nonVegOnly: false,
    rating4Plus: false,
    under250: false,
    hasDiscount: false,
    searchQuery: "",
    sortBy: "recommended"
  },

  init: function(categoryId) {
    this.currentCategory = categoryId;
    this.bindControls();
    this.render();
  },

  bindControls: function() {
    // In-category search
    const searchInput = document.getElementById("cat-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.activeFilters.searchQuery = e.target.value.trim().toLowerCase();
        this.render();
      });
    }

    // Sort selector
    const sortSelect = document.getElementById("cat-sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.activeFilters.sortBy = e.target.value;
        this.render();
      });
    }

    // Filter chips
    const chips = document.querySelectorAll(".filter-chip-btn");
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        const filterType = chip.getAttribute("data-filter");
        chip.classList.toggle("active");
        const isActive = chip.classList.contains("active");

        if (filterType === "veg") {
          this.activeFilters.vegOnly = isActive;
          if (isActive) {
            // Uncheck non-veg
            const nv = document.querySelector(".filter-chip-btn[data-filter='nonveg']");
            if (nv) nv.classList.remove("active");
            this.activeFilters.nonVegOnly = false;
          }
        } else if (filterType === "nonveg") {
          this.activeFilters.nonVegOnly = isActive;
          if (isActive) {
            const v = document.querySelector(".filter-chip-btn[data-filter='veg']");
            if (v) v.classList.remove("active");
            this.activeFilters.vegOnly = false;
          }
        } else if (filterType === "rating4") {
          this.activeFilters.rating4Plus = isActive;
        } else if (filterType === "under250") {
          this.activeFilters.under250 = isActive;
        } else if (filterType === "discount") {
          this.activeFilters.hasDiscount = isActive;
        }

        this.render();
      });
    });
  },

  render: function() {
    const grid = document.getElementById("category-food-grid");
    const countEl = document.getElementById("category-items-count");
    if (!grid) return;

    const allItems = FoodAppStorage.getFoodItems();
    let items = allItems.filter(item => item.category === this.currentCategory);

    // Apply Filter: In-category search
    if (this.activeFilters.searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(this.activeFilters.searchQuery) ||
        item.description.toLowerCase().includes(this.activeFilters.searchQuery) ||
        (item.ingredients && item.ingredients.some(ing => ing.toLowerCase().includes(this.activeFilters.searchQuery)))
      );
    }

    // Apply Filter: Veg Only
    if (this.activeFilters.vegOnly) {
      items = items.filter(item => item.veg === true);
    }

    // Apply Filter: Non-Veg Only
    if (this.activeFilters.nonVegOnly) {
      items = items.filter(item => item.veg === false);
    }

    // Apply Filter: Rating 4+
    if (this.activeFilters.rating4Plus) {
      items = items.filter(item => item.rating >= 4.7);
    }

    // Apply Filter: Under ₹250
    if (this.activeFilters.under250) {
      items = items.filter(item => item.price <= 250);
    }

    // Apply Filter: Special Offers / Discount
    if (this.activeFilters.hasDiscount) {
      items = items.filter(item => item.discount >= 15);
    }

    // Apply Sorting
    if (this.activeFilters.sortBy === "rating") {
      items.sort((a, b) => b.rating - a.rating);
    } else if (this.activeFilters.sortBy === "price-low") {
      items.sort((a, b) => a.price - b.price);
    } else if (this.activeFilters.sortBy === "price-high") {
      items.sort((a, b) => b.price - a.price);
    }

    // Update count display
    if (countEl) {
      countEl.textContent = `${items.length} dishes available`;
    }

    // No results state
    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; background: var(--surface); border-radius: var(--radius-lg); border: 1px solid var(--border);">
          <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
          <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 6px;">No dishes matched your filters</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Try clearing filters or search with a different keyword.</p>
          <button class="btn btn-secondary btn-sm" onclick="CategoryPage.resetFilters()">Clear All Filters</button>
        </div>
      `;
      return;
    }

    const favs = FoodAppStorage.getFavorites();
    const root = FoodApp.getRootPath();

    grid.innerHTML = items.map(food => {
      const originalPrice = Math.round(food.price * (1 + (food.discount / 100)));
      return `
        <div class="food-card" id="food-card-${food.id}">
          <div class="food-card-img-wrapper" onclick="window.location.href='${root}pages/food-details.html?id=${food.id}'" style="cursor: pointer;">
            <img src="${food.image}" alt="${food.name}" class="food-card-img">
            ${food.discount > 0 ? `<div class="food-discount-badge">${food.discount}% OFF</div>` : ''}
            <button class="food-fav-btn ${favs.foodIds.includes(food.id) ? 'active' : ''}" 
              onclick="event.stopPropagation(); FoodApp.toggleFavoriteFood('${food.id}', this)" aria-label="Favorite dish">
              ❤️
            </button>
          </div>
          <div class="food-card-content">
            <div class="food-card-header">
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="badge-diet ${food.veg ? 'veg' : 'non-veg'}"></span>
                <h4 class="food-card-title" onclick="window.location.href='${root}pages/food-details.html?id=${food.id}'" style="cursor:pointer;">${food.name}</h4>
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
  },

  resetFilters: function() {
    this.activeFilters = {
      vegOnly: false,
      nonVegOnly: false,
      rating4Plus: false,
      under250: false,
      hasDiscount: false,
      searchQuery: "",
      sortBy: "recommended"
    };

    const searchInput = document.getElementById("cat-search-input");
    if (searchInput) searchInput.value = "";

    const chips = document.querySelectorAll(".filter-chip-btn");
    chips.forEach(c => c.classList.remove("active"));

    const sortSelect = document.getElementById("cat-sort-select");
    if (sortSelect) sortSelect.value = "recommended";

    this.render();
  }
};
