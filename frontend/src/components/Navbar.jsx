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
    <Nav className={scrolled ? "scrolled" : ""}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20 font-[Poppins] gap-4">
        {/* ================ LOGO ================ */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity"
          title="Go to Home"
        >
          <img
            src={logo}
            alt="Valdio Logo"
            className="h-35 w-auto object-contain"
          />
        </Link>

        {/* ================ DESKTOP SEARCH ================ */}
        <form
          onSubmit={onSearchSubmit}
          className="hidden lg:flex flex-1 max-w-xl items-center bg-white/95 border border-gray-200 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
        >
          <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, brands and more…"
            className="w-full bg-transparent outline-none px-3 text-sm placeholder-gray-500"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors flex-shrink-0"
          >
            Search
          </button>
        </form>

        {/* ================ DESKTOP NAVIGATION ================ */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {/* Home Link */}
          <Link
            to="/"
            className={`relative group transition duration-200 text-base ${
              isActive("/")
                ? "text-blue-600"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Home
            {isActive("/") && (
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></span>
            )}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all group-hover:w-full"></span>
          </Link>

          {/* Products Link */}
          <Link
            to="/products"
            className={`relative group transition duration-200 text-base ${
              isActive("/products")
                ? "text-blue-600"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Products
            {isActive("/products") && (
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></span>
            )}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all group-hover:w-full"></span>
          </Link>

          {/* Favorites Heart Icon */}
          <Link
            to="/favorites"
            className={`relative flex items-center justify-center transition duration-200 ${
              isActive("/favorites")
                ? "text-red-500"
                : "text-gray-700 hover:text-red-500"
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
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favCount > 9 ? "9+" : favCount}
              </span>
            )}
            {isActive("/favorites") && (
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </Link>

          {/* Cart Icon */}
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className={`relative flex items-center justify-center transition duration-200 cursor-pointer ${
              isActive("/cart")
                ? "text-blue-600"
                : "text-gray-700 hover:text-gray-900"
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
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
            {isActive("/cart") && (
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </button>
        </div>

        {/* ================ MOBILE CONTROLS ================ */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Cart Icon */}
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className={`relative flex items-center justify-center transition duration-200 ${
              isActive("/cart")
                ? "text-blue-600"
                : "text-gray-700 hover:text-gray-900"
            }`}
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={20} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
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
        <MobileMenu className="md:hidden w-full py-4 flex flex-col items-center gap-2 shadow-lg backdrop-blur-md bg-white/95">
          {/* Mobile Search */}
          <form
            onSubmit={onSearchSubmit}
            className="w-[92%] flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm mb-2"
          >
            <Search className="w-4 h-4 text-gray-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              className="w-full bg-transparent outline-none px-3 text-sm placeholder-gray-500"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              Go
            </button>
          </form>

          {/* Mobile Home Link */}
          <Link
            to="/"
            className={`w-full text-center py-2 text-lg font-medium rounded-lg transition duration-200 ${
              isActive("/")
                ? "bg-blue-100 text-blue-600"
                : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            Home
          </Link>

          {/* Mobile Products Link */}
          <Link
            to="/products"
            className={`w-full text-center py-2 text-lg font-medium rounded-lg transition duration-200 ${
              isActive("/products")
                ? "bg-blue-100 text-blue-600"
                : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            Products
          </Link>

          {/* Mobile Favorites Link */}
          <Link
            to="/favorites"
            className={`w-full text-center py-2 text-lg font-medium rounded-lg transition duration-200 flex items-center justify-center gap-2 ${
              isActive("/favorites")
                ? "bg-red-100 text-red-600"
                : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Heart
              size={20}
              strokeWidth={2}
              className={isActive("/favorites") ? "fill-current" : ""}
            />
            Favorites
            {favCount > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {favCount}
              </span>
            )}
          </Link>

          {/* Mobile Cart Link */}
          <Link
            to="/cart"
            className={`w-full text-center py-2 text-lg font-medium rounded-lg transition duration-200 flex items-center justify-center gap-2 ${
              isActive("/cart")
                ? "bg-blue-100 text-blue-600"
                : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            <ShoppingCart
              size={20}
              strokeWidth={2}
              className={isActive("/cart") ? "fill-current" : ""}
            />
            Cart
            {cartCount > 0 && (
              <span className="ml-1 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>
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
    width: 40px;
    cursor: pointer;
    display: block;
    height: calc(4px * 3 + 11px * 2);
  }

  .bar {
    position: absolute;
    left: 0;
    right: 0;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(to right, #22c55e, #3b82f6, #8b5cf6);
    transition: all 0.35s cubic-bezier(0.5, -0.35, 0.35, 1.5);
  }

  .bar--top {
    bottom: calc(50% + 11px + 2px);
  }

  .bar--middle {
    top: calc(50% - 2px);
  }

  .bar--bottom {
    top: calc(50% + 11px + 2px);
  }

  #checkbox:checked + .toggle .bar--top {
    bottom: calc(50% - 11px - 4px);
    transform: rotate(45deg);
  }

  #checkbox:checked + .toggle .bar--middle {
    opacity: 0;
    top: calc(50% + 11px);
  }

  #checkbox:checked + .toggle .bar--bottom {
    top: calc(50% - 2px);
    transform: rotate(-45deg);
  }
`;

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.98);
  transition: all 0.3s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const MobileMenu = styled.div`
  animation: slideDown 0.3s ease-out forwards;

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