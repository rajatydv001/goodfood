import { locations } from '../data/menuData';

const images = {
  0: "/images/our mission/1c8221c3-0c77-4329-a29b-ceaf86a6af35.JPG",
  1: "/images/our mission/3ad1f60b-6a20-458c-8f7e-82a2bd553f62.JPG",
  2: "/images/our mission/9b73a445-6561-4b5b-8a2b-2028b3b7e024.JPG",
  3: "/images/our mission/85d073b2-c3dd-4f38-b96c-7acc5911f59c.JPG",
  4: "/images/our mission/c9c1da91-d12c-485c-bb6d-172ddf1a081e.JPG",
  5: "/images/our mission/fruit-salad.jpg",
  6: "/images/our mission/d5a2f5ec-1f30-4fa0-baa1-3d5311278d4a.JPG",
  7: "/images/our mission/chat-img-8.png",
  8: "/images/our mission/chat-img.png",
  9: "/images/our mission/chat-img-10.png"
};

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Background image behind navbar */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url(/images/our-mission-bg-1200w.webp)',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center'
        }}
      />
      {/* Hero Section with Mission & Story */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Eagle Horizon', sans-serif" }}>Our Mission</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Goodfood is Greenville's leading and fastest growing acai shop. Specializing in the highest quality grade acai and other fun flavored bases. Topped with soft, organic granola, fresh fruit and melted drizzle. We're talking perfectly warmed up Nutella, peanut butter, almond butter, honey and caramel!! Sure to bring you happiness with every bite.
            </p>
            
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "'Eagle Horizon', sans-serif" }}>Our Story</h2>
            <div className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed space-y-4 mb-12">
              <p>
                In 2018 we launched our edgy food truck and travelled through Greenville's surrounding cities. 
                Our quick journey led us into growing our brand into seven storefronts.
              </p>
              <p>
                If that wasn't impressive enough, we managed to franchise 10 additional storefronts throughout the Upstate in 2022. 
                There's no denying how much the community loves Goodfood. 
              </p>
              <p>
                Our goal is to continue sharing our delicious product amongst other states in the US. 
                You'll have to taste it for yourself to truly understand.
              </p>
            </div>
          </div>

          {/* Containers */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {locations.map((location, index) => (
                <div 
                  key={location.id} 
                  className="rounded-lg aspect-square overflow-hidden transition-transform duration-300 hover:rotate-3 hover:shadow-2xl"
                >
                  {images[index] ? (
                    <img 
                      src={images[index]} 
                      alt={location.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                      <span className="text-white text-lg md:text-xl font-bold" style={{ fontFamily: "'Eagle Horizon', sans-serif" }}>{location.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}