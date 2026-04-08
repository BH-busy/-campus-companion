
import menuData from '@/data/menu.json';
import type { Metadata } from 'next';

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

export const metadata: Metadata = {
  title: 'Canteen Menu | Campus Companion',
  description: 'Weekly canteen menu at Crestwood University',
};

export default function CanteenPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Canteen Weekly Menu
          </h1>
          <p className="text-lg text-gray-600">
            Crestwood University • Fresh meals every day
          </p>
        </header>

        <div className="space-y-12">
          {weeklyMenu.map((dayItem, dayIndex) => (
            <section key={dayIndex} aria-labelledby={`day-${dayIndex}`}>
              <h2
                id={`day-${dayIndex}`}
                className="text-3xl font-semibold text-emerald-700 mb-6 border-b border-emerald-200 pb-3"
              >
                {dayItem.day}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dayItem.meals.map((meal, mealIndex) => (
                  <article
                    key={mealIndex}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 flex flex-col"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-gray-900 mb-2">
                        {meal.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {meal.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-emerald-600 font-semibold text-2xl">
                        €{meal.price.toFixed(2)}
                      </span>
                      <button
                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        aria-label={`Add ${meal.name} to cart`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="text-center text-gray-500 text-sm mt-16">
          Menu prices in EUR • Subject to availability • All dietary options marked where applicable
        </footer>
      </div>
    </div>
  );
} 