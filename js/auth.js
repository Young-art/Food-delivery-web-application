/**
 * FOOD DELIVERY APP to AUTHENTICATION & PROFILE ENGINE
 * Manages Signup, Login, LocalStorage session, Profile info updates & Addresses CRUD.
 */

const Auth = {
  // Signup
  handleSignup: function(event) {
    event.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const phone = document.getElementById("signup-phone").value.trim();
    const pass = document.getElementById("signup-password").value;
    const confirmPass = document.getElementById("signup-confirm-password").value;

    if (!name || !email || !phone || !pass) {
      FoodApp.showToast("Please fill in all required fields", "error");
      return;
    }

    if (pass !== confirmPass) {
      FoodApp.showToast("Passwords do not match!", "error");
      return;
    }

    const newUser = {
      name: name,
      email: email,
      phone: phone,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      role: "customer"
    };

    FoodAppStorage.saveUser(newUser);
    FoodApp.showToast("Account created successfully! Welcome to Foodiez 🎉", "success");

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1200);
  },

  // Login
  handleLogin: function(event) {
    event.preventDefault();
    const identifier = document.getElementById("login-identifier").value.trim();
    const pass = document.getElementById("login-password").value;

    if (!identifier || !pass) {
      FoodApp.showToast("Please enter your email/phone and password", "error");
      return;
    }

    // Default simulation session
    const currentUser = FoodAppStorage.getUser();
    currentUser.email = identifier.includes("@") ? identifier : currentUser.email;
    currentUser.phone = !identifier.includes("@") ? identifier : currentUser.phone;

    FoodAppStorage.saveUser(currentUser);
    FoodApp.showToast("Login successful! Welcome back 👋", "success");

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1000);
  },

  // Profile Management
  initProfile: function() {
    const user = FoodAppStorage.getUser();
    const orders = FoodAppStorage.getOrders();
    const favs = FoodAppStorage.getFavorites();

    // Populate user details
    const nameInput = document.getElementById("profile-name-input");
    if (nameInput) nameInput.value = user.name;

    const emailInput = document.getElementById("profile-email-input");
    if (emailInput) emailInput.value = user.email;

    const phoneInput = document.getElementById("profile-phone-input");
    if (phoneInput) phoneInput.value = user.phone;

    const headerName = document.getElementById("profile-display-name");
    if (headerName) headerName.textContent = user.name;

    const headerEmail = document.getElementById("profile-display-email");
    if (headerEmail) headerEmail.textContent = user.email;

    // Stat counts
    const ordersCountEl = document.getElementById("profile-stat-orders");
    if (ordersCountEl) ordersCountEl.textContent = orders.length;

    const favsCountEl = document.getElementById("profile-stat-favs");
    if (favsCountEl) favsCountEl.textContent = favs.foodIds.length + favs.restaurantIds.length;

    this.renderProfileAddresses();
  },

  saveProfileChanges: function() {
    const name = document.getElementById("profile-name-input").value.trim();
    const email = document.getElementById("profile-email-input").value.trim();
    const phone = document.getElementById("profile-phone-input").value.trim();

    if (!name || !email || !phone) {
      FoodApp.showToast("Please fill all required profile fields", "error");
      return;
    }

    const user = FoodAppStorage.getUser();
    user.name = name;
    user.email = email;
    user.phone = phone;

    FoodAppStorage.saveUser(user);
    FoodApp.showToast("Profile details updated successfully! ✅", "success");
    this.initProfile();
  },

  renderProfileAddresses: function() {
    const addresses = FoodAppStorage.getAddresses();
    const container = document.getElementById("profile-addresses-container");
    if (!container) return;

    container.innerHTML = addresses.map(addr => `
      <div style="background:var(--surface-subtle); border:1px solid var(--border); border-radius:var(--radius-md); padding:16px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <span class="addr-type-pill">${addr.tagIcon || '📍'} ${addr.type}</span>
          <div style="font-weight:700; color:var(--text-main); margin:4px 0;">${addr.name}</div>
          <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.4;">${addr.street}, ${addr.landmark}, ${addr.city} to ${addr.pincode}</div>
          <div style="font-size:0.8rem; color:var(--text-main); font-weight:600; margin-top:4px;">📞 ${addr.phone}</div>
        </div>
        <button class="btn btn-secondary btn-sm" style="color:var(--nonveg-color);" onclick="Auth.deleteAddress('${addr.id}')">
          Delete
        </button>
      </div>
    `).join('');
  },

  deleteAddress: function(addrId) {
    let addresses = FoodAppStorage.getAddresses();
    if (addresses.length <= 1) {
      FoodApp.showToast("You must keep at least one saved delivery address", "error");
      return;
    }
    addresses = addresses.filter(a => a.id !== addrId);
    FoodAppStorage.saveAddresses(addresses);
    FoodApp.showToast("Address deleted", "info");
    this.renderProfileAddresses();
  },

  logout: function() {
    FoodApp.showToast("Logged out successfully", "info");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 800);
  }
};
