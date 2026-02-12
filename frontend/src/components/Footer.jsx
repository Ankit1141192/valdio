import { Github, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] text-slate-400 border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        {/* Main Grid: 12-column structure for precise senior-level control */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 lg:gap-x-8 mb-24">

          {/* Brand Pillar: Spanning 4 columns */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="space-y-8">
              <Link to="/" className="inline-block transition-transform duration-500 hover:scale-[1.02] active:scale-[0.98]">
                <img
                  src={logo}
                  alt="Valdio Logo"
                  className="h-24 sm:h-28 w-auto object-contain -ml-3"
                />
              </Link>
              <p className="max-w-sm text-[15px] leading-relaxed text-slate-500 font-medium tracking-tight">
                Superior curation for the modern connoisseur. Valdio International navigates the global boutique landscape to deliver unfiltered excellence directly to your collective.
              </p>
            </div>

            <div className="flex gap-4 mt-10">
              {[Twitter, Instagram, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="footer-social-link w-10 h-10 border border-white/[0.05] flex items-center justify-center rounded-lg hover:bg-white/5 hover:border-white/10 transition-all duration-300"
                >
                  <Icon size={18} strokeWidth={1.5} className="text-slate-500 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer for structural airiness */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Navigation Pillars: Clean, structured lists */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-white text-[11px] font-bold uppercase tracking-[0.25em] opacity-50">Boutique</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-[14px] hover:text-white transition-colors">Home Experience</Link></li>
              <li><Link to="/products" className="text-[14px] hover:text-white transition-colors">The Collection</Link></li>
              <li><Link to="/stories" className="text-[14px] hover:text-white transition-colors">Brand Narratives</Link></li>
              <li><Link to="/pricing" className="text-[14px] hover:text-white transition-colors">Elite Status</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-white text-[11px] font-bold uppercase tracking-[0.25em] opacity-50">Concierge</h3>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-[14px] hover:text-white transition-colors">Global Support</Link></li>
              <li><Link to="/faq" className="text-[14px] hover:text-white transition-colors">Resource Center</Link></li>
              <li><Link to="/privacy-policy" className="text-[14px] hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/disclosure" className="text-[14px] hover:text-white transition-colors">Affiliate Terms</Link></li>
            </ul>
          </div>

          {/* Subscription Pillar: Minimalist high-conversion design */}
          <div className="lg:col-span-3 space-y-8">
            <h3 className="text-white text-[11px] font-bold uppercase tracking-[0.25em] opacity-50">The Registry</h3>
            <div className="space-y-6">
              <p className="text-[13px] leading-relaxed text-slate-500">
                Join our private newsletter for early access to curated collections and institutional updates.
              </p>
              <form className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Digital Address"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-[14px] focus:outline-none focus:border-white/40 transition-colors placeholder:text-slate-700 text-white"
                />
                <button
                  type="submit"
                  className="absolute right-0 text-[11px] font-bold uppercase tracking-widest text-white hover:text-primary transition-colors pb-1"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Institutional quality assurance */}
        <div className="pt-12 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-700">
              © {currentYear} Valdio International
            </span>
            <div className="hidden md:block w-px h-3 bg-white/5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-700">
              Curated Globally — Secured Instantly
            </span>
          </div>

          <div className="flex gap-10 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-800">
            <span className="flex items-center gap-2 select-none active:text-primary transition-colors">
              <div className="w-1 h-1 bg-green-500/40 rounded-full" /> Verified Partner
            </span>
            <span className="select-none active:text-primary transition-colors">
              AES-256 SECURED
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
