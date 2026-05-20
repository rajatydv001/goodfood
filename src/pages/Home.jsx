import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { menuItems, merchandise } from '../data/menuData';
import MenuCard from '../components/menu/MenuCard';

export default function Home() {
  const foodItems = menuItems.slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <video 
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
          autoPlay 
          loop 
          muted 
          playsInline
          preload="metadata"
          poster="/images/hero-poster.webp"
        >
          <source src="/hero-video-optimized.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 h-full flex flex-col justify-center pt-16">
          <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6" style={{ fontFamily: "'Eagle Horizon', sans-serif" }}>
            <span className="text-sm sm:text-xl md:text-3xl lg:text-4xl align-middle">ORGANIC</span>
            <span className="text-sm sm:text-xl md:text-3xl lg:text-4xl mx-1 sm:mx-2 align-middle">·</span>
            <span className="text-sm sm:text-xl md:text-3xl lg:text-4xl align-middle">DELICIOUS</span>
            <span className="text-sm sm:text-xl md:text-3xl lg:text-4xl mx-1 sm:mx-2 align-middle">·</span>
            <span className="text-sm sm:text-xl md:text-3xl lg:text-4xl align-middle">HEALTHY</span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto font-sans">
            Live the best life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center bg-[#008000] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#006400] transition-colors"
            >
              Order Online <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/locations"
              className="inline-flex items-center justify-center bg-white text-[#008000] border-2 border-[#008000] px-8 py-3 rounded-full font-semibold hover:bg-[#f0f0f0] transition-colors"
            >
              <MapPin className="mr-2" size={20} /> Find a Location
            </Link>
          </div>
        </div>
      </section>

      {/* FOOD & MERCH Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {/* FOOD Container - Clickable */}
            <Link to="/menu" className="block border-4 border-[#008000] rounded-xl p-8 md:p-16 text-center hover:shadow-xl transition-shadow group relative overflow-hidden h-48 md:h-64">
              <img src="/food-bg.jpg" alt="Food" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30"></div>
              <h2 className="relative text-2xl md:text-4xl font-bold text-white group-hover:scale-105 transition-transform" style={{ fontFamily: "'Eagle Horizon', sans-serif" }}>FOOD</h2>
            </Link>

            {/* MERCH Container - Clickable */}
            <Link to="/merch" className="block border-4 border-[#008000] rounded-xl p-8 md:p-16 text-center hover:shadow-xl transition-shadow group relative overflow-hidden h-48 md:h-64">
              <img src="/merch-bg.jpg" alt="Merch" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30"></div>
              <h2 className="relative text-2xl md:text-4xl font-bold text-white group-hover:scale-105 transition-transform" style={{ fontFamily: "'Eagle Horizon', sans-serif" }}>MERCH</h2>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#008000] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎁</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gift Cards</h3>
              <p className="text-gray-600">Perfect for any occasion</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#008000] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Locations</h3>
              <p className="text-gray-600">Find us near you</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#008000] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-600">Healthy living made simple</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}