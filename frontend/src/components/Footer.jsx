import React from "react";
import { Sparkles } from "lucide-react";
import IconCard from "./IconCard";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid Section */}
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div >
              
              </div>
               <Link
          to="/"
          className={`text-2xl font-extrabold transition bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-blue-500 to-purple-500`}
        >
         RJN_SHOPS
        </Link>
            </div>
            <p className="text-sm text-gray-400">
              Curated product recommendations you can trust.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold text-white mb-4">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition">
                  About Me
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition">
                  All Products
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition">
                  Categories
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h5 className="font-semibold text-white mb-4">Support</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Disclosure
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h5 className="font-semibold text-white mb-4">Stay Updated</h5>
            <p className="text-sm text-gray-400 mb-4">
              Get the latest product recommendations.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-600"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-r-full font-semibold hover:shadow-lg transition">
                Join
              </button>
            </div>
          </div>

          {/* Social Icons */}
          <div className="ml-20">
            <h5 className="font-semibold text-white mb-4">Join Our Community</h5>
            {/* <p className="text-sm text-gray-400 mb-4">
    Connect with us on social platforms and never miss the latest updates!
  </p> */}
            <IconCard />
          </div>


        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400 flex justify-center">
          <p className="text-center">
            © 2025 Premium Picks. All rights reserved. <br />
            As an Amazon Associate, I earn from qualifying purchases.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
