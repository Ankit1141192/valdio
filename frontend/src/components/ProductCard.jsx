import React from "react";
import { Heart, Star, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({
  product,
  favorites,
  toggleFavorite,
  onClick,
  onAddToCart,
}) => {
  const isFavorited = favorites?.has?.(product.id) || false;

  const originalPrice = product.price;
  const discountedPrice = product.discountPrice ?? product.price;

  const hasDiscount = discountedPrice < originalPrice;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="premium-card group cursor-pointer relative flex flex-col h-full bg-white border border-slate-100/50 rounded-[20px]"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] rounded-[18px] overflow-hidden mb-6 bg-slate-50">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Add to Cart */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <AddToCartButton
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
          />
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center transition-all ${
            isFavorited
              ? "text-rose-500 scale-110"
              : "text-slate-400 hover:text-rose-500"
          }`}
        >
          <Heart
            className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`}
            strokeWidth={2.5}
          />
        </button>

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg">
            {Math.round(
              ((originalPrice - discountedPrice) / originalPrice) * 100
            )}
            % OFF
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold tracking-[0.1em] text-primary uppercase">
            {product.category}
          </span>

          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-bold text-slate-600">
              {product.rating}
            </span>
          </div>
        </div>

        <h4 className="text-base font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors flex-1">
          {product.name}
        </h4>

        {/* Price */}
        <div className="flex items-end justify-between mt-auto">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through font-medium">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-xl font-black text-slate-950">
              ₹{discountedPrice.toLocaleString()}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
