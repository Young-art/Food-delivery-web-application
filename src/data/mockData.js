// Comprehensive Mock Data & Knowledge Base for Foodiez Application

export const CATEGORIES = [
  {
    id: "pizza",
    name: "Pizza",
    slug: "pizza",
    iconName: "Pizza",
    count: 6,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80",
    description: "Authentic wood-fired crusts, rich mozzarella & artisanal gourmet toppings."
  },
  {
    id: "burgers",
    name: "Burgers",
    slug: "burgers",
    iconName: "Sandwich",
    count: 6,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
    description: "Juicy grilled patties, melted aged cheddar & toasted brioche buns."
  },
  {
    id: "biryani",
    name: "Biryani",
    slug: "biryani",
    iconName: "Flame",
    count: 6,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80",
    description: "Aromatic dum-cooked basmati rice with slow-cooked saffron spices."
  },
  {
    id: "chicken",
    name: "Chicken",
    slug: "chicken",
    iconName: "Drumstick",
    count: 6,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80",
    description: "Crispy southern tenders, spicy hot wings & herb-roasted delicacies."
  },
  {
    id: "chinese",
    name: "Chinese",
    slug: "chinese",
    iconName: "Soup",
    count: 6,
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=500&q=80",
    description: "Wok-tossed hakka noodles, dim sums & Manchurian bowls."
  },
  {
    id: "mexican",
    name: "Mexican",
    slug: "mexican",
    iconName: "Sparkles",
    count: 6,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=500&q=80",
    description: "Sizzling cheesy quesadillas, loaded burritos & zesty street tacos."
  },
  {
    id: "healthy-food",
    name: "Healthy Food",
    slug: "healthy-food",
    iconName: "Salad",
    count: 6,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
    description: "Nutrient-packed superfood quinoa bowls, detox salads & avocado toasts."
  },
  {
    id: "desserts",
    name: "Desserts",
    slug: "desserts",
    iconName: "Cake",
    count: 6,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80",
    description: "Molten lava chocolate cakes, NY cheesecakes & warm brownies."
  },
  {
    id: "beverages",
    name: "Beverages",
    slug: "beverages",
    iconName: "Coffee",
    count: 6,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80",
    description: "Chilled cold brews, thick milkshakes & natural fruit mocktails."
  },
  {
    id: "ice-cream",
    name: "Ice Cream",
    slug: "ice-cream",
    iconName: "IceCream",
    count: 6,
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=500&q=80",
    description: "Artisanal Italian gelato, gourmet sundaes & Belgian chocolate cones."
  }
];

export const FOOD_ITEMS = [
  // Pizza
  {
    id: "pizza-1",
    name: "Classic Margherita Pizza",
    category: "pizza",
    price: 249,
    rating: 4.8,
    reviewsCount: 340,
    veg: true,
    restaurantId: "rest-1",
    restaurantName: "La Pino'z Pizzeria",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80",
    description: "Classic Neapolitan crust, San Marzano tomato reduction, fresh buffalo mozzarella & sweet basil.",
    ingredients: ["San Marzano Tomatoes", "Buffalo Mozzarella", "Fresh Basil", "Extra Virgin Olive Oil"],
    calories: "680 kcal",
    prepTime: "20-25 mins",
    isBestseller: true
  },
  {
    id: "pizza-2",
    name: "Fiery Farmhouse Special",
    category: "pizza",
    price: 329,
    rating: 4.7,
    reviewsCount: 215,
    veg: true,
    restaurantId: "rest-1",
    restaurantName: "La Pino'z Pizzeria",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    description: "Crunchy bell peppers, sweet golden corn, red onions, black olives and sliced button mushrooms.",
    ingredients: ["Bell Peppers", "Golden Corn", "Button Mushrooms", "Black Olives", "Mozzarella"],
    calories: "740 kcal",
    prepTime: "20-25 mins",
    isBestseller: false
  },
  {
    id: "pizza-3",
    name: "BBQ Smoked Chicken Pizza",
    category: "pizza",
    price: 399,
    rating: 4.9,
    reviewsCount: 420,
    veg: false,
    restaurantId: "rest-1",
    restaurantName: "La Pino'z Pizzeria",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    description: "Hickory-smoked chicken chunks glazed in tangy BBQ reduction with caramelised onions.",
    ingredients: ["Smoked BBQ Chicken", "Red Onions", "Cheddar Cheese", "Cilantro"],
    calories: "820 kcal",
    prepTime: "20-25 mins",
    isBestseller: true
  },
  {
    id: "pizza-4",
    name: "Truffle Mushroom Supreme",
    category: "pizza",
    price: 449,
    rating: 4.9,
    reviewsCount: 180,
    veg: true,
    restaurantId: "rest-1",
    restaurantName: "La Pino'z Pizzeria",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
    description: "Wild portobello mushrooms, Italian white truffle oil, fontina cheese and fresh rosemary.",
    ingredients: ["Portobello Mushrooms", "White Truffle Oil", "Fontina Cheese", "Rosemary"],
    calories: "710 kcal",
    prepTime: "25 mins",
    isBestseller: true
  },
  {
    id: "pizza-5",
    name: "Spicy Pepperoni Feast",
    category: "pizza",
    price: 469,
    rating: 4.8,
    reviewsCount: 390,
    veg: false,
    restaurantId: "rest-1",
    restaurantName: "La Pino'z Pizzeria",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
    description: "Crispy hand-stretched crust overloaded with seasoned beef/pork pepperoni slices and chili flakes.",
    ingredients: ["Smoked Pepperoni", "Marinara Sauce", "Mozzarella Cheese", "Chili Flakes"],
    calories: "890 kcal",
    prepTime: "20 mins",
    isBestseller: false
  },
  {
    id: "pizza-6",
    name: "Four Cheese Quattro Formaggi",
    category: "pizza",
    price: 379,
    rating: 4.7,
    reviewsCount: 160,
    veg: true,
    restaurantId: "rest-1",
    restaurantName: "La Pino'z Pizzeria",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80",
    description: "Rich blend of parmesan reggiano, creamy gorgonzola, aged fontina and melted mozzarella.",
    ingredients: ["Gorgonzola", "Parmesan", "Fontina", "Mozzarella"],
    calories: "830 kcal",
    prepTime: "20 mins",
    isBestseller: false
  },

  // Burgers
  {
    id: "burger-1",
    name: "Classic Smash Double Cheeseburger",
    category: "burgers",
    price: 229,
    rating: 4.9,
    reviewsCount: 520,
    veg: false,
    restaurantId: "rest-2",
    restaurantName: "Burger King Express",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    description: "Two crispy smashed patties, double cheddar cheese, dill pickles and secret house smash sauce.",
    ingredients: ["Smash Beef/Chicken Patty", "Aged Cheddar", "Dill Pickles", "Brioche Bun"],
    calories: "780 kcal",
    prepTime: "15 mins",
    isBestseller: true
  },
  {
    id: "burger-2",
    name: "Crispy Paneer Supreme Burger",
    category: "burgers",
    price: 199,
    rating: 4.7,
    reviewsCount: 310,
    veg: true,
    restaurantId: "rest-2",
    restaurantName: "Burger King Express",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80",
    description: "Golden fried seasoned cottage cheese block with spicy chipotle mayo and crunchy iceberg lettuce.",
    ingredients: ["Spiced Paneer Patty", "Chipotle Mayo", "Iceberg Lettuce", "Sesame Bun"],
    calories: "620 kcal",
    prepTime: "15 mins",
    isBestseller: true
  },
  {
    id: "burger-3",
    name: "Crispy Peri-Peri Chicken Burger",
    category: "burgers",
    price: 249,
    rating: 4.8,
    reviewsCount: 440,
    veg: false,
    restaurantId: "rest-2",
    restaurantName: "Burger King Express",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80",
    description: "Southern fried crispy chicken breast dusted with fiery African peri-peri seasoning and garlic mayo.",
    ingredients: ["Crispy Chicken Breast", "Peri Peri Dust", "Garlic Aioli", "Brioche Bun"],
    calories: "720 kcal",
    prepTime: "15 mins",
    isBestseller: true
  },

  // Biryani
  {
    id: "biryani-1",
    name: "Hyderabadi Chicken Dum Biryani",
    category: "biryani",
    price: 299,
    rating: 4.9,
    reviewsCount: 890,
    veg: false,
    restaurantId: "rest-3",
    restaurantName: "Paradise Royal Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    description: "Slow dum-cooked basmati rice with tender marinated chicken pieces, caramelized onions & saffron mirchi ka salan.",
    ingredients: ["Basmati Rice", "Tender Chicken", "Saffron", "Fried Onions", "Mint"],
    calories: "850 kcal",
    prepTime: "25 mins",
    isBestseller: true
  },
  {
    id: "biryani-2",
    name: "Royal Mutton Dum Biryani",
    category: "biryani",
    price: 399,
    rating: 4.9,
    reviewsCount: 650,
    veg: false,
    restaurantId: "rest-3",
    restaurantName: "Paradise Royal Biryani",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80",
    description: "Succulent bone-in mutton pieces cooked in handi sealed with dough, infused with kewra & shahi jeera.",
    ingredients: ["Tender Mutton", "Long Grain Rice", "Ghee", "Kewra Water", "Spices"],
    calories: "920 kcal",
    prepTime: "30 mins",
    isBestseller: true
  },
  {
    id: "biryani-3",
    name: "Shahi Paneer Tikka Biryani",
    category: "biryani",
    price: 269,
    rating: 4.8,
    reviewsCount: 420,
    veg: true,
    restaurantId: "rest-3",
    restaurantName: "Paradise Royal Biryani",
    image: "https://images.unsplash.com/photo-1642821373181-696a54913e9a?auto=format&fit=crop&w=600&q=80",
    description: "Tandoori grilled cottage cheese cubes layered with fragrant spiced saffron rice and fresh mint raita.",
    ingredients: ["Tandoori Paneer", "Fragrant Rice", "Cardamom", "Cashews", "Raita"],
    calories: "710 kcal",
    prepTime: "20 mins",
    isBestseller: false
  },

  // Chicken
  {
    id: "chicken-1",
    name: "Crunchy Golden Chicken Wings (6 Pcs)",
    category: "chicken",
    price: 249,
    rating: 4.8,
    reviewsCount: 460,
    veg: false,
    restaurantId: "rest-4",
    restaurantName: "KFC Crave House",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80",
    description: "Crispy coated chicken wings served with hot buffalo glaze and homemade blue cheese dip.",
    ingredients: ["Fresh Chicken Wings", "Secret Spice Crust", "Buffalo Glaze"],
    calories: "580 kcal",
    prepTime: "15 mins",
    isBestseller: true
  },
  {
    id: "chicken-2",
    name: "Tandoori Chicken Full",
    category: "chicken",
    price: 399,
    rating: 4.9,
    reviewsCount: 580,
    veg: false,
    restaurantId: "rest-4",
    restaurantName: "KFC Crave House",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
    description: "Charcoal grilled whole chicken in hung curd, Kashmiri deghi mirch and mustard oil marinade.",
    ingredients: ["Whole Chicken", "Hung Curd", "Kashmiri Chili", "Garam Masala"],
    calories: "760 kcal",
    prepTime: "25 mins",
    isBestseller: true
  },

  // Chinese
  {
    id: "chinese-1",
    name: "Schezwan Veg Hakka Noodles",
    category: "chinese",
    price: 199,
    rating: 4.7,
    reviewsCount: 380,
    veg: true,
    restaurantId: "rest-5",
    restaurantName: "Wok & Dragon Chinese",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
    description: "Wok-tossed noodles with shredded cabbage, bell peppers and fiery Sichuan peppercorn sauce.",
    ingredients: ["Wheat Noodles", "Schezwan Paste", "Capsicum", "Spring Onions"],
    calories: "490 kcal",
    prepTime: "15 mins",
    isBestseller: true
  },
  {
    id: "chinese-2",
    name: "Crispy Veg Spring Rolls (6 Pcs)",
    category: "chinese",
    price: 169,
    rating: 4.8,
    reviewsCount: 290,
    veg: true,
    restaurantId: "rest-5",
    restaurantName: "Wok & Dragon Chinese",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    description: "Crisp pastry sheets rolled with seasoned vegetables and glass noodles with sweet chili dip.",
    ingredients: ["Pastry Wrap", "Julienned Veggies", "Glass Noodles", "Sweet Chili"],
    calories: "340 kcal",
    prepTime: "12 mins",
    isBestseller: false
  },

  // Mexican
  {
    id: "mexican-1",
    name: "Cheesy Loaded Nachos Supreme",
    category: "mexican",
    price: 219,
    rating: 4.8,
    reviewsCount: 310,
    veg: true,
    restaurantId: "rest-6",
    restaurantName: "Taco Fiesta Mexico",
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80",
    description: "Crispy corn tortilla chips drowned in warm melted cheese sauce, refried beans, jalapenos & sour cream.",
    ingredients: ["Tortilla Chips", "Nacho Cheese", "Jalapenos", "Sour Cream", "Salsa"],
    calories: "560 kcal",
    prepTime: "10 mins",
    isBestseller: true
  },

  // Healthy Food
  {
    id: "healthy-1",
    name: "Mediterranean Avocado Quinoa Bowl",
    category: "healthy-food",
    price: 279,
    rating: 4.9,
    reviewsCount: 280,
    veg: true,
    restaurantId: "rest-7",
    restaurantName: "Green Life Health Kitchen",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    description: "Fresh organic Hass avocado, tri-color quinoa, cherry tomatoes, cucumbers and lemon vinaigrette.",
    ingredients: ["Hass Avocado", "Quinoa", "Cherry Tomatoes", "Kalamata Olives", "Lemon"],
    calories: "390 kcal",
    prepTime: "12 mins",
    isBestseller: true
  },

  // Desserts
  {
    id: "dessert-1",
    name: "Choco Lava Molten Cake",
    category: "desserts",
    price: 149,
    rating: 4.9,
    reviewsCount: 720,
    veg: true,
    restaurantId: "rest-1",
    restaurantName: "Sweet Tooth Patisserie",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    description: "Warm Belgian chocolate sponge with a luscious gushing molten chocolate fudge center.",
    ingredients: ["Belgian Dark Chocolate", "Cocoa Butter", "Vanilla"],
    calories: "440 kcal",
    prepTime: "10 mins",
    isBestseller: true
  },

  // Beverages
  {
    id: "beverage-1",
    name: "Classic Cold Coffee with Ice Cream",
    category: "beverages",
    price: 139,
    rating: 4.8,
    reviewsCount: 450,
    veg: true,
    restaurantId: "rest-2",
    restaurantName: "Brew & Sip Cafe",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
    description: "Rich arabica espresso blended with chilled milk and topped with a scoop of vanilla ice cream.",
    ingredients: ["Arabica Espresso", "Full Cream Milk", "Vanilla Scoop", "Cocoa Dust"],
    calories: "280 kcal",
    prepTime: "5 mins",
    isBestseller: true
  },

  // Ice Cream
  {
    id: "icecream-1",
    name: "Belgian Dark Chocolate Gelato",
    category: "ice-cream",
    price: 159,
    rating: 4.9,
    reviewsCount: 530,
    veg: true,
    restaurantId: "rest-8",
    restaurantName: "Gelato Naturals",
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80",
    description: "70% single-origin Belgian dark chocolate churned slowly for an intensely creamy Italian texture.",
    ingredients: ["Dark Cocoa", "Fresh Cream", "Organic Sugar"],
    calories: "220 kcal",
    prepTime: "5 mins",
    isBestseller: true
  }
];

export const RESTAURANTS = [
  {
    id: "rest-1",
    name: "La Pino'z Pizzeria",
    cuisine: "Italian, Pizza, Fast Food",
    rating: 4.8,
    reviewsCount: 1420,
    deliveryTime: "25-30 Mins",
    priceForTwo: "₹500 for two",
    distance: "2.4 km",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    isPromoted: true,
    offer: "50% OFF up to ₹100"
  },
  {
    id: "rest-2",
    name: "Burger King Express",
    cuisine: "Burgers, American, Shakes",
    rating: 4.7,
    reviewsCount: 2310,
    deliveryTime: "20-25 Mins",
    priceForTwo: "₹350 for two",
    distance: "1.8 km",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    isPromoted: false,
    offer: "Free Fries on Orders above ₹299"
  },
  {
    id: "rest-3",
    name: "Paradise Royal Biryani",
    cuisine: "Hyderabadi, Biryani, Mughlai",
    rating: 4.9,
    reviewsCount: 4580,
    deliveryTime: "30-35 Mins",
    priceForTwo: "₹600 for two",
    distance: "3.2 km",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    isPromoted: true,
    offer: "Flat ₹125 OFF with code ROYAL125"
  },
  {
    id: "rest-4",
    name: "KFC Crave House",
    cuisine: "Fried Chicken, Fast Food, Wings",
    rating: 4.6,
    reviewsCount: 1890,
    deliveryTime: "20-30 Mins",
    priceForTwo: "₹450 for two",
    distance: "2.1 km",
    image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=600&q=80",
    isPromoted: false,
    offer: "20% OFF on buckets"
  },
  {
    id: "rest-5",
    name: "Wok & Dragon Chinese",
    cuisine: "Chinese, Asian, Dim Sums",
    rating: 4.7,
    reviewsCount: 980,
    deliveryTime: "25-35 Mins",
    priceForTwo: "₹400 for two",
    distance: "2.8 km",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    isPromoted: false,
    offer: "Complimentary Dim Sum on ₹399+"
  },
  {
    id: "rest-6",
    name: "Taco Fiesta Mexico",
    cuisine: "Mexican, Tacos, Burritos",
    rating: 4.8,
    reviewsCount: 840,
    deliveryTime: "20-25 Mins",
    priceForTwo: "₹450 for two",
    distance: "1.9 km",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    isPromoted: true,
    offer: "Free Salsa Dip with Nachos"
  }
];

export const COUPONS = [
  {
    code: "FOODIEZ50",
    discountPercent: 50,
    maxDiscount: 100,
    minOrder: 199,
    description: "50% OFF up to ₹100 on orders above ₹199"
  },
  {
    code: "WELCOME100",
    discountPercent: 30,
    maxDiscount: 100,
    minOrder: 249,
    description: "Flat 30% OFF up to ₹100 for welcome users"
  },
  {
    code: "SUPER20",
    discountPercent: 20,
    maxDiscount: 150,
    minOrder: 399,
    description: "20% OFF up to ₹150 on premium gourmet orders"
  },
  {
    code: "TASTY30",
    discountPercent: 30,
    maxDiscount: 80,
    minOrder: 179,
    description: "30% OFF up to ₹80 on quick snacking"
  }
];

export const DEFAULT_USER = {
  name: "Thanush Masika",
  email: "thanushmasika@gmail.com",
  phone: "8328247714",
  password: "Thanush@123",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  role: "customer"
};

export const DEFAULT_ADDRESSES = [
  {
    id: "addr-1",
    type: "Home",
    name: "Thanush Masika",
    phone: "+91 8328247714",
    street: "Flat 402, Sunshine Heights, 15th Main Road",
    landmark: "Opposite City Central Park",
    city: "Bangalore",
    pincode: "560034",
    isDefault: true
  },
  {
    id: "addr-2",
    type: "Work",
    name: "Thanush Masika",
    phone: "+91 8328247714",
    street: "Tower B, 6th Floor, Cyber Heights Tech Park",
    landmark: "Near Gateway Metro Station",
    city: "Bangalore",
    pincode: "560100",
    isDefault: false
  }
];

export const INDIAN_LANDMARKS_DB = [
  // Andhra Pradesh / Vizianagaram / Visakhapatnam
  { title: "Main Road, Vizianagaram", sub: "Main Road, Near RTC Complex, Vizianagaram, Andhra Pradesh 535002", type: "STREET", lat: 18.1124, lng: 83.4074 },
  { title: "Vizianagaram Fort", sub: "Fort Area, Cantonment, Vizianagaram, Andhra Pradesh 535003", type: "LANDMARK", lat: 18.1171, lng: 83.4150 },
  { title: "RTC Complex, Vizianagaram", sub: "RTC Bus Stand, Vizianagaram, Andhra Pradesh 535002", type: "TRANSIT", lat: 18.1142, lng: 83.3985 },
  { title: "Balaji Nagar, Vizianagaram", sub: "Balaji Nagar, Vizianagaram, Andhra Pradesh 535003", type: "AREA", lat: 18.1210, lng: 83.4020 },
  { title: "Cantonment, Vizianagaram", sub: "Cantonment Area, Vizianagaram, Andhra Pradesh 535003", type: "AREA", lat: 18.1180, lng: 83.4190 },
  { title: "RK Beach, Visakhapatnam", sub: "Ramakrishna Beach Road, Pandurangapuram, Visakhapatnam, AP 530003", type: "LANDMARK", lat: 17.7126, lng: 83.3242 },
  { title: "Jagadamba Junction, Visakhapatnam", sub: "Jagadamba Centre, Visakhapatnam, Andhra Pradesh 530020", type: "LANDMARK", lat: 17.7118, lng: 83.3005 },
  { title: "MVP Colony, Visakhapatnam", sub: "MVP Colony Sector 1 to 12, Visakhapatnam, Andhra Pradesh 530017", type: "AREA", lat: 17.7420, lng: 83.3364 },
  { title: "Gajuwaka, Visakhapatnam", sub: "High School Road, Gajuwaka, Visakhapatnam, Andhra Pradesh 530026", type: "AREA", lat: 17.6904, lng: 83.2185 },

  // Bangalore
  { title: "100 Feet Road, Indiranagar", sub: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bangalore 560038", type: "STREET", lat: 12.9784, lng: 77.6408 },
  { title: "80 Feet Road, Koramangala", sub: "80 Feet Road, 4th Block, Koramangala, Bangalore 560034", type: "STREET", lat: 12.9352, lng: 77.6245 },
  { title: "Church Street, Bangalore", sub: "Church Street, Off Brigade Road, Shanthala Nagar, Bangalore 560001", type: "STREET", lat: 12.9749, lng: 77.6045 },
  { title: "Whitefield ITPL", sub: "International Tech Park, Whitefield Main Road, Bangalore 560066", type: "COMMERCIAL", lat: 12.9863, lng: 77.7377 },
  { title: "Phoenix Marketcity Bangalore", sub: "Whitefield Main Road, Mahadevapura, Bangalore 560048", type: "MALL", lat: 12.9959, lng: 77.6965 },
  { title: "HSR Layout Sector 1 to 7", sub: "27th Main Road, HSR Layout, Bangalore, Karnataka 560102", type: "AREA", lat: 12.9121, lng: 77.6446 },

  // Hyderabad
  { title: "Cyber Towers, Hitec City", sub: "Hitec City Main Road, Madhapur, Hyderabad, Telangana 500081", type: "COMMERCIAL", lat: 17.4504, lng: 78.3808 },
  { title: "Inorbit Mall, Hyderabad", sub: "Mindspace Road, Vittal Rao Nagar, Madhapur, Hyderabad 500081", type: "MALL", lat: 17.4344, lng: 78.3866 },
  { title: "Jubilee Hills Road No. 36", sub: "Jubilee Hills, Hyderabad, Telangana 500033", type: "STREET", lat: 17.4299, lng: 78.4116 },

  // Mumbai
  { title: "Hill Road, Bandra West", sub: "Hill Road, Bandra West, Mumbai, Maharashtra 400050", type: "STREET", lat: 19.0596, lng: 72.8295 },
  { title: "Marine Drive Promenade", sub: "Netaji Subhash Chandra Bose Road, Nariman Point, Mumbai 400021", type: "LANDMARK", lat: 18.9438, lng: 72.8231 },

  // Delhi NCR
  { title: "Connaught Place Inner Circle", sub: "Connaught Place, New Delhi, Delhi 110001", type: "LANDMARK", lat: 28.6315, lng: 77.2167 },
  { title: "Cyber Hub, Gurgaon", sub: "DLF Cyber City, Sector 24, Gurugram, Haryana 122002", type: "COMMERCIAL", lat: 28.4949, lng: 77.0895 },

  // Pune
  { title: "North Main Road, Koregaon Park", sub: "Koregaon Park, Pune, Maharashtra 411001", type: "STREET", lat: 18.5362, lng: 73.8940 },
  { title: "FC Road, Pune", sub: "Fergusson College Road, Shivajinagar, Pune 411004", type: "STREET", lat: 18.5236, lng: 73.8415 }
];
