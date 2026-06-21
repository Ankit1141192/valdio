import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../config/Product.json";
import { Heart, Star, ArrowLeft, Truck, ShieldCheck, CheckCircle } from "lucide-react";
import useLocalFavorites from "../hooks/useLocalFavorites";
import { useCart } from "../context/CartContext.jsx";
import AddToCartButton from "../components/AddToCartButton";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext.jsx";
import ShareIcon from "../assets/share.svg";

const WhatsAppIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useLocalFavorites("favorites");
  const { addToCart } = useCart();
  const { API, token } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showImgShareMenu, setShowImgShareMenu] = useState(false);
  const [showInlineShareMenu, setShowInlineShareMenu] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Try to find the product in the local static list immediately
    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct(found);
      if (found.colors) setSelectedColor(found.colors[0]);
      setLoading(false);
    } else {
      setLoading(true);
    }

    // Fetch updated details from API silently in the background
    fetch(`${API}/products/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data) {
          setProduct(d.data);
          if (d.data.colors) setSelectedColor(d.data.colors[0]);
        }
      })
      .catch((err) => {
        console.warn("API load failed, using local product data:", err);
      })
      .finally(() => {
        if (!found) setLoading(false);
      });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 rounded-full border-3 border-slate-200 border-t-blue-500 animate-spin" />
        <span className="ml-3 text-slate-400 text-sm font-bold">Loading details…</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-black text-slate-400">Product not found</p>
      </div>
    );
  }

  const isFavorited = favorites.has(product.id || product._id);

  const originalPrice = product.price;
  const discountedPrice = product.discountPrice ?? product.price;

  const discountPercentage =
    originalPrice > discountedPrice
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : 0;

  const similarProducts = products.filter(
    (p) => p.category === product.category && p.id !== (product.id || product._id)
  );

  const handleAddToCart = () => {
    addToCart(product.id || product._id, 1);
    alert(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    const targetUrl = product.shortLink || product.fullLink || (token
      ? `${API}/track/${product._id || product.id}?token=${token}`
      : `${API}/track/${product._id || product.id}`);
    window.open(targetUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-slate-400 hover:text-primary mb-12"
        >
          <ArrowLeft size={14} />
          Back to products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT */}
          <div className="space-y-8">
            <div className="relative aspect-[4/5] bg-slate-50 rounded-[2.5rem] p-12 flex items-center justify-center overflow-hidden border border-slate-100">
              <img
                src={selectedColor?.image || product.image}
                alt={product.name}
                className="max-h-full object-contain transition-transform duration-700 hover:scale-110"
              />

              {discountPercentage > 0 && (
                <span className="absolute top-8 left-8 bg-rose-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full">
                  {discountPercentage}% OFF
                </span>
              )}

              <div 
                className="absolute top-8 right-8 flex flex-col gap-3 z-10"
                onMouseLeave={() => setShowImgShareMenu(false)}
              >
                <button
                  type="button"
                  onClick={() => toggleFavorite(product.id)}
                  className={`w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center transition-all ${
                    isFavorited
                      ? "text-rose-500"
                      : "text-slate-300 hover:text-rose-500"
                  }`}
                >
                  <Heart size={26} className={isFavorited ? "fill-current" : ""} />
                </button>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowImgShareMenu(!showImgShareMenu)}
                    className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center transition-all text-slate-400 hover:text-primary hover:scale-105 active:scale-95 cursor-pointer"
                    title="Share Product"
                  >
                    <img src={ShareIcon} alt="Share" className="w-5 h-5" />
                  </button>

                  {showImgShareMenu && (
                    <div className="absolute right-16 top-0 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 px-2.5 z-20 flex flex-col gap-1.5 min-w-[150px] animate-in fade-in slide-in-from-right-2 duration-200">
                      {/* Copy Link Option */}
                      <button
                        type="button"
                        onClick={() => {
                          handleCopyLink();
                          setTimeout(() => setShowImgShareMenu(false), 1200);
                        }}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-all w-full text-left cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <CheckCircle size={14} className="text-emerald-500" />
                            <span className="text-emerald-600">Link Copied!</span>
                          </>
                        ) : (
                          <>
                            <span className="text-sm">🔗</span>
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>

                      {/* WhatsApp Option */}
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                          `Check out this awesome product: ${product.name} - ${window.location.href}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowImgShareMenu(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-all w-full text-left cursor-pointer"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:sticky lg:top-32">

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-200"
                  }`}
                />
              ))}
              <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">
                {product.rating} Rating
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl xl:text-5xl font-black text-slate-900 mb-8">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-end gap-6 mb-12">
              <div className="flex items-center gap-4">
                {discountPercentage > 0 && (
                  <span className="text-lg text-slate-400 line-through font-medium">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-5xl font-black text-slate-950">
                  ₹{discountedPrice.toLocaleString()}
                </span>
              </div>

              {discountPercentage > 0 && (
                <span className="px-4 py-1.5 text-[11px] font-black rounded-full bg-rose-50 text-rose-500 border border-rose-100">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-slate-600 leading-relaxed mb-16">
              {product.description}
            </p>

            {/* Actions */}
            <div className="pt-10 border-t border-slate-100 space-y-6">
              {/* Cashback Promo Banner */}
              <div className="flex items-center gap-3 p-4 bg-emerald-50/60 border border-emerald-100/80 rounded-2xl">
                <span className="text-xl">💰</span>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Cashback Eligible: <span className="text-emerald-600 font-black text-sm">Earn ₹{Math.round((product.discountPrice ?? product.price) * 0.05)}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                    Automatically credited to your wallet upon checkout from {product.partner || "Amazon"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <AddToCartButton onClick={handleAddToCart} />
                </div>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-white font-black text-[11px] tracking-[0.3em] uppercase shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Secure Checkout ↗
                </button>
              </div>

              {/* Share Product */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">
                  Share Product
                </span>
                <div 
                  className="relative"
                  onMouseLeave={() => setShowInlineShareMenu(false)}
                >
                  <button
                    onClick={() => setShowInlineShareMenu(!showInlineShareMenu)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-primary hover:border-primary transition-all duration-300 font-bold text-xs hover:scale-105 active:scale-95 bg-white cursor-pointer"
                  >
                    <img src={ShareIcon} alt="Share" className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>

                  {showInlineShareMenu && (
                    <div className="absolute right-0 bottom-full mb-2 bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 px-2 z-20 flex flex-col gap-1 min-w-[150px] animate-in fade-in slide-in-from-bottom-2 duration-200">
                      {/* Copy Link Option */}
                      <button
                        onClick={() => {
                          handleCopyLink();
                          setTimeout(() => setShowInlineShareMenu(false), 1200);
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-all w-full text-left cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <CheckCircle size={14} className="text-emerald-500" />
                            <span className="text-emerald-600">Link Copied!</span>
                          </>
                        ) : (
                          <>
                            <span className="text-sm">🔗</span>
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>

                      {/* WhatsApp Option */}
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                          `Check out this awesome product: ${product.name} - ${window.location.href}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowInlineShareMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-all w-full text-left cursor-pointer"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-32 pt-24 border-t border-slate-100">
            <h2 className="text-3xl font-black mb-12">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {similarProducts.slice(0, 4).map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  onClick={() => navigate(`/products/${item.id}`)}
                  onAddToCart={() => addToCart(item.id, 1)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* TRUST UI (IMPROVED) */}
      <div className="mt-24 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <Truck className="w-6 h-6 text-slate-500" />
            <span className="text-[11px] font-black tracking-widest uppercase text-slate-500">
              Free Shipping
            </span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-slate-500" />
            <span className="text-[11px] font-black tracking-widest uppercase text-slate-500">
              1 Year Warranty
            </span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <CheckCircle className="w-6 h-6 text-slate-500" />
            <span className="text-[11px] font-black tracking-widest uppercase text-slate-500">
              In Stock & Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
