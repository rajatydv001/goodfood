import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderType: 'pickup',
    location: '',
    notes: ''
  });

  const total = getCartTotal();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <Link to="/menu" className="text-[#008000] hover:underline">Back to Menu</Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-[#2d2a26] mb-4">Order Placed!</h2>
            <p className="text-gray-600 mb-8">
              Thank you for your order! We'll send you a confirmation email shortly.
            </p>
            <div className="space-y-3">
              <Link
                to="/menu"
                className="inline-block bg-[#008000] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#006400] transition-colors"
              >
                Order More
              </Link>
              <div>
                <Link to="/" className="text-[#008000] hover:underline">Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-[#008000] mb-8"
        >
          <ArrowLeft size={20} className="mr-2" /> Back
        </button>

        <h1 className="text-3xl font-bold text-[#2d2a26] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Your Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold mt-8 mb-6">Order Type</h2>
              <div className="flex gap-4 mb-6">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="orderType"
                    value="pickup"
                    checked={formData.orderType === 'pickup'}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    formData.orderType === 'pickup' ? 'border-[#008000] bg-[#f0f0f0]' : 'border-gray-300'
                  }`}>
                    <span className="font-semibold">Pickup</span>
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="orderType"
                    value="delivery"
                    checked={formData.orderType === 'delivery'}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    formData.orderType === 'delivery' ? 'border-[#008000] bg-[#f0f0f0]' : 'border-gray-300'
                  }`}>
                    <span className="font-semibold">Delivery</span>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                >
                  <option value="">Select a location</option>
                  <option value="downtown">Downtown - 123 Main Street</option>
                  <option value="westend">West End - 456 West End Blvd</option>
                  <option value="haywood">Haywood Mall - 700 Haywood Road</option>
                  <option value="fiveforks">Five Forks - 890 Woodruff Road</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                  placeholder="Any allergies or special requests..."
                />
              </div>

              <button
                type="submit"
                className="w-full mt-8 bg-[#008000] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#006400] transition-colors"
              >
                Place Order - ₹{total}
              </button>
            </form>
          </div>

          <div>
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
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-[#008000]">₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}