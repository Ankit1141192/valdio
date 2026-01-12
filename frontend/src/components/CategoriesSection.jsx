import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Shirt,
  Gem,
  Home,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    name: "Mobiles",
    icon: Smartphone,
    color: "from-orange-500 to-amber-500",
    count: "120+ Products",
  },
  {
    name: "Electronics",
    icon: Laptop,
    color: "from-blue-500 to-cyan-500",
    count: "85+ Products",
  },
  {
    name: "Tech Gadgets",
    icon: Headphones,
    color: "from-purple-500 to-pink-500",
    count: "65+ Products",
  },
  {
    name: "Fashion",
    icon: Shirt,
    color: "from-green-500 to-emerald-500",
    count: "200+ Products",
  },
  {
    name: "Watches",
    icon: Watch,
    color: "from-slate-600 to-slate-800",
    count: "45+ Products",
  },
  {
    name: "Home Essentials",
    icon: Home,
    color: "from-rose-500 to-red-500",
    count: "90+ Products",
  },
  {
    name: "Jewelry",
    icon: Gem,
    color: "from-amber-500 to-yellow-500",
    count: "35+ Products",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between gap-4 mb-14"
        >
          <div>
            <span className="inline-flex items-center gap-1 border border-orange-400 text-orange-500 px-3 py-1 rounded-full text-sm mb-4">
              <Sparkles className="w-3 h-3" />
              Categories
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Browse by <span className="text-orange-500">Category</span>
            </h2>

            <p className="text-gray-500 max-w-xl">
              Explore curated collections of your favorite products across
              categories
            </p>
          </div>

          <Link to="/categories">
            <button className="mt-4 sm:mt-0 flex items-center gap-2 border bg-white px-5 py-2 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition">
              View All Categories
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -10 }}
              >
                <Link
                  to={`/products?category=${encodeURIComponent(
                    category.name
                  )}`}
                  className="group block bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 h-full"
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} 
                    flex items-center justify-center mb-4 
                    group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-orange-500 transition-colors">
                    {category.name}
                  </h3>

                  {/* Count */}
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    {category.count}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link to="/categories">
            <button className="inline-flex items-center gap-2 bg-white border px-8 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md hover:-translate-y-1 transition">
              Explore All Categories
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
