import React from "react";
import { useNavigate } from "react-router-dom";
import products from "../config/Product.json";
import { Star } from "lucide-react";

const CategoriesSection = () => {
  const isDark = false;
  const navigate = useNavigate();

  // ✅ Dynamically extract unique categories
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));

  // ✅ Define category-specific icons and colors
  const categoryConfig = {
    Mobile: { icon: "📱", color: "from-blue-500 to-indigo-500" },
    Electronics: { icon: "⚡", color: "from-yellow-500 to-orange-500" },
    Fashion: { icon: "👔", color: "from-pink-500 to-red-500" },
    Home: { icon: "🏠", color: "from-green-500 to-emerald-500" },
    Beauty: { icon: "💄", color: "from-rose-500 to-pink-500" },
    Fitness: { icon: "💪", color: "from-purple-500 to-violet-500" },
    Gaming: { icon: "🎮", color: "from-indigo-500 to-cyan-500" },
    Camera: { icon: "📷", color: "from-sky-500 to-blue-500" },
    Furniture: { icon: "🛋️", color: "from-teal-500 to-emerald-500" },
    Accessories: { icon: "🎒", color: "from-amber-500 to-orange-600" },
  };

  // ✅ Create categories dynamically (default to random color/icon if not defined)
  const colorPalette = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-green-500 to-emerald-500",
    "from-yellow-500 to-orange-500",
    "from-pink-500 to-rose-500",
  ];

  const categories = uniqueCategories.map((cat, index) => {
    const config = categoryConfig[cat] || {};
    return {
      name: cat,
      icon: config.icon || "🛒",
      color: config.color || colorPalette[index % colorPalette.length],
      link: `/products/category/${encodeURIComponent(cat)}`,
      count: products.filter((p) => p.category === cat).length,
    };
  });

  // ✅ Handle category click → navigate + scroll to top
  const handleCategoryClick = (link) => {
    navigate(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      className={`py-16 ${
        isDark ? "bg-gray-900/50" : "bg-white/50"
      } backdrop-blur`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h3
            className={`text-3xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Browse by Category
          </h3>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Explore curated collections of your favorite products
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(cat.link)}
              className="group cursor-pointer transition-transform transform hover:scale-105"
            >
              <div
                className={`bg-gradient-to-br ${cat.color} p-6 rounded-2xl shadow-lg hover:shadow-2xl flex flex-col items-center justify-center relative overflow-hidden`}
              >
                {/* Glow animation on hover */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300"></div>

                <div className="text-4xl mb-3 animate-bounce">{cat.icon}</div>
                <h4 className="text-white font-semibold mb-1">{cat.name}</h4>
                <p className="text-white/80 text-sm flex items-center gap-1">
                  {cat.count} items{" "}
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
