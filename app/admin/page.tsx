"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Size = { label: string; price: number };
type Product = {
  id: string;
  name: string;
  category: string;
  desc: string;
  image: string;
  sizes: Size[];
};

type OrderItem = {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  name: string;
  phone: string;
  delivery: string;
  address: string;
  reference: string;
  items: OrderItem[];
  total: number;
  status: "Pending" | "Paid" | "Processing" | "Out for Delivery" | "Delivered" | "Cancelled";
};

const DEFAULT_PRODUCTS: Product[] = [
  { id: "tea_ginger", name: "Ginger Tea", category: "Teas", desc: "Warming digestive tea.", image: "ginger.png", sizes: [{ label: "Box of 25 sachets", price: 80 }] },
  { id: "tea_peppermint", name: "Peppermint Tea", category: "Teas", desc: "Cooling and clarifying.", image: "peppermint.png", sizes: [{ label: "Box of 25 sachets", price: 80 }] },
  { id: "tea_moringa", name: "Moringa Tea", category: "Teas", desc: "Nutrient-dense superfood leaves.", image: "moringa.png", sizes: [{ label: "Box of 25 sachets", price: 80 }] },
  { id: "tea_hibiscus", name: "Hibiscus Tea", category: "Teas", desc: "Tart floral tea.", image: "hibiscus.png", sizes: [{ label: "Box of 25 sachets", price: 80 }] },
  { id: "tea_avocado", name: "Avocado Leaf Tea", category: "Teas", desc: "Gentle and nourishing.", image: "avocado.png", sizes: [{ label: "Box of 25 sachets", price: 80 }] },
  { id: "tea_lemongrass", name: "Lemongrass Tea", category: "Teas", desc: "Uplifting citrus notes.", image: "lemongrass.png", sizes: [{ label: "Box of 25 sachets", price: 80 }] },
  { id: "hibiscus_loose", name: "Infused Hibiscus Flowers", category: "Teas", desc: "Best-seller. Infused with cloves & cinnamon.", image: "hibiscus_loose.png", sizes: [{ label: "250g", price: 120 }] },
  { id: "coffee_kilimanjaro", name: "Kilimanjaro Arabica", category: "Coffee", desc: "Pure Arabica beans.", image: "coffee.png", sizes: [{ label: "250g whole beans", price: 140 }] },
  { id: "cookies_almond", name: "Almond Seed Cookies", category: "Snacks", desc: "No sugar. No flour.", image: "cookies.png", sizes: [{ label: "Pack of 8", price: 80 }, { label: "Pack of 16", price: 150 }] },
  { id: "cookies_coconut", name: "Coconut Cookies", category: "Snacks", desc: "Sugar-free & gluten-free.", image: "coconut_cookies.png", sizes: [{ label: "Pack of 8", price: 80 }, { label: "Pack of 16", price: 160 }] },
  { id: "granola_menopause", name: "Menopause Seed Granola", category: "Snacks", desc: "Hormone-supportive.", image: "menopause_granola.png", sizes: [{ label: "300g", price: 150 }, { label: "600g", price: 250 }] },
  { id: "seed_crackers", name: "Seed Crackers", category: "Snacks", desc: "Crispy flax, pumpkin & sesame.", image: "seed_crackers.png", sizes: [{ label: "Pack of 12", price: 80 }, { label: "Pack of 24", price: 160 }] },
  { id: "coconut_clusters", name: "Coconut Seed Clusters", category: "Snacks", desc: "Crunchy clusters.", image: "coconut_clusters.png", sizes: [{ label: "200g", price: 60 }, { label: "400g", price: 100 }] },
  { id: "butter_almond", name: "Almond Butter", category: "Snacks", desc: "100% pure almonds.", image: "almond_butter.png", sizes: [{ label: "250g", price: 60 }, { label: "350g", price: 100 }] },
  { id: "butter_cashew", name: "Cashew Butter", category: "Snacks", desc: "Smooth pure cashew butter.", image: "cashew_butter.png", sizes: [{ label: "250g", price: 100 }, { label: "350g", price: 150 }] },
  { id: "butter_mixed", name: "Mixed Nut Butter", category: "Snacks", desc: "Mixed nuts & seeds.", image: "mixed_butter.png", sizes: [{ label: "250g", price: 100 }, { label: "350g", price: 150 }] },
  { id: "flour_almond", name: "Almond Flour", category: "Powders", desc: "Finely milled.", image: "almond_flour.png", sizes: [{ label: "250g", price: 80 }] },
  { id: "flour_coconut", name: "Coconut Flour", category: "Powders", desc: "High-fibre, low-carb.", image: "coconut_flour.png", sizes: [{ label: "250g", price: 80 }] },
  { id: "powder_baobab", name: "Baobab Powder", category: "Powders", desc: "Vitamin C rich.", image: "baobab.png", sizes: [{ label: "100g", price: 80 }, { label: "250g", price: 150 }] },
  { id: "honey_ginger", name: "Ginger Infused Honey", category: "Honeys", desc: "Raw honey + ginger.", image: "honey_ginger.png", sizes: [{ label: "250g", price: 50 }] },
  { id: "honey_turmeric", name: "Turmeric Infused Honey", category: "Honeys", desc: "Raw honey + turmeric.", image: "honey_turmeric.png", sizes: [{ label: "250g", price: 50 }] },
  { id: "honey_lemon_cinnamon", name: "Lemon & Cinnamon Infused Honey", category: "Honeys", desc: "Supports immunity.", image: "honey_lemon_cinnamon.png", sizes: [{ label: "250g", price: 50 }] },
  { id: "oil_coconut", name: "Virgin Coconut Oil", category: "Oils", desc: "Cold-pressed.", image: "coconut_oil.png", sizes: [{ label: "250ml", price: 150 }] },
  { id: "oil_olive", name: "Extra Virgin Olive Oil", category: "Oils", desc: "Premium cold-pressed.", image: "olive_oil.png", sizes: [{ label: "250ml", price: 200 }] },
  { id: "oil_avocado", name: "Avocado Oil", category: "Oils", desc: "Pure cold-pressed.", image: "avocado_oil.png", sizes: [{ label: "250ml", price: 200 }] },
  { id: "eo_headache", name: "Headache Relief Blend", category: "Essential Oils", desc: "Eases tension.", image: "eo_headache.png", sizes: [{ label: "10ml", price: 120 }] },
  { id: "eo_joint", name: "Joint Pain Relief Blend", category: "Essential Oils", desc: "Supports joints.", image: "eo_joint.png", sizes: [{ label: "10ml", price: 120 }] },
  { id: "eo_stress", name: "Stress & Insomnia Blend", category: "Essential Oils", desc: "Calming.", image: "eo_stress.png", sizes: [{ label: "10ml", price: 120 }] },
  { id: "eo_menopause", name: "Menopause Support Blend", category: "Essential Oils", desc: "Balancing.", image: "eo_menopause.png", sizes: [{ label: "10ml", price: 120 }] },
  { id: "eo_prostate", name: "Prostate Health Blend", category: "Essential Oils", desc: "Supportive.", image: "eo_prostate.png", sizes: [{ label: "10ml", price: 120 }] },
  { id: "eo_flu", name: "Flu Relief Blend", category: "Essential Oils", desc: "Immune support.", image: "eo_flu.png", sizes: [{ label: "10ml", price: 120 }] },
  { id: "bath_lavender", name: "Lavender Bathing Tea", category: "Bathing", desc: "Calming floral soak.", image: "lavender.png", sizes: [{ label: "80g", price: 85 }] },
  { id: "bath_chamomile", name: "Chamomile Bathing Tea", category: "Bathing", desc: "Soft soothing flowers.", image: "chamomile.png", sizes: [{ label: "80g", price: 80 }] },
];

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tab, setTab] = useState<"orders" | "products">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [stock, setStock] = useState<{ [key: string]: number }>({});
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const savedOrders = localStorage.getItem("saina-orders");
    if (savedOrders) {
      try { setOrders(JSON.parse(savedOrders)); } catch (e) {}
    }

    const savedProducts = localStorage.getItem("saina-products");
    if (savedProducts) {
      try { setProducts(JSON.parse(savedProducts)); } catch (e) {}
    } else {
      localStorage.setItem("saina-products", JSON.stringify(DEFAULT_PRODUCTS));
    }

    const savedStock = localStorage.getItem("saina-stock");
    if (savedStock) {
      try {
        const parsed = JSON.parse(savedStock);
        const map: { [key: string]: number } = {};
        parsed.forEach((item: any) => { map[item.id] = item.stock; });
        setStock(map);
      } catch (e) {}
    }
  }, []);

  const saveOrders = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem("saina-orders", JSON.stringify(updated));
  };

  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem("saina-products", JSON.stringify(updated));
  };

  const saveStock = (newStock: { [key: string]: number }) => {
    setStock(newStock);
    const arr = Object.entries(newStock).map(([id, stock]) => ({ id, stock }));
    localStorage.setItem("saina-stock", JSON.stringify(arr));
  };

  const updateStatus = (orderId: string, status: Order["status"]) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    saveOrders(updated);
    if (selectedOrder?.id === orderId) setSelectedOrder({ ...selectedOrder, status });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "saina2026") setIsLoggedIn(true);
    else alert("Wrong password");
  };

  const updateProductSize = (productId: string, sizeIndex: number, field: "label" | "price", value: string | number) => {
    const updated = products.map((p) => {
      if (p.id !== productId) return p;
      const newSizes = [...p.sizes];
      newSizes[sizeIndex] = { ...newSizes[sizeIndex], [field]: field === "price" ? Number(value) : value };
      return { ...p, sizes: newSizes };
    });
    saveProducts(updated);
    if (editingProduct?.id === productId) {
      setEditingProduct(updated.find((p) => p.id === productId) || null);
    }
  };

  const filteredOrders = filter === "All" ? orders : orders.filter((o) => o.status === filter);
  const totalSales = orders
    .filter((o) => ["Paid", "Processing", "Out for Delivery", "Delivered"].includes(o.status))
    .reduce((sum, o) => sum + o.total, 0);

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#F8F5F0] flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow max-w-sm w-full">
          <h1 className="text-2xl font-serif text-[#2F3E2F] mb-6 text-center">Saina Admin</h1>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter admin password" className="w-full border rounded-lg px-3 py-2 mb-4" />
          <button type="submit" className="w-full bg-[#2F3E2F] text-white py-2.5 rounded-lg">Login</button>
          <p className="text-xs text-gray-500 mt-4 text-center">Password: saina2026</p>
        </form>
      </main>
    );
  }

  // RECEIPT VIEW
  if (selectedOrder) {
    return (
      <main className="min-h-screen bg-[#F8F5F0] py-10">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-serif text-[#2F3E2F]">Saina Naturals</h1>
            <p className="text-sm text-gray-500">Athena Gardens, Notwane, Gaborone</p>
            <p className="text-sm text-gray-500">Tel: 267 74 501 880</p>
          </div>
          <div className="border-t border-b py-4 mb-4 text-sm">
            <p><strong>Receipt #:</strong> {selectedOrder.id.slice(-6)}</p>
            <p><strong>Date:</strong> {selectedOrder.date}</p>
            <p><strong>Customer:</strong> {selectedOrder.name}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Payment Ref:</strong> {selectedOrder.reference}</p>
          </div>
          <div className="mb-4">
            {selectedOrder.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm py-1">
                <span>{item.name} ({item.size}) × {item.quantity}</span>
                <span>P {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>P {selectedOrder.total}</span>
          </div>
          <div className="mt-8 flex gap-3">
            <button onClick={() => window.print()} className="flex-1 bg-[#2F3E2F] text-white py-2.5 rounded-lg">Print Receipt</button>
            <button onClick={() => setSelectedOrder(null)} className="flex-1 border py-2.5 rounded-lg">Back</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      <header className="bg-[#F3EEE6] border-b sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-serif text-xl text-[#2F3E2F]">Saina Admin</h1>
          <div className="flex gap-4 items-center">
            <button onClick={() => setTab("orders")} className={`text-sm ${tab === "orders" ? "font-bold text-[#2F3E2F]" : "text-gray-500"}`}>Orders</button>
            <button onClick={() => setTab("products")} className={`text-sm ${tab === "products" ? "font-bold text-[#2F3E2F]" : "text-gray-500"}`}>Products & Prices</button>
            <Link href="/shop" className="text-sm text-[#5C6B4E]">Shop</Link>
            <button onClick={() => setIsLoggedIn(false)} className="text-sm text-red-600">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* ========== ORDERS TAB ========== */}
        {tab === "orders" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl p-4 border">
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-semibold text-[#2F3E2F]">{orders.length}</p>
              </div>
              <div className="bg-white rounded-xl p-4 border">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-semibold text-yellow-600">{orders.filter(o => o.status === "Pending").length}</p>
              </div>
              <div className="bg-white rounded-xl p-4 border">
                <p className="text-sm text-gray-500">Paid</p>
                <p className="text-2xl font-semibold text-green-600">{orders.filter(o => o.status === "Paid").length}</p>
              </div>
              <div className="bg-white rounded-xl p-4 border">
                <p className="text-sm text-gray-500">Confirmed Sales</p>
                <p className="text-2xl font-semibold text-[#2F3E2F]">P {totalSales}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {["All", "Pending", "Paid", "Processing", "Out for Delivery", "Delivered", "Cancelled"].map((s) => (
                <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-full text-sm ${filter === s ? "bg-[#2F3E2F] text-white" : "bg-white border"}`}>
                  {s}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-xl border p-10 text-center text-gray-500">No orders found.</div>
              ) : (
                filteredOrders.slice().reverse().map((order) => (
                  <div key={order.id} className="bg-white rounded-xl border p-5">
                    <div className="flex flex-wrap justify-between gap-3 mb-3">
                      <div>
                        <p className="font-medium text-[#2F3E2F]">{order.name}</p>
                        <p className="text-sm text-gray-600">{order.phone}</p>
                        <p className="text-xs text-gray-400">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">P {order.total}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                          order.status === "Paid" ? "bg-green-100 text-green-800" :
                          order.status === "Delivered" ? "bg-blue-100 text-blue-800" :
                          order.status === "Cancelled" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
                        }`}>{order.status}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      {order.items.map((item, i) => (
                        <div key={i}>{item.name} ({item.size}) × {item.quantity}</div>
                      ))}
                      <p className="mt-1"><strong>Ref:</strong> {order.reference}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setSelectedOrder(order)} className="text-xs bg-[#2F3E2F] text-white px-3 py-1.5 rounded">View Receipt</button>
                      {order.status === "Pending" && <button onClick={() => updateStatus(order.id, "Paid")} className="text-xs bg-green-600 text-white px-3 py-1.5 rounded">Confirm Payment</button>}
                      {order.status === "Paid" && <button onClick={() => updateStatus(order.id, "Processing")} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded">Mark Processing</button>}
                      {order.status === "Processing" && <button onClick={() => updateStatus(order.id, "Out for Delivery")} className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded">Out for Delivery</button>}
                      {(order.status === "Out for Delivery" || order.status === "Processing") && <button onClick={() => updateStatus(order.id, "Delivered")} className="text-xs bg-teal-600 text-white px-3 py-1.5 rounded">Mark Delivered</button>}
                      {order.status !== "Cancelled" && order.status !== "Delivered" && <button onClick={() => updateStatus(order.id, "Cancelled")} className="text-xs border border-red-300 text-red-600 px-3 py-1.5 rounded">Cancel</button>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* ========== PRODUCTS TAB ========== */}
        {tab === "products" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">Change prices and sizes here. Changes appear immediately on the shop.</p>

            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl border p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium text-[#2F3E2F]">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-gray-500">Stock:</label>
                    <input
                      type="number"
                      min="0"
                      value={stock[product.id] ?? ""}
                      placeholder="∞"
                      onChange={(e) => {
                        const val = e.target.value === "" ? undefined : Number(e.target.value);
                        const newStock = { ...stock };
                        if (val === undefined) delete newStock[product.id];
                        else newStock[product.id] = val;
                        saveStock(newStock);
                      }}
                      className="w-20 border rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>

                {product.sizes.map((size, idx) => (
                  <div key={idx} className="flex gap-3 items-center mb-2">
                    <input
                      type="text"
                      value={size.label}
                      onChange={(e) => updateProductSize(product.id, idx, "label", e.target.value)}
                      className="flex-1 border rounded px-3 py-1.5 text-sm"
                      placeholder="Size label"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-sm">P</span>
                      <input
                        type="number"
                        value={size.price}
                        onChange={(e) => updateProductSize(product.id, idx, "price", e.target.value)}
                        className="w-24 border rounded px-3 py-1.5 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}