import React from "react";
import { Shield, Award, Zap, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Honest Reviews",
      description:
        "Every product is personally tested and evaluated without bias or sponsorship.",
    },
    {
      icon: Award,
      title: "Quality First",
      description:
        "We recommend only premium products that offer exceptional value and performance.",
    },
    {
      icon: Zap,
      title: "Best Deals",
      description:
        "Real-time price tracking ensures you get the best value for your money.",
    },
    {
      icon: Users,
      title: "Regular Updates",
      description:
        "Fresh recommendations added weekly based on latest trends and innovations.",
    },
  ];

  return (
    <section className="py-24 bg-white font-[Poppins]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Why Shop With Me?
          </h3>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">
            Your satisfaction is my priority. That’s what makes my recommendations special.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>

                <h4 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h4>

                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
