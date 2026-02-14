import { Github, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] text-slate-300 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 lg:gap-x-10 mb-20">

          {/* Brand */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="space-y-6">
              <Link to="/" className="inline-block">
                <img
                  src={logo}
                  alt="Valdio Logo"
                  className="h-14 sm:h-16 w-auto object-contain"
                />
              </Link>

              <p className="max-w-sm text-[14px] leading-relaxed text-slate-400 font-normal">
                Superior curation for the modern connoisseur. Valdio International
                navigates the global boutique landscape to deliver refined,
                design-led excellence.
              </p>
            </div>

            {/* Socials */}
            <div className="flex gap-4 mt-10">
              {[Twitter, Instagram, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-white/10 flex items-center justify-center rounded-md
                  hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <Icon size={16} className="text-slate-400 hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1" />

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-white text-[11px] font-bold uppercase tracking-widest">
              Boutique
            </h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-[14px] text-slate-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-[14px] text-slate-400 hover:text-white transition-colors">Collection</Link></li>
              <li><Link to="/stories" className="text-[14px] text-slate-400 hover:text-white transition-colors">Stories</Link></li>
              <li><Link to="/pricing" className="text-[14px] text-slate-400 hover:text-white transition-colors">Membership</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-white text-[11px] font-bold uppercase tracking-widest">
              Concierge
            </h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-[14px] text-slate-400 hover:text-white transition-colors">Support</Link></li>
              <li><Link to="/faq" className="text-[14px] text-slate-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/privacy-policy" className="text-[14px] text-slate-400 hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/disclosure" className="text-[14px] text-slate-400 hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-white text-[11px] font-bold uppercase tracking-widest">
              Newsletter
            </h3>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              Early access to curated drops and private announcements.
            </p>

            <form className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent border-b border-white/15 py-2.5 text-[14px]
                text-white placeholder:text-slate-600 focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-0 bottom-2 text-[11px] font-bold uppercase tracking-widest
                text-white hover:text-primary transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-slate-500">
              © {currentYear} Valdio International
            </span>
            <span className="hidden md:block text-slate-600">•</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500">
              Global • Secure • Verified
            </span>
          </div>

          <div className="flex gap-8 text-[9px] uppercase tracking-widest text-slate-600">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Verified Partner
            </span>
            <span>AES-256 Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
