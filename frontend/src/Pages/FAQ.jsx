import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What is Valdio International?",
    answer:
      "Valdio is a premier destination for curated excellence. We serve as a sophisticated filter for the global marketplace, handpicking products that meet our rigorous standards for quality, design, and performance.",
  },
  {
    question: "How are products authenticated?",
    answer:
      "Our curation experts perform exhaustive research on every item. We verify technical specifications, material integrity, and historical customer sentiment to ensure every recommendation is worthy of your consideration.",
  },
  {
    question: "Transparency in Commercial Relations",
    answer:
      "Valdio operates with absolute transparency. As a participant in the Amazon Associates Program, we may receive a commission on select acquisitions made through our portal. This institutional support enables us to maintain our research operations at no additional cost to our community.",
  },
  {
    question: "Excellence in Recommendations",
    answer:
      "Our recommendations are strictly merit-based. We do not accept payment for product placement, ensuring that our curation remains unbiased and focused solely on providing you with the best the market has to offer.",
  },
  {
    question: "Operational Updates",
    answer:
      "The Valdio directory is dynamically managed. We continuously monitor price fluctuations and product availability to ensure our curated collections reflect the most current opportunities in the premium segment.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-slate-700 py-24 px-6 font-display">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-20 text-center sm:text-left">
          <div className="inline-block px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
            Knowledge Base
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-slate-950 mb-6 tracking-tight">
            Help Center
          </h1>
          <p className="text-slate-400 font-medium text-lg max-w-2xl">
            Inquiries regarding our curation standards, commercial protocols, and institutional mission.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`group transition-all duration-500 rounded-[2rem] border overflow-hidden ${activeIndex === index
                  ? "bg-slate-950 border-slate-950 shadow-2xl shadow-slate-200"
                  : "bg-slate-50 border-slate-100 hover:border-slate-200"
                }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-8 sm:p-10 flex justify-between items-center gap-6"
              >
                <h3 className={`text-xl sm:text-2xl font-black tracking-tight transition-colors duration-500 ${activeIndex === index ? "text-white" : "text-slate-950"
                  }`}>
                  {item.question}
                </h3>
                <div className={`p-3 rounded-full transition-all duration-500 ${activeIndex === index ? "bg-white/10 text-white rotate-180" : "bg-white text-slate-400"
                  }`}>
                  <ChevronDown size={20} strokeWidth={3} />
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out ${activeIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="px-8 sm:px-10 pb-10">
                  <p className={`text-lg font-medium leading-relaxed ${activeIndex === index ? "text-slate-300" : "text-slate-600"
                    }`}>
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-24 bg-slate-50 rounded-[3rem] p-12 text-center border border-slate-100">
          <h2 className="text-2xl font-black text-slate-950 mb-4 uppercase tracking-wider">Unresolved Inquiry?</h2>
          <p className="text-slate-600 font-medium mb-8 max-w-lg mx-auto">
            Our concierge team is available for detailed consultations regarding your specific shopping requirements.
          </p>
          <a
            href="/contact"
            className="inline-flex px-10 py-5 bg-slate-950 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-primary transition-all active:scale-95 shadow-xl shadow-slate-200"
          >
            Access Concierge Service
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
