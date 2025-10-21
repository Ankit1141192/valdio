import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import products from "../config/Product.json";
import { ShoppingCart, Heart, Star, ArrowLeft } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [favorited, setFavorited] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  // Load product whenever ID changes
  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    setProduct(foundProduct || null);
    if (foundProduct?.colors) setSelectedColor(foundProduct.colors[0]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500 font-semibold">Product not found!</p>
      </div>
    );
  }

  const discountedPrice = product.discountPrice || product.price;

  const similarProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const handleBuyNow = () => {
    window.open(product.fullLink, "_blank");
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setFavorited((prev) => !prev);
  };

  // ✅ Back button: if no history, go to /products
  const handleBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate("/products");
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white mt-4 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium hover:underline mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>

        {/* Product Section */}
        <div className="flex flex-col md:flex-row gap-10 bg-white rounded-2xl shadow-xl p-6 md:p-10 transition hover:shadow-2xl duration-300">
          {/* Left: Image */}
          <div className="md:w-1/2 relative">
            <img
              src={selectedColor?.image || product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl shadow-lg hover:scale-[1.02] transition duration-300"
            />

            {/* Wishlist Heart */}
            <button
              onClick={toggleFavorite}
              className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                favorited
                  ? "text-red-500 animate-pulse"
                  : "text-gray-300 hover:text-red-500"
              }`}
            >
              <Heart size={24} />
            </button>
          </div>

          {/* Right: Details */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <p className="text-sm text-purple-600 font-semibold uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-snug">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600 text-sm">
                  {product.rating} ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-6">
                {product.discount && (
                  <span className="text-gray-400 line-through text-lg">
                    ₹{discountedPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
              </div>

              {/* Color Selection */}
              {product.colors && (
                <div className="mb-6">
                  <p className="text-gray-700 font-medium mb-2">Select Color:</p>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`border-2 rounded-full w-10 h-10 transition-transform duration-300 ${
                          selectedColor?.name === color.name
                            ? "border-blue-500 scale-110"
                            : "border-gray-300"
                        }`}
                        style={{
                          backgroundImage: `url(${color.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Selected:{" "}
                    <span className="font-medium text-gray-900">
                      {selectedColor?.name}
                    </span>
                  </p>
                </div>
              )}

              {/* Description */}
              <p className="text-gray-700 text-base leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 
             text-white px-7 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 
             hover:from-pink-500 hover:to-orange-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,107,53,0.5)]
             active:scale-95 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                   translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out"></span>

              <ShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="relative z-10 tracking-wide">Buy Now</span>
            </button>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Similar Products in{" "}
              <span className="text-purple-600">{product.category}</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProducts.map((item) => (
                <Link
                  to={`/products/${item.id}`}
                  key={item.id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-purple-600 transition">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                      ₹{item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
