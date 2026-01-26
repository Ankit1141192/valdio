import React from "react";
import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import products from "../config/Product.json";

import useLocalFavorites from "../hooks/useLocalFavorites";
import { useCart } from "../context/CartContext.jsx";


// .env we are use  OUR_PRODUCT_API = "https://rjn-shops.onrender.com/api/products"


const ProductsSection = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useLocalFavorites("favorites");
  const { addToCart } = useCart();

  // Show only first 6 products
  const topProducts = products.slice(0, 6);

  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <section
      id="products"
      className="py-20 bg-gray-50 dark:bg-gray-900 font-[Poppins]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-start mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-400 via-orange-300 to-red-400 rounded-full px-4 py-2 mb-4 shadow-md">
              <TrendingUp className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Hot Right Now
              </span>
            </div>

            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              My Top Picks This Week
            </h3>

            <p className="text-lg text-gray-600 dark:text-gray-300">
              These are the products I'm loving right now — tested and approved!
            </p>
          </div>

          {/* View All Products */}
          <button
            onClick={() => navigate("/products")}
            className="text-blue-600 dark:text-blue-400 underline font-semibold mt-2 hover:text-blue-800 transition"
          >
            View Products →
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topProducts.map((product) => (
            <div key={product.id}>
              <ProductCard
                product={product}          // price & discountPrice passed correctly
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                onClick={() => handleNavigate(product.id)}
                onAddToCart={() => addToCart(product.id, 1)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
