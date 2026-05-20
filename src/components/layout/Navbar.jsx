import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChevronDown, Trash2, User, Settings, LogOut, Package } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const cartDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const { cart, getCartCount, getCartTotal, removeItem } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setCartDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
  };

  return (
    <nav className="bg-gradient-to-b from-black/60 to-transparent sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Section */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/menu" className="text-white font-medium transition-colors hover:underline drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">Menu</Link>
            <Link to="/locations" className="text-white font-medium transition-colors hover:underline drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">Locations</Link>
          </div>

          {/* Center - Logo */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img src="/logo-goodfood.png" alt="Goodfood" className="h-16 md:h-40 w-auto" />
          </Link>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            <Link to="/about" className="text-white font-medium transition-colors hover:underline drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">Our Mission</Link>
            <Link to="/contact" className="text-white font-medium transition-colors hover:underline drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">Contact Us</Link>

            {cartCount > 0 && (
              <div className="relative" ref={cartDropdownRef}>
                <button
                  onClick={() => setCartDropdownOpen(!cartDropdownOpen)}
                  className="relative p-2 text-white hover:opacity-80 transition-colors"
                >
                  <ShoppingCart size={24} />
                  <span className="absolute -top-1 -right-1 bg-[#008000] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                </button>

                {cartDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-lg rounded-lg border z-50">
                    <div className="p-3 max-h-64 overflow-y-auto">
                      {cart.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate capitalize">{item.item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity} × ${item.item.price.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => removeItem(index)}
                            className="p-1 text-red-500 hover:text-red-700 ml-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t bg-gray-50">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium text-gray-700">Subtotal:</span>
                        <span className="font-bold text-[#008000]">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to="/cart"
                          onClick={() => setCartDropdownOpen(false)}
                          className="flex-1 text-center py-2 text-sm border border-[#008000] text-[#008000] rounded-full hover:bg-[#f0f0f0] transition-colors"
                        >
                          View Cart
                        </Link>
                        <Link
                          to="/checkout"
                          onClick={() => setCartDropdownOpen(false)}
                          className="flex-1 text-center py-2 text-sm bg-[#008000] text-white rounded-full hover:bg-[#006400] transition-colors"
                        >
                          Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile Icon */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 p-2 hover:opacity-80 rounded-full transition-all"
              >
                <img src="/profile.png" alt="Profile" className="w-8 h-8 rounded-full object-cover" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-lg rounded-lg border z-50">
                  {isLoggedIn ? (
                    <>
                      <div className="p-3 border-b">
                        <p className="font-medium text-gray-800">{user?.name || 'User'}</p>
                        <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
                      </div>
                      <div className="py-2">
                        <Link to="/profile" onClick={() => setProfileDropdownOpen(false)} className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#f0f0f0]">
                          <User size={18} className="mr-3" /> My Profile
                        </Link>
                        <Link to="/orders" onClick={() => setProfileDropdownOpen(false)} className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#f0f0f0]">
                          <Package size={18} className="mr-3" /> My Orders
                        </Link>
                        <Link to="/settings" onClick={() => setProfileDropdownOpen(false)} className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#f0f0f0]">
                          <Settings size={18} className="mr-3" /> Settings
                        </Link>
                      </div>
                      <div className="py-2 border-t">
                        <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50">
                          <LogOut size={18} className="mr-3" /> Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="py-2">
                      <div className="px-4 py-2 border-b">
                        <p className="font-medium text-gray-700">Welcome!</p>
                        <p className="text-sm text-gray-500">Sign in to access your account</p>
                      </div>
                      <Link to="/login" onClick={() => setProfileDropdownOpen(false)} className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#f0f0f0]">
                        <User size={18} className="mr-3" /> Login
                      </Link>
                      <Link to="/signup" onClick={() => setProfileDropdownOpen(false)} className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#f0f0f0]">
                        <User size={18} className="mr-3" /> Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            {cartCount > 0 && (
              <Link to="/cart" className="relative p-2 text-white">
                <ShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 bg-[#008000] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>
            )}
            <button
              className="p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="space-y-1">
              <Link to="/menu" className="block py-3 text-white font-medium hover:underline drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]" onClick={() => setMobileMenuOpen(false)}>Menu</Link>
              <Link to="/locations" className="block py-3 text-white font-medium hover:underline drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]" onClick={() => setMobileMenuOpen(false)}>Locations</Link>
              <Link to="/about" className="block py-3 text-white font-medium hover:underline drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]" onClick={() => setMobileMenuOpen(false)}>Our Mission</Link>
              <Link to="/contact" className="block py-3 text-white font-medium hover:underline drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
              {!isLoggedIn && (
                <div className="pt-4 border-t border-white/20">
                  <Link to="/login" className="block py-2 text-white/80" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                  <Link to="/signup" className="block py-2 text-white/80" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}