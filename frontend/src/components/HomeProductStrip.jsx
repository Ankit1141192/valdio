import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import useLocalFavorites from "../hooks/useLocalFavorites";
import { useCart } from "../context/CartContext.jsx";

const HomeProductStrip = ({ title, subtitle, products, badgeText }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useLocalFavorites("favorites");
  const { addToCart } = useCart();

  if (!products?.length) return null;

  return (
    <section className="py-10 bg-gray-50 font-[Poppins]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            {badgeText ? (
              <div className="inline-flex items-center rounded-full bg-white border px-3 py-1 text-xs font-semibold text-gray-700">
                {badgeText}
              </div>
            ) : null}
            <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
              {title}
            </h3>
            {subtitle ? (
              <p className="mt-1 text-sm sm:text-base text-gray-600">{subtitle}</p>
            ) : null}
          </div>

          <button
            onClick={() => navigate("/products")}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline"
          >
            View all
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onClick={() => navigate(`/products/${p.id}`)}
              onAddToCart={() => addToCart(p.id, 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProductStrip;


