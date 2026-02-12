import React from "react";

const Disclosure = () => {
  return (
    <div className="min-h-screen bg-white text-slate-700 py-24 px-6 font-display">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-20 text-center sm:text-left">
          <div className="inline-block px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
            Institutional Transparency
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-slate-950 mb-6 tracking-tight">
            Affiliate Disclosure
          </h1>
          <p className="text-slate-400 font-medium text-lg">
            Compliance document for <span className="text-slate-900 font-bold">MMXXVI</span>
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-12 leading-relaxed text-lg text-slate-600 font-medium">
          <section className="bg-slate-50 rounded-[2.5rem] p-10 sm:p-12 border border-slate-100">
            <h2 className="text-2xl font-black text-slate-950 mb-6 uppercase tracking-wider">1. Institutional Integrity</h2>
            <p>
              The primary engine of <span className="text-slate-950 font-bold">Valdio International</span> is transparency. This document serves to formalize our commercial relationships and ensure our audience is fully informed of our operational mechanics.
            </p>
          </section>

          <section className="px-6 border-l-2 border-slate-900">
            <h2 className="text-2xl font-black text-slate-950 mb-6 uppercase tracking-wider">2. Amazon Associates Program</h2>
            <p>
              Valdio participates in the <span className="text-slate-950 font-bold">Amazon Services LLC Associates Program</span>. This is an institutional affiliate initiative designed to provide a means for digital curators to secure advertising fees through precise product mapping and linking to Amazon's global infrastructure.
            </p>
          </section>

          <section className="bg-slate-950 text-white rounded-[2.5rem] p-12 shadow-2xl shadow-slate-200">
            <h2 className="text-2xl font-black mb-6 uppercase tracking-wider text-white">3. Commercial Impact</h2>
            <p className="text-slate-400">
              Interaction with curated links within our directory may result in Valdio securing a small commission on qualifying acquisitions. It is critical to note that this process occurs at <span className="text-white font-bold underline decoration-white/30 underline-offset-4">no additional cost</span> to you, the consumer.
            </p>
          </section>

          <section className="px-6">
            <h2 className="text-2xl font-black text-slate-950 mb-6 uppercase tracking-wider">4. Merit-Based Curation</h2>
            <p>
              Our research protocols remain independent of our commercial affiliations. We promote products based on material excellence, validated performance, and high-tier customer sentiment. Financial incentives never dictate our curation priorities.
            </p>
          </section>

          <section className="pt-12 border-t border-slate-100 text-center sm:text-left">
            <h2 className="text-2xl font-black text-slate-950 mb-6 uppercase tracking-wider">5. Governance Contact</h2>
            <p className="mb-8">
              For further inquiries regarding our commercial disclosures or institutional governance, please reach our compliance department.
            </p>
            <a
              href="mailto:compliance@valdio.com"
              className="inline-flex px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-primary transition-all active:scale-95 shadow-xl shadow-slate-200"
            >
              Contact Compliance
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

export default Disclosure;
