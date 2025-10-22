import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import products from "../config/Product.json";
import { Grid, List } from "lucide-react";
import useLocalFavorites from "../hooks/useLocalFavorites";

const Products = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useLocalFavorites("favorites");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [view, setView] = useState("grid");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const maxPageNumbers = 10;

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const categories = [...new Set(products.map((p) => p.category))];

  // Filter + Sort products
  const filteredProducts = products
    .filter((p) => {
      const inName = p.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const inCategory = categoryFilter ? p.category === categoryFilter : true;
      const isFav = showFavoritesOnly ? favorites.has(p.id) : true;
      return inName && inPrice && inCategory && isFav;
    })
    .sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "popularity") return b.reviews - a.reviews;
      return a.name.localeCompare(b.name);
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const startPage = Math.floor((currentPage - 1) / maxPageNumbers) * maxPageNumbers + 1;
  const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="max-w-7xl mx-auto px-4 mt-8 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-white rounded-2xl shadow-md p-6 space-y-6 border border-gray-100">
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold mb-2">Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold mb-2">Price Range (₹)</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-1/2 border rounded-lg px-2 py-1 text-sm focus:outline-none"
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-1/2 border rounded-lg px-2 py-1 text-sm focus:outline-none"
              />
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              step="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full mt-3 accent-blue-600"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategoryFilter("")}
                className={`px-3 py-1 rounded-full text-sm border ${
                  categoryFilter === ""
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    categoryFilter === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold mb-2">Sort By</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Name (A–Z)</option>
              <option value="price">Price (Low → High)</option>
              <option value="rating">Rating (High → Low)</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>

          {/* Favorites Filter */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showFavorites"
              checked={showFavoritesOnly}
              onChange={(e) => setShowFavoritesOnly(e.target.checked)}
              className="w-4 h-4 text-blue-600 accent-blue-600"
            />
            <label htmlFor="showFavorites" className="text-sm font-medium">
              Show Favorites Only ❤️
            </label>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 text-sm md:text-base">
              Showing <b>{filteredProducts.length}</b> products
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-lg border ${
                  view === "grid"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded-lg border ${
                  view === "list"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Product Grid/List */}
          {paginatedProducts.length ? (
            <div
              className={
                view === "grid"
                  ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  view={view}
                  onClick={() => navigate(`/products/${product.id}`)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-10">No products found.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8 flex-wrap items-center">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md border bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-md border ${
                    currentPage === page
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md border bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
