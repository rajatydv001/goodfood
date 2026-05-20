import { MapPin, Phone, Clock } from 'lucide-react';
import { locations } from '../data/menuData';

export default function Locations() {
  return (
    <div className="relative min-h-screen">
      {/* Background image behind navbar */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url(/images/locations-bg-1200w.webp)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'top center'
        }}
      />
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Eagle Horizon', sans-serif" }}>
              Our Locations
            </h1>
            <p className="text-lg text-white/80">Find a Goodfood near you</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Location List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map(location => (
            <div key={location.id} className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#008000] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#2d2a26] mb-2">{location.name}</h3>
                  <p className="text-gray-600 mb-2">
                    {location.address}<br />
                    {location.city}, {location.state}
                  </p>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Phone size={16} />
                    <span>{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <Clock size={16} />
                    <span>Open daily: 8am - 9pm</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-[#2d2a26] mb-4">Can't find us?</h2>
          <p className="text-gray-600 mb-4">
            More locations coming soon! Sign up for our newsletter to be the first to know about new openings.
          </p>
          <a
            href="mailto:hello@goodfood.com"
            className="inline-block bg-[#008000] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#006400] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}