import React from "react";
import { Heart, Star, ShoppingCart } from "lucide-react";

const ProductCard = ({ product, favorites, toggleFavorite, onClick, onAddToCart }) => {
  const isFavorited = favorites?.has?.(product.id) || false;

  const originalPrice = product.price;
  const discountedPrice = product.discountPrice || product.price;

  return (
    <div
      onClick={onClick} // navigate to product details
      className="group bg-white dark:bg-gray-900 rounded-3xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer overflow-hidden font-[Poppins] relative"
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent navigation
            toggleFavorite(product.id);
          }}
          aria-label="Add to favorites"
          className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-6 h-6 transition-colors duration-300 ${
              isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>

        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5">
        <p className="text-sm text-purple-600 font-medium mb-1">{product.category}</p>

        {/* Title */}
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {product.name}
        </h4>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-3">
          <div>
            {product.discount && (
              <span className="text-gray-400 line-through text-sm mr-1">
               ₹{discountedPrice.toLocaleString()}
              </span>
            )}
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              
               ₹{originalPrice.toLocaleString()}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full hover:shadow-lg hover:scale-110 transition-all"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
