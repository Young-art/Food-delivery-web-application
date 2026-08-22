import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

const INITIAL_ORDERS = [
  {
    id: "ORD-94821",
    date: "Aug 21, 2026 • 08:30 PM",
    restaurantId: "rest-1",
    restaurantName: "La Pino'z Pizzeria",
    status: "Delivered",
    items: [
      { name: "Classic Margherita Pizza", quantity: 1, price: 249 },
      { name: "Choco Lava Molten Cake", quantity: 1, price: 149 }
    ],
    total: 398,
    address: "Flat 402, Sunshine Heights, Bangalore 560034",
    driver: { name: "Vikram S.", phone: "+91 98765 43210", vehicle: "Honda Activa" },
    rating: 5,
    review: "Hot, fresh and delivered well within 25 mins!"
  },
  {
    id: "ORD-83912",
    date: "Aug 19, 2026 • 01:15 PM",
    restaurantId: "rest-3",
    restaurantName: "Paradise Royal Biryani",
    status: "Delivered",
    items: [
      { name: "Hyderabadi Chicken Dum Biryani", quantity: 2, price: 299 }
    ],
    total: 628,
    address: "Tower B, Cyber Heights, Bangalore 560100",
    driver: { name: "Rahul M.", phone: "+91 98123 45678", vehicle: "TVS Jupiter" },
    rating: 5,
    review: "Authentic Hyderabadi flavor and aroma!"
  }
];

export const ORDER_STAGES = [
  "Order Placed",
  "Restaurant Accepted",
  "Food Being Prepared",
  "Out for Delivery",
  "Delivered"
];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('food_app_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [activeOrder, setActiveOrder] = useState(() => {
    const saved = localStorage.getItem('food_app_active_order');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('food_app_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (activeOrder) {
      localStorage.setItem('food_app_active_order', JSON.stringify(activeOrder));
    } else {
      localStorage.removeItem('food_app_active_order');
    }
  }, [activeOrder]);

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' • ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "Order Placed",
      stageIndex: 0,
      driver: { name: "Vikram S.", phone: "+91 98765 43210", vehicle: "Honda Activa" },
      ...orderDetails
    };

    setActiveOrder(newOrder);
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const advanceActiveOrderStage = () => {
    if (!activeOrder) return;
    const currentIdx = ORDER_STAGES.indexOf(activeOrder.status);
    if (currentIdx < ORDER_STAGES.length - 1) {
      const nextStatus = ORDER_STAGES[currentIdx + 1];
      const updated = { ...activeOrder, status: nextStatus, stageIndex: currentIdx + 1 };
      setActiveOrder(updated);
      setOrders(prev => prev.map(o => o.id === activeOrder.id ? updated : o));
      return nextStatus;
    }
    return activeOrder.status;
  };

  const addOrderRating = (orderId, rating, reviewText) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, rating, review: reviewText } : o));
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder(prev => ({ ...prev, rating, review: reviewText }));
    }
  };

  return (
    <OrderContext.Provider value={{
      orders,
      activeOrder,
      placeOrder,
      advanceActiveOrderStage,
      addOrderRating,
      setActiveOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
