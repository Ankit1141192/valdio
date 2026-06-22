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
import AllCategories from "./Pages/AllCategories";
import Cart from "./Pages/Cart";
import FAQ from "./Pages/FAQ";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsOfService from "./Pages/TermsOfService";
import Disclosure from "./Pages/Disclosure";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Wallet from "./Pages/Wallet";
import AdminProducts from "./Pages/admin/AdminProducts";
import ForgetPassword from "./Pages/ForgetPassword"; // add this

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
        Sorry, the page you're looking for doesn't exist.
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
const AppContent = () => {
  const location = useLocation();

  // Routes where Navbar and Footer should be hidden
  const hideLayoutRoutes = [
    "/login",
    "/register",
    "/forget-password",
  ];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop />

      <div className="flex flex-col min-h-screen bg-white">
        {!hideLayout && <Navbar />}

        <main className={`flex-1 w-full ${!hideLayout ? "pt-20" : ""}`}>
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<AllCategories />} />

            <Route
              path="/products/category/:category"
              element={<CategoryProducts />}
            />
            <Route path="/products/:id" element={<ProductDetails />} />

            {/* Cart & Favorites */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/forget-password"
              element={<ForgetPassword />}
            />

            {/* Wallet */}
            <Route path="/earn" element={<Wallet />} />
            <Route path="/wallet" element={<Wallet />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminProducts />} />
            <Route path="/admin/products" element={<AdminProducts />} />

            {/* Other Pages */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQ />} />

            {/* Legal */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/disclosure" element={<Disclosure />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {!hideLayout && <Footer />}
      </div>
    </>
  );
};

export default AppContent;