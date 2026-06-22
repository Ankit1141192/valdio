import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo1.png";
import SecurityIcon from "../assets/security.svg";
import MoneyIcon from "../assets/money.svg";
import TrackIcon from "../assets/dashboard.svg";

/* ─── Floating Label Input ──────────────────────────────────────────────── */
const FloatingInput = ({ id, name, type = "text", value, onChange, label, required, autoComplete, minLength, children }) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || (value && value.length > 0);

  return (
    <div className="relative mt-1">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        autoComplete={autoComplete}
        minLength={minLength}
        className={`
          peer w-full bg-white border-2 rounded-2xl px-5 pt-6 pb-2
          text-slate-800 font-medium text-sm outline-none transition-all duration-200
          placeholder-transparent
          ${focused
            ? "border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.08)]"
            : "border-slate-200 hover:border-slate-300"}
        `}
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-5 transition-all duration-200 pointer-events-none font-semibold
          ${lifted
            ? "text-[10px] top-2.5 text-indigo-500 tracking-widest uppercase"
            : "text-sm top-4 text-slate-400"}
        `}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

/* ─── Eye Toggle ────────────────────────────────────────────────────────── */
const EyeIcon = ({ visible }) =>
  visible ? (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20C6.48 20 2 12 2 12a17.6 17.6 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c5.52 0 10 8 10 8a17.72 17.72 0 01-2.38 3.44M3 3l18 18" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

/* ─── Password strength meter ───────────────────────────────────────────── */
const strengthConfig = [
  { label: "Too short", color: "bg-red-400" },
  { label: "Weak",      color: "bg-orange-400" },
  { label: "Fair",      color: "bg-yellow-400" },
  { label: "Good",      color: "bg-emerald-400" },
  { label: "Strong",    color: "bg-emerald-500" },
];

const getStrength = (pw) => {
  if (!pw || pw.length < 6) return 0;
  let s = 1;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4);
};

const PasswordStrength = ({ password }) => {
  if (!password) return null;
  const level = getStrength(password);
  const cfg = strengthConfig[level];
  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i < level ? cfg.color : "bg-slate-200"
            }`}
          />
        ))}
      </div>
      <p className={`text-[11px] font-semibold ${level <= 1 ? "text-red-500" : level === 2 ? "text-yellow-600" : "text-emerald-600"}`}>
        {cfg.label} password
      </p>
    </div>
  );
};

/* ─── Orb ───────────────────────────────────────────────────────────────── */
const Orb = ({ className }) => (
  <div className={`absolute rounded-full blur-[80px] opacity-30 pointer-events-none ${className}`} />
);

const perks = [
  { icon: MoneyIcon, title: "Instant cashback", desc: "Earn back on every purchase automatically" },
  { icon: SecurityIcon, title: "Bank-grade security", desc: "Your data is encrypted end-to-end" },
  { icon: TrackIcon, title: "Smart insights", desc: "Track spending & savings in one place" },
];

/* ─────────────────────────────────────────────────────────────────────────
   REGISTER PAGE
   ───────────────────────────────────────────────────────────────────────── */
const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) { setError("Please accept the terms to continue."); return; }
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      setSuccess("Account created! Taking you to login…");
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-display">

      {/* ── Left panel ─────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[46%] xl:w-[42%] relative flex-col justify-between p-12 bg-slate-950 overflow-hidden select-none">
        <Orb className="w-80 h-80 bg-violet-600 -top-16 -right-16" />
        <Orb className="w-72 h-72 bg-indigo-500 bottom-16 -left-16" />
        <Orb className="w-48 h-48 bg-sky-400 top-1/3 right-1/4" />

        <div className="relative z-10">
          <img src={logo} alt="Valdio" className="h-24 w-auto object-contain" />
        </div>

        <div className="relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/70 text-xs font-semibold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Join 50,000+ earners
          </div>
          <h2 className="text-4xl xl:text-5xl font-black text-white leading-[1.1] tracking-tight">
            Your wallet,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              working harder.
            </span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-xs">
            Sign up in under 60 seconds and start earning cashback on the brands you already love.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          {perks.map((p) => (
            <div key={p.title} className="flex items-start gap-4 bg-white/[0.05] border border-white/10 rounded-2xl p-4">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <img src={p.icon} alt={p.title} className="w-5 h-5 object-contain" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">{p.title}</p>
                <p className="text-slate-400 text-xs mt-0.5">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel (form) ─────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-slate-50">
        <div className="w-full max-w-[400px]">
          <div className="lg:hidden text-center mb-10">
            <img src={logo} alt="Valdio" className="h-14 mx-auto object-contain" />
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-950 tracking-tight leading-tight">
              Create your account
            </h1>
            <p className="text-slate-400 text-sm font-medium mt-2">
              Join Valdio and start earning cashback today
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-3 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3.5 text-rose-600 text-sm font-semibold mb-5">
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3.5 text-emerald-700 text-sm font-semibold mb-5">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <FloatingInput
              id="reg-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              label="Full name"
              required
              autoComplete="name"
            />
            <FloatingInput
              id="reg-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              label="Email address"
              required
              autoComplete="email"
            />
            <div>
              <div className="relative">
                <FloatingInput
                  id="reg-password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  label="Password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1"
                >
                  <EyeIcon visible={showPass} />
                </button>
              </div>
              <PasswordStrength password={form.password} />
            </div>

            <label className="flex items-start gap-3 cursor-pointer group mt-1">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <div className="w-5 h-5 mt-0.5 rounded-md border-2 border-slate-300 peer-checked:border-indigo-500 peer-checked:bg-indigo-500 transition-all flex items-center justify-center">
                {agreed && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <span className="text-xs text-slate-500 font-medium">
                I agree to the <Link to="/terms-of-service" className="text-indigo-600">Terms</Link> and <Link to="/privacy-policy" className="text-indigo-600">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-1 rounded-2xl font-black text-sm bg-slate-950 text-white hover:bg-indigo-600 disabled:opacity-60 transition-all"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-slate-900 font-black underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;