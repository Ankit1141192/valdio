import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import products from "../config/Product.json";
import useLocalFavorites from "../hooks/useLocalFavorites";

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useLocalFavorites("favorites");

  const favoriteProducts = products.filter((p) => favorites.has(p.id));

  const itemsPerPage = 9; // Products per batch
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);

  // Load products for current page
  useEffect(() => {
    const nextProducts = favoriteProducts.slice(0, page * itemsPerPage);
    setVisibleProducts(nextProducts);
  }, [page, favoriteProducts]);

  // Throttle function
  const throttle = (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  // Infinite scroll
  const handleScroll = useCallback(
    throttle(() => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        if (visibleProducts.length < favoriteProducts.length) {
          setPage((prev) => prev + 1);
        }
      }
    }, 300),
    [visibleProducts, favoriteProducts]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-8 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">❤️ Your Favorites</h1>

      {visibleProducts.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onCardClick={() => navigate(`/products/${product.id}`)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          You haven’t added any favorites yet.
        </p>
      )}

      {visibleProducts.length < favoriteProducts.length && (
        <p className="text-center text-gray-500 mt-8">Loading more products...</p>
      )}
    </div>
  );
};

export default Favorites;
