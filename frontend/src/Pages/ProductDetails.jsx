import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import products from "../config/Product.json";
import { ShoppingCart, Heart, Star, ArrowLeft } from "lucide-react";
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
    const foundProduct = products.find((p) => p.id === id);
    setProduct(foundProduct || null);
    if (foundProduct?.colors) setSelectedColor(foundProduct.colors[0]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="text-center space-y-4">
          <p className="text-2xl text-slate-400 font-black uppercase tracking-widest">Product not found</p>
          <button onClick={() => navigate("/products")} className="btn-primary">Return to Boutique</button>
        </div>
      </div>
    );
  }

  const isFavorited = favorites.has(product.id);
  const discountedPrice = product.discountPrice || product.price;
  const similarProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const handleBuyNow = () => window.open(product.fullLink, "_blank");

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    // Alert is simple, but effective for feedback
    alert(`Successfully added ${product.name} to your cart!`);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const handleBack = () =>
    window.history.length > 2 ? navigate(-1) : navigate("/products");

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-4 mb-12 text-[10px] font-black tracking-[0.2em] uppercase">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>
          <span className="w-1 h-1 rounded-full bg-slate-200" />
          <span className="text-primary">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* Left Column: Media */}
          <div className="space-y-8">
            <div className="aspect-[4/5] bg-slate-50 rounded-[2.5rem] p-12 flex items-center justify-center relative group overflow-hidden border border-slate-100 shadow-sm">
              <img
                src={selectedColor?.image || product.image}
                alt={product.name}
                className="max-h-full w-auto object-contain transition-all duration-1000 group-hover:scale-110 drop-shadow-2xl"
              />

              {/* Product Badges */}
              <div className="absolute top-10 left-10">
                {product.discount && (
                  <span className="px-4 py-1.5 bg-rose-500 text-white text-[10px] font-black rounded-full shadow-xl shadow-rose-200 uppercase tracking-widest">
                    Save {product.discount}%
                  </span>
                )}
              </div>

              {/* Heart Action */}
              <button
                onClick={handleToggleFavorite}
                className={`absolute top-10 right-10 w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-slate-50 ${isFavorited ? "text-rose-500" : "text-slate-300 hover:text-rose-500"
                  }`}
              >
                <Heart size={26} className={isFavorited ? "fill-current" : ""} />
              </button>
            </div>

            {/* Color Gallery */}
            {product.colors && (
              <div className="flex justify-center gap-5 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all p-1.5 ${selectedColor?.name === color.name
                      ? "border-primary bg-white shadow-xl scale-110"
                      : "border-transparent opacity-40 hover:opacity-100 shadow-sm"
                      }`}
                  >
                    <img src={color.image} alt={color.name} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Narrative */}
          <div className="flex flex-col h-full lg:sticky lg:top-32">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">
                  {product.rating} Rating / {product.reviews.toLocaleString()} Reviews
                </span>
              </div>

              <h1 className="text-4xl xl:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-6 mb-12">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price</span>
                  <span className="text-5xl font-black text-slate-950">
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>
                {product.discount && (
                  <div className="flex flex-col pt-4">
                    <span className="text-xl text-slate-300 line-through font-medium italic">
                      ₹{discountedPrice.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-10 mb-16">
                <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">The Narrative</h4>
                  <p className="text-slate-600 leading-relaxed text-lg font-medium">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-12 pl-4">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Department</h4>
                    <p className="font-bold text-slate-900">{product.category}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Status</h4>
                    <p className="font-bold text-emerald-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Available for immediate dispatch
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Actions */}
            <div className="space-y-6 pt-10 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <AddToCartButton
                    onClick={handleAddToCart}
                  />
                </div>
                <button
                  onClick={handleToggleFavorite}
                  className={`w-full sm:w-[72px] h-[52px] rounded-2xl border-2 flex items-center justify-center transition-all duration-300 active:scale-95 ${isFavorited
                    ? "border-rose-500 bg-rose-50 text-rose-500 shadow-lg shadow-rose-100"
                    : "border-slate-100 text-slate-300 hover:border-rose-200 hover:text-rose-400 hover:bg-rose-50/30"
                    }`}
                  aria-label="Add to favorites"
                >
                  <Heart size={24} className={isFavorited ? "fill-current" : ""} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-8 px-6 py-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200"></div>
                  In Stock
                </div>
                <div className="w-px h-3 bg-slate-200"></div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  📦 Free Express Shipping
                </div>
                <div className="w-px h-3 bg-slate-200"></div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  🛡️ 1 Year Warranty
                </div>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-5 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all text-[11px] font-bold tracking-[0.3em] uppercase"
              >
                Secure Checkout via Partner Store ↗
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-40 pt-24 border-t border-slate-100">
            <div className="text-center md:text-left mb-16">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">You might also desire</h4>
              <h2 className="text-4xl font-black text-slate-900">Similar Selections</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {similarProducts.slice(0, 4).map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  onClick={() => {
                    navigate(`/products/${item.id}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
