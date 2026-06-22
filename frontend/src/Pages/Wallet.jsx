import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Landmark, PiggyBank, ReceiptText, ArrowUpRight, CheckCircle2, XCircle, AlertCircle, RefreshCw, Coins, Wallet as WalletIcon } from "lucide-react";

const Wallet = () => {
  const { user, authFetch, API } = useAuth();
  const navigate = useNavigate();

  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [withdrawForm, setWithdrawForm] = useState({ amount: "", upiId: "" });
  const [withdrawMsg, setWithdrawMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchWallet = async () => {
    if (!user) return;
    try {
      const res = await authFetch(`${API}/wallet`);
      const data = await res.json();
      if (data.success) {
        setWallet(data.data);
      }
    } catch (err) {
      console.error("Failed to load wallet", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWallet();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    setWithdrawMsg(null);

    const amount = Number(withdrawForm.amount);
    if (amount < 100) {
      return setWithdrawMsg({ type: "error", text: "Minimum withdrawal amount is ₹100" });
    }
    if (amount > (wallet?.balance || 0)) {
      return setWithdrawMsg({ type: "error", text: "Insufficient balance in wallet" });
    }
    if (!withdrawForm.upiId.trim()) {
      return setWithdrawMsg({ type: "error", text: "Please enter a valid UPI ID" });
    }

    setSubmitting(true);
    try {
      const res = await authFetch(`${API}/wallet/withdraw`, {
        method: "POST",
        body: JSON.stringify({ amount, upiId: withdrawForm.upiId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit request");
      setWithdrawMsg({ type: "success", text: "Withdrawal request submitted successfully!" });
      setWithdrawForm({ amount: "", upiId: "" });
      fetchWallet();
    } catch (err) {
      setWithdrawMsg({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  // 1. GUEST STATE (Not Logged In)
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-700 py-24 px-6 font-display flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-xl max-w-lg w-full text-center space-y-6"
        >
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Coins size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tight">Earn Cashback Balance</h1>
          <p className="text-slate-400 font-medium text-base leading-relaxed">
            Register or sign in to activate your rewards wallet, track partner commission clicks, and cash out rewards directly to your bank account.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => navigate("/login")}
              className="flex-1 py-4.5 bg-slate-950 hover:bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all cursor-pointer shadow-lg shadow-slate-200"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="flex-1 py-4.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="w-10 h-10 rounded-full border-3 border-slate-200 border-t-blue-500 animate-spin" />
        <span className="ml-3 text-slate-400 text-sm font-bold">Connecting wallet…</span>
      </div>
    );
  }

  // 3. MAIN DASHBOARD STATE (Logged In)
  const transactions = wallet?.transactions || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 py-16 px-6 font-display">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-950 mb-1.5 tracking-tight">My Wallet</h1>
            <p className="text-slate-400 font-medium text-sm">Track your earnings and request instant payouts</p>
          </div>
          <button
            onClick={fetchWallet}
            className="p-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-700 transition-all cursor-pointer shadow-sm"
            title="Refresh Wallet Balance"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Dashboard Cards Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          {/* Left Column: Balance & Withdraw Form */}
          <div className="md:col-span-7 space-y-8">
            {/* Balance Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="bg-gradient-to-tr from-blue-600 via-indigo-600 to-indigo-700 text-white rounded-[2.5rem] p-8 lg:p-10 shadow-xl shadow-indigo-100 relative overflow-hidden flex flex-col justify-between min-h-[200px]"
            >
              <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-100">
                    Available Cashback
                  </span>
                  <div className="text-5xl lg:text-6xl font-black mt-2 tracking-tighter">
                    ₹{(wallet?.balance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                  <WalletIcon size={24} />
                </div>
              </div>
              <div className="mt-8 flex justify-between items-center text-xs text-blue-100 font-semibold border-t border-white/10 pt-5">
                <span>Account: {user.name}</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" /> Wallet Active
                </span>
              </div>
            </motion.div>

            {/* Request Withdrawal Form */}
            <motion.div
              variants={cardVariants}
              className="bg-white border border-slate-200/60 rounded-[2.5rem] p-8 sm:p-10 shadow-sm space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                  <Landmark size={20} />
                </div>
                <h2 className="text-xl font-black text-slate-950 tracking-tight">Withdraw Funds</h2>
              </div>

              {withdrawMsg && (
                <div className={`flex items-start gap-3 p-4 rounded-xl border text-sm font-semibold ${
                  withdrawMsg.type === "error"
                    ? "bg-rose-50 border-rose-100 text-rose-700"
                    : "bg-emerald-50 border-emerald-100 text-emerald-700"
                }`}>
                  {withdrawMsg.type === "error" ? (
                    <XCircle size={18} className="shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                  )}
                  <span>{withdrawMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleWithdrawSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-3">
                      Amount (Min. ₹100)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      value={withdrawForm.amount}
                      onChange={(e) => setWithdrawForm(p => ({ ...p, amount: e.target.value }))}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-slate-400 focus:bg-white text-slate-800 transition-all font-medium text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-3">
                      UPI ID (for transfer)
                    </label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      value={withdrawForm.upiId}
                      onChange={(e) => setWithdrawForm(p => ({ ...p, upiId: e.target.value }))}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-slate-400 focus:bg-white text-slate-800 transition-all font-medium text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || (wallet?.balance || 0) < 100}
                  className="w-full py-4 bg-slate-950 hover:bg-blue-600 text-white rounded-xl font-black uppercase text-xs tracking-[0.25em] transition-all active:scale-[0.98] shadow-lg shadow-slate-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  {submitting ? "Sending..." : "Submit Payout Request"} <ArrowUpRight size={16} strokeWidth={2.5} />
                </button>
              </form>
            </motion.div>
          </div>

          {/* Right Column: Transaction History */}
          <div className="md:col-span-5">
            <motion.div
              variants={cardVariants}
              className="bg-white border border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm h-full flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                  <ReceiptText size={20} />
                </div>
                <h2 className="text-xl font-black text-slate-950 tracking-tight">Recent Activity</h2>
              </div>

              {/* Transactions Timeline */}
              <div className="flex-1 overflow-y-auto max-h-[400px] pr-2 space-y-5">
                <AnimatePresence>
                  {transactions.map((tx, idx) => {
                    const isCredit = tx.type === "cashback" || tx.type === "refund" || tx.type === "credit";
                    const isPending = tx.type === "withdrawal"; // withdrawal is pending until resolved
                    const isApproved = tx.type === "approved";
                    const isDebit = tx.type === "debit";

                    let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
                    let badgeClass = "bg-emerald-50 text-emerald-700 border-emerald-100";
                    if (isPending) {
                      icon = <AlertCircle className="w-5 h-5 text-amber-500" />;
                      badgeClass = "bg-amber-50 text-amber-600 border-amber-100";
                    } else if (isApproved) {
                      icon = <CheckCircle2 className="w-5 h-5 text-indigo-500" />;
                      badgeClass = "bg-indigo-50 text-indigo-700 border-indigo-100";
                    } else if (tx.type === "rejected") {
                      icon = <XCircle className="w-5 h-5 text-rose-500" />;
                      badgeClass = "bg-rose-50 text-rose-700 border-rose-100";
                    }

                    return (
                      <motion.div
                        key={tx._id || idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-4 p-4 hover:bg-slate-50/50 border border-slate-100 rounded-2xl transition-colors"
                      >
                        <div className="flex-shrink-0 mt-0.5">{icon}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 leading-tight mb-1">{tx.description}</p>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase">
                            {tx.date ? new Date(tx.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : "—"}
                          </span>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-black border ${badgeClass}`}>
                            {(isDebit || isPending) ? "-" : "+"}₹{tx.amount}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {transactions.length === 0 && (
                  <div className="h-full flex flex-col justify-center items-center py-20 text-center text-slate-400">
                    <ReceiptText size={40} className="text-slate-300 mb-3" />
                    <p className="text-xs font-bold uppercase tracking-wider">No transactions yet</p>
                    <p className="text-[11px] font-medium max-w-[180px] mt-1">Cashback from online purchases will show up here.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Wallet;
