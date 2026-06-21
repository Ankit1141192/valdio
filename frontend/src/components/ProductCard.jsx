import React, { useState } from "react";
import { Heart, Star, ArrowUpRight, CheckCircle, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import AddToCartButton from "./AddToCartButton";
import ShareIcon from "../assets/share.svg";
import { useAuth } from "../context/AuthContext.jsx";

const ProductCard = ({
  product,
  favorites,
  toggleFavorite,
  onClick,
  onAddToCart,
}) => {
  const isFavorited = favorites?.has?.(product.id) || false;
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { API, token } = useAuth();

  const handleCopyLink = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/products/${product.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = (e) => {
    e.stopPropagation();
    setShowShareMenu(false);
    const url = `${window.location.origin}/products/${product.id}`;
    const text = encodeURIComponent(`Check out this awesome product: ${product.name} - ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    const targetUrl = product.shortLink || product.fullLink || (token
      ? `${API}/track/${product._id || product.id}?token=${token}`
      : `${API}/track/${product._id || product.id}`);
    window.open(targetUrl, "_blank");
  };

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

        {/* Hover Actions */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col gap-2 bg-gradient-to-t from-black/5 to-transparent">
          <AddToCartButton
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
          />
          <button
            type="button"
            onClick={handleBuyNow}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-black text-[10px] tracking-[0.2em] uppercase shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} />
            Buy Now
          </button>
        </div>

        {/* Actions Overlay */}
        <div 
          className="absolute top-4 right-4 flex flex-col gap-2 z-10"
          onMouseLeave={() => setShowShareMenu(false)}
        >
          {/* Favorite */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className={`w-10 h-10 rounded-full glass flex items-center justify-center transition-all ${
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

          {/* Share Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowShareMenu(!showShareMenu);
              }}
              className="w-10 h-10 rounded-full glass flex items-center justify-center transition-all text-slate-400 hover:text-primary cursor-pointer"
              title="Share Product"
            >
              <img src={ShareIcon} alt="Share" className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {showShareMenu && (
              <div 
                className="absolute right-12 top-0 bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 px-2 z-20 flex flex-col gap-1 min-w-[130px] animate-in fade-in slide-in-from-right-2 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Copy Link Option */}
                <button
                  type="button"
                  onClick={(e) => {
                    handleCopyLink(e);
                    setTimeout(() => setShowShareMenu(false), 1200);
                  }}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-all w-full text-left cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xs">🔗</span>
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                {/* WhatsApp Option */}
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-all w-full text-left cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 text-[#25D366]"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>

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
