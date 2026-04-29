'use client';

import menuData from '@/data/menu.json';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

interface Meal {
  name: string;
  description: string;
  price: number;
}

interface DayMenu {
  day: string;
  meals: Meal[];
}

const weeklyMenu: DayMenu[] = (menuData as any).menu;

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

const getDietaryBadge = (name: string, description: string): string | null => {
  const text = `${name} ${description}`.toLowerCase();
  if (text.includes('vegan')) return '🌱 Vegan';
  if (text.includes('vegetarian')) return '🥬 Vegetarian';
  if (text.includes('gluten-free')) return '🌾 Gluten-Free';
  if (text.includes('high protein')) return '💪 High Protein';
  if (text.includes('spicy')) return '🔥 Spicy';
  return null;
};

const MealImage = ({ name, alt }: { name: string; alt: string }) => {
  const [imgError, setImgError] = useState(false);
  const src = imgError ? 'https://picsum.photos/id/30/400/300' : getMealImage(name);

  return (
    <div className="relative h-48 overflow-hidden bg-gray-200">
      {!src && <div className="animate-pulse h-full w-full bg-gray-200" />}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        onError={() => setImgError(true)}
      />
    </div>
  );
};

export default function CanteenPage() {
  const { addToCart } = useCart();
  const [added, setAdded] = useState<string | null>(null);

  const handleAddToCart = (meal: Meal) => {
    addToCart({ name: meal.name, price: meal.price });
    setAdded(meal.name);
    setTimeout(() => setAdded(null), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🍽️ Canteen Weekly Menu
          </h1>
          <p className="text-lg text-gray-600">
            Crestwood University • Fresh meals every day
          </p>
        </header>

        <div className="space-y-12">
          {weeklyMenu.map((dayItem, dayIndex) => (
            <section key={dayIndex}>
              <h2 className="text-3xl font-semibold text-emerald-700 mb-6 border-b border-emerald-200 pb-3">
                {dayItem.day}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dayItem.meals.map((meal, mealIndex) => {
                  const dietaryBadge = getDietaryBadge(meal.name, meal.description);
                  return (
                    <article
                      key={mealIndex}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <MealImage name={meal.name} alt={meal.name} />
                        {dietaryBadge && (
                          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-full shadow-md">
                            {dietaryBadge}
                          </span>
                        )}
                      </div>

                      <div className="p-5 flex flex-col">
                        <h3 className="font-semibold text-xl text-gray-900 mb-2">
                          {meal.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm mb-4 flex-1">
                          {meal.description}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div>
                            <span className="text-emerald-600 font-bold text-2xl">
                              €{meal.price.toFixed(2)}
                            </span>
                            {meal.price < 7 && (
                              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                Budget
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => handleAddToCart(meal)}
                            className={`px-5 py-2 text-white text-sm font-medium rounded-xl transition-all hover:scale-105 ${
                              added === meal.name
                                ? 'bg-green-500'
                                : 'bg-emerald-600 hover:bg-emerald-700'
                            }`}
                          >
                            {added === meal.name ? 'Added ✓' : '🛒 Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <footer className="text-center text-gray-500 text-sm mt-16 pt-8 border-t border-gray-200">
          Menu prices in EUR • Subject to availability
        </footer>
      </div>
    </div>
  );
}