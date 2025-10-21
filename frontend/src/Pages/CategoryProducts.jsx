import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import products from "../config/Product.json";
import ProductCard from "../components/ProductCard";

// https://rjnshops-a9bf3-default-rtdb.firebaseio.com/
const CategoryProducts = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // Filter products by category
  const filteredProducts = products.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  // Navigate to product details page
  const handleProductClick = (id) => {
    navigate(`/products/${id}`); // ✅ route to product details
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 capitalize">
            {category} Products
          </h2>
          <p className="text-gray-600 mt-2">
            Showing {filteredProducts.length} product(s) in {category}.
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                <ProductCard
                  product={product}
                  favorites={new Set()}
                  toggleFavorite={() => {}}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No products found for this category.
          </p>
        )}

        {/* Back Button */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryProducts;
