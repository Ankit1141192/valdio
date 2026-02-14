import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import products from "../config/Product.json";
import { useCart } from "../context/CartContext.jsx";
import BrowseProductsButton from "../components/BrowseProductsButton";

const Cart = () => {
  const { items, setQty, removeFromCart, clearCart } = useCart();

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Cart</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your premium selections.</p>
        </div>
        {rows.length ? (
          <button
            onClick={clearCart}
            className="text-xs font-black uppercase tracking-widest text-rose-500 hover:text-rose-700 transition-colors"
          >
            Clear cart
          </button>
        ) : null}
      </div>

      {!rows.length ? (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-20 text-center shadow-sm">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
              <ShoppingCart size={48} />
            </div>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">Your cart is feeling light</h2>
          <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">
            Explore our curated collections and discover something extraordinary for your space.
          </p>
          <div className="flex justify-center">
            <BrowseProductsButton text="Discover Products" />
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {rows.map(({ product, qty, price }) => (
              <div
                key={product.id}
                className="bg-white border border-slate-100 rounded-[1.5rem] p-6 flex gap-6 items-center hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 flex-shrink-0 bg-slate-50 rounded-2xl overflow-hidden p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/products/${product.id}`}
                    className="text-lg font-bold text-slate-900 hover:text-primary transition-colors line-clamp-1"
                  >
                    {product.name}
                  </Link>
                  <div className="text-sm text-slate-400 mt-1 font-bold tracking-wider uppercase">
                    {product.category}
                  </div>
                  <div className="text-base font-black text-slate-900 mt-2">
                    ₹{price.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                    <button
                      onClick={() => setQty(product.id, Math.max(1, qty - 1))}
                      className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-slate-900">{qty}</span>
                    <button
                      onClick={() => setQty(product.id, qty + 1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <div className="w-32 text-right font-black text-xl text-slate-950">
                    ₹{(price * qty).toLocaleString()}
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-3 rounded-full hover:bg-rose-50 text-slate-300 hover:text-rose-500 transition-all"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 h-fit shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Subtotal</span>
                <span className="text-slate-900 font-black">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Shipping</span>
                <span className="text-emerald-600 font-black uppercase text-xs tracking-widest">Calculated at next step</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between">
                <span className="text-lg font-black text-slate-900">Total</span>
                <span className="text-2xl font-black text-slate-950">₹{subtotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => alert("Checkout system is being prepared. Please check back soon!")}
              className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-[0.2em] shadow-xl hover:bg-primary transition-all active:scale-95"
            >
              Secure Checkout
            </button>
            <Link
              to="/products"
              className="mt-4 flex w-full items-center justify-center text-slate-400 hover:text-slate-900 font-bold text-sm transition-colors"
            >
              Continue Shopping ↗
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;


