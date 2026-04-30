'use client';

import { useState } from 'react';

type LostItem = {
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
  status: 'lost' | 'found';
  contactEmail: string;
};

const lostItemsData = {
  items: [
    {
      id: 1,
      name: "Black NorthFace Backpack",
      description: "Large backpack containing notebooks and a silver water bottle.",
      location: "Redwood Library",
      date: "2026-04-22",
      status: "lost" as const,
      contactEmail: "sarah.johnson@crestwood.edu"
    },
    {
      id: 2,
      name: "Student ID Card",
      description: "Crestwood University student ID belonging to Michael Lee.",
      location: "Oakwood Student Canteen",
      date: "2026-04-24",
      status: "found" as const,
      contactEmail: "security@crestwood.edu"
    },
    {
      id: 3,
      name: "Apple AirPods Pro",
      description: "White AirPods Pro case with initials 'J.R.' engraved.",
      location: "Evergreen Sports Complex",
      date: "2026-04-20",
      status: "lost" as const,
      contactEmail: "james.roberts@crestwood.edu"
    },
    {
      id: 4,
      name: "Blue Water Bottle",
      description: "Metal reusable bottle with university stickers.",
      location: "Hawthorne Science Hall",
      date: "2026-04-18",
      status: "found" as const,
      contactEmail: "facilities@crestwood.edu"
    },
    {
      id: 5,
      name: "MacBook Charger",
      description: "White USB-C MacBook charger and cable.",
      location: "Pine Learning Commons",
      date: "2026-04-21",
      status: "found" as const,
      contactEmail: "libraryhelp@crestwood.edu"
    },
    {
      id: 6,
      name: "Grey Hoodie",
      description: "Oversized grey hoodie with Crestwood Athletics logo.",
      location: "Evergreen Sports Complex",
      date: "2026-04-25",
      status: "lost" as const,
      contactEmail: "emma.clark@crestwood.edu"
    },
    {
      id: 7,
      name: "Casio Scientific Calculator",
      description: "Black calculator used for engineering exams.",
      location: "Cedar Lecture Theatre",
      date: "2026-04-19",
      status: "found" as const,
      contactEmail: "mathdept@crestwood.edu"
    },
    {
      id: 8,
      name: "Silver Bracelet",
      description: "Thin silver bracelet with a small heart charm.",
      location: "Willow Café",
      date: "2026-04-23",
      status: "lost" as const,
      contactEmail: "olivia.brown@crestwood.edu"
    },
    {
      id: 9,
      name: "Wireless Mouse",
      description: "Logitech wireless mouse in black color.",
      location: "Maple Administration Center",
      date: "2026-04-17",
      status: "found" as const,
      contactEmail: "adminsupport@crestwood.edu"
    },
    {
      id: 10,
      name: "Chemistry Textbook",
      description: "Organic Chemistry textbook with highlighted notes inside.",
      location: "Hawthorne Science Hall",
      date: "2026-04-26",
      status: "lost" as const,
      contactEmail: "daniel.wilson@crestwood.edu"
    }
  ]
};

const items: LostItem[] = lostItemsData.items;

export default function LostFoundPage() {
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all');

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Lost & Found</h1>
          <p className="text-gray-600">Report and recover belongings around Crestwood University</p>
        </div>

        <div className="flex justify-center gap-3 mb-10">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === 'all' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border'}`}
          >
            All ({items.length})
          </button>
          <button 
            onClick={() => setFilter('lost')} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === 'lost' ? 'bg-rose-600 text-white' : 'bg-white text-gray-700 border'}`}
          >
            Lost ({items.filter(i => i.status === 'lost').length})
          </button>
          <button 
            onClick={() => setFilter('found')} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === 'found' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border'}`}
          >
            Found ({items.filter(i => i.status === 'found').length})
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md border hover:shadow-lg transition p-5">
              <div className="flex justify-between items-start">
                <h2 className="font-bold text-xl text-gray-800">{item.name}</h2>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${item.status === 'lost' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {item.status === 'lost' ? '⚠️ Lost' : '✅ Found'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-2">{item.description}</p>
              <div className="mt-3 space-y-1 text-sm text-gray-500">
                <p>📍 {item.location}</p>
                <p>📅 {item.date}</p>
                <p>📧 {item.contactEmail}</p>
              </div>
              <a 
                href={`mailto:${item.contactEmail}`} 
                className="block text-center mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl transition"
              >
                Contact Owner
              </a>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No items found.</p>
          </div>
        )}
      </div>
    </main>
  );
}