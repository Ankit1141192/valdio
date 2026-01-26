import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import products from "../config/Product.json";
import { useCart } from "../context/CartContext.jsx";

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
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-[Poppins]">Your Cart</h1>
          <p className="text-gray-600 mt-1">Items saved locally on this device.</p>
        </div>
        {rows.length ? (
          <button
            onClick={clearCart}
            className="text-sm font-semibold text-red-600 hover:text-red-800 underline"
          >
            Clear cart
          </button>
        ) : null}
      </div>

      {!rows.length ? (
        <div className="bg-white border rounded-2xl p-10 text-center">
          <p className="text-gray-600 mb-6">Your cart is empty.</p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {rows.map(({ product, qty, price }) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-xl bg-gray-50"
                />
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/products/${product.id}`}
                    className="font-semibold text-gray-900 hover:underline line-clamp-2"
                  >
                    {product.name}
                  </Link>
                  <div className="text-sm text-gray-600 mt-1">
                    ₹{price.toLocaleString()} <span className="text-gray-400">each</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => setQty(product.id, e.target.value)}
                    className="w-20 border rounded-lg px-2 py-1 text-sm"
                    aria-label="Quantity"
                  />
                  <div className="w-28 text-right font-semibold text-gray-900">
                    ₹{(price * qty).toLocaleString()}
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-700"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 h-fit">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Checkout isn’t connected to a payment gateway yet. Use “Buy Now” on a product to
              purchase via the external link.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex w-full items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;


