import React from "react";

const Disclosure = () => {
  return (
    <div className="bg-gray-50 text-gray-800 py-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 mb-4">
            Affiliate Disclosure
          </h1>
          <p className="text-gray-500">
            Last updated on <span className="font-medium">October 22, 2025</span>
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 leading-relaxed text-[17px]">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Purpose</h2>
            <p>
              The purpose of this disclosure is to inform users that some of the links on
              <span className="font-semibold"> RJN_SHOPS </span>
              are affiliate links, meaning we may earn a small commission if you click a link
              and make a purchase — at no additional cost to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Amazon Affiliate Program</h2>
            <p>
              RJN_SHOPS is a participant in the Amazon Services LLC Associates Program, an affiliate
              advertising program designed to provide a means for sites to earn advertising fees
              by advertising and linking to Amazon.in or Amazon.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Honest Recommendations</h2>
            <p>
              Although we may receive commissions through affiliate links, our recommendations
              are always based on genuine product quality, customer feedback, and performance.
              We never promote products solely for financial gain.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Transparency Commitment</h2>
            <p>
              We believe in full transparency with our audience. Every product featured on
              RJN_SHOPS has been carefully selected to provide real value and convenience to users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Questions</h2>
            <p>
              If you have questions about our affiliate relationships or would like more
              information, please reach out to us at{" "}
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
            Your trust matters most. RJN_SHOPS is committed to honest and transparent recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclosure;
