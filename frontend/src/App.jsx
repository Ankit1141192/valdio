import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import HomePage from "./Pages/HomePage";
import Products from "./Pages/Products";
import ContactPage from "./Pages/Contact";
import Stories from "./Pages/Stories";
import Pricing from "./Pages/Pricing";
import Favorites from "./Pages/Favorites";
import ProductDetails from "./Pages/ProductDetails";
import CategoryProducts from "./Pages/CategoryProducts";
import Cart from "./Pages/Cart";
import FAQ from "./Pages/FAQ";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsOfService from "./Pages/TermsOfService";
import Disclosure from "./Pages/Disclosure";


const App = () => {
return (
<>
<Navbar />


<div className="pt-20"> {/* Prevent content hiding behind navbar */}
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/products" element={<Products />} />
<Route path="/pricing" element={<Pricing />} />
<Route path="/favorites" element={<Favorites />} />
<Route path="/cart" element={<Cart />} />
<Route path="/stories" element={<Stories />} />
<Route path="/contact" element={<ContactPage />} />
<Route path="/faq" element={<FAQ />} />
<Route path="/products/:id" element={<ProductDetails />} />
<Route path="/products/category/:category" element={<CategoryProducts />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms-of-service" element={<TermsOfService />} />
<Route path="/disclosure" element={<Disclosure />} />
<Route path="*" element={<h2 className="text-center mt-20">404 - Page Not Found</h2>} />
</Routes>
</div>


<Footer />
</>
);
};


export default App;