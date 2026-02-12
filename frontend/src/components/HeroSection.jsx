import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import homeData from "../config/homeData.json";

const HeroSection = () => {
  const slides = useMemo(() => homeData.heroSlides || [], []);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  const active = slides[idx];
  if (!active) return null;

  const prev = () => setIdx((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setIdx((p) => (p + 1) % slides.length);

  return (
    <section className="relative overflow-hidden pt-4 pb-8 sm:pt-4 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[480px] sm:h-[600px] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-2xl">
          {/* Background Images with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={active.image}
                alt={active.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
              {/* Refined Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />
              <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
            </motion.div>
          </AnimatePresence>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 sm:px-16 max-w-2xl text-white">
              <motion.div
                key={`content-${idx}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-primary mb-4 drop-shadow-sm">
                  {active.eyebrow}
                </p>
                <h1 className="text-4xl sm:text-6xl font-bold leading-[1.1] mb-6 font-display">
                  {active.title.split(' ').map((word, i) => (
                    <span key={i} className={i === active.title.split(' ').length - 1 ? "text-white" : "text-white/90"}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
                <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-lg leading-relaxed font-light">
                  {active.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-5">
                  <Link
                    to={active.ctaLink}
                    className="btn-primary flex items-center gap-2 group shadow-2xl shadow-primary/40 px-8 py-4"
                  >
                    <span>{active.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/products"
                    className="btn-premium bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 transition-all duration-300"
                  >
                    Explore All
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Controls - Refined */}
          <div className="absolute bottom-10 right-10 hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              className="w-12 h-12 rounded-full glass hover:bg-white text-slate-900 flex items-center justify-center transition-all duration-300 active:scale-90"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={next}
              className="w-12 h-12 rounded-full glass hover:bg-white text-slate-900 flex items-center justify-center transition-all duration-300 active:scale-90"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Indicator Dots */}
          <div className="absolute bottom-10 left-10 sm:left-16 flex items-center gap-3">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIdx(i)}
                className="group relative py-2"
              >
                <div className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? "w-10 bg-primary" : "w-4 bg-white/40 group-hover:bg-white/60"
                  }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
