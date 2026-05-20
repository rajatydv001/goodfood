import { useState } from 'react';
import { menuItems, smoothies, juices, fruitBowls, categories } from '../data/menuData';
import MenuCard from '../components/menu/MenuCard';
import BuildYourOwn from '../components/menu/BuildYourOwn';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('acai-bowl');

  const getFilteredItems = () => {
    switch (activeCategory) {
      case 'acai-bowl': return menuItems;
      case 'smoothie': return smoothies;
      case 'juice': return juices;
      case 'fruit-bowl': return fruitBowls;
      default: return menuItems;
    }
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="relative min-h-screen">
      {/* Background image behind navbar */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url(/images/menu-hero-bg.png)',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center'
        }}
      />
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Eagle Horizon', sans-serif" }}>
            Our Menu
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 md:gap-4 mb-6 md:mb-10 pb-2 justify-start md:justify-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#008000] text-white'
                  : 'bg-white text-gray-700 hover:bg-[#f0f0f0]'
              }`}
            >
              <span className="mr-1 md:mr-2">{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeCategory === 'build-your-own' ? (
          <BuildYourOwn />
        ) : (
          <>
            {/* Menu Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {filteredItems.map(item => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <p className="text-center text-gray-500 py-12">No items found in this category.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}