'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { count } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-emerald-700">
            🏫 Crestwood Companion
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/timetable" className="text-gray-700 hover:text-emerald-600">📅 Timetable</Link>
            <Link href="/map" className="text-gray-700 hover:text-emerald-600">🗺️ Map</Link>
            <Link href="/canteen" className="text-gray-700 hover:text-emerald-600">🍽️ Canteen</Link>
            <Link href="/recommend" className="text-gray-700 hover:text-emerald-600">🤖 Recommend</Link>
            <Link href="/lost-found" className="text-gray-700 hover:text-emerald-600">🔍 Lost & Found</Link>

            <Link href="/cart" className="relative">
              🛒
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}