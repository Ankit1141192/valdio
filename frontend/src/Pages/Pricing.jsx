import React from "react";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: 499,
      features: [
        "Access to all products",
        "Email support",
        "Community access",
      ],
      buttonText: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      price: 999,
      features: [
        "All Basic features",
        "Early access to new products",
        "Priority email support",
        "Special discounts on sales",
      ],
      buttonText: "Buy Now",
      highlight: true,
    },
    {
      name: "Premium",
      price: 1499,
      features: [
        "All Pro features",
        "1-on-1 customer support",
        "Exclusive product previews",
        "Free shipping on all orders",
      ],
      buttonText: "Subscribe",
      highlight: false,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 font-[Poppins]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Our Pricing Plans
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
          Choose the plan that best fits your needs. Upgrade anytime to unlock
          premium features and support.
        </p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-3xl shadow-xl p-8 flex flex-col justify-between transition-transform transform hover:-translate-y-2 hover:shadow-2xl ${
                plan.highlight
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105"
                  : "bg-white text-gray-900"
              }`}
            >
              <div>
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    plan.highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-4xl font-extrabold mb-6 ${
                    plan.highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  ₹{plan.price}
                  <span
                    className={`text-lg font-medium ${
                      plan.highlight ? "text-gray-200" : "text-gray-600"
                    }`}
                  >
                    {" "}
                    /month
                  </span>
                </p>
                <ul className="space-y-3 text-left">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className={`flex items-center gap-2 text-base ${
                        plan.highlight ? "text-gray-100" : "text-gray-700"
                      }`}
                    >
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${
                          plan.highlight
                            ? "bg-white"
                            : "bg-gradient-to-r from-blue-600 to-purple-600"
                        }`}
                      ></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <button
                className={`mt-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  plan.highlight
                    ? "bg-white text-blue-600 hover:bg-gray-100"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-[1.02]"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <p className="mt-12 text-gray-600 text-lg">
          Need a custom plan?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Contact us
          </span>
        </p>
      </div>
    </section>
  );
};

export default Pricing;
