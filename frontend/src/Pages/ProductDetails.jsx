import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import products from "../config/Product.json";
import { ShoppingCart, Heart, Star, ArrowLeft } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));
  const [selectedColor, setSelectedColor] = useState(
    product?.colors ? product.colors[0] : null
  );

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500 font-semibold">Product not found!</p>
      </div>
    );
  }

  const discountedPrice = product.discount
    ? (product.price * (100 - product.discount)) / 100
    : product.price;

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

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white mt-4 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:underline mb-8"
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
              className="w-full h-[400px] object-cover rounded-xl shadow-lg hover:scale-[1.02] transition duration-300"
            />

            {/* Wishlist Heart */}
            <button
              onClick={toggleFavorite}
              className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                favorited
                  ? "text-red-500 animate-pulse-heart"
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
                        ? "fill-yellow-400 text-yellow-400"
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
                    ₹{product.price.toFixed(2)}
                  </span>
                )}
                <span className="text-3xl font-bold text-gray-900">
                  ₹{discountedPrice.toFixed(2)}
                </span>
              </div>

              {/* Color Selection */}
              {product.colors && (
                <div className="mb-6">
                  <p className="text-gray-700 font-medium mb-2">
                    Select Color:
                  </p>
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
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition"
            >
              <ShoppingCart className="w-5 h-5" /> Buy Now
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
                      ₹{item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.rating)
                              ? "fill-yellow-400"
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
