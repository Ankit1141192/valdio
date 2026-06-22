import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import homeData from "../config/homeData.json";
import { motion } from "framer-motion";

const PartnersSection = () => {
  const partners = homeData.partners || [];

  return (
    <section className="py-12 bg-slate-50/50 border-y border-slate-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-[Poppins]">
              Shop by Affiliate Partner
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-1">
              Select a partner to search exclusive curated deals and earn cashback
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, idx) => (
            <motion.div
              key={partner.name}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                to={`/products?partner=${encodeURIComponent(partner.name)}`}
                className="group relative block rounded-3xl overflow-hidden border border-slate-200/60 bg-white hover:shadow-xl transition-all duration-300 h-32"
              >
                {/* Background image / overlay */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/30 transition-colors" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 text-white">
                  <div className="self-end w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all duration-300">
                    <ArrowRight size={14} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-widest uppercase text-blue-200">
                      OFFICIAL PARTNER
                    </span>
                    <h3 className="text-base font-black tracking-tight mt-0.5">
                      {partner.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
