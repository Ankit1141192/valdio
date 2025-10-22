import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 text-gray-800 py-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500">
            Last updated on <span className="font-medium">October 22, 2025</span>
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-8 leading-relaxed text-[17px]">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p>
              Welcome to <span className="font-semibold">RJN_SHOPS</span>! We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your data when you visit our website.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
            <p>
              We collect basic information to improve your experience, such as:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Contact details like email (if you subscribe to our newsletter)</li>
              <li>Device and browser information for analytics</li>
              <li>Anonymous website usage data (through cookies)</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Cookies & Tracking</h2>
            <p>
              We use cookies to personalize content, analyze site traffic, and recommend the best Amazon products for you. You can disable cookies anytime in your browser settings.
            </p>
          </section>

          {/* Affiliate Disclosure */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Affiliate Disclosure</h2>
            <p>
              <span className="font-semibold">RJN_SHOPS</span> participates in the Amazon Associates Program. This means we may earn a small commission from qualifying purchases — at no extra cost to you. Our product recommendations remain unbiased and based on quality and performance.
            </p>
          </section>

          {/* Data Usage */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">5. How We Use Your Information</h2>
            <p>Your data is used to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Improve website performance and product recommendations</li>
              <li>Send updates or newsletters (only if you subscribe)</li>
              <li>Understand user behavior to enhance your experience</li>
            </ul>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Data Security</h2>
            <p>
              We implement strong technical and administrative measures to protect your data. However, please note that no online system can be 100% secure.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Third-Party Links</h2>
            <p>
              Our site may contain Amazon or third-party links. Clicking those links may take you to external websites beyond our control. We recommend reviewing their privacy policies separately.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
            <p>
              Have questions about our Privacy Policy? Contact us anytime at{" "}
              <a
                href="mailto:support@rjnshops.com"
                className="text-blue-600 hover:underline"
              >
                support@rjnshops.com
              </a>
              .
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center text-sm text-gray-500">
          <p>
            By using RJN_SHOPS, you agree to this Privacy Policy and our Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
