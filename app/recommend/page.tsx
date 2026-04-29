'use client';

import { useEffect, useMemo, useState } from 'react';
import menuData from '@/data/menu.json';

type Meal = {
  name: string;
  description: string;
  price: number;
};

type DayMenu = {
  day: string;
  meals: Meal[];
};

type ScoredMeal = Meal & {
  score: number;
  matches: string[];
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function RecommendPage() {
  const data: DayMenu[] = (menuData as any).menu;

  const [vegetarian, setVegetarian] = useState(false);
  const [budget, setBudget] = useState(false);
  const [highProtein, setHighProtein] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('mealLikes');
    if (stored) setLikes(JSON.parse(stored));
    setTimeout(() => setLoading(false), 600);
  }, []);

  useEffect(() => {
    localStorage.setItem('mealLikes', JSON.stringify(likes));
  }, [likes]);

  const getMealImage = (name: string): string => {
    const imageMap: Record<string, string> = {
      'Avocado Toast with Poached Eggs': 'avocado-toast.jpg',
      'Vegan Buddha Bowl': 'vegan-buddha-bowl.jpg',
      'Spicy Chicken Wrap': 'spicy-chicken-wrap.jpg',
      'Mushroom Risotto': 'mushroom-risotto.jpg',
      'Beef Stir Fry': 'beef-stir-fry.jpg',
      'Gluten-Free Pancakes': 'gluten-free-pancakes.jpg',
      'Greek Yogurt Parfait': 'greek-yogurt-parfait.jpg',
      'Falafel Wrap': 'falafel-wrap.jpg',
      'Grilled Salmon Salad': 'grilled-salmon-salad.jpg',
      'Spicy Vegan Curry': 'spicy-vegan-curry.jpg',
      'Turkey & Cheese Sandwich': 'turkey-cheese-sandwich.jpg',
      'Margherita Pizza': 'margherita-pizza.jpg',
      'Egg & Spinach Breakfast Burrito': 'egg-spinach-burrito.jpg',
      'Quinoa Salad': 'quinoa-salad.jpg',
      'Chicken Caesar Wrap': 'chicken-caesar-wrap.jpg',
      'Spicy Beef Tacos': 'spicy-beef-tacos.jpg',
      'Tofu Stir Fry': 'tofu-stir-fry.jpg',
      'Gluten-Free Veggie Pasta': 'gluten-free-veggie-pasta.jpg',
      'Protein Smoothie Bowl': 'protein-smoothie-bowl.jpg',
      'Caprese Salad': 'caprese-salad.jpg',
      'Spicy Chicken Pasta': 'spicy-chicken-pasta.jpg',
      'Vegan Lentil Soup': 'vegan-lentil-soup.jpg',
      'Beef Burger': 'beef-burger.jpg',
      'Mediterranean Veggie Wrap': 'mediterranean-veggie-wrap.jpg',
      'Breakfast Omelette': 'breakfast-omelette.jpg',
      'Vegan Falafel Bowl': 'vegan-falafel-bowl.jpg',
      'Grilled Chicken Salad': 'grilled-chicken-salad.jpg',
      'Spicy Shrimp Rice': 'spicy-shrimp-rice.jpg',
      'Mushroom Margherita Pizza': 'mushroom-margherita-pizza.jpg',
      'Gluten-Free Chicken Wrap': 'gluten-free-chicken-wrap.jpg',
    };
    
    return `/images/meals/${imageMap[name] || 'default.jpg'}`;
  };

  const scoreMeal = (meal: Meal): ScoredMeal => {
    let score = 0;
    const matches: string[] = [];
    const text = `${meal.name} ${meal.description}`.toLowerCase();

    const vegKeywords = [
      'vegetarian','vegan','tofu','falafel','quinoa','mushroom',
      'mediterranean','caprese','margherita','veggie','buddha','hummus','risotto'
    ];

    const proteinKeywords = [
      'chicken','beef','salmon','tuna','turkey','egg','tofu'
    ];

    if (vegetarian && vegKeywords.some(k => text.includes(k))) {
      score += 2;
      matches.push('Vegetarian');
    }

    if (budget && meal.price < 7) {
      score += 2;
      matches.push('Budget');
    }

    if (highProtein && proteinKeywords.some(k => text.includes(k))) {
      score += 2;
      matches.push('High Protein');
    }

    return { ...meal, score, matches };
  };

  const recommendations = useMemo(() => {
    return data.map(day => {
      const scored = day.meals
        .map(scoreMeal)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      return { day: day.day, meals: scored, allMeals: day.meals };
    });
  }, [data, vegetarian, budget, highProtein]);

  const current = recommendations.find(r => r.day === selectedDay);

  const getPriceBadge = (meal: Meal, allMeals: Meal[]) => {
    const prices = allMeals.map(m => m.price).sort((a, b) => a - b);
    if (meal.price === prices[0]) return 'Cheapest';
    if (meal.price === prices[prices.length - 1]) return 'Most Expensive';
    return 'Mid Range';
  };

  const handleLike = (name: string, delta: number) => {
    setLikes(prev => ({
      ...prev,
      [name]: (prev[name] || 0) + delta,
    }));
  };

  const handleShare = (meal: Meal) => {
    const text = `${meal.name} - €${meal.price}\n${meal.description}`;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const popularMeal = useMemo(() => {
    let max = 0;
    let top: string | null = null;
    Object.entries(likes).forEach(([name, count]) => {
      if (count > max) {
        max = count;
        top = name;
      }
    });
    return top;
  }, [likes]);

  const renderStars = (score: number) => {
    const stars = Math.min(score / 2, 3);
    return '★'.repeat(stars) + '☆'.repeat(3 - stars);
  };

  return (
    <main className="min-h-screen bg-green-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-6">
          <div className="text-5xl">🍽️✨</div>
          <h1 className="text-3xl font-bold text-green-900">Meal Recommender</h1>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow mb-4 flex flex-wrap gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={vegetarian} onChange={()=>setVegetarian(!vegetarian)} /> Vegetarian
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={budget} onChange={()=>setBudget(!budget)} /> Budget (under €7)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={highProtein} onChange={()=>setHighProtein(!highProtein)} /> High Protein
          </label>
          <button onClick={()=>{setVegetarian(false);setBudget(false);setHighProtein(false);}} className="ml-auto text-sm text-green-700 px-3 py-1 rounded-full bg-green-100 hover:bg-green-200 transition">
            Reset all
          </button>
        </div>

        {/* Day Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedDay === day
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Popular Pick */}
        {popularMeal && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-xl border border-green-300">
            <div className="flex items-center gap-2">
              <span className="text-2xl">❤️</span>
              <span>Today's Popular Pick: <strong className="text-green-800">{popularMeal}</strong></span>
            </div>
          </div>
        )}

        {/* Skeleton Loading */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl shadow overflow-hidden animate-pulse">
                <div className="h-40 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TOP 3 Meals Grid */}
        {!loading && current && (
          <div>
            <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
              <span>📅</span> {current.day} Top Picks
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {current.meals.map((meal, index) => (
                <div
                  key={meal.name}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={getMealImage(meal.name)}
                      alt={meal.name}
                      className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://picsum.photos/id/1/300/200';
                      }}
                    />
                    {index === 0 && (
                      <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                        👑 #1
                      </span>
                    )}
                    {meal.score >= 6 && (
                      <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
                        Perfect Match!
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800">{meal.name}</h3>

                    <div className="flex gap-2 mt-2 flex-wrap">
                      <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        €{meal.price.toFixed(2)}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {getPriceBadge(meal, current.allMeals)}
                      </span>
                      {likes[meal.name] > 2 && (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          ❤️ Most liked
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {meal.description}
                    </p>

                    <div className="mt-2 text-yellow-500 text-sm">
                      {renderStars(meal.score)}
                    </div>

                    <div className="text-sm text-gray-700 mt-1">
                      Score: {meal.score}/6
                    </div>

                    {meal.matches.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {meal.matches.map(m => (
                          <span key={m} className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">
                            {m}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-4 mt-4 pt-2 border-t border-gray-100">
                      <button 
                        onClick={()=>handleLike(meal.name, 1)}
                        className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition"
                      >
                        👍 <span className="text-xs">{likes[meal.name] || 0}</span>
                      </button>
                      <button 
                        onClick={()=>handleLike(meal.name, -1)}
                        className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition"
                      >
                        👎
                      </button>
                      <button 
                        onClick={()=>handleShare(meal)} 
                        className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition text-sm"
                      >
                        📋 Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}