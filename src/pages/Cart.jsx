import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeItem, updateQuantity, getCartTotal } = useCart();
  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some delicious bowls to get started!</p>
          <Link
            to="/menu"
            className="inline-flex items-center bg-[#008000] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#006400] transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} /> Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#2d2a26] mb-8" style={{ fontFamily: "'Eagle Horizon', sans-serif" }}>Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((cartItem, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4"
              >
                <img
                  src={cartItem.item.image}
                  alt={cartItem.item.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg capitalize">{cartItem.item.name}</h3>
                  <p className="text-gray-600 text-sm">{cartItem.item.description}</p>
                  <p className="text-[#008000] font-bold mt-1">₹{cartItem.item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-[#f0f0f0] rounded-full">
                    <button
                      onClick={() => updateQuantity(index, cartItem.quantity - 1)}
                      className="p-2 hover:text-[#008000]"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 font-semibold">{cartItem.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, cartItem.quantity + 1)}
                      className="p-2 hover:text-[#008000]"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 border-b pb-4 mb-4">
                {cart.map((cartItem, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{cartItem.item.name} x {cartItem.quantity}</span>
                    <span>₹{cartItem.item.price * cartItem.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span className="text-[#008000]">₹{total}</span>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-[#008000] text-white text-center py-3 rounded-full font-semibold hover:bg-[#006400] transition-colors"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/menu"
                className="block w-full text-center text-gray-600 mt-4 hover:text-[#008000]"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}