import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo1.png";

/* ─── Floating Label Input ──────────────────────────────────────────────── */
const FloatingInput = ({ id, name, type = "text", value, onChange, label, required, autoComplete, children }) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

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
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

/* ─── Animated Orb (decorative background) ─────────────────────────────── */
const Orb = ({ className }) => (
  <div className={`absolute rounded-full blur-[80px] opacity-30 pointer-events-none ${className}`} />
);

/* ─── Trust badges ──────────────────────────────────────────────────────── */
const badges = [
  { icon: "🔒", text: "256-bit SSL encryption" },
  { icon: "⚡", text: "Instant cashback" },
  { icon: "🏆", text: "Trusted by 50,000+ users" },
];

/* ─────────────────────────────────────────────────────────────────────────
   LOGIN PAGE
   ───────────────────────────────────────────────────────────────────────── */
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [shake, setShake] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      if (user.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      setError(err.message);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-display">

      {/* ── Left panel (brand) ─────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[46%] xl:w-[42%] relative flex-col justify-between p-12 bg-slate-950 overflow-hidden select-none">
        {/* Ambient orbs */}
        <Orb className="w-96 h-96 bg-indigo-600 -top-24 -left-24" />
        <Orb className="w-72 h-72 bg-violet-500 bottom-20 right-0" />
        <Orb className="w-48 h-48 bg-sky-400 top-1/2 left-1/3" />

        {/* Logo */}
        <div className="relative z-10">
          <img src={logo} alt="Valdio" className="h-14 w-auto object-contain" />
        </div>

        {/* Hero copy */}
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/70 text-xs font-semibold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live cashback rewards
          </div>
          <h2 className="text-4xl xl:text-5xl font-black text-white leading-[1.1] tracking-tight">
            Spend smarter.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              Earn every time.
            </span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-xs">
            Valdio turns your everyday purchases into cashback — automatically, instantly, without the clutter.
          </p>

          {/* Floating stat card */}
          <div className="flex items-center gap-4 bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-4 w-fit">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-xl">💸</div>
            <div>
              <p className="text-white font-black text-lg leading-none">₹2,40,000+</p>
              <p className="text-slate-400 text-xs mt-0.5">paid out this month</p>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="relative z-10 flex flex-col gap-3">
          {badges.map((b) => (
            <div key={b.text} className="flex items-center gap-2.5 text-slate-400 text-xs font-medium">
              <span className="text-base">{b.icon}</span>
              {b.text}
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel (form) ─────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-slate-50">
        <div className="w-full max-w-[400px]">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <img src={logo} alt="Valdio" className="h-14 mx-auto object-contain" />
          </div>

          {/* Header */}
          <div className="mb-9">
            <h1 className="text-3xl font-black text-slate-950 tracking-tight leading-tight">
              Welcome back
            </h1>
            <p className="text-slate-400 text-sm font-medium mt-2">
              Sign in to your Valdio account to continue
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className={`flex items-start gap-3 bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3.5 text-rose-600 text-sm font-semibold mb-6 ${shake ? "animate-[shake_0.4s_ease]" : ""}`}
            >
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            <FloatingInput
              id="login-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              label="Email address"
              required
              autoComplete="email"
            />

            <div className="relative">
              <FloatingInput
                id="login-password"
                name="password"
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                label="Password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                <EyeIcon visible={showPass} />
              </button>
            </div>

            {/* Forgot link */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="
                relative w-full py-4 mt-2 rounded-2xl font-black text-sm tracking-[0.18em] uppercase
                bg-slate-950 text-white overflow-hidden
                transition-all duration-200
                hover:bg-indigo-600
                active:scale-[0.98]
                disabled:opacity-60 disabled:pointer-events-none
                flex items-center justify-center gap-2.5
              "
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] text-slate-400 font-semibold tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* OTP option */}
          <button
            type="button"
            className="
              w-full py-3.5 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold text-sm
              flex items-center justify-center gap-2.5
              hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50
              transition-all duration-200 active:scale-[0.98]
            "
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12.01" y2="18" strokeLinecap="round" strokeWidth="2.5"/>
            </svg>
            Continue with OTP
          </button>

          {/* Footer */}
          <p className="text-center mt-8 text-sm text-slate-400 font-medium">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-slate-900 font-black hover:text-indigo-600 transition-colors underline underline-offset-4 decoration-slate-300 hover:decoration-indigo-400"
            >
              Create one
            </Link>
          </p>

          <p className="text-center mt-6 text-[11px] text-slate-300 leading-relaxed">
            By signing in you agree to our{" "}
            <Link to="/terms" className="underline hover:text-slate-500 transition-colors">Terms</Link>
            {" "}and{" "}
            <Link to="/privacy" className="underline hover:text-slate-500 transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>

      {/* Shake keyframe */}
      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-6px)}
          40%{transform:translateX(6px)}
          60%{transform:translateX(-4px)}
          80%{transform:translateX(4px)}
        }
      `}</style>
    </div>
  );
};

export default Login;