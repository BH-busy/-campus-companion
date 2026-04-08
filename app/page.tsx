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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-${feature.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <span className={`text-3xl text-${feature.color}-600`}>
                  {feature.title === 'Timetable' && '📅'}
                  {feature.title === 'Campus Map' && '🗺️'}
                  {feature.title === 'Canteen' && '🍽️'}
                  {feature.title === 'Lost & Found' && '🔍'}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 flex-1 leading-relaxed mb-8">
                {feature.description}
              </p>

              <Link
                href={feature.href}
                className={`inline-block px-6 py-3.5 bg-${feature.color}-600 hover:bg-${feature.color}-700 text-white font-medium rounded-2xl text-center transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-${feature.color}-300`}
              >
                Go to {feature.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}