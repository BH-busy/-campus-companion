'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, total, count } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">🛒 Your Cart</h1>
          <div className="bg-white rounded-2xl shadow p-12">
            <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
            <Link href="/canteen" className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700">
              Browse Canteen Menu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🛒 Your Cart ({count} items)</h1>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="divide-y">
            {items.map(item => (
              <div key={item.name} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                  <p className="text-emerald-600 font-bold">€{item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.name, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.name, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="text-red-500 hover:text-red-700 text-sm ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-emerald-600">€{total.toFixed(2)}</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="px-6 py-2 border border-red-300 text-red-600 rounded-xl hover:bg-red-50"
              >
                Clear Cart
              </button>
              <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 flex-1">
                Checkout →
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}