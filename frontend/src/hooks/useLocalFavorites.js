import { useState, useEffect } from "react";

// Custom Hook for persistent favorites using localStorage
export default function useLocalFavorites(key = "favorites") {
  // Load from localStorage or initialize empty Set
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify([...favorites]));
  }, [favorites, key]);

  // Toggle favorite (add/remove)
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Helper to clear all favorites
  const clearFavorites = () => setFavorites(new Set());

  return { favorites, toggleFavorite, clearFavorites };
}
