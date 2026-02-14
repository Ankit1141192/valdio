import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="cta"
      className="py-28 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Ambient Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[45rem] h-[45rem] bg-blue-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[45rem] h-[45rem] bg-purple-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-12 md:p-20 text-center shadow-[0_40px_120px_rgba(0,0,0,0.6)]">

          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight text-white leading-[1.1]">
            Elevate Your Lifestyle with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Premium Selections
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-14 font-medium leading-relaxed">
            Discover a handpicked collection of world-class products crafted for
            those who demand distinction, quality, and innovation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => navigate("/products")}
              className="group px-10 py-5 bg-white text-slate-950 rounded-full font-bold text-lg
              transition-all duration-300 hover:scale-105
              hover:shadow-[0_0_40px_rgba(255,255,255,0.35)]
              active:scale-95 flex items-center gap-3"
            >
              Explore Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="px-10 py-5 rounded-full font-bold text-lg
              text-white border border-white/20
              transition-all duration-300 hover:bg-white/10 hover:border-white/30 active:scale-95"
            >
              Contact Support
            </button>
          </div>

          <div className="mt-20 pt-12 border-t border-white/10 flex flex-wrap justify-center gap-12">
            {["SECURE PAYMENTS", "WORLDWIDE SHIPPING", "24/7 SUPPORT"].map(
              (item) => (
                <span
                  key={item}
                  className="text-xs font-bold tracking-[0.25em] text-slate-400"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
