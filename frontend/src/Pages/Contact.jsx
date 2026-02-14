import React from "react";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white text-slate-700 py-24 px-6 font-display">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-24 text-center">
          <div className="inline-block px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
            Institutional Support
          </div>
          <h1 className="text-6xl sm:text-7xl font-black text-slate-950 mb-8 tracking-tighter">
            Concierge Service
          </h1>
          <p className="text-slate-400 font-medium text-xl max-w-2xl mx-auto leading-relaxed">
            Direct access to our curation experts and legal concierge for personalized inquiries and institutional support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Contact Info Column */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-black text-slate-950 uppercase tracking-widest">Global Reach</h2>
              <div className="space-y-10">
                {[
                  {
                    icon: Mail,
                    title: "Digital Correspondence",
                    value1: "concierge@valdio.com",
                    value2: "legal@valdio.com"
                  },
                  {
                    icon: Phone,
                    title: "Direct Concierge",
                    value1: "+91 98765 43210",
                    value2: "Mon - Fri, 10AM - 6PM IST"
                  },
                  {
                    icon: MapPin,
                    title: "Institutional HQ",
                    value1: "Prestige Prime Tower,",
                    value2: "Bengaluru, India"
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-950 group-hover:bg-slate-950 group-hover:text-white transition-all duration-500">
                      <item.icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2">{item.title}</h3>
                      <p className="text-lg font-bold text-slate-950">{item.value1}</p>
                      <p className="text-slate-500 font-medium">{item.value2}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-10 bg-slate-950 rounded-[2.5rem] text-white overflow-hidden relative group">
              <div className="relative z-10">
                <MessageCircle className="mb-6 opacity-50" size={40} />
                <h3 className="text-2xl font-black mb-4">Immediate Assistance?</h3>
                <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                  Our digital concierge is available for real-time inquiries regarding order status and technical support.
                </p>
                <button className="px-8 py-4 bg-white text-slate-950 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-100 transition-all active:scale-95">
                  Launch Live Chat
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700" />
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-8 sm:p-12 lg:p-16 relative">
              <h2 className="text-3xl font-black text-slate-950 mb-10 tracking-tight">Direct Inquiry</h2>
              <form className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Alexander Vance"
                      className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-slate-300 transition-all font-medium placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@corporate.com"
                      className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-slate-300 transition-all font-medium placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Department</label>
                  <select className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-slate-300 transition-all font-medium text-slate-500 appearance-none">
                    <option>General Concierge</option>
                    <option>Curation Relations</option>
                    <option>Technical Support</option>
                    <option>Legal Inquiry</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Message</label>
                  <textarea
                    rows="6"
                    placeholder="Provide details regarding your inquiry..."
                    className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-slate-300 transition-all font-medium placeholder:text-slate-300 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-slate-950 text-white rounded-2xl font-black uppercase text-xs tracking-[0.25em] hover:bg-primary transition-all active:scale-[0.98] shadow-2xl shadow-slate-200 flex items-center justify-center gap-3"
                >
                  <Send size={16} strokeWidth={3} /> Launch Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
