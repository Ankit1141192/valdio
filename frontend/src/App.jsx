import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import HomePage from "./Pages/HomePage";
import Products from "./Pages/Products";
import ContactPage from "./Pages/Contact";
import Stories from "./Pages/Stories";
import Pricing from "./Pages/Pricing";
import Favorites from "./Pages/Favorites";
import ProductDetails from "./Pages/ProductDetails";
import CategoryProducts from "./Pages/CategoryProducts";
import AllCategories from "./Pages/AllCategories"; // NEW
import Cart from "./Pages/Cart";
import FAQ from "./Pages/FAQ";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsOfService from "./Pages/TermsOfService";
import Disclosure from "./Pages/Disclosure";

/* ================ SCROLL TO TOP COMPONENT ================ */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });

    setTimeout(() => {
      const main = document.querySelector("main");
      if (main) {
        main.focus({ preventScroll: true });
      }
    }, 0);

    console.log("📍 Navigated to:", pathname);
  }, [pathname]);

  return null;
};

/* ================ 404 PAGE ================ */
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Sorry, the page you're looking for doesn't exist. It might have been
        moved or deleted.
      </p>
      <a
        href="/"
        className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Go Back Home
      </a>
    </div>
  </div>
);

/* ================ MAIN APP COMPONENT ================ */
const App = () => {
  return (
    <>
      {/* ScrollToTop MUST be here, at root level */}
      <ScrollToTop />

      {/* Flexbox layout for proper footer positioning */}
      <div className="flex flex-col min-h-screen bg-white">
        {/* Fixed Navbar */}
        <Navbar />

        {/* Main Content - Takes remaining space */}
        <main className="flex-1 pt-20 w-full">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<Products />} />

            {/* ================ NEW ROUTE ================ */}
            {/* All Categories Page */}
            <Route path="/categories" element={<AllCategories />} />

            {/* Product Routes - Category BEFORE ID (important!) */}
            <Route
              path="/products/category/:category"
              element={<CategoryProducts />}
            />
            <Route path="/products/:id" element={<ProductDetails />} />

            {/* Cart & Favorites */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />

            {/* Secondary Pages */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQ />} />

            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/disclosure" element={<Disclosure />} />

            {/* 404 - MUST be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer - Stays at bottom */}
        <Footer />
      </div>
    </>
  );
};

export default App;