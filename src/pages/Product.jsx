import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { menuItems, smoothies } from '../data/menuData';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const allItems = [...menuItems, ...smoothies];
  const item = allItems.find(i => i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Item not found</h2>
          <button
            onClick={() => navigate('/menu')}
            className="text-[#008000] hover:underline"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(item, quantity, {});
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-[#008000] mb-8"
        >
          <ArrowLeft size={20} className="mr-2" /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-video">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-[#008000] font-semibold uppercase tracking-wide mb-2">
              {item.category === 'acai-bowl' ? 'Acai Bowl' : 'Smoothie'}
            </span>
            <h1 className="text-4xl font-bold text-[#2d2a26] mb-4 capitalize">{item.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{item.description}</p>
            <div className="text-3xl font-bold text-[#008000] mb-6">₹{item.price}</div>

            <div className="flex items-center gap-4 mb-8">
              <span className="font-semibold text-gray-700">Quantity:</span>
              <div className="flex items-center bg-white rounded-full shadow-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:text-[#008000] transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="px-6 font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:text-[#008000] transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="inline-flex items-center justify-center bg-[#008000] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#006400] transition-colors"
            >
              <ShoppingCart className="mr-2" size={24} />
              Add to Cart - ₹{item.price * quantity}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}