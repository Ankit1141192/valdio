import React, { useState } from "react";

const faqData = [
  {
    question: "What is RJN_SHOPS?",
    answer:
      "RJN_SHOPS is a curated platform that helps you find the best Amazon products. We review, compare, and recommend only the most trusted and high-quality items.",
  },
  {
    question: "How do you select products?",
    answer:
      "Every product goes through research and testing. We focus on verified reviews, quality, and overall customer satisfaction before recommending any product.",
  },
  {
    question: "Do you earn from affiliate links?",
    answer:
      "Yes, some links are affiliate links. This means we may earn a small commission when you buy through them — at no extra cost to you.",
  },
  {
    question: "Are the reviews honest and unbiased?",
    answer:
      "Absolutely. We never recommend products solely for sponsorship or promotion. Every review reflects honest opinions and product performance.",
  },
  {
    question: "How often is the site updated?",
    answer:
      "We update product listings regularly to ensure you get access to the latest and most relevant deals and reviews.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#e0f2fe] py-16 px-6 md:px-20">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`transition-all duration-300 rounded-2xl p-6 shadow-md cursor-pointer bg-white hover:shadow-lg ${
              activeIndex === index ? "border border-purple-500" : "border border-gray-200"
            }`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                {item.question}
              </h2>
              <span
                className={`text-2xl font-bold transition-transform duration-300 ${
                  activeIndex === index ? "rotate-45 text-purple-600" : "text-gray-500"
                }`}
              >
                +
              </span>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
