import React from "react";

const Stories = () => {
  return (
    <div className="min-h-screen bg-white text-slate-700 py-24 px-6 font-display">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-24 text-center sm:text-left">
          <div className="inline-block px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
            Institutional Narrative
          </div>
          <h1 className="text-6xl sm:text-8xl font-black text-slate-950 mb-10 tracking-tighter leading-none">
            The Valdio <br className="hidden sm:block" /> Philosophy
          </h1>
          <p className="text-slate-400 font-medium text-xl max-w-2xl leading-relaxed">
            A chronicle of our pursuit for absolute excellence in the global marketplace.
          </p>
        </div>

        {/* Narrative Content */}
        <div className="space-y-32">
          {/* Chapter 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Chapter I</span>
              <h2 className="text-3xl font-black text-slate-950 mt-4 uppercase tracking-wider">The Genesis of Curation</h2>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <blockquote className="text-3xl sm:text-4xl text-slate-900 font-medium italic leading-tight tracking-tight border-l-4 border-slate-950 pl-8 py-2">
                "True excellence isn’t discovered; it is meticulously unfiltered from the noise of the ordinary."
              </blockquote>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                Valdio International was established with a singular, uncompromising objective: to navigate the vast complexities of modern commerce and extract the extraordinary. We began as a small collective of researchers, driven by the belief that quality is a technical specification, not a subjective opinion.
              </p>
            </div>
          </div>

          {/* Chapter 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Chapter II</span>
              <h2 className="text-3xl font-black text-slate-950 mt-4 uppercase tracking-wider">Global Integration</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="bg-slate-950 rounded-[3rem] p-12 sm:p-16 text-white shadow-2xl shadow-slate-200">
                <p className="text-xl sm:text-2xl font-light text-slate-400 leading-relaxed mb-10">
                  Our integration with the <span className="text-white font-bold">Amazon Associates Network</span> allowed us to scale our philosophy without compromising our standards. It provided the infrastructure required to deliver global excellence directly to our community.
                </p>
                <div className="flex flex-wrap gap-12">
                  <div>
                    <h4 className="text-4xl font-black mb-2 tracking-tighter">50K+</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Products Analyzed</p>
                  </div>
                  <div>
                    <h4 className="text-4xl font-black mb-2 tracking-tighter">12</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Global Markets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Chapter III</span>
              <h2 className="text-3xl font-black text-slate-950 mt-4 uppercase tracking-wider">The Future State</h2>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                As we move forward, the Valdio narrative continues to evolve. We are expanding our research protocols and integrating emerging technologies to ensure that our curation remains at the absolute frontier of modern consumption.
              </p>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                Our story is not about growth in volume, but growth in precision. We invite you to be part of this continuing chronicle of curated excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-48 pt-12 border-t border-slate-100 text-center">
          <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.5em]">
            Valdio International — Established MMXXIV
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stories;
