import { useState, useEffect, useMemo, useCallback } from "react";

/**
 * Custom Hook for persistent favorites using localStorage
 * Features:
 * - Cross-tab synchronization
 * - SSR support
 * - Error handling with state
 * - Bulk operations
 * - Helper functions
 * - Memoization
 */
export default function useLocalFavorites(key = "favorites") {
  // State for favorites
  const [favorites, setFavoritesState] = useState(() => {
    // SSR Support: Check if localStorage exists
    if (typeof window === "undefined") return new Set();

    try {
      const stored = localStorage.getItem(key);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch (error) {
      console.error(`Failed to load favorites from localStorage:`, error);
      return new Set();
    }
  });

  // Error state
  const [error, setError] = useState(null);

  // Loaded state (for SSR and async loading)
  const [loaded, setLoaded] = useState(false);

  /* ================ PERSISTENCE ================ */
  // Save favorites to localStorage
  useEffect(() => {
    // Mark as loaded after first render
    setLoaded(true);

    // Skip if SSR
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(key, JSON.stringify([...favorites]));
      setError(null);
    } catch (err) {
      const errorMsg = `Failed to save favorites: ${err.message}`;
      setError(errorMsg);
      console.error(errorMsg);
    }
  }, [favorites, key]);

  /* ================ CROSS-TAB SYNC ================ */
  // Listen to storage changes from other tabs
  useEffect(() => {
    // Skip if SSR
    if (typeof window === "undefined") return;

    const handleStorageChange = (e) => {
      // Only listen for changes to our key
      if (e.key !== key) return;

      try {
        // If storage was cleared (e.newValue is null)
        if (e.newValue === null) {
          setFavoritesState(new Set());
          setError(null);
          return;
        }

        // Parse new value
        const newFavorites = new Set(JSON.parse(e.newValue));
        setFavoritesState(newFavorites);
        setError(null);
      } catch (err) {
        const errorMsg = `Failed to sync favorites from another tab: ${err.message}`;
        setError(errorMsg);
        console.error(errorMsg);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  /* ================ SINGLE OPERATIONS ================ */

  // Toggle favorite (add/remove)
  const toggleFavorite = useCallback((id) => {
    // Validate input
    if (!id || typeof id !== "string") {
      console.warn("Invalid favorite ID:", id);
      return;
    }

    setFavoritesState((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  // Add single favorite
  const addFavorite = useCallback((id) => {
    if (!id || typeof id !== "string") {
      console.warn("Invalid favorite ID:", id);
      return;
    }

    setFavoritesState((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  // Remove single favorite
  const removeFavorite = useCallback((id) => {
    if (!id || typeof id !== "string") {
      console.warn("Invalid favorite ID:", id);
      return;
    }

    setFavoritesState((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // Check if item is favorited
  const isFavorite = useCallback((id) => {
    return favorites.has(id);
  }, [favorites]);

  /* ================ BULK OPERATIONS ================ */

  // Add multiple favorites
  const addMultiple = useCallback((ids) => {
    if (!Array.isArray(ids)) {
      console.warn("addMultiple expects an array of IDs");
      return;
    }

    setFavoritesState((prev) => new Set([...prev, ...ids]));
  }, []);

  // Remove multiple favorites
  const removeMultiple = useCallback((ids) => {
    if (!Array.isArray(ids)) {
      console.warn("removeMultiple expects an array of IDs");
      return;
    }

    setFavoritesState((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      return next;
    });
  }, []);

  // Replace all favorites
  const setFavorites = useCallback((ids) => {
    if (!Array.isArray(ids)) {
      console.warn("setFavorites expects an array of IDs");
      return;
    }

    setFavoritesState(new Set(ids));
  }, []);

  /* ================ UTILITY OPERATIONS ================ */

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavoritesState(new Set());
  }, []);

  // Get favorites as array
  const favoritesArray = useMemo(() => [...favorites], [favorites]);

  // Get favorite count
  const favoriteCount = favorites.size;

  /* ================ MEMOIZED RETURN ================ */
  // Memoize return object to prevent unnecessary re-renders in child components
  const value = useMemo(
    () => ({
      // Data
      favorites,
      favoritesArray,
      favoriteCount,
      loaded,
      error,

      // Single operations
      toggleFavorite,
      addFavorite,
      removeFavorite,
      isFavorite,

      // Bulk operations
      addMultiple,
      removeMultiple,
      setFavorites,
      clearFavorites,
    }),
    [
      favorites,
      favoritesArray,
      favoriteCount,
      loaded,
      error,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      isFavorite,
      addMultiple,
      removeMultiple,
      setFavorites,
      clearFavorites,
    ]
  );

  return value;
}