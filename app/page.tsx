// app/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Campus Companion',
  description: 'Welcome to Crestwood University Campus Companion',
};

const features = [
  {
    title: 'Timetable',
    description: 'View your weekly class schedule and never miss a lecture.',
    href: '/timetable',
    color: 'emerald',
  },
  {
    title: 'Campus Map',
    description: 'Interactive map to help you navigate the university campus.',
    href: '/map',
    color: 'blue',
  },
  {
    title: 'Canteen',
    description: 'Browse today’s menu and plan your meals.',
    href: '/canteen',
    color: 'amber',
  },
  {
    title: 'Lost & Found',
    description: 'Report lost items or search for found belongings.',
    href: '/lost-found',
    color: 'rose',
  },
  {
    title: 'Meal Recommender',
    description:
      'Get personalized lunch suggestions based on your dietary preferences',
    href: '/recommend',
    color: 'green',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-700 to-emerald-800 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Welcome to Crestwood
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto">
            Your complete companion for university life at Crestwood University
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            Explore Campus Life
          </h2>
          <p className="text-gray-600 text-lg">
            Quick access to everything you need on campus
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Timetable Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl text-emerald-600">📅</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Timetable
            </h3>
            <p className="text-gray-600 flex-1 leading-relaxed mb-8">
              View your weekly class schedule and never miss a lecture.
            </p>
            <Link
              href="/timetable"
              className="inline-block px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-2xl text-center transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300"
            >
              Go to Timetable
            </Link>
          </div>

          {/* Campus Map Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl text-blue-600">🗺️</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Campus Map
            </h3>
            <p className="text-gray-600 flex-1 leading-relaxed mb-8">
              Interactive map to help you navigate the university campus.
            </p>
            <Link
              href="/map"
              className="inline-block px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-2xl text-center transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Go to Campus Map
            </Link>
          </div>

          {/* Canteen Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl text-amber-600">🍽️</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Canteen
            </h3>
            <p className="text-gray-600 flex-1 leading-relaxed mb-8">
              Browse today’s menu and plan your meals.
            </p>
            <Link
              href="/canteen"
              className="inline-block px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-2xl text-center transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-300"
            >
              Go to Canteen
            </Link>
          </div>

          {/* Lost & Found Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl text-rose-600">🔍</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Lost & Found
            </h3>
            <p className="text-gray-600 flex-1 leading-relaxed mb-8">
              Report lost items or search for found belongings.
            </p>
            <Link
              href="/lost-found"
              className="inline-block px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-2xl text-center transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-rose-300"
            >
              Go to Lost & Found
            </Link>
          </div>

          {/* Meal Recommender Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl shadow-md p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col group text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-3xl">🍽️✨</span>
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                ML Powered
              </span>
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Meal Recommender
            </h3>

            <p className="text-green-100 flex-1 leading-relaxed mb-8">
              Get personalized lunch suggestions based on your dietary preferences
            </p>

            <Link
              href="/recommend"
              className="inline-block px-6 py-3.5 bg-white text-green-700 font-medium rounded-2xl text-center transition-all active:scale-95 hover:bg-green-100 focus:outline-none focus:ring-4 focus:ring-white/40"
            >
              Try it now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}