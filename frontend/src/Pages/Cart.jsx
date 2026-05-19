import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart, ArrowRight, Sparkles, Tag } from "lucide-react";
import products from "../config/Product.json";
import { useCart } from "../context/CartContext.jsx";
import BrowseProductsButton from "../components/BrowseProductsButton";

/* ─── Inline style block ─────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  .cart-root {
    --cream: #faf7f2;
    --ink: #1a1614;
    --accent: #c8622a;
    --accent-light: #f5ede6;
    --muted: #8a7f78;
    --border: #e8e0d8;
    --card-bg: #ffffff;
    --danger: #d94040;
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    min-height: 100vh;
  }

  .cart-header-title {
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .cart-item-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 20px;
    transition: box-shadow 0.25s ease, transform 0.25s ease;
    animation: slideUp 0.4s ease both;
  }
  .cart-item-card:hover {
    box-shadow: 0 12px 40px rgba(26,22,20,0.10);
    transform: translateY(-2px);
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .qty-btn {
    width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 1.1rem;
    border-radius: 8px;
    color: var(--muted);
    transition: background 0.15s, color 0.15s;
    cursor: pointer;
    border: none; background: transparent;
  }
  .qty-btn:hover { background: var(--accent-light); color: var(--accent); }

  .remove-btn {
    border: none; background: transparent; cursor: pointer;
    padding: 10px; border-radius: 50%;
    color: var(--border);
    transition: background 0.2s, color 0.2s, transform 0.2s;
  }
  .remove-btn:hover { background: #fff0f0; color: var(--danger); transform: scale(1.15); }

  .checkout-btn {
    width: 100%;
    padding: 18px;
    border-radius: 16px;
    border: none;
    background: var(--ink);
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(26,22,20,0.25);
  }
  .checkout-btn:hover { background: var(--accent); box-shadow: 0 8px 30px rgba(200,98,42,0.35); }
  .checkout-btn:active { transform: scale(0.98); }

  .clear-btn {
    background: none; border: none; cursor: pointer;
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--danger);
    opacity: 0.7; transition: opacity 0.2s;
    font-family: 'DM Sans', sans-serif;
    padding: 6px 0;
  }
  .clear-btn:hover { opacity: 1; }

  .summary-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 24px;
    position: sticky;
    top: 24px;
    overflow: hidden;
  }
  .summary-card-accent {
    height: 5px;
    background: linear-gradient(90deg, var(--accent), #e8943a);
  }

  .promo-input {
    flex: 1;
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 10px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    color: var(--ink);
    outline: none;
    transition: border-color 0.2s;
  }
  .promo-input:focus { border-color: var(--accent); }

  .promo-btn {
    background: var(--accent-light);
    border: none;
    border-radius: 10px;
    padding: 10px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--accent);
    cursor: pointer;
    transition: background 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .promo-btn:hover { background: var(--accent); color: white; }

  .empty-state {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 32px;
    text-align: center;
    padding: 80px 40px;
    animation: slideUp 0.5s ease;
  }
  .empty-icon-ring {
    width: 100px; height: 100px;
    border-radius: 50%;
    background: var(--cream);
    border: 2px dashed var(--border);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 28px;
    color: var(--border);
  }

  .badge-count {
    background: var(--accent);
    color: white;
    border-radius: 20px;
    padding: 2px 10px;
    font-size: 0.75rem;
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.04em;
    margin-left: 10px;
  }

  .product-img-wrap {
    width: 88px; height: 88px;
    flex-shrink: 0;
    background: var(--cream);
    border-radius: 16px;
    overflow: hidden;
    padding: 10px;
    border: 1px solid var(--border);
  }

  .divider-ornament {
    display: flex; align-items: center; gap: 12px;
    color: var(--border);
    font-size: 0.7rem; letter-spacing: 0.2em;
    text-transform: uppercase; font-weight: 700;
    margin: 4px 0;
  }
  .divider-ornament::before, .divider-ornament::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }

  /* Responsive */
  @media (max-width: 900px) {
    .cart-grid { display: flex !important; flex-direction: column !important; }
    .summary-card { position: static !important; }
  }
  @media (max-width: 600px) {
    .cart-item-inner { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; }
    .cart-item-right { width: 100% !important; justify-content: space-between !important; }
    .cart-item-price { display: none !important; }
    .product-img-wrap { width: 72px !important; height: 72px !important; }
  }
`;

/* ─── Component ──────────────────────────────────────────────── */
const Cart = () => {
  const { items, setQty, removeFromCart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const rows = useMemo(() => {
    return Object.entries(items || {})
      .map(([id, qty]) => {
        const product = products.find((p) => p.id === id);
        if (!product) return null;
        const price = product.discountPrice || product.price;
        return { product, qty: Number(qty) || 1, price };
      })
      .filter(Boolean);
  }, [items]);

  const subtotal = rows.reduce((sum, r) => sum + r.price * r.qty, 0);
  const itemCount = rows.reduce((n, r) => n + r.qty, 0);

  return (
    <div className="cart-root" style={{ padding: "0 16px" }}>
      <style>{STYLES}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", paddingTop: 48, paddingBottom: 80 }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>
              ✦ Shopping Bag
            </p>
            <h1 className="cart-header-title" style={{ fontSize: "clamp(2.4rem, 6vw, 3.8rem)", color: "var(--ink)" }}>
              Your Cart
              {rows.length > 0 && <span className="badge-count">{itemCount}</span>}
            </h1>
          </div>
          {rows.length > 0 && (
            <button className="clear-btn" onClick={clearCart}>
              ✕ Clear All
            </button>
          )}
        </div>

        {/* ── Empty State ── */}
        {!rows.length ? (
          <div className="empty-state">
            <div className="empty-icon-ring">
              <ShoppingCart size={40} strokeWidth={1.2} />
            </div>
            <h2 className="cart-header-title" style={{ fontSize: "2rem", color: "var(--ink)", marginBottom: 12 }}>
              Your bag is empty
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: 360, margin: "0 auto 36px", lineHeight: 1.7, fontSize: "0.95rem" }}>
              Explore our curated collection and find something extraordinary for your space.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <BrowseProductsButton text="Explore Products" />
            </div>
          </div>
        ) : (

          /* ── Cart Grid ── */
          <div className="cart-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 28, alignItems: "start" }}>

            {/* ── Left: Items ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {rows.map(({ product, qty, price }, idx) => (
                <div
                  key={product.id}
                  className="cart-item-card"
                  style={{ padding: "20px 24px", animationDelay: `${idx * 0.07}s` }}
                >
                  <div
                    className="cart-item-inner"
                    style={{ display: "flex", alignItems: "center", gap: 20 }}
                  >
                    {/* Image */}
                    <div className="product-img-wrap">
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link
                        to={`/products/${product.id}`}
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          color: "var(--ink)",
                          textDecoration: "none",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: 1.3,
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={e => e.target.style.color = "var(--accent)"}
                        onMouseLeave={e => e.target.style.color = "var(--ink)"}
                      >
                        {product.name}
                      </Link>
                      <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginTop: 4 }}>
                        {product.category}
                      </div>
                      <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginTop: 8 }}>
                        ₹{price.toLocaleString()}
                      </div>
                    </div>

                    {/* Right: qty + total + remove */}
                    <div className="cart-item-right" style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                      {/* Qty stepper */}
                      <div style={{
                        display: "flex", alignItems: "center", gap: 2,
                        background: "var(--cream)", borderRadius: 12,
                        border: "1px solid var(--border)", padding: "2px",
                      }}>
                        <button className="qty-btn" onClick={() => setQty(product.id, Math.max(1, qty - 1))}>−</button>
                        <span style={{ width: 28, textAlign: "center", fontWeight: 700, fontSize: "0.95rem", color: "var(--ink)" }}>{qty}</span>
                        <button className="qty-btn" onClick={() => setQty(product.id, qty + 1)}>+</button>
                      </div>

                      {/* Line total */}
                      <div className="cart-item-price" style={{ width: 96, textAlign: "right", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem", color: "var(--ink)" }}>
                        ₹{(price * qty).toLocaleString()}
                      </div>

                      {/* Remove */}
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(product.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue shopping */}
              <Link
                to="/products"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  marginTop: 8, color: "var(--muted)", fontSize: "0.85rem",
                  fontWeight: 600, textDecoration: "none", transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* ── Right: Summary ── */}
            <div className="summary-card">
              <div className="summary-card-accent" />
              <div style={{ padding: "28px 28px 32px" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.4rem", color: "var(--ink)", marginBottom: 24 }}>
                  Order Summary
                </h2>

                {/* Line items */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--muted)" }}>
                    <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
                    <span style={{ fontWeight: 700, color: "var(--ink)" }}>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--muted)" }}>
                    <span>Shipping</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2c9e60" }}>
                      Calculated at next step
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--muted)" }}>
                    <span>Tax</span>
                    <span style={{ fontWeight: 700, color: "var(--ink)" }}>Included</span>
                  </div>
                </div>

                {/* Promo */}
                <div style={{ margin: "20px 0" }}>
                  <div className="divider-ornament">Promo Code</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <input
                      className="promo-input"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value.toUpperCase())}
                    />
                    <button className="promo-btn">Apply</button>
                  </div>
                </div>

                {/* Total */}
                <div style={{
                  background: "var(--cream)",
                  borderRadius: 14,
                  padding: "16px 20px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  marginBottom: 24, border: "1px solid var(--border)",
                }}>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--muted)" }}>Estimated Total</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "1.6rem", color: "var(--ink)" }}>
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>

                {/* CTA */}
                <button
                  className="checkout-btn"
                  onClick={() => alert("Checkout system is being prepared. Please check back soon!")}
                >
                  <Sparkles size={16} />
                  Secure Checkout
                  <ArrowRight size={16} />
                </button>

                {/* Trust signals */}
                <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                  {["🔒 SSL Encrypted Payment", "📦 Free returns within 30 days", "✦ Premium packaging included"].map((text) => (
                    <div key={text} style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 500, textAlign: "center" }}>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
