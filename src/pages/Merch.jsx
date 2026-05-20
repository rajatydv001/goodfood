import { merchandise } from '../data/menuData';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

function MerchCard({ item }) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    addItem(item, 1, {});
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Logo Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <img 
            src="/logo-goodfood.png" 
            alt="Goodfood" 
            className="w-28 h-auto opacity-90 drop-shadow-lg"
          />
        </div>
        <div className="absolute top-2 right-2">
          <button
            onClick={handleAddToCart}
            className={`bg-[#008000] text-white p-2 rounded-full hover:bg-[#006400] transition-all ${
              isAdding ? 'scale-110' : ''
            }`}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 capitalize">{item.name}</h3>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{item.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[#008000] font-bold text-lg">₹{item.price}</span>
          <button
            onClick={handleAddToCart}
            className="text-sm bg-[#f0f0f0] text-[#008000] px-3 py-1 rounded-full hover:bg-[#008000] hover:text-white transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Merch() {
  return (
    <div className="relative min-h-screen">
      {/* Background image behind navbar */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url(/images/merch-bg-new.png)',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center'
        }}
      />
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Eagle Horizon', sans-serif" }}>
            Merchandise
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {merchandise.map(item => (
            <MerchCard key={item.id} item={item} />
          ))}
        </div>

        {merchandise.length === 0 && (
          <p className="text-center text-gray-500 py-12">No merchandise available yet.</p>
        )}
      </div>
    </div>
  );
}