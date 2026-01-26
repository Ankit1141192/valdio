import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "cart";

function safeParseCart(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch {
    return {};
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => safeParseCart(localStorage.getItem(STORAGE_KEY)));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (productId, qty = 1) => {
    setItems((prev) => {
      const next = { ...prev };
      next[productId] = (next[productId] || 0) + qty;
      return next;
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const setQty = (productId, qty) => {
    const safeQty = Math.max(1, Number(qty) || 1);
    setItems((prev) => ({ ...prev, [productId]: safeQty }));
  };

  const clearCart = () => setItems({});

  const count = useMemo(
    () => Object.values(items).reduce((sum, n) => sum + (Number(n) || 0), 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, setQty, clearCart, count }),
    [items, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


