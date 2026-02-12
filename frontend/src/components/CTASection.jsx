import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // import useNavigate

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="cta"
      className="py-24 relative overflow-hidden bg-[#0f172a]"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-12 md:p-20 text-center shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight text-white leading-[1.1]">
            Elevate Your Lifestyle with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Premium Selections
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Discover a handpicked collection of world-class products designed for those who refuse to settle. Quality, style, and innovation in every choice.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => navigate("/products")}
              className="group relative px-10 py-5 bg-white text-slate-950 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95 flex items-center gap-3"
            >
              Explore Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="px-10 py-5 bg-transparent border border-white/10 text-white rounded-full font-bold text-lg transition-all duration-300 hover:bg-white/5 hover:border-white/20 active:scale-95"
            >
              Contact Support
            </button>
          </div>

          <div className="mt-16 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-12 opacity-40">
            <span className="text-sm font-bold tracking-[0.2em] text-white">SECURE PAYMENTS</span>
            <span className="text-sm font-bold tracking-[0.2em] text-white">WORLDWIDE SHIPPING</span>
            <span className="text-sm font-bold tracking-[0.2em] text-white">24/7 SUPPORT</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
