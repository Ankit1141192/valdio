import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white text-slate-700 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center sm:text-left">
          <div className="inline-block px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
            Institutional Terms
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-slate-950 mb-6 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-slate-400 font-medium text-lg">
            Last updated <span className="text-slate-900 font-bold">February 12, 2026</span>
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 leading-relaxed text-lg">
          <section className="bg-slate-50 rounded-[2.5rem] p-10 sm:p-12 border border-slate-100">
            <h2 className="text-2xl font-black text-slate-950 mb-6 uppercase tracking-wider">1. Agreement to Terms</h2>
            <p className="text-slate-600 font-medium">
              By accessing the <span className="text-slate-950 font-bold">Valdio Experience</span>, you agree to be bound by these Institutional Terms and our comprehensive Privacy Policy. These terms govern your interaction with our curated digital boutique. If you do not concur with these protocols, we respectfully request you discontinue use of our platform.
            </p>
          </section>

          <section className="px-6 border-l-2 border-slate-900">
            <h2 className="text-2xl font-black text-slate-950 mb-6 uppercase tracking-wider">2. Intellectual Excellence</h2>
            <p className="text-slate-600 font-medium">
              All content hosted on Valdio—including imagery, descriptions, and curated selections—remains the intellectual property of Valdio International. Unauthorized reproduction, data harvesting, or commercial exploitation is strictly prohibited and subject to legal recourse.
            </p>
          </section>

          <section className="bg-slate-950 text-white rounded-[2.5rem] p-12 shadow-2xl shadow-slate-200">
            <h2 className="text-2xl font-black mb-6 uppercase tracking-wider">3. Affiliate Governance</h2>
            <p className="text-slate-300 font-medium leading-relaxed">
              Our participation in the <span className="text-white font-bold">Amazon Associates Program</span> means that external transactions are governed by Amazon's respective policies. Valdio provides the curation; however, product fulfillment and final commercial terms are established by our partner platforms.
            </p>
          </section>

          <section className="px-6">
            <h2 className="text-2xl font-black text-slate-950 mb-6 uppercase tracking-wider">4. Limitation of Liability</h2>
            <p className="text-slate-600 font-medium">
              Valdio International curates with precision, yet we provide our platform on an "as-is" basis. We are not liable for discrepancies in external product listings or any outcomes arising from the use of recommended third-party goods.
            </p>
          </section>

          <section className="pt-12 border-t border-slate-100 text-center sm:text-left">
            <h2 className="text-2xl font-black text-slate-950 mb-6 uppercase tracking-wider">5. Legal Correspondence</h2>
            <p className="text-slate-600 font-medium mb-8">
              For inquiries regarding these terms or institutional compliance, please direct your correspondence to our legal department.
            </p>
            <a
              href="mailto:legal@valdio.com"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all active:scale-95"
            >
              Contact Legal Dept
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

export default TermsOfService;
