import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <section className="relative mt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-sm bg-gray-100">
          {/* Image */}
          <img
            src={active.image}
            alt={active.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
          <div className="absolute inset-0 bg-white/10" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 sm:px-10 max-w-xl text-white font-[Poppins]">
              <p className="text-xs sm:text-sm uppercase tracking-wider text-white/85">
                {active.eyebrow}
              </p>
              <h1 className="mt-2 text-4xl sm:text-5xl font-bold leading-tight">
                {active.title}
              </h1>
              <p className="mt-3 text-base sm:text-lg text-white/90">
                {active.subtitle}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <Link
                  to={active.ctaLink}
                  className="inline-flex items-center justify-center bg-white text-gray-900 px-5 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                >
                  {active.ctaText}
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center bg-black/30 border border-white/30 px-5 py-3 rounded-xl font-semibold hover:bg-black/40 transition"
                >
                  View Products
                </Link>
              </div>
            </div>
          </div>

          {/* Controls */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white flex items-center justify-center shadow"
          >
            <ChevronLeft className="w-5 h-5 text-gray-900" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white flex items-center justify-center shadow"
          >
            <ChevronRight className="w-5 h-5 text-gray-900" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === idx ? "w-8 bg-white" : "w-2.5 bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
