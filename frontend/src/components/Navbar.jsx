import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Heart } from "lucide-react";
import logo from "../assets/logo1.png"

/* 🔹 ScrollToTop Component */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on route change
  }, [pathname]);

  return null;
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Correct Order: Home → Products → Pricing → Favorites → Stories
  const navItems = ["Home", "Products", "Pricing", "Stories"];
  const getLink = (item) =>
    item === "Home" ? "/" : `/${item.toLowerCase()}`;

  return (
    <>
      <ScrollToTop />

      <Nav className={`${scrolled ? "scrolled" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex justify-between items-center h-20 font-[Poppins]">
          {/* Logo */}

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <img
              src={logo}
              alt="Valdio Logo"
              className="h-40 w-auto object-contain"
            />
          </Link>


          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 font-medium text-lg">
            {navItems.map((item) => {
              if (item === "Pricing") {
                // ✅ After Pricing, insert Heart Icon
                return (
                  <React.Fragment key={item}>
                    <Link
                      to={getLink(item)}
                      onClick={() => setMenuOpen(false)}
                      className="relative group transition hover:text-gray-700"
                    >
                      {item}
                      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all group-hover:w-full"></span>
                    </Link>

                    {/* ❤️ Favorites */}
                    {/* <Link
                      to="/favorites"
                      className="relative flex items-center justify-center text-gray-700 hover:text-red-500 transition"
                    >
                      <Heart size={24} strokeWidth={2} />
                    </Link> */}
                  </React.Fragment>
                );
              }

              return (
                <Link
                  key={item}
                  to={getLink(item)}
                  onClick={() => setMenuOpen(false)}
                  className="relative group transition hover:text-gray-700"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all group-hover:w-full"></span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center">
            <StyledSwitch>
              <input
                type="checkbox"
                id="checkbox"
                checked={menuOpen}
                onChange={() => setMenuOpen(!menuOpen)}
              />
              <label className="toggle" htmlFor="checkbox">
                <div className="bar bar--top"></div>
                <div className="bar bar--middle"></div>
                <div className="bar bar--bottom"></div>
              </label>
            </StyledSwitch>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden w-full py-4 flex flex-col items-center gap-4 shadow-lg transition backdrop-blur-md bg-white/90">
            {/* Home */}
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium text-gray-900 hover:text-gray-700 transition"
            >
              Home
            </Link>

            {/* Products */}
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium text-gray-900 hover:text-gray-700 transition"
            >
              Products
            </Link>

            {/* Pricing */}
            <Link
              to="/pricing"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium text-gray-900 hover:text-gray-700 transition"
            >
              Pricing
            </Link>

            {/* ❤️ Favorites */}
            {/* <Link
              to="/favorites"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-lg font-medium text-gray-900 hover:text-red-500 transition"
            >
              <Heart size={20} strokeWidth={2} /> Favorites
            </Link> */}

            {/* Stories */}
            <Link
              to="/stories"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium text-gray-900 hover:text-gray-700 transition"
            >
              Stories
            </Link>

            {/* Contact Button */}
            {/* <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition transform"
            >
              Contact Us
            </Link> */}
          </div>
        )}
      </Nav>
    </>
  );
};

export default Navbar;

/* ✅ Styled Components */
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
  transition: all 0.3s;

  &.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
`;

