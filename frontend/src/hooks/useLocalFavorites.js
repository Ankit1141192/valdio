import { useFavorites } from "../context/FavoritesContext";

/**
 * Refactored Hook to consume FavoritesContext
 */
export default function useLocalFavorites() {
  const { favorites, toggleFavorite, isFavorite, count } = useFavorites();

  return {
    favorites,
    favoritesArray: [...favorites],
    favoriteCount: count,
    toggleFavorite,
    isFavorite,
    // Add other methods if needed, but these are the core ones used
  };
}
