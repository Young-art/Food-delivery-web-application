/**
 * FOOD DELIVERY APP to DATA STORE & SEED DATA
 * Central mock database with LocalStorage synchronization.
 * Designed to be clean, modular, and ready for future Spring Boot / MySQL backend.
 */

const FoodData = {
  // 10 Food Categories with banners, descriptions, and page links
  categories: [
    {
      id: "pizza",
      name: "Pizza",
      tagline: "Cheesy, crispy crusts & gourmet toppings",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=1200&q=80",
      icon: "🍕",
      count: 6,
      page: "pizza.html"
    },
    {
      id: "burgers",
      name: "Burgers",
      tagline: "Juicy patties, melted cheese & toasted brioche",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
      icon: "🍔",
      count: 6,
      page: "burgers.html"
    },
    {
      id: "biryani",
      name: "Biryani",
      tagline: "Aromatic basmati rice layered with rich spices",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80",
      icon: "🍚",
      count: 6,
      page: "biryani.html"
    },
    {
      id: "chicken",
      name: "Chicken",
      tagline: "Sizzling kebabs, crispy wings & rich curries",
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=80",
      icon: "🍗",
      count: 6,
      page: "chicken.html"
    },
    {
      id: "chinese",
      name: "Chinese",
      tagline: "Wok tossed noodles, fried rice & fiery gravies",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=80",
      icon: "🥡",
      count: 6,
      page: "chinese.html"
    },
    {
      id: "mexican",
      name: "Mexican",
      tagline: "Loaded tacos, zesty burritos & crunchy nachos",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=1200&q=80",
      icon: "🌮",
      count: 6,
      page: "mexican.html"
    },
    {
      id: "healthy-food",
      name: "Healthy Food",
      tagline: "Fresh salad bowls, lean proteins & detox smoothies",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
      icon: "🥗",
      count: 6,
      page: "healthy-food.html"
    },
    {
      id: "desserts",
      name: "Desserts",
      tagline: "Decadent cakes, brownies, donuts & artisan treats",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=80",
      icon: "🍰",
      count: 6,
      page: "desserts.html"
    },
    {
      id: "beverages",
      name: "Beverages",
      tagline: "Craft coffees, shakes, fresh juices & coolers",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=80",
      icon: "🥤",
      count: 6,
      page: "beverages.html"
    },
    {
      id: "ice-cream",
      name: "Ice Cream",
      tagline: "Creamy scoops, sundaes, swirls & frozen delights",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1200&q=80",
      icon: "🍨",
      count: 6,
      page: "ice-cream.html"
    }
  ],

  // 60 Core Food Items (6 items per category)
  foodItems: [
    // --- 1. PIZZA (6 items) ---
    {
      id: "piz-1",
      name: "Margherita Pizza",
      category: "pizza",
      restaurantId: "rest-1",
      price: 249,
      discount: 15,
      rating: 4.8,
      ratingCount: 320,
      veg: true,
      popular: true,
      description: "Classic hand tossed crust topped with rich Italian San Marzano tomato sauce, fresh mozzarella, and sweet basil leaves.",
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80",
      ingredients: ["San Marzano Tomato Sauce", "Fresh Mozzarella", "Basil", "Extra Virgin Olive Oil"],
      addOns: [
        { name: "Extra Mozzarella Cheese", price: 40 },
        { name: "Garlic Butter Crust", price: 30 },
        { name: "Jalapeño & Olives", price: 25 }
      ]
    },
    {
      id: "piz-2",
      name: "Farmhouse Pizza",
      category: "pizza",
      restaurantId: "rest-1",
      price: 329,
      discount: 20,
      rating: 4.7,
      ratingCount: 240,
      veg: true,
      popular: true,
      description: "Loaded with crisp bell peppers, sweet golden corn, button mushrooms, sliced red onions, and fresh diced tomatoes.",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Bell Peppers", "Sweet Corn", "Mushrooms", "Onions", "Mozzarella"],
      addOns: [
        { name: "Extra Cheese Burst", price: 50 },
        { name: "Paneer Cubes", price: 35 },
        { name: "Chili Flakes & Oregano Dips", price: 20 }
      ]
    },
    {
      id: "piz-3",
      name: "Paneer Pizza",
      category: "pizza",
      restaurantId: "rest-1",
      price: 349,
      discount: 10,
      rating: 4.6,
      ratingCount: 190,
      veg: true,
      popular: false,
      description: "Tandoori spiced cottage cheese chunks paired with capsicum, red paprika, and creamy mozzarella on a golden crust.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Tandoori Paneer", "Capsicum", "Paprika", "Mozzarella Sauce"],
      addOns: [
        { name: "Double Paneer", price: 45 },
        { name: "Cheese Dip", price: 25 }
      ]
    },
    {
      id: "piz-4",
      name: "Chicken Pizza",
      category: "pizza",
      restaurantId: "rest-1",
      price: 389,
      discount: 15,
      rating: 4.9,
      ratingCount: 410,
      veg: false,
      popular: true,
      description: "Tender herb roasted chicken cubes, black olives, sliced onions, and smoky mozzarella with aromatic herbs.",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Herb Roasted Chicken", "Black Olives", "Mozzarella", "Tomato Basil Base"],
      addOns: [
        { name: "Extra Chicken Topping", price: 60 },
        { name: "Cheese Stuffed Crust", price: 50 }
      ]
    },
    {
      id: "piz-5",
      name: "BBQ Chicken Pizza",
      category: "pizza",
      restaurantId: "rest-1",
      price: 419,
      discount: 25,
      rating: 4.8,
      ratingCount: 280,
      veg: false,
      popular: true,
      description: "Smoky BBQ chicken shreds, caramelized red onions, sweet corn, and blend of gouda & mozzarella with smoky glaze.",
      image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80",
      ingredients: ["BBQ Grilled Chicken", "Caramelized Onions", "Corn", "Gouda & Mozzarella"],
      addOns: [
        { name: "Extra BBQ Drizzle", price: 20 },
        { name: "Smoky Bacon Bits", price: 55 }
      ]
    },
    {
      id: "piz-6",
      name: "Pepperoni Pizza",
      category: "pizza",
      restaurantId: "rest-1",
      price: 449,
      discount: 10,
      rating: 4.9,
      ratingCount: 520,
      veg: false,
      popular: true,
      description: "The authentic New York slice topped generously with spiced cured pepperoni discs crisped to perfection.",
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Imported Pepperoni", "Mozzarella Blend", "Marinara", "Crushed Red Pepper"],
      addOns: [
        { name: "Double Pepperoni", price: 70 },
        { name: "Hot Honey Drizzle", price: 30 }
      ]
    },

    // --- 2. BURGERS (6 items) ---
    {
      id: "bur-1",
      name: "Veg Burger",
      category: "burgers",
      restaurantId: "rest-2",
      price: 129,
      discount: 10,
      rating: 4.5,
      ratingCount: 290,
      veg: true,
      popular: false,
      description: "Crispy seasoned vegetable and potato patty topped with lettuce, sliced tomatoes, cucumber, and creamy herb mayonnaise.",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Crispy Potato Veg Patty", "Iceberg Lettuce", "Tomato", "Herb Mayo"],
      addOns: [
        { name: "Cheddar Cheese Slice", price: 25 },
        { name: "Crispy Onion Rings Inside", price: 30 },
        { name: "Peri Peri Seasoning", price: 15 }
      ]
    },
    {
      id: "bur-2",
      name: "Cheese Burger",
      category: "burgers",
      restaurantId: "rest-2",
      price: 189,
      discount: 15,
      rating: 4.7,
      ratingCount: 380,
      veg: true,
      popular: true,
      description: "Melted double cheddar cheese draped over a savory grilled patty with pickled gherkins, onions, and signature burger sauce.",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Double Cheddar", "Savory Patty", "Pickles", "Signature Sauce"],
      addOns: [
        { name: "Extra Cheese Layer", price: 30 },
        { name: "Jalapeño Poppers", price: 40 }
      ]
    },
    {
      id: "bur-3",
      name: "Chicken Burger",
      category: "burgers",
      restaurantId: "rest-2",
      price: 219,
      discount: 20,
      rating: 4.8,
      ratingCount: 450,
      veg: false,
      popular: true,
      description: "Tender grilled minced chicken patty basted in butter and garlic, served with crisp lettuce, sliced tomatoes, and garlic aioli.",
      image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Grilled Chicken Patty", "Garlic Aioli", "Brioche Bun", "Lettuce"],
      addOns: [
        { name: "Extra Chicken Patty", price: 60 },
        { name: "Smoked Cheese Slice", price: 25 }
      ]
    },
    {
      id: "bur-4",
      name: "Crispy Chicken Burger",
      category: "burgers",
      restaurantId: "rest-2",
      price: 249,
      discount: 10,
      rating: 4.9,
      ratingCount: 510,
      veg: false,
      popular: true,
      description: "Ultra-crunchy buttermilk battered chicken breast fillet coated in spicy breading, paired with tangy coleslaw and sriracha mayo.",
      image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Buttermilk Fried Chicken", "Coleslaw", "Sriracha Mayo", "Toasted Bun"],
      addOns: [
        { name: "Spicy Ghost Pepper Sauce", price: 20 },
        { name: "Bacon Strip", price: 45 }
      ]
    },
    {
      id: "bur-5",
      name: "Double Patty Burger",
      category: "burgers",
      restaurantId: "rest-2",
      price: 299,
      discount: 15,
      rating: 4.9,
      ratingCount: 390,
      veg: false,
      popular: true,
      description: "Two succulent grilled patties stacked high with double cheddar, caramelized onions, crisp pickles, and secret house dressing.",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Double Patty", "Double Cheddar", "Caramelized Onions", "House Dressing"],
      addOns: [
        { name: "Triple Patty Upgrade", price: 70 },
        { name: "Extra Cheese Melt", price: 30 }
      ]
    },
    {
      id: "bur-6",
      name: "BBQ Chicken Burger",
      category: "burgers",
      restaurantId: "rest-2",
      price: 269,
      discount: 20,
      rating: 4.7,
      ratingCount: 310,
      veg: false,
      popular: false,
      description: "Flame grilled chicken patty drenched in sweet & tangy hickory BBQ sauce, topped with crispy fried onions and melted pepper jack.",
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Hickory BBQ Chicken", "Crispy Onions", "Pepper Jack Cheese", "Pickles"],
      addOns: [
        { name: "Extra BBQ Dip", price: 20 },
        { name: "Fried Egg", price: 25 }
      ]
    },

    // --- 3. BIRYANI (6 items) ---
    {
      id: "bir-1",
      name: "Chicken Biryani",
      category: "biryani",
      restaurantId: "rest-3",
      price: 299,
      discount: 15,
      rating: 4.9,
      ratingCount: 680,
      veg: false,
      popular: true,
      description: "Dum cooked long grain basmati rice infused with saffron, rose water, and tender chicken pieces marinated in fragrant spices. Served with raita.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Basmati Rice", "Tender Chicken", "Saffron", "Spices", "Raita"],
      addOns: [
        { name: "Extra Boiled Egg (2 pcs)", price: 30 },
        { name: "Mirchi Ka Salan", price: 35 },
        { name: "Extra Raita", price: 20 }
      ]
    },
    {
      id: "bir-2",
      name: "Mutton Biryani",
      category: "biryani",
      restaurantId: "rest-3",
      price: 399,
      discount: 10,
      rating: 4.9,
      ratingCount: 540,
      veg: false,
      popular: true,
      description: "Slow cooked tender mutton shank pieces layered with royal aromatic rice, caramelized shallots, mint, and desi ghee.",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Tender Mutton", "Desi Ghee", "Saffron Basmati", "Crispy Onions"],
      addOns: [
        { name: "Extra Mutton Piece", price: 90 },
        { name: "Desi Ghee Splash", price: 25 }
      ]
    },
    {
      id: "bir-3",
      name: "Egg Biryani",
      category: "biryani",
      restaurantId: "rest-3",
      price: 229,
      discount: 15,
      rating: 4.6,
      ratingCount: 220,
      veg: false,
      popular: false,
      description: "Crispy shallow fried spiced eggs nestled inside fragrant aromatic biryani rice, topped with fresh coriander and brown onions.",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Fried Eggs (3 pcs)", "Basmati Rice", "Biryani Spices", "Raita"],
      addOns: [
        { name: "Extra Egg (2 pcs)", price: 25 },
        { name: "Papad & Chutney", price: 20 }
      ]
    },
    {
      id: "bir-4",
      name: "Veg Biryani",
      category: "biryani",
      restaurantId: "rest-3",
      price: 219,
      discount: 20,
      rating: 4.7,
      ratingCount: 310,
      veg: true,
      popular: true,
      description: "Garden fresh carrots, green beans, cauliflower, green peas, and potatoes dum cooked with whole spices and basmati rice.",
      image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Fresh Assorted Vegetables", "Basmati Rice", "Mint", "Whole Spices"],
      addOns: [
        { name: "Paneer Cubes Add-on", price: 40 },
        { name: "Roasted Cashews", price: 35 }
      ]
    },
    {
      id: "bir-5",
      name: "Paneer Biryani",
      category: "biryani",
      restaurantId: "rest-3",
      price: 269,
      discount: 10,
      rating: 4.8,
      ratingCount: 290,
      veg: true,
      popular: false,
      description: "Golden fried soft cottage cheese cubes cooked in rich tandoori marinade and layered with flavorful saffron basmati rice.",
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Marinated Paneer", "Saffron Basmati", "Ghee", "Fried Onions"],
      addOns: [
        { name: "Extra Paneer Chunks", price: 45 },
        { name: "Cucumber Raita", price: 20 }
      ]
    },
    {
      id: "bir-6",
      name: "Hyderabadi Biryani",
      category: "biryani",
      restaurantId: "rest-3",
      price: 349,
      discount: 25,
      rating: 5.0,
      ratingCount: 780,
      veg: false,
      popular: true,
      description: "Authentic Nizam-style spicy chicken biryani cooked in a sealed earthen pot (Handi) with secret potli masala and kewra essence.",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Hyderabadi Chicken Masala", "Kewra", "Dum Basmati", "Salan"],
      addOns: [
        { name: "Extra Gravy Salan", price: 30 },
        { name: "Gulab Jamun (1 pc)", price: 25 }
      ]
    },

    // --- 4. CHICKEN (6 items) ---
    {
      id: "chk-1",
      name: "Chicken 65",
      category: "chicken",
      restaurantId: "rest-4",
      price: 249,
      discount: 10,
      rating: 4.8,
      ratingCount: 390,
      veg: false,
      popular: true,
      description: "Bite sized boneless chicken chunks marinated in ginger, garlic, red chilies, deep fried and tempered with curry leaves and green chilies.",
      image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Boneless Chicken", "Curry Leaves", "Green Chilies", "Special 65 Masala"],
      addOns: [
        { name: "Extra Mint Chutney", price: 15 },
        { name: "Fried Garlic & Curry Topping", price: 20 }
      ]
    },
    {
      id: "chk-2",
      name: "Chicken Wings",
      category: "chicken",
      restaurantId: "rest-4",
      price: 279,
      discount: 20,
      rating: 4.9,
      ratingCount: 460,
      veg: false,
      popular: true,
      description: "6 crispy golden fried chicken wings tossed in your choice of spicy buffalo sauce, garlic parmesan, or sweet honey chili glaze.",
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Chicken Wings (6 pcs)", "Buffalo Glaze", "Celery Sticks", "Ranch Dip"],
      addOns: [
        { name: "Extra Ranch / Blue Cheese Dip", price: 25 },
        { name: "Upgrade to 10 Wings", price: 120 }
      ]
    },
    {
      id: "chk-3",
      name: "Grilled Chicken",
      category: "chicken",
      restaurantId: "rest-4",
      price: 319,
      discount: 15,
      rating: 4.7,
      ratingCount: 280,
      veg: false,
      popular: false,
      description: "Juicy chicken breast marinated in rosemary, thyme, lemon juice, and olive oil, char grilled and served with sautéed vegetables.",
      image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Grilled Chicken Breast", "Rosemary Herbs", "Sautéed Veggies", "Mushroom Sauce"],
      addOns: [
        { name: "Creamy Pepper Mushroom Sauce", price: 40 },
        { name: "Mashed Potatoes Side", price: 50 }
      ]
    },
    {
      id: "chk-4",
      name: "Chicken Tikka",
      category: "chicken",
      restaurantId: "rest-4",
      price: 299,
      discount: 10,
      rating: 4.8,
      ratingCount: 420,
      veg: false,
      popular: true,
      description: "Boneless chicken chunks marinated in spiced yogurt, smoked in clay tandoor oven, and brushed with melted butter and chaat masala.",
      image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Tandoori Marinated Chicken", "Yogurt Spices", "Butter", "Lemon Onions"],
      addOns: [
        { name: "Butter Naan (1 pc)", price: 40 },
        { name: "Mint Mayo Dip", price: 20 }
      ]
    },
    {
      id: "chk-5",
      name: "Chicken Kebab",
      category: "chicken",
      restaurantId: "rest-4",
      price: 289,
      discount: 15,
      rating: 4.7,
      ratingCount: 310,
      veg: false,
      popular: false,
      description: "Melt in the mouth minced chicken seekh skewers blended with aromatic herbs, ginger, mint, and spices grilled over charcoal embers.",
      image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Minced Chicken Seekh", "Charcoal Grill Herbs", "Green Salad", "Mint Dip"],
      addOns: [
        { name: "Rumali Roti", price: 30 },
        { name: "Cheese Topping on Kebabs", price: 35 }
      ]
    },
    {
      id: "chk-6",
      name: "Butter Chicken",
      category: "chicken",
      restaurantId: "rest-4",
      price: 349,
      discount: 20,
      rating: 4.9,
      ratingCount: 750,
      veg: false,
      popular: true,
      description: "Iconic North Indian specialty of tandoori grilled chicken pieces simmered in a silky tomato, cashew cream, and rich butter gravy.",
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Tandoori Chicken", "Cashew Gravy", "Butter", "Fresh Cream", "Kasuri Methi"],
      addOns: [
        { name: "Garlic Butter Naan (2 pcs)", price: 70 },
        { name: "Jeera Rice", price: 80 }
      ]
    },

    // --- 5. CHINESE (6 items) ---
    {
      id: "chi-1",
      name: "Fried Rice",
      category: "chinese",
      restaurantId: "rest-5",
      price: 189,
      discount: 10,
      rating: 4.6,
      ratingCount: 310,
      veg: true,
      popular: false,
      description: "Aromatic jasmine rice tossed in a blazing hot wok with finely chopped carrots, scallions, French beans, and light soy sauce.",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Wok Tossed Rice", "Spring Onions", "Carrots", "Beans", "Soy Sauce"],
      addOns: [
        { name: "Extra Schezwan Sauce", price: 20 },
        { name: "Crispy Fried Noodles", price: 25 }
      ]
    },
    {
      id: "chi-2",
      name: "Chicken Fried Rice",
      category: "chinese",
      restaurantId: "rest-5",
      price: 239,
      discount: 15,
      rating: 4.8,
      ratingCount: 420,
      veg: false,
      popular: true,
      description: "Classic wok tossed rice with shredded tender chicken, scrambled eggs, spring onions, garlic, and savory Chinese spices.",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Chicken Chunks", "Scrambled Eggs", "Jasmine Rice", "Scallions"],
      addOns: [
        { name: "Double Chicken", price: 50 },
        { name: "Chili Garlic Paste", price: 15 }
      ]
    },
    {
      id: "chi-3",
      name: "Veg Noodles",
      category: "chinese",
      restaurantId: "rest-5",
      price: 179,
      discount: 10,
      rating: 4.5,
      ratingCount: 260,
      veg: true,
      popular: false,
      description: "Soft hakka noodles stir fried with shredded cabbage, bell peppers, carrots, garlic, and a savory blend of Asian sauces.",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Hakka Noodles", "Cabbage", "Capsicum", "Garlic Soy Glaze"],
      addOns: [
        { name: "Paneer Shreds", price: 35 },
        { name: "Hot Chili Oil", price: 15 }
      ]
    },
    {
      id: "chi-4",
      name: "Chicken Noodles",
      category: "chinese",
      restaurantId: "rest-5",
      price: 229,
      discount: 20,
      rating: 4.8,
      ratingCount: 480,
      veg: false,
      popular: true,
      description: "Wok seared noodles loaded with shredded chicken, egg ribbons, crisp julienned vegetables, and toasted sesame aroma.",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Egg Noodles", "Shredded Chicken", "Egg Ribbons", "Asian Vegetables"],
      addOns: [
        { name: "Extra Chicken", price: 45 },
        { name: "Schezwan Dip", price: 20 }
      ]
    },
    {
      id: "chi-5",
      name: "Manchurian",
      category: "chinese",
      restaurantId: "rest-5",
      price: 219,
      discount: 15,
      rating: 4.7,
      ratingCount: 350,
      veg: true,
      popular: true,
      description: "Crispy fried vegetable dumpling balls tossed in a thick, tangy, spicy dark soy and ginger garlic Indo Chinese gravy.",
      image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Veg Manchurian Balls", "Ginger Garlic Gravy", "Coriander", "Dark Soy"],
      addOns: [
        { name: "Convert to Dry Manchurian", price: 0 },
        { name: "Extra Gravy Bowl", price: 30 }
      ]
    },
    {
      id: "chi-6",
      name: "Schezwan Noodles",
      category: "chinese",
      restaurantId: "rest-5",
      price: 209,
      discount: 10,
      rating: 4.8,
      ratingCount: 380,
      veg: true,
      popular: true,
      description: "Fiery spicy noodles stir fried in authentic Sichuan pepper chili paste with crunchy vegetables and spring onions.",
      image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Schezwan Chili Paste", "Hakka Noodles", "Garlic", "Spring Onions"],
      addOns: [
        { name: "Crispy Chicken Add-on", price: 50 },
        { name: "Fried Egg on Top", price: 20 }
      ]
    },

    // --- 6. MEXICAN (6 items) ---
    {
      id: "mex-1",
      name: "Tacos",
      category: "mexican",
      restaurantId: "rest-6",
      price: 229,
      discount: 15,
      rating: 4.8,
      ratingCount: 340,
      veg: false,
      popular: true,
      description: "Trio of crispy corn taco shells filled with spiced filling, fresh pico de gallo salsa, shredded iceberg lettuce, and sour cream.",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Corn Taco Shells (3 pcs)", "Pico de Gallo", "Sour Cream", "Cheese"],
      addOns: [
        { name: "Guacamole Scoop", price: 40 },
        { name: "Extra Cheese Blend", price: 30 },
        { name: "Habanero Hot Sauce", price: 20 }
      ]
    },
    {
      id: "mex-2",
      name: "Burrito",
      category: "mexican",
      restaurantId: "rest-6",
      price: 279,
      discount: 20,
      rating: 4.9,
      ratingCount: 420,
      veg: false,
      popular: true,
      description: "Warm flour tortilla tightly rolled with cilantro lime rice, black beans, grilled meat, roasted corn, guacamole, and salsa.",
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Flour Tortilla", "Cilantro Lime Rice", "Black Beans", "Guacamole", "Salsa"],
      addOns: [
        { name: "Double Protein", price: 60 },
        { name: "Queso Cheese Sauce", price: 35 }
      ]
    },
    {
      id: "mex-3",
      name: "Nachos",
      category: "mexican",
      restaurantId: "rest-6",
      price: 199,
      discount: 10,
      rating: 4.7,
      ratingCount: 380,
      veg: true,
      popular: true,
      description: "Crispy hand-cut corn tortilla chips smothered in warm melted cheddar cheese sauce, refried beans, jalapeños, and tomato salsa.",
      image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Corn Tortilla Chips", "Warm Cheddar Queso", "Jalapeños", "Salsa Fresca"],
      addOns: [
        { name: "Fresh Chunky Guacamole", price: 45 },
        { name: "Spiced Shredded Chicken", price: 50 }
      ]
    },
    {
      id: "mex-4",
      name: "Quesadilla",
      category: "mexican",
      restaurantId: "rest-6",
      price: 259,
      discount: 15,
      rating: 4.7,
      ratingCount: 290,
      veg: true,
      popular: false,
      description: "Grilled folded tortilla stuffed with gooey melted Monterey Jack cheese, sautéed bell peppers, sweet corn, and chipotle spices.",
      image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Monterey Jack Cheese", "Bell Peppers", "Sweet Corn", "Chipotle Cream"],
      addOns: [
        { name: "Grilled Chicken Chunks", price: 50 },
        { name: "Extra Sour Cream", price: 20 }
      ]
    },
    {
      id: "mex-5",
      name: "Mexican Rice",
      category: "mexican",
      restaurantId: "rest-6",
      price: 189,
      discount: 10,
      rating: 4.5,
      ratingCount: 190,
      veg: true,
      popular: false,
      description: "Flavorful rice cooked in roasted tomato broth with garlic, cumin, red kidney beans, sweet corn, and fresh cilantro garnish.",
      image: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Tomato Broth Rice", "Kidney Beans", "Corn", "Cumin Herbs"],
      addOns: [
        { name: "Queso Fresco Crumbles", price: 30 },
        { name: "Salsa Dip", price: 20 }
      ]
    },
    {
      id: "mex-6",
      name: "Mexican Bowl",
      category: "mexican",
      restaurantId: "rest-6",
      price: 299,
      discount: 20,
      rating: 4.9,
      ratingCount: 460,
      veg: true,
      popular: true,
      description: "Wholesome layered fiesta bowl with cilantro lime rice, pinto beans, grilled corn salsa, avocado slices, sour cream, and crispy nachos.",
      image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Cilantro Rice", "Pinto Beans", "Avocado", "Corn Salsa", "Crispy Chips"],
      addOns: [
        { name: "Grilled Chicken / Paneer", price: 55 },
        { name: "Extra Guacamole", price: 40 }
      ]
    },

    // --- 7. HEALTHY FOOD (6 items) ---
    {
      id: "hea-1",
      name: "Salad",
      category: "healthy-food",
      restaurantId: "rest-7",
      price: 219,
      discount: 15,
      rating: 4.8,
      ratingCount: 270,
      veg: true,
      popular: true,
      description: "Crisp romaine lettuce, cherry tomatoes, English cucumbers, black olives, feta cheese, and balsamic vinaigrette dressing.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Romaine Lettuce", "Cherry Tomatoes", "Cucumbers", "Feta Cheese", "Balsamic"],
      addOns: [
        { name: "Grilled Tofu / Paneer", price: 40 },
        { name: "Chia & Pumpkin Seeds", price: 25 },
        { name: "Extra Greek Dressing", price: 20 }
      ]
    },
    {
      id: "hea-2",
      name: "Fruit Bowl",
      category: "healthy-food",
      restaurantId: "rest-7",
      price: 179,
      discount: 10,
      rating: 4.9,
      ratingCount: 310,
      veg: true,
      popular: true,
      description: "Seasonal assortment of dragon fruit, kiwi, blueberries, pomegranate, crisp apple, watermelon, and organic honey drizzle.",
      image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Dragonfruit", "Kiwi", "Blueberries", "Pomegranate", "Raw Honey"],
      addOns: [
        { name: "Greek Yogurt Topping", price: 30 },
        { name: "Roasted Almond Flakes", price: 25 }
      ]
    },
    {
      id: "hea-3",
      name: "Protein Bowl",
      category: "healthy-food",
      restaurantId: "rest-7",
      price: 289,
      discount: 20,
      rating: 4.9,
      ratingCount: 440,
      veg: false,
      popular: true,
      description: "Power packed bowl featuring 35g protein: quinoa, grilled chicken breast, edamame, boiled egg, steamed broccoli, and tahini drizzle.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Quinoa", "Grilled Chicken", "Edamame", "Boiled Egg", "Tahini"],
      addOns: [
        { name: "Extra Chicken Breast", price: 60 },
        { name: "Avocado Mash", price: 45 }
      ]
    },
    {
      id: "hea-4",
      name: "Grilled Vegetables",
      category: "healthy-food",
      restaurantId: "rest-7",
      price: 199,
      discount: 10,
      rating: 4.6,
      ratingCount: 180,
      veg: true,
      popular: false,
      description: "Char grilled zucchini, asparagus, bell peppers, cherry tomatoes, and button mushrooms seasoned with extra virgin olive oil and oregano.",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Zucchini", "Asparagus", "Mushrooms", "Olive Oil", "Oregano"],
      addOns: [
        { name: "Grilled Halloumi Cheese", price: 50 },
        { name: "Hummus Dip", price: 35 }
      ]
    },
    {
      id: "hea-5",
      name: "Healthy Wrap",
      category: "healthy-food",
      restaurantId: "rest-7",
      price: 209,
      discount: 15,
      rating: 4.7,
      ratingCount: 230,
      veg: true,
      popular: false,
      description: "Whole wheat multi grain wrap loaded with hummus, baby spinach, roasted bell peppers, crunchy cucumbers, and avocado dressing.",
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Whole Wheat Tortilla", "Baby Spinach", "Hummus", "Avocado Dressing"],
      addOns: [
        { name: "Grilled Cottage Cheese", price: 35 },
        { name: "Spicy Mustard Sauce", price: 15 }
      ]
    },
    {
      id: "hea-6",
      name: "Smoothie Bowl",
      category: "healthy-food",
      restaurantId: "rest-7",
      price: 249,
      discount: 15,
      rating: 4.9,
      ratingCount: 390,
      veg: true,
      popular: true,
      description: "Thick blended acai berry and banana base topped with toasted granola, chia seeds, sliced strawberries, and organic peanut butter drizzle.",
      image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Acai Berries", "Banana Base", "Crunchy Granola", "Chia Seeds", "Peanut Butter"],
      addOns: [
        { name: "Plant Protein Scoop", price: 40 },
        { name: "Cacao Nibs", price: 25 }
      ]
    },

    // --- 8. DESSERTS (6 items) ---
    {
      id: "des-1",
      name: "Chocolate Cake",
      category: "desserts",
      restaurantId: "rest-8",
      price: 199,
      discount: 15,
      rating: 4.9,
      ratingCount: 580,
      veg: true,
      popular: true,
      description: "Moist and decadent triple chocolate Dutch fudge cake layered with smooth Belgian dark chocolate ganache.",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Belgian Dark Chocolate", "Cocoa Sponge", "Chocolate Ganache"],
      addOns: [
        { name: "Vanilla Ice Cream Scoop", price: 35 },
        { name: "Hot Chocolate Fudge Shot", price: 25 }
      ]
    },
    {
      id: "des-2",
      name: "Brownie",
      category: "desserts",
      restaurantId: "rest-8",
      price: 149,
      discount: 10,
      rating: 4.8,
      ratingCount: 470,
      veg: true,
      popular: true,
      description: "Warm fudgy walnut brownie with a crackly top and gooey molten chocolate center.",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Cocoa", "Roasted Walnuts", "Melted Chocolate", "Butter"],
      addOns: [
        { name: "Vanilla Bean Ice Cream", price: 35 },
        { name: "Caramel Drizzle", price: 20 }
      ]
    },
    {
      id: "des-3",
      name: "Cheesecake",
      category: "desserts",
      restaurantId: "rest-8",
      price: 249,
      discount: 20,
      rating: 4.9,
      ratingCount: 510,
      veg: true,
      popular: true,
      description: "New York style baked cream cheesecake with a buttery graham cracker crust and wild blueberry compote topping.",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Philadelphia Cream Cheese", "Graham Cracker Crust", "Blueberry Compote"],
      addOns: [
        { name: "Extra Berry Compote", price: 30 },
        { name: "Whipped Cream Swirl", price: 20 }
      ]
    },
    {
      id: "des-4",
      name: "Donut",
      category: "desserts",
      restaurantId: "rest-8",
      price: 99,
      discount: 10,
      rating: 4.6,
      ratingCount: 320,
      veg: true,
      popular: false,
      description: "Fluffy yeast risen donut dipped in glossy dark chocolate glaze and finished with colorful rainbow sprinkles.",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Glazed Donut", "Dark Chocolate Dip", "Rainbow Sprinkles"],
      addOns: [
        { name: "Pack of 2 Donuts", price: 80 },
        { name: "Nutella Filling Inside", price: 30 }
      ]
    },
    {
      id: "des-5",
      name: "Pastry",
      category: "desserts",
      restaurantId: "rest-8",
      price: 129,
      discount: 15,
      rating: 4.7,
      ratingCount: 260,
      veg: true,
      popular: false,
      description: "Delicate layered Red Velvet pastry with velvety cream cheese frosting and fine red velvet sponge crumbs.",
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Red Velvet Sponge", "Cream Cheese Frosting", "Vanilla Essence"],
      addOns: [
        { name: "White Chocolate Shavings", price: 20 },
        { name: "Coffee Dip", price: 25 }
      ]
    },
    {
      id: "des-6",
      name: "Gulab Jamun",
      category: "desserts",
      restaurantId: "rest-8",
      price: 119,
      discount: 10,
      rating: 4.9,
      ratingCount: 620,
      veg: true,
      popular: true,
      description: "Traditional soft khoya milk dumplings golden fried and soaked in warm cardamom, saffron, and rose sugar syrup (3 pcs).",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Khoya Mawa", "Cardamom Sugar Syrup", "Saffron Pistachios"],
      addOns: [
        { name: "Warm Rabri Cup", price: 40 },
        { name: "Extra Gulab Jamun (2 pcs)", price: 50 }
      ]
    },

    // --- 9. BEVERAGES (6 items) ---
    {
      id: "bev-1",
      name: "Coffee",
      category: "beverages",
      restaurantId: "rest-2",
      price: 99,
      discount: 10,
      rating: 4.7,
      ratingCount: 380,
      veg: true,
      popular: true,
      description: "Freshly brewed artisanal espresso shot combined with steamed whole milk and velvety microfoam.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Arabica Coffee Beans", "Steamed Milk", "Vanilla Note"],
      addOns: [
        { name: "Extra Espresso Shot", price: 30 },
        { name: "Caramel / Hazelnut Syrup", price: 25 },
        { name: "Oat Milk Substitute", price: 35 }
      ]
    },
    {
      id: "bev-2",
      name: "Cold Coffee",
      category: "beverages",
      restaurantId: "rest-2",
      price: 149,
      discount: 15,
      rating: 4.9,
      ratingCount: 540,
      veg: true,
      popular: true,
      description: "Thick and creamy blended iced coffee topped with chocolate drizzle, cocoa powder, and a scoop of vanilla ice cream.",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Chilled Espresso", "Ice Cream Scoop", "Chocolate Drizzle", "Whole Milk"],
      addOns: [
        { name: "Whipped Cream on Top", price: 25 },
        { name: "Crushed Oreo Crunch", price: 20 }
      ]
    },
    {
      id: "bev-3",
      name: "Fresh Juice",
      category: "beverages",
      restaurantId: "rest-7",
      price: 129,
      discount: 10,
      rating: 4.8,
      ratingCount: 290,
      veg: true,
      popular: false,
      description: "100% cold pressed Valencia orange juice freshly extracted with no added sugar or preservatives.",
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Valencia Oranges", "Crushed Ice", "Mint Leaf"],
      addOns: [
        { name: "Chia Seeds Boost", price: 20 },
        { name: "Ginger & Mint Infusion", price: 15 }
      ]
    },
    {
      id: "bev-4",
      name: "Milkshake",
      category: "beverages",
      restaurantId: "rest-8",
      price: 169,
      discount: 20,
      rating: 4.8,
      ratingCount: 460,
      veg: true,
      popular: true,
      description: "Ultra-thick Belgian chocolate milkshake made with real melted chocolate, creamy gelato, and whipped topping.",
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Belgian Chocolate", "Ice Cream", "Full Cream Milk", "Whipped Cream"],
      addOns: [
        { name: "KitKat / Brownie Crumble", price: 30 },
        { name: "Caramel Drizzle", price: 20 }
      ]
    },
    {
      id: "bev-5",
      name: "Soft Drinks",
      category: "beverages",
      restaurantId: "rest-1",
      price: 60,
      discount: 0,
      rating: 4.5,
      ratingCount: 210,
      veg: true,
      popular: false,
      description: "Chilled canned aerated beverage served cold with lemon slice and ice cubes.",
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Chilled Can (330ml)", "Lemon Wedge", "Ice"],
      addOns: [
        { name: "Lemon Mint Ice Cubes", price: 15 }
      ]
    },
    {
      id: "bev-6",
      name: "Iced Tea",
      category: "beverages",
      restaurantId: "rest-7",
      price: 119,
      discount: 15,
      rating: 4.7,
      ratingCount: 330,
      veg: true,
      popular: false,
      description: "Brewed black tea infused with juicy peach nectar and zesty lemon, served over crystal ice.",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Brewed Black Tea", "Peach Nectar", "Lemon Slices", "Mint"],
      addOns: [
        { name: "Boba Pearls Add-on", price: 35 },
        { name: "Extra Peach Pulp", price: 20 }
      ]
    },

    // --- 10. ICE CREAM (6 items) ---
    {
      id: "ice-1",
      name: "Vanilla",
      category: "ice-cream",
      restaurantId: "rest-8",
      price: 119,
      discount: 10,
      rating: 4.6,
      ratingCount: 270,
      veg: true,
      popular: false,
      description: "Silky Madagascar Bourbon vanilla bean ice cream with natural aromatic vanilla specks.",
      image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Madagascar Vanilla Beans", "Pure Cream", "Cane Sugar"],
      addOns: [
        { name: "Hot Chocolate Fudge", price: 30 },
        { name: "Waffle Cone", price: 20 }
      ]
    },
    {
      id: "ice-2",
      name: "Chocolate",
      category: "ice-cream",
      restaurantId: "rest-8",
      price: 139,
      discount: 15,
      rating: 4.9,
      ratingCount: 610,
      veg: true,
      popular: true,
      description: "Intense Swiss dark chocolate ice cream packed with crunchy dark chocolate chips.",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Swiss Dark Cocoa", "Chocolate Chips", "Rich Cream"],
      addOns: [
        { name: "Brownie Bites", price: 35 },
        { name: "Roasted Almond Slivers", price: 25 }
      ]
    },
    {
      id: "ice-3",
      name: "Strawberry",
      category: "ice-cream",
      restaurantId: "rest-8",
      price: 129,
      discount: 10,
      rating: 4.7,
      ratingCount: 340,
      veg: true,
      popular: false,
      description: "Creamy churned ice cream infused with real hand picked Mahabaleshwar strawberry chunks.",
      image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Fresh Strawberry Chunks", "Strawberry Swirl", "Cream"],
      addOns: [
        { name: "White Chocolate Drizzle", price: 20 },
        { name: "Sprinkles", price: 15 }
      ]
    },
    {
      id: "ice-4",
      name: "Butterscotch",
      category: "ice-cream",
      restaurantId: "rest-8",
      price: 139,
      discount: 15,
      rating: 4.8,
      ratingCount: 410,
      veg: true,
      popular: true,
      description: "Golden caramelized brown sugar ice cream loaded with crunchy butter praline cashew nut pearls.",
      image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Butter Praline", "Caramelized Sugar", "Cashew Nuts", "Cream"],
      addOns: [
        { name: "Extra Cashew Praline", price: 30 },
        { name: "Caramel Sauce", price: 20 }
      ]
    },
    {
      id: "ice-5",
      name: "Mango",
      category: "ice-cream",
      restaurantId: "rest-8",
      price: 149,
      discount: 20,
      rating: 4.9,
      ratingCount: 530,
      veg: true,
      popular: true,
      description: "Sun ripened Ratnagiri Alphonso mango pulp churned into ultra-smooth seasonal gourmet ice cream.",
      image: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Alphonso Mango Pulp", "Mango Chunks", "Sweetened Cream"],
      addOns: [
        { name: "Fresh Mango Pulp Drip", price: 30 },
        { name: "Pistachio Crumble", price: 25 }
      ]
    },
    {
      id: "ice-6",
      name: "Cookies & Cream",
      category: "ice-cream",
      restaurantId: "rest-8",
      price: 159,
      discount: 15,
      rating: 4.9,
      ratingCount: 570,
      veg: true,
      popular: true,
      description: "Smooth sweet cream ice cream generously folded with crushed crunchy chocolate sandwich cookies.",
      image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=600&q=80",
      ingredients: ["Crushed Oreo Cookies", "Sweet Cream", "Chocolate Swirl"],
      addOns: [
        { name: "Full Oreo Cookie on Top", price: 15 },
        { name: "Chocolate Shell Hard Dip", price: 30 }
      ]
    }
  ],

  // 8 Curated Restaurants
  restaurants: [
    {
      id: "rest-1",
      name: "Bella Italia Artisan Pizzeria",
      cuisine: "Italian, Pizza, Fast Food",
      rating: 4.8,
      ratingCount: 1420,
      deliveryTime: "25 to 30 mins",
      distance: "2.4 km",
      deliveryFee: 30,
      priceForTwo: "₹500 for two",
      offer: "50% OFF up to ₹100",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      isOpen: true,
      openingHours: "11:00 AM to 11:30 PM",
      address: "84, Little Italy Lane, Central Avenue",
      categories: ["pizza", "beverages", "desserts"]
    },
    {
      id: "rest-2",
      name: "The Burger Club & Grill",
      cuisine: "Burgers, American, Shakes",
      rating: 4.7,
      ratingCount: 1890,
      deliveryTime: "20 to 25 mins",
      distance: "1.8 km",
      deliveryFee: 25,
      priceForTwo: "₹400 for two",
      offer: "Flat ₹100 OFF",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80",
      isOpen: true,
      openingHours: "10:00 AM to 12:00 AM",
      address: "12, Downtown Plaza, Ring Road",
      categories: ["burgers", "beverages"]
    },
    {
      id: "rest-3",
      name: "Royal Darbar Biryani House",
      cuisine: "Biryani, Mughlai, Kebabs",
      rating: 4.9,
      ratingCount: 3200,
      deliveryTime: "30 to 35 mins",
      distance: "3.5 km",
      deliveryFee: 40,
      priceForTwo: "₹600 for two",
      offer: "Free Delivery on ₹199",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
      isOpen: true,
      openingHours: "11:30 AM to 11:00 PM",
      address: "45, Heritage Chowk, Old Fort Area",
      categories: ["biryani", "chicken", "desserts"]
    },
    {
      id: "rest-4",
      name: "Tandoori Flames & Wings",
      cuisine: "Chicken, North Indian, Tandoor",
      rating: 4.7,
      ratingCount: 1650,
      deliveryTime: "25 to 30 mins",
      distance: "2.8 km",
      deliveryFee: 30,
      priceForTwo: "₹550 for two",
      offer: "20% OFF above ₹350",
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      isOpen: true,
      openingHours: "12:00 PM to 11:30 PM",
      address: "71, Spice Garden Boulevard, South Wing",
      categories: ["chicken", "biryani"]
    },
    {
      id: "rest-5",
      name: "Dragon Wok Pan Asian",
      cuisine: "Chinese, Asian, Noodles",
      rating: 4.6,
      ratingCount: 980,
      deliveryTime: "25 to 30 mins",
      distance: "2.1 km",
      deliveryFee: 25,
      priceForTwo: "₹450 for two",
      offer: "15% OFF on all orders",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=80",
      isOpen: true,
      openingHours: "11:00 AM to 10:30 PM",
      address: "19, Silk Route Complex, East End",
      categories: ["chinese"]
    },
    {
      id: "rest-6",
      name: "Taco Fiesta Cantina",
      cuisine: "Mexican, Tacos, Burritos",
      rating: 4.8,
      ratingCount: 1120,
      deliveryTime: "30 to 35 mins",
      distance: "3.2 km",
      deliveryFee: 35,
      priceForTwo: "₹500 for two",
      offer: "Free Nachos on ₹400+",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=1200&q=80",
      isOpen: true,
      openingHours: "12:00 PM to 11:00 PM",
      address: "88, Sunset Strip, Commercial Hub",
      categories: ["mexican", "beverages"]
    },
    {
      id: "rest-7",
      name: "The Green Bowl Organics",
      cuisine: "Healthy Food, Salads, Smoothies",
      rating: 4.9,
      ratingCount: 890,
      deliveryTime: "20 to 25 mins",
      distance: "1.5 km",
      deliveryFee: 20,
      priceForTwo: "₹450 for two",
      offer: "30% OFF First Order",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
      isOpen: true,
      openingHours: "8:00 AM to 10:00 PM",
      address: "04, Wellness Park, Eco Zone",
      categories: ["healthy-food", "beverages"]
    },
    {
      id: "rest-8",
      name: "Sweet Craving Bakery & Gelato",
      cuisine: "Desserts, Bakery, Ice Cream",
      rating: 4.9,
      ratingCount: 2450,
      deliveryTime: "15 to 20 mins",
      distance: "1.2 km",
      deliveryFee: 20,
      priceForTwo: "₹350 for two",
      offer: "Flat 20% OFF",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=80",
      isOpen: true,
      openingHours: "9:00 AM to 12:00 AM",
      address: "27, Baker Street Corner, Market Yard",
      categories: ["desserts", "ice-cream", "beverages"]
    }
  ],

  // Promotional Coupons
  coupons: [
    {
      code: "WELCOME50",
      discountPercent: 50,
      maxDiscount: 100,
      minOrder: 199,
      description: "50% OFF up to ₹100 on orders above ₹199"
    },
    {
      code: "SAVE100",
      discountAmount: 100,
      minOrder: 399,
      description: "Flat ₹100 OFF on orders above ₹399"
    },
    {
      code: "FREEDELIVERY",
      freeDelivery: true,
      minOrder: 199,
      description: "Free Delivery on orders above ₹199"
    },
    {
      code: "FIRSTORDER",
      discountPercent: 30,
      maxDiscount: 150,
      minOrder: 249,
      description: "30% OFF up to ₹150 for new users"
    }
  ],

  // Saved Delivery Addresses
  defaultAddresses: [
    {
      id: "addr-1",
      type: "Home",
      tagIcon: "🏠",
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
      tagIcon: "💼",
      name: "Thanush Masika",
      phone: "+91 8328247714",
      street: "Tower B, 6th Floor, Cyber Heights Tech Park",
      landmark: "Near Gateway Metro Station",
      city: "Bangalore",
      pincode: "560100",
      isDefault: false
    }
  ],

  // Default User Profile
  defaultUser: {
    name: "Thanush Masika",
    email: "thanushmasika@gmail.com",
    phone: "8328247714",
    password: "Thanush@123",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    role: "customer"
  },

  // Seed sample initial order history
  defaultOrders: [
    {
      id: "FD10192",
      date: "2026-08-19 20:15",
      restaurantName: "Bella Italia Artisan Pizzeria",
      restaurantImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 249, addOns: ["Extra Mozzarella Cheese"] },
        { name: "Cold Coffee", quantity: 1, price: 149, addOns: [] }
      ],
      subtotal: 438,
      deliveryFee: 0,
      tax: 22,
      discount: 100,
      total: 360,
      status: "Delivered",
      paymentMethod: "UPI (Google Pay)",
      rating: 5,
      review: "Crispy crust and arrived piping hot! Loved it."
    },
    {
      id: "FD10185",
      date: "2026-08-15 13:40",
      restaurantName: "Royal Darbar Biryani House",
      restaurantImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
      items: [
        { name: "Chicken Biryani", quantity: 2, price: 299, addOns: ["Extra Boiled Egg (2 pcs)"] }
      ],
      subtotal: 628,
      deliveryFee: 30,
      tax: 31,
      discount: 50,
      total: 639,
      status: "Delivered",
      paymentMethod: "Credit Card",
      rating: 5,
      review: "Authentic dum spices and tender chicken."
    }
  ]
};

// ==========================================
// LOCAL STORAGE PERSISTENCE MANAGER
// ==========================================
const FoodAppStorage = {
  getFoodItems: function() {
    const saved = localStorage.getItem("food_app_items");
    if (!saved) {
      localStorage.setItem("food_app_items", JSON.stringify(FoodData.foodItems));
      return FoodData.foodItems;
    }
    return JSON.parse(saved);
  },

  getRestaurants: function() {
    const saved = localStorage.getItem("food_app_restaurants");
    if (!saved) {
      localStorage.setItem("food_app_restaurants", JSON.stringify(FoodData.restaurants));
      return FoodData.restaurants;
    }
    return JSON.parse(saved);
  },

  getCoupons: function() {
    const saved = localStorage.getItem("food_app_coupons");
    if (!saved) {
      localStorage.setItem("food_app_coupons", JSON.stringify(FoodData.coupons));
      return FoodData.coupons;
    }
    return JSON.parse(saved);
  },

  getAddresses: function() {
    const saved = localStorage.getItem("food_app_addresses");
    if (!saved) {
      localStorage.setItem("food_app_addresses", JSON.stringify(FoodData.defaultAddresses));
      return FoodData.defaultAddresses;
    }
    return JSON.parse(saved);
  },

  saveAddresses: function(addresses) {
    localStorage.setItem("food_app_addresses", JSON.stringify(addresses));
  },

  getUser: function() {
    const saved = localStorage.getItem("food_app_user");
    if (!saved) {
      localStorage.setItem("food_app_user", JSON.stringify(FoodData.defaultUser));
      return FoodData.defaultUser;
    }
    const user = JSON.parse(saved);
    if (!user.email || user.email.includes("example.com") || user.phone === "+91 98765 43210" || !user.phone.includes("8328247714")) {
      const updated = { ...FoodData.defaultUser, ...user, name: "Thanush Masika", email: "thanushmasika@gmail.com", phone: "8328247714", password: "Thanush@123" };
      localStorage.setItem("food_app_user", JSON.stringify(updated));
      return updated;
    }
    return user;
  },

  saveUser: function(user) {
    localStorage.setItem("food_app_user", JSON.stringify(user));
  },

  getOrders: function() {
    const saved = localStorage.getItem("food_app_orders");
    if (!saved) {
      localStorage.setItem("food_app_orders", JSON.stringify(FoodData.defaultOrders));
      return FoodData.defaultOrders;
    }
    return JSON.parse(saved);
  },

  saveOrders: function(orders) {
    localStorage.setItem("food_app_orders", JSON.stringify(orders));
  },

  getFavorites: function() {
    const saved = localStorage.getItem("food_app_favorites");
    if (!saved) {
      const initial = { foodIds: ["piz-1", "bir-1", "des-1"], restaurantIds: ["rest-1", "rest-3"] };
      localStorage.setItem("food_app_favorites", JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(saved);
  },

  saveFavorites: function(favs) {
    localStorage.setItem("food_app_favorites", JSON.stringify(favs));
  },

  // Reset entire database to default seeds
  resetDatabase: function() {
    localStorage.setItem("food_app_items", JSON.stringify(FoodData.foodItems));
    localStorage.setItem("food_app_restaurants", JSON.stringify(FoodData.restaurants));
    localStorage.setItem("food_app_coupons", JSON.stringify(FoodData.coupons));
    localStorage.setItem("food_app_addresses", JSON.stringify(FoodData.defaultAddresses));
    localStorage.setItem("food_app_orders", JSON.stringify(FoodData.defaultOrders));
    localStorage.setItem("food_app_user", JSON.stringify(FoodData.defaultUser));
    localStorage.setItem("food_app_cart", JSON.stringify([]));
  }
};

// Initialize Storage on first load
(function initStorage() {
  // Sync Thanush user profile in localStorage
  const savedUser = localStorage.getItem("food_app_user");
  if (!savedUser || JSON.parse(savedUser).email === "rahul.sharma@example.com" || JSON.parse(savedUser).phone === "+91 98765 43210" || JSON.parse(savedUser).phone !== "8328247714") {
    localStorage.setItem("food_app_user", JSON.stringify(FoodData.defaultUser));
  }

  FoodAppStorage.getFoodItems();
  FoodAppStorage.getRestaurants();
  FoodAppStorage.getCoupons();
  FoodAppStorage.getAddresses();
  FoodAppStorage.getUser();
  FoodAppStorage.getOrders();
  FoodAppStorage.getFavorites();
})();
