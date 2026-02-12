import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

const FavoritesContext = createContext(null);

const STORAGE_KEY = "favorites";

export function FavoritesProvider({ children }) {
  const [favorites, setFavoritesState] = useState(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch (error) {
      console.error("Failed to load favorites:", error);
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
  }, [favorites]);

  const toggleFavorite = useCallback((id) => {
    if (!id) return;
    setFavoritesState((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((id) => favorites.has(id), [favorites]);

  const value = useMemo(() => ({
    favorites,
    toggleFavorite,
    isFavorite,
    count: favorites.size
  }), [favorites, toggleFavorite, isFavorite]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
