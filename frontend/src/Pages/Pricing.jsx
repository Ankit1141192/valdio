import React from "react";
import { Check, ShieldCheck, Zap, Crown } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Member",
      price: "0",
      description: "Fundamental access to the Valdio curation directory.",
      features: [
        "Dynamic Product Directory",
        "Institutional Support",
        "Public Curated Collections",
      ],
      buttonText: "Register Free",
      highlight: false,
      icon: Zap
    },
    {
      name: "Insider",
      price: "999",
      description: "Priority insights and advanced curation tools for practitioners.",
      features: [
        "Early Collection Access",
        "Priority Concierge Support",
        "Exclusive Market Analysis",
        "Insider Member Pricing"
      ],
      buttonText: "Gain Access",
      highlight: true,
      icon: ShieldCheck
    },
    {
      name: "Elite",
      price: "2499",
      description: "The absolute frontier of the Valdio experience.",
      features: [
        "Bespoke Curation Inquiries",
        "1-on-1 Legal Concierge",
        "Ultra-Premium Previews",
        "Complimentary Global Logistics"
      ],
      buttonText: "Join the Elite",
      highlight: false,
      icon: Crown
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-700 py-24 px-6 font-display">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-24 text-center">
          <div className="inline-block px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
            Institutional Membership
          </div>
          <h1 className="text-6xl sm:text-7xl font-black text-slate-950 mb-8 tracking-tighter">
            The Elite Collective
          </h1>
          <p className="text-slate-400 font-medium text-xl max-w-2xl mx-auto leading-relaxed">
            Choose your tier of integration within the Valdio ecosystem. Unlock exclusive insights and bespoke institutional support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-[3rem] p-10 sm:p-14 flex flex-col border transition-all duration-500 overflow-hidden relative group ${plan.highlight
                  ? "bg-slate-950 border-slate-950 text-white shadow-2xl shadow-slate-200 lg:scale-105 z-10"
                  : "bg-slate-50 border-slate-100 text-slate-950 hover:border-slate-200"
                }`}
            >
              {plan.highlight && (
                <div className="absolute top-8 right-8 bg-white/10 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Most Preferred
                </div>
              )}

              <div className="relative z-10 flex-1">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 transition-colors duration-500 ${plan.highlight ? "bg-white/10 text-white" : "bg-slate-900 text-white group-hover:bg-primary"
                  }`}>
                  <plan.icon size={28} strokeWidth={1.5} />
                </div>

                <h3 className="text-3xl font-black mb-4 tracking-tight uppercase tracking-wider">{plan.name}</h3>
                <p className={`text-sm font-medium mb-10 leading-relaxed ${plan.highlight ? "text-slate-400" : "text-slate-500"
                  }`}>
                  {plan.description}
                </p>

                <div className="mb-12">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter">₹{plan.price}</span>
                    <span className={`text-sm font-bold uppercase tracking-widest ${plan.highlight ? "text-slate-500" : "text-slate-400"
                      }`}>/ annum</span>
                  </div>
                </div>

                <ul className="space-y-6 mb-12">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex gap-4 items-center">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? "bg-white/20 text-white" : "bg-slate-950 text-white"
                        }`}>
                        <Check size={12} strokeWidth={4} />
                      </div>
                      <span className={`text-sm font-bold tracking-wide ${plan.highlight ? "text-slate-300" : "text-slate-600"
                        }`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-[0.25em] transition-all active:scale-[0.98] shadow-xl ${plan.highlight
                    ? "bg-white text-slate-950 hover:bg-slate-100"
                    : "bg-slate-900 text-white hover:bg-primary"
                  }`}
              >
                {plan.buttonText}
              </button>

              {!plan.highlight && (
                <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-slate-100 rounded-full blur-3xl group-hover:bg-slate-200 transition-all duration-700" />
              )}
            </div>
          ))}
        </div>

        {/* Corporate Inquiry */}
        <div className="mt-32 text-center border-t border-slate-50 pt-20">
          <p className="text-slate-400 font-medium text-lg mb-8">
            Requiring professional enterprise solutions or bulk institutional access?
          </p>
          <a
            href="/contact"
            className="text-slate-950 font-black uppercase text-sm tracking-[0.3em] border-b-2 border-slate-950 pb-2 hover:text-primary hover:border-primary transition-all"
          >
            Corporate Inquiry
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
