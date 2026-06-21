import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import homeData from "../../config/homeData.json";

const EMPTY = {
  name: "", category: "", price: "", discountPrice: "", discountRate: "",
  image: "", shortLink: "", fullLink: "", description: "",
  features: "", rating: "", totalReviews: "", ratingText: "", reviewText: "",
  partner: "Amazon"
};

const AdminProducts = () => {
  const { authFetch, API } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // null | "add" | "edit"
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [msg, setMsg] = useState("");

  const fetchProducts = () => {
    setLoading(true);
    fetch(`${API}/products`)
      .then((r) => r.json())
      .then((d) => setProducts(d.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm(EMPTY); setEditId(null); setModal("add"); };
  const openEdit = (p) => {
    setForm({
      name: p.name || "", category: p.category || "",
      price: p.price || "", discountPrice: p.discountPrice || "",
      discountRate: p.discountRate || "", image: p.image || "",
      shortLink: p.shortLink || "", fullLink: p.fullLink || "",
      description: p.description || "",
      features: (p.features || []).join(", "),
      rating: p.rating || "", totalReviews: p.totalReviews || "",
      ratingText: p.ratingText || "", reviewText: p.reviewText || "",
      partner: p.partner || "Amazon"
    });
    setEditId(p._id);
    setModal("edit");
  };
  const closeModal = () => { setModal(null); setForm(EMPTY); setEditId(null); };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const buildPayload = () => ({
    ...form,
    price: Number(form.price),
    discountPrice: Number(form.discountPrice),
    discountRate: Number(form.discountRate),
    rating: Number(form.rating),
    totalReviews: Number(form.totalReviews),
    features: form.features.split(",").map((f) => f.trim()).filter(Boolean)
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = buildPayload();
      const url = modal === "edit" ? `${API}/products/${editId}` : `${API}/products`;
      const method = modal === "edit" ? "PUT" : "POST";
      const r = await authFetch(url, { method, body: JSON.stringify(payload) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message || "Failed");
      setMsg(modal === "edit" ? "✅ Product updated!" : "✅ Product created!");
      closeModal();
      fetchProducts();
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const handleDelete = async (id) => {
    const r = await authFetch(`${API}/products/${id}`, { method: "DELETE" });
    if (r.ok) { setMsg("🗑️ Product deleted"); fetchProducts(); }
    setDeleteConfirm(null);
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 font-sans"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-950 mb-1.5 tracking-tight">Products</h1>
          <p className="text-slate-400 font-medium text-sm">{products.length} total products in database</p>
        </div>
        <button
          id="admin-add-product"
          onClick={openAdd}
          className="bg-slate-950 hover:bg-blue-600 text-white rounded-xl font-black uppercase text-xs tracking-[0.2em] px-6 py-3.5 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-slate-200 flex items-center justify-center cursor-pointer flex-shrink-0"
        >
          + Add Product
        </button>
      </div>

      {msg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4.5 rounded-2xl border text-sm font-semibold ${
            msg.startsWith("❌")
              ? "bg-rose-50 border-rose-100 text-rose-700"
              : "bg-emerald-50 border-emerald-100 text-emerald-700"
          }`}
        >
          {msg}
        </motion.div>
      )}

      <div className="relative">
        <input
          id="admin-product-search"
          placeholder="🔍 Search products by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200/80 rounded-2xl px-6 py-4 outline-none focus:border-slate-400 focus:bg-white transition-all text-slate-800 placeholder:text-slate-300 font-medium shadow-sm"
        />
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <div className="w-8 h-8 rounded-full border-3 border-slate-100 border-t-blue-500 animate-spin" />
          <span className="ml-3 text-slate-400 text-sm font-bold">Loading products…</span>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-slate-200/60 overflow-hidden shadow-sm overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/60">
                {["Image", "Name", "Category", "Price", "Discount", "Rating", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-4.5 text-left text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, index) => (
                <tr key={p._id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-xl border border-slate-100 bg-slate-50" />
                  </td>
                  <td className="px-6 py-4 max-w-[240px]">
                    <div className="font-bold text-slate-900 truncate" title={p.name}>{p.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-blue-100/60">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-black text-slate-900">₹{p.price.toLocaleString("en-IN")}</div>
                    {p.discountPrice && p.discountPrice !== p.price && (
                      <div className="text-[10px] text-slate-400 line-through font-medium">₹{p.discountPrice.toLocaleString("en-IN")}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-rose-100/60">
                      {p.discountRate}% OFF
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                    ⭐ <span className="font-bold text-slate-800">{p.rating}</span> ({p.totalReviews})
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-600 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(p._id)}
                        className="bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-slate-400 font-medium">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* AnimatePresence for Modals */}
      <AnimatePresence>
        {/* Delete confirm dialog */}
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-[1000] p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-100 rounded-[2.5rem] p-10 text-center max-w-sm w-full shadow-2xl"
            >
              <div className="text-3xl mb-4">⚠️</div>
              <h2 className="text-xl font-black text-slate-950 mb-2 tracking-tight">Delete Product?</h2>
              <p className="text-slate-400 font-medium text-sm mb-8">This action cannot be undone. This product will be permanently deleted.</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200/80 text-slate-600 rounded-xl font-bold uppercase text-[10px] tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold uppercase text-[10px] tracking-wider transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Add / Edit Modal */}
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-[1000] p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white border border-slate-100 rounded-[2.5rem] w-full max-w-[780px] max-h-[90vh] flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
                <h2 className="text-2xl font-black text-slate-950 tracking-tight">
                  {modal === "add" ? "Add New Product" : "Edit Product"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors cursor-pointer font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-8 overflow-y-auto flex-1 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: "name", label: "Product Name", placeholder: "e.g. Samsung Galaxy S24" },
                    { name: "category", label: "Category", placeholder: "e.g. Mobiles" },
                    { name: "price", label: "MRP Price (₹)", placeholder: "29999", type: "number" },
                    { name: "discountPrice", label: "Deal Price (₹)", placeholder: "24999", type: "number" },
                    { name: "discountRate", label: "Discount %", placeholder: "17", type: "number" },
                    { name: "rating", label: "Rating", placeholder: "4.5", type: "number" },
                    { name: "totalReviews", label: "Total Reviews", placeholder: "1200", type: "number" },
                    { name: "image", label: "Image URL", placeholder: "https://..." },
                    { name: "shortLink", label: "Short Affiliate Link", placeholder: "https://amzn.to/..." },
                    { name: "fullLink", label: "Full Affiliate Link", placeholder: "https://amazon.in/..." },
                    { name: "ratingText", label: "Rating Label", placeholder: "Excellent" },
                    { name: "reviewText", label: "Review Summary", placeholder: "Based on 1.2K ratings" }
                  ].map(({ name, label, placeholder, type = "text" }) => (
                    <div key={name} className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-3">
                        {label}
                      </label>
                      <input
                        name={name}
                        type={type}
                        value={form[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-slate-400 focus:bg-white text-slate-800 transition-all font-medium text-sm placeholder:text-slate-300"
                      />
                    </div>
                  ))}
                </div>

                {/* Full Width Fields */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-3">
                    Features (comma-separated)
                  </label>
                  <input
                    name="features"
                    value={form.features}
                    onChange={handleChange}
                    placeholder="Fast charging, 5G, AMOLED display"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-slate-400 focus:bg-white text-slate-800 transition-all font-medium text-sm placeholder:text-slate-300"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-3">
                    Partner Platform
                  </label>
                  <select
                    name="partner"
                    value={form.partner}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-slate-400 focus:bg-white text-slate-800 transition-all font-medium text-sm"
                  >
                    {(homeData.partners || [{ name: "Amazon" }, { name: "Flipkart" }]).map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-3">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Provide product description..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 outline-none focus:border-slate-400 focus:bg-white text-slate-800 transition-all font-medium text-sm placeholder:text-slate-300 resize-y"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-5 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200/80 text-slate-600 rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="admin-save-product"
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3.5 bg-slate-950 hover:bg-blue-600 text-white rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all active:scale-[0.98] shadow-lg shadow-slate-200 cursor-pointer disabled:opacity-70 disabled:pointer-events-none"
                >
                  {saving ? "Saving…" : modal === "add" ? "Create Product" : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminProducts;
