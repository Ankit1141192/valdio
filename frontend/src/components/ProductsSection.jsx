import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import products from "../config/Product.json";
import { motion } from "framer-motion";

import useLocalFavorites from "../hooks/useLocalFavorites";
import { useCart } from "../context/CartContext.jsx";


// .env we are use  OUR_PRODUCT_API = "https://rjn-shops.onrender.com/api/products"


const ProductsSection = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useLocalFavorites("favorites");
  const { addToCart } = useCart();

  // Show only first 6 products
  const topProducts = products.slice(0, 8);

  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <section id="products" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-sky-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curation of the week</span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 leading-[1.1]"
            >
              Elite Selections <span className="text-primary italic">Just for You.</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 leading-relaxed font-medium"
            >
              Discover the most trending, high-performance products meticulously tested and curated by our experts.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 text-slate-900 font-black hover:text-primary transition-colors text-sm tracking-tight"
            >
              <span>EXPLORE ALL PRODUCTS</span>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <ArrowRight size={18} />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {topProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <ProductCard
                product={product}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                onClick={() => handleNavigate(product.id)}
                onAddToCart={() => addToCart(product.id, 1)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
