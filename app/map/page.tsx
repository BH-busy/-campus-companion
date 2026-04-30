'use client';

import { useMemo, useState } from 'react';
import locationsData from '@/data/locations.json';
import Image from 'next/image';

type Location = {
  id: number;
  name: string;
  description: string;
  type: 'library' | 'classroom' | 'canteen' | 'sports' | 'admin';
  floor: number;
  openingHours: string;
};

const locations: Location[] = (locationsData as any).locations;

const typeColors: Record<string, string> = {
  library: 'bg-blue-100 text-blue-700',
  classroom: 'bg-emerald-100 text-emerald-700',
  canteen: 'bg-amber-100 text-amber-700',
  sports: 'bg-rose-100 text-rose-700',
  admin: 'bg-purple-100 text-purple-700',
};

const typeIcons: Record<string, string> = {
  library: '📚',
  classroom: '🏫',
  canteen: '🍽️',
  sports: '🏀',
  admin: '🧾',
};

const popularityBadges: Record<number, string> = {
  1: '🔥 Most Visited',
  2: '💻 Tech Hub',
  3: '🍔 Busy at Lunch',
  4: '🏆 Student Favorite',
  5: '📋 Administration Hub',
  6: '🎓 Lecture Central',
  7: '☕ Best Coffee',
  8: '📖 Quiet Study',
};

const distances: Record<number, string> = {
  1: '0.2 miles away',
  2: '0.5 miles away',
  3: '0.0 miles (You are here)',
  4: '0.8 miles away',
  5: '0.3 miles away',
  6: '0.6 miles away',
  7: '0.1 miles away',
  8: '0.4 miles away',
};

// Mapa de imágenes locales
const getLocationImage = (name: string): string => {
  const imageMap: Record<string, string> = {
    'Redwood Library': 'redwood-library.jpg',
    'Hawthorne Science Hall': 'hawthorne-science-hall.jpg',
    'Oakwood Student Canteen': 'oakwood-canteen.jpg',
    'Evergreen Sports Complex': 'evergreen-sports.jpg',
    'Maple Administration Center': 'maple-admin.jpg',
    'Cedar Lecture Theatre': 'cedar-lecture.jpg',
    'Willow Café': 'willow-cafe.jpg',
    'Pine Learning Commons': 'pine-learning-commons.jpg',
  };
  
  return `/images/map/${imageMap[name] || 'default.jpg'}`;
};

export default function MapPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [savedLocations, setSavedLocations] = useState<number[]>([]);

  const filteredLocations = useMemo(() => {
    return locations.filter(location => {
      const matchesType =
        selectedType === 'all' || location.type === selectedType;

      const matchesSearch =
        location.name.toLowerCase().includes(search.toLowerCase()) ||
        location.description.toLowerCase().includes(search.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [selectedType, search]);

  const isOpenNow = (hours: string) => {
    const currentHour = new Date().getHours();
    const [open, close] = hours.split(' - ').map(time =>
      parseInt(time.split(':')[0])
    );
    return currentHour >= open && currentHour < close;
  };

  const toggleSave = (id: number) => {
    setSavedLocations(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const renderFloorDots = (floor: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: floor }).map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        ))}
        {Array.from({ length: 5 - floor }).map((_, i) => (
          <div key={i + floor} className="w-2.5 h-2.5 rounded-full bg-gray-200" />
        ))}
      </div>
    );
  };

  const types = ['all', 'library', 'classroom', 'canteen', 'sports', 'admin'];

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4 animate-bounce">🗺️</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Crestwood Campus Map
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-3">
            Explore buildings, study spots, dining areas, and key locations
            around Crestwood University.
          </p>
        </div>

        {/* SVG Interactive Map Preview */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 mb-10 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              📍 Interactive Campus Map
            </h2>
            <span className="text-sm text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Live Preview
            </span>
          </div>

          <div className="relative h-[320px] bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl overflow-hidden border border-emerald-200">
            <svg viewBox="0 0 800 320" className="w-full h-full">
              {/* Main paths */}
              <path d="M0 160 H800" stroke="#94a3b8" strokeWidth="6" strokeDasharray="10 8" />
              <path d="M400 0 V320" stroke="#94a3b8" strokeWidth="6" strokeDasharray="10 8" />
              
              {/* Center circle */}
              <circle cx="400" cy="160" r="25" fill="#fbbf24" className="animate-pulse" />
              <text x="400" y="165" textAnchor="middle" className="fill-white text-xs font-bold">YOU</text>

              {/* Buildings on map */}
              {locations.map((location, index) => {
                const positions = [
                  { x: 120, y: 80 },   // Redwood Library
                  { x: 280, y: 70 },   // Hawthorne
                  { x: 520, y: 60 },   // Oakwood
                  { x: 680, y: 100 },  // Evergreen
                  { x: 100, y: 230 },  // Maple
                  { x: 310, y: 240 },  // Cedar
                  { x: 530, y: 230 },  // Willow
                  { x: 700, y: 250 },  // Pine
                ];
                const pos = positions[index];
                return (
                  <g key={location.id}>
                    <circle cx={pos.x} cy={pos.y} r="14" fill="#16a34a" className="hover:fill-emerald-700 transition-all cursor-pointer" />
                    <text x={pos.x} y={pos.y + 30} textAnchor="middle" className="fill-gray-700 text-[10px] font-medium">
                      {location.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search buildings by name or description..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 pl-12 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-300"
            />
            <span className="absolute left-4 top-4 text-xl">🔍</span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                selectedType === type
                  ? 'bg-emerald-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 hover:scale-105'
              }`}
            >
              {type === 'all' ? '📍 All' : `${typeIcons[type]} ${type}`}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-gray-500 text-sm">
            🏛️ Showing {filteredLocations.length} of {locations.length} locations
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLocations.map((location, index) => {
            const open = isOpenNow(location.openingHours);
            const isSaved = savedLocations.includes(location.id);
            
            return (
              <div
                key={location.id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={getLocationImage(location.name)}
                    alt={location.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/id/${location.id * 22}/500/300`;
                    }}
                  />

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize backdrop-blur-sm bg-white/90 ${typeColors[location.type]}`}
                    >
                      {typeIcons[location.type]} {location.type}
                    </span>
                  </div>

                  {/* Distance Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                      📍 {distances[location.id] || '0.3 miles away'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Popularity Badge */}
                  <div className="mb-3">
                    <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full">
                      {popularityBadges[location.id] || '⭐ Popular'}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {location.name}
                  </h2>

                  <p className="text-gray-600 leading-relaxed text-sm mb-4">
                    {location.description}
                  </p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Floor Level</p>
                      {renderFloorDots(location.floor)}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                          open
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {open ? '🟢 Open Now' : '🔴 Closed'}
                      </span>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-6 pb-3 border-b border-gray-100">
                    <span className="text-gray-500">⏰ Opening Hours</span>
                    <span className="font-medium">{location.openingHours}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + ' Crestwood University')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-center py-3 rounded-2xl font-medium transition-all hover:scale-105 text-sm"
                    >
                      🗺️ Get Directions
                    </a>
                    <button
                      onClick={() => toggleSave(location.id)}
                      className={`px-4 py-3 rounded-2xl border transition-all hover:scale-105 ${
                        isSaved
                          ? 'bg-yellow-100 border-yellow-300 text-yellow-700'
                          : 'border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {isSaved ? '⭐ Saved' : '⭐'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredLocations.length === 0 && (
          <div className="text-center mt-20">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No locations found
            </h3>
            <p className="text-gray-500">
              Try changing your search or filter selection.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}