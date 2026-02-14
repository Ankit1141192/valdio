import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../config/Product.json";
import { Heart, Star, ArrowLeft, Truck, ShieldCheck, CheckCircle } from "lucide-react";
import useLocalFavorites from "../hooks/useLocalFavorites";
import { useCart } from "../context/CartContext.jsx";
import AddToCartButton from "../components/AddToCartButton";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useLocalFavorites("favorites");
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const found = products.find((p) => p.id === id);
    setProduct(found || null);
    if (found?.colors) setSelectedColor(found.colors[0]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-black text-slate-400">Product not found</p>
      </div>
    );
  }

  const isFavorited = favorites.has(product.id);

  const originalPrice = product.price;
  const discountedPrice = product.discountPrice ?? product.price;

  const discountPercentage =
    originalPrice > discountedPrice
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : 0;

  const similarProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    alert(`${product.name} added to cart`);
  };

  const handleBuyNow = () => window.open(product.fullLink, "_blank");

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

              <button
                onClick={() => toggleFavorite(product.id)}
                className={`absolute top-8 right-8 w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center transition-all ${
                  isFavorited
                    ? "text-rose-500"
                    : "text-slate-300 hover:text-rose-500"
                }`}
              >
                <Heart size={26} className={isFavorited ? "fill-current" : ""} />
              </button>
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
