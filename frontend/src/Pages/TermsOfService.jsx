import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-gray-50 text-gray-800 py-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-500">
            Last updated on <span className="font-medium">October 22, 2025</span>
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 leading-relaxed text-[17px]">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using <span className="font-semibold">RJN_SHOPS</span>, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please discontinue use of the website immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Use of the Website</h2>
            <p>
              You may browse and use RJN_SHOPS for personal, non-commercial purposes only. Any unauthorized use, such as scraping, copying content, or reselling recommendations, is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Affiliate Links</h2>
            <p>
              RJN_SHOPS participates in the Amazon Associates Program. When you click on an Amazon product link and make a purchase, we may earn a small commission — at no extra cost to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Product Information</h2>
            <p>
              All product details, prices, and availability displayed on RJN_SHOPS are sourced from Amazon and may change without notice. We are not responsible for product inaccuracies or out-of-date listings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Limitation of Liability</h2>
            <p>
              RJN_SHOPS is not liable for any damages or losses resulting from using our site or purchasing recommended products. Please read all product details carefully before buying.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Modifications</h2>
            <p>
              We reserve the right to update or modify these Terms at any time without prior notice. The revised version will be effective immediately upon posting.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Contact</h2>
            <p>
              For questions about these Terms, please contact us at{" "}
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
            By using RJN_SHOPS, you agree to these Terms of Service and our Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
