import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    login({ name: `${formData.firstName} ${formData.lastName}`, email: formData.email });
    navigate('/');
  };

  const passwordRequirements = [
    { met: formData.password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(formData.password), text: 'One uppercase letter' },
    { met: /[a-z]/.test(formData.password), text: 'One lowercase letter' },
    { met: /[0-9]/.test(formData.password), text: 'One number' },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-[#008000]">Goodfood</Link>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Join us and start ordering</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                placeholder="John"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008000] focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008000] focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008000] focus:border-transparent"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.password && (
              <div className="mt-2 space-y-1">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center text-sm">
                    {req.met ? (
                      <Check size={14} className="text-green-500 mr-2" />
                    ) : (
                      <X size={14} className="text-gray-400 mr-2" />
                    )}
                    <span className={req.met ? 'text-green-600' : 'text-gray-500'}>{req.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008000] focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
              className="h-4 w-4 text-[#008000] border-gray-300 rounded mt-1"
            />
            <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <Link to="/terms" className="text-[#008000] hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-[#008000] hover:underline">Privacy Policy</Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#008000] text-black font-semibold py-3 rounded-full hover:bg-[#006400] transition-colors"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#008000] font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}