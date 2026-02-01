import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search } from "lucide-react";
import categories from "../config/categories";

const AllCategories = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Filter categories based on search
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= HEADER ================= */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <ChevronLeft size={20} />
            <span className="font-medium">Back</span>
          </button>

          {/* Title */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              All Categories
            </h1>
            <p className="text-gray-600">
              Browse our complete collection of categories
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ================= CATEGORIES GRID ================= */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredCategories.length === 0 ? (
          // No Results State
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No categories found
            </h3>
            <p className="text-gray-600 mb-6">
              Try a different search term
            </p>
            <button
              onClick={() => setSearch("")}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-8">
              <p className="text-sm text-gray-600">
                Showing {filteredCategories.length} of {categories.length} categories
              </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => {
                    // Navigate to products page with category filter
                    navigate(`/products?category=${cat.key}`);
                  }}
                  className="flex flex-col items-center group"
                >
                  {/* Category Image Circle */}
                  <div className="relative mb-3 w-full">
                    <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-gray-200 group-hover:border-blue-500 transition-all shadow-sm group-hover:shadow-lg">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f0f0f0' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' font-size='14' text-anchor='middle' dominant-baseline='middle' fill='%23999'%3E" +
                            cat.name.slice(0, 2) +
                            "%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 rounded-2xl transition-colors duration-300" />
                  </div>

                  {/* Category Name */}
                  <h3 className="text-sm font-semibold text-gray-800 text-center group-hover:text-blue-600 transition-colors line-clamp-2">
                    {cat.name}
                  </h3>

                  {/* Hover Effect */}
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      View products
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Total Count */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-4">
                {search
                  ? `Found ${filteredCategories.length} categor${
                      filteredCategories.length === 1 ? "y" : "ies"
                    }`
                  : `Total ${categories.length} categories`}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllCategories;