import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import products from "../config/Product.json";
import categories from "../config/categories";
import useLocalFavorites from "../hooks/useLocalFavorites";
import { useCart } from "../context/CartContext";

const ITEMS_PER_PAGE = 16;

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites, toggleFavorite } = useLocalFavorites("favorites");
  const { addToCart } = useCart();

  // Separate refs for desktop and mobile category scrolls
  const desktopCategoryRef = useRef(null);
  const mobileCategoryRef = useRef(null);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState("name");
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Sync filter states with URL params
  useEffect(() => {
    const q = searchParams.get("search") || "";
    const cat = searchParams.get("category") || "";
    setSearch(q);
    setCategoryFilter(cat);
    if (q || cat) setCurrentPage(1);
  }, [searchParams]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  /* ================= FILTER + SORT ================= */
  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Only filter when a category is actually selected
    if (categoryFilter !== "") {
      data = data.filter((p) => p.category === categoryFilter);
    }

    data = data.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sort === "price") data.sort((a, b) => a.price - b.price);
    if (sort === "rating") data.sort((a, b) => b.rating - a.rating);
    if (sort === "name") data.sort((a, b) => a.name.localeCompare(b.name));

    return data;
  }, [search, categoryFilter, sort, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ================= SCROLL HELPERS ================= */
  const scrollDesktop = (dir) => {
    if (!desktopCategoryRef.current) return;
    desktopCategoryRef.current.scrollLeft += dir === "left" ? -240 : 240;
  };

  const scrollMobile = (dir) => {
    if (!mobileCategoryRef.current) return;
    mobileCategoryRef.current.scrollLeft += dir === "left" ? -200 : 200;
  };

  /* ================= SHARED CATEGORY HANDLER ================= */
  const handleCategorySelect = (value) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  /* ================= ACTIVE FILTERS ================= */
  const hasActiveFilters =
    search !== "" ||
    categoryFilter !== "" ||
    sort !== "name" ||
    priceRange[0] > 0 ||
    priceRange[1] < 10000;

  const clearAllFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setSort("name");
    setPriceRange([0, 10000]);
    setCurrentPage(1);
  };

  /* ================= REUSABLE: CATEGORY PILL ================= */
  const CategoryPill = ({ cat, isAll = false, size = "lg" }) => {
    const isActive = isAll
      ? categoryFilter === ""
      : categoryFilter === cat.key;

    const dim = size === "lg" ? "w-20 h-20" : "w-16 h-16";

    return (
      <button
        onClick={() => handleCategorySelect(isAll ? "" : cat.key)}
        className="flex flex-col items-center min-w-max group"
      >
        <div
          className={`${dim} rounded-full overflow-hidden border-2 flex items-center justify-center transition-all group-hover:shadow-md
            ${isActive
              ? "border-blue-600 shadow-md bg-blue-50"
              : "border-gray-200 bg-gray-50 group-hover:border-gray-300"
            }`}
        >
          {isAll ? (
            <span
              className={`font-semibold ${size === "lg" ? "text-sm" : "text-xs"
                } ${isActive ? "text-blue-600" : "text-gray-700"}`}
            >
              All
            </span>
          ) : (
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect fill='%23f0f0f0' width='80' height='80'/%3E%3Ctext x='50%25' y='50%25' font-size='12' text-anchor='middle' dominant-baseline='middle' fill='%23999'%3E" +
                  cat.name.slice(0, 2) +
                  "%3C/text%3E%3C/svg%3E";
              }}
            />
          )}
        </div>
        <span
          className={`mt-2 text-gray-700 font-medium text-center ${size === "lg" ? "text-xs max-w-[80px]" : "text-xs max-w-[64px]"
            }`}
        >
          {isAll ? "All Products" : cat.name}
        </span>
      </button>
    );
  };

  /* ================= REUSABLE: VIEW-ALL BUTTON ================= */
  const ViewAllButton = ({ size = "lg" }) => {
    const dim = size === "lg" ? "w-20 h-20" : "w-16 h-16";
    const iconSize = size === "lg" ? 24 : 20;

    return (
      <button
        onClick={() => navigate("/categories")}
        className="flex flex-col items-center min-w-max group"
        title="View all categories"
      >
        <div
          className={`${dim} rounded-full flex items-center justify-center border-2 border-gray-200 bg-gray-50 text-gray-600 group-hover:border-blue-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all group-hover:shadow-md`}
        >
          <MoreHorizontal size={iconSize} />
        </div>
        <span
          className={`mt-2 text-gray-700 font-medium text-center ${size === "lg" ? "text-xs max-w-[80px]" : "text-xs max-w-[64px]"
            }`}
        >
          View All
        </span>
      </button>
    );
  };

  /* ================= REUSABLE: PAGINATION ================= */
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    // Build page items: number or ellipsis, never two ellipses in a row
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      const nearCurrent = Math.abs(i - currentPage) <= 1;
      const isFirst = i === 1;
      const isLast = i === totalPages;

      if (isFirst || isLast || nearCurrent) {
        items.push({ type: "page", page: i });
      } else {
        const last = items[items.length - 1];
        if (!last || last.type !== "ellipsis") {
          items.push({ type: "ellipsis", key: `ellipsis-${i}` });
        }
      }
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-16">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage((p) => p - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors font-medium text-sm"
        >
          Previous
        </button>

        <div className="flex gap-1">
          {items.map((item) =>
            item.type === "ellipsis" ? (
              <span key={item.key} className="px-2 py-2 text-gray-400 select-none">
                ...
              </span>
            ) : (
              <button
                key={item.page}
                onClick={() => {
                  setCurrentPage(item.page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-10 h-10 rounded-lg border text-sm font-medium transition-all
                  ${currentPage === item.page
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {item.page}
              </button>
            )
          )}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => {
            setCurrentPage((p) => p + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors font-medium text-sm"
        >
          Next
        </button>
      </div>
    );
  };

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== STICKY FILTER NAVBAR ========== */}
      <div className="sticky top-0 z-30 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-3 md:gap-0">

            {/* --- Search + Desktop Controls --- */}
            <div className="flex gap-2 md:gap-4 items-center">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>

              {/* Desktop: sort + view toggle */}
              <div className="hidden md:flex gap-2 items-center">
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 px-3 py-2.5 rounded-lg text-sm bg-white hover:bg-gray-50 transition-colors"
                >
                  <option value="name">Name</option>
                  <option value="price">Price: Low to High</option>
                  <option value="rating">Highest Rated</option>
                </select>

                <div className="flex gap-1 border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2 rounded transition-all ${view === "grid"
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                    title="Grid view"
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2 rounded transition-all ${view === "list"
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                    title="List view"
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>

              {/* Mobile: filter toggle button with active dot */}
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="md:hidden relative flex items-center gap-2 px-3 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
              >
                <Filter size={18} />
                <span className="text-sm">Filters</span>
                {hasActiveFilters && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
                )}
              </button>
            </div>

            {/* --- Mobile: sort + view toggle --- */}
            <div className="md:hidden flex gap-2 items-center">
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 px-3 py-2 rounded-lg text-xs bg-white flex-1"
              >
                <option value="name">Sort: Name</option>
                <option value="price">Sort: Price</option>
                <option value="rating">Sort: Rating</option>
              </select>

              <div className="flex gap-1 border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`p-1.5 rounded ${view === "grid" ? "bg-blue-500 text-white" : "text-gray-600"
                    }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-1.5 rounded ${view === "list" ? "bg-blue-500 text-white" : "text-gray-600"
                    }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* --- Mobile: expandable price range --- */}
            {mobileFiltersOpen && (
              <div className="md:hidden flex flex-col gap-3 pt-3 border-t">
                <label className="text-sm font-medium text-gray-700">
                  Price Range: ₹{priceRange[0]} – ₹{priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}

            {/* --- Active filters bar with individual pills --- */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 text-sm pt-1">
                <span className="text-gray-500">Active filters:</span>

                {categoryFilter !== "" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {categories.find((c) => c.key === categoryFilter)?.name ||
                      categoryFilter}
                    <button onClick={() => handleCategorySelect("")}>
                      <X size={12} className="text-gray-500 hover:text-gray-700" />
                    </button>
                  </span>
                )}

                {search !== "" && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    "{search}"
                    <button
                      onClick={() => {
                        setSearch("");
                        setCurrentPage(1);
                      }}
                    >
                      <X size={12} className="text-gray-500 hover:text-gray-700" />
                    </button>
                  </span>
                )}

                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors ml-auto"
                >
                  Clear all <X size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="max-w-7xl mx-auto px-4 pb-16">

        {/* ---- DESKTOP CATEGORY ROW (md+) ---- */}
        <div className="relative my-8 hidden md:block">
          <button
            onClick={() => scrollDesktop("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:shadow-lg transition-shadow"
            aria-label="Scroll categories left"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={desktopCategoryRef}
            className="flex gap-4 px-12 overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <CategoryPill isAll size="lg" />
            {categories.slice(0, 15).map((cat) => (
              <CategoryPill key={cat.key} cat={cat} size="lg" />
            ))}
            <ViewAllButton size="lg" />
          </div>

          <button
            onClick={() => scrollDesktop("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:shadow-lg transition-shadow"
            aria-label="Scroll categories right"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* ---- MOBILE CATEGORY ROW (below md) ---- */}
        <div className="relative my-6 md:hidden">
          <button
            onClick={() => scrollMobile("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center"
            aria-label="Scroll categories left"
          >
            <ChevronLeft size={16} />
          </button>

          <div
            ref={mobileCategoryRef}
            className="flex gap-3 px-10 overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <CategoryPill isAll size="sm" />
            {categories.slice(0, 15).map((cat) => (
              <CategoryPill key={cat.key} cat={cat} size="sm" />
            ))}
            <ViewAllButton size="sm" />
          </div>

          <button
            onClick={() => scrollMobile("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center"
            aria-label="Scroll categories right"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* ---- RESULT COUNT ---- */}
        <p className="text-sm text-gray-500 mb-4">
          Showing{" "}
          {/* <span className="font-semibold text-gray-700">
            {paginatedProducts.length}
          </span>{" "}
          of{" "} */}
          <span className="font-semibold text-gray-700">
            {filteredProducts.length}
          </span>{" "}
          products
          {categoryFilter !== "" && (
            <span className="text-gray-600">
              {" "}in{" "}
              <span className="font-medium">
                {categories.find((c) => c.key === categoryFilter)?.name ||
                  categoryFilter}
              </span>
            </span>
          )}
        </p>

        {/* ---- NO RESULTS ---- */}
        {paginatedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            {/* ---- PRODUCT GRID / LIST ---- */}
            <div
              className={
                view === "grid"
                  ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  onClick={() => navigate(`/products/${product.id}`)}
                  onAddToCart={() => addToCart(product.id, 1)}
                />
              ))}
            </div>

            {/* ---- PAGINATION ---- */}
            {renderPagination()}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
