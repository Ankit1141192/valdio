import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-slate-700 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-20 text-center sm:text-left">
          <div className="inline-block px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
            Legal Directory
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-slate-950 mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-400 font-medium text-lg">
            Last updated <span className="text-slate-900 font-bold">February 12, 2026</span>
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-12 leading-relaxed text-lg">
          {/* Introduction */}
          <section className="bg-slate-50 rounded-[2.5rem] p-10 sm:p-12 border border-slate-100">
            <h2 className="text-2xl font-black text-slate-950 mb-6 uppercase tracking-wider">1. Commitment to Privacy</h2>
            <p className="text-slate-600 font-medium">
              At <span className="text-slate-950 font-bold">Valdio International</span>, your trust is our most valuable asset. We understand the importance of your data and are committed to maintaining the highest standards of protection for your personal information.
            </p>
          </section>

          {/* Data Collection */}
          <section className="px-6">
            <h2 className="text-2xl font-black text-slate-950 mb-6 uppercase tracking-wider">2. Information Collection</h2>
            <p className="mb-6">
              To provide an unparalleled shopping experience, we collect specific data points during your journey:
            </p>
            <ul className="space-y-4">
              {[
                "Communication data including encrypted email signatures for correspondence.",
                "Technical diagnostics for optimized performance across sophisticated devices.",
                "Encrypted interaction logs to refine our curated recommendations."
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2.5 flex-shrink-0" />
                  <span className="text-slate-600 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Affiliate Disclosure */}
          <section className="bg-slate-950 text-white rounded-[2.5rem] p-12 shadow-2xl shadow-slate-200">
            <h2 className="text-2xl font-black mb-6 uppercase tracking-wider">3. Affiliate Relationship</h2>
            <p className="text-slate-300 font-medium leading-relaxed">
              As a participant in the <span className="text-white font-bold">Amazon Associates Program</span>, Valdio curates excellence. We may earn commissions on qualifying purchases, allowing us to maintain our operational standards without additional cost to you. Our selections remain solely based on merit and quality.
            </p>
          </section>

          {/* Data Security */}
          <section className="px-6">
            <h2 className="text-2xl font-black text-slate-950 mb-6 uppercase tracking-wider">4. Institutional Security</h2>
            <p className="text-slate-600 font-medium">
              We employ military-grade encryption and rigorous administrative protocols to safeguard your information. While no digital infrastructure is infallible, our proactive security measures are designed to preemptively mitigate risks.
            </p>
          </section>

          {/* Contact */}
          <section className="pt-12 border-t border-slate-100 text-center sm:text-left">
            <h2 className="text-2xl font-black text-slate-950 mb-6 uppercase tracking-wider">5. Concierge Inquiry</h2>
            <p className="text-slate-600 font-medium mb-8">
              For detailed inquiries regarding our privacy standards or to exercise your data rights, please contact our legal concierge.
            </p>
            <a
              href="mailto:concierge@valdio.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-primary transition-all active:scale-95"
            >
              Contact Legal Concierge
            </a>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-32 pt-12 border-t border-slate-50 text-center">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
            © 2026 Valdio International — Integrity in Curated Excellence
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
