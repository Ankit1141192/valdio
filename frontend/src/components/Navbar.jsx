import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Heart, Search, ShoppingCart, X } from "lucide-react";
import logo from "../assets/logo1.png";
import useLocalFavorites from "../hooks/useLocalFavorites";
import { useCart } from "../context/CartContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState("");
  const { favorites } = useLocalFavorites("favorites");
  const { count: cartCount } = useCart();

  /* ================ AUTO-CLOSE MENU ON ROUTE CHANGE ================ */
  useEffect(() => {
    // Close mobile menu when route changes
    setMenuOpen(false);

    // Clear search input when navigating
    setQ("");

    console.log("📍 Route changed to:", pathname);
  }, [pathname]);

  /* ================ SCROLL LISTENER ================ */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================ HELPER FUNCTIONS ================ */
  const isActive = (path) => {
    if (path === "/") return pathname === "/" || pathname === "/home";
    return pathname.startsWith(path);
  };

  const navItems = ["Home", "Products", "Favorites"];
  const getLink = (item) =>
    item === "Home" ? "/" : `/${item.toLowerCase()}`;

  const favCount = useMemo(() => favorites?.size || 0, [favorites]);

  /* ================ HANDLE SEARCH ================ */
  const onSearchSubmit = (e) => {
    e.preventDefault();
    const query = q.trim();
    if (query) {
      const params = new URLSearchParams();
      params.set("search", query);
      navigate(`/products?${params.toString()}`);
      // Clear happens in useEffect when pathname changes
    }
  };

  /* ================ HANDLE LOGO CLICK ================ */
  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate("/");
    // Close menu and clear search (happens in useEffect)
  };

  return (
    <Nav className={`${scrolled ? "scrolled" : ""} glass border-b border-transparent`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 flex justify-between items-center h-16 font-display gap-4">
        {/* ================ LOGO ================ */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-all duration-300 transform hover:scale-102"
          title="Go to Home"
        >
          <img
            src={logo}
            alt="Valdio Logo"
            className="h-24 sm:h-28 w-auto object-contain"
          />
        </Link>

        {/* ================ DESKTOP SEARCH ================ */}
        <form
          onSubmit={onSearchSubmit}
          className="hidden lg:flex flex-1 max-w-lg items-center bg-slate-100/50 hover:bg-white border border-slate-200/50 hover:border-slate-300 rounded-full px-5 py-2.5 transition-all duration-300 group"
        >
          <Search className="w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors flex-shrink-0" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search premium products..."
            className="w-full bg-transparent outline-none px-3 text-sm placeholder-slate-400 text-slate-700"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="text-sm font-bold text-slate-600 hover:text-primary transition-colors flex-shrink-0"
          >
            Search
          </button>
        </form>

        {/* ================ DESKTOP NAVIGATION ================ */}
        <div className="hidden md:flex items-center gap-10 font-medium">
          {/* Home Link */}
          <Link
            to="/"
            className={`relative group px-1 py-1 transition duration-300 text-sm tracking-wide ${isActive("/")
              ? "text-primary"
              : "text-slate-600 hover:text-slate-900"
              }`}
          >
            HOME
            <span className={`absolute left-0 -bottom-0.5 h-0.5 bg-primary transition-all duration-300 ${isActive("/") ? "w-full" : "w-0 group-hover:w-full"}`}></span>
          </Link>

          {/* Products Link */}
          <Link
            to="/products"
            className={`relative group px-1 py-1 transition duration-300 text-sm tracking-wide ${isActive("/products")
              ? "text-primary"
              : "text-slate-600 hover:text-slate-900"
              }`}
          >
            PRODUCTS
            <span className={`absolute left-0 -bottom-0.5 h-0.5 bg-primary transition-all duration-300 ${isActive("/products") ? "w-full" : "w-0 group-hover:w-full"}`}></span>
          </Link>

          <div className="flex items-center gap-5 border-l border-slate-200 pl-8 ml-2">
            {/* Favorites Heart Icon */}
            <Link
              to="/favorites"
              className={`relative flex items-center justify-center transition duration-300 transform hover:scale-110 ${isActive("/favorites")
                ? "text-rose-500"
                : "text-slate-600 hover:text-rose-500"
                }`}
              aria-label="Favorites"
              title="View Favorites"
            >
              <Heart
                size={22}
                strokeWidth={2}
                className={isActive("/favorites") ? "fill-current" : ""}
              />
              {favCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-rose-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce shadow-lg shadow-rose-200">
                  {favCount > 9 ? "9+" : favCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className={`relative flex items-center justify-center transition duration-300 transform hover:scale-110 cursor-pointer ${isActive("/cart")
                ? "text-primary"
                : "text-slate-600 hover:text-primary"
                }`}
              aria-label="Shopping Cart"
              title="View Cart"
            >
              <ShoppingCart
                size={22}
                strokeWidth={2}
                className={isActive("/cart") ? "fill-current" : ""}
              />
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg shadow-blue-500/30">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ================ MOBILE CONTROLS ================ */}
        <div className="md:hidden flex items-center gap-4">
          {/* Mobile Hamburger Toggle Only (Cart moved inside menu) */}
          <StyledSwitch>
            <input
              type="checkbox"
              id="checkbox"
              checked={menuOpen}
              onChange={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            />
            <label className="toggle" htmlFor="checkbox">
              <div className="bar bar--top"></div>
              <div className="bar bar--middle"></div>
              <div className="bar bar--bottom"></div>
            </label>
          </StyledSwitch>
        </div>
      </div>

      {/* ================ MOBILE MENU ================ */}
      {menuOpen && (
        <MobileMenu className="md:hidden w-full py-8 flex flex-col items-center gap-4 glass-dark text-white">
          {/* Mobile Search */}
          <form
            onSubmit={onSearchSubmit}
            className="w-[85%] flex items-center bg-white/10 border border-white/20 rounded-full px-5 py-3 shadow-lg mb-4"
          >
            <Search className="w-5 h-5 text-white/50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent outline-none px-3 text-sm placeholder-white/30 text-white"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="text-sm font-bold text-white/80 hover:text-white transition-colors"
            >
              Go
            </button>
          </form>

          {/* Mobile Home Link */}
          <Link
            to="/"
            className={`w-[85%] text-center py-4 text-sm font-bold tracking-widest rounded-2xl transition duration-300 ${isActive("/")
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
          >
            HOME
          </Link>

          {/* Mobile Products Link */}
          <Link
            to="/products"
            className={`w-[85%] text-center py-4 text-sm font-bold tracking-widest rounded-2xl transition duration-300 ${isActive("/products")
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
          >
            PRODUCTS
          </Link>

          <div className="w-[85%] grid grid-cols-2 gap-4 mt-2">
            {/* Mobile Favorites Link */}
            <Link
              to="/favorites"
              className={`flex items-center justify-center gap-3 py-4 rounded-2xl transition duration-300 ${isActive("/favorites")
                ? "bg-rose-500 text-white"
                : "bg-white/5 text-white/60 hover:text-white"
                }`}
            >
              <Heart
                size={20}
                strokeWidth={2}
                className={isActive("/favorites") ? "fill-current" : ""}
              />
              <span className="text-sm font-bold">FAVES</span>
              {favCount > 0 && (
                <span className="bg-white/20 text-white text-[10px] font-bold rounded-full px-2 py-0.5">
                  {favCount}
                </span>
              )}
            </Link>

            {/* Mobile Cart Link */}
            <Link
              to="/cart"
              className={`flex items-center justify-center gap-3 py-4 rounded-2xl transition duration-300 ${isActive("/cart")
                ? "bg-blue-600 text-white"
                : "bg-white/5 text-white/60 hover:text-white"
                }`}
            >
              <ShoppingCart
                size={20}
                strokeWidth={2}
                className={isActive("/cart") ? "fill-current" : ""}
              />
              <span className="text-sm font-bold">CART</span>
              {cartCount > 0 && (
                <span className="bg-white/20 text-white text-[10px] font-bold rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </MobileMenu>
      )}
    </Nav>
  );
};

export default Navbar;

/* ================ STYLED COMPONENTS ================ */
const StyledSwitch = styled.div`
  #checkbox {
    display: none;
  }

  .toggle {
    position: relative;
    width: 32px;
    cursor: pointer;
    display: block;
    height: 24px;
  }

  .bar {
    position: absolute;
    left: 0;
    right: 0;
    height: 3px;
    border-radius: 2px;
    background: #1e293b;
    transition: all 0.35s cubic-bezier(0.5, -0.35, 0.35, 1.5);
  }

  .bar--top {
    top: 0;
  }

  .bar--middle {
    top: 50%;
    transform: translateY(-50%);
  }

  .bar--bottom {
    bottom: 0;
  }

  #checkbox:checked + .toggle .bar--top {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    background: #fff;
  }

  #checkbox:checked + .toggle .bar--middle {
    opacity: 0;
  }

  #checkbox:checked + .toggle .bar--bottom {
    bottom: 50%;
    transform: translateY(50%) rotate(-45deg);
    background: #fff;
  }
`;

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.25rem 0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);

  &.scrolled {
    padding: 0;
    background-color: rgba(255, 255, 255, 0.98);
    box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.05);
  }
`;

const MobileMenu = styled.div`
  animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  backdrop-filter: blur(24px);
  background-color: rgba(15, 23, 42, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
