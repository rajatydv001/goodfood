import { Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imageManifest from '../../imageManifest.json';

function getResponsiveSrcset(imagePath) {
  const normalizedPath = imagePath.replace('/images/', '');
  const manifestEntry = imageManifest[normalizedPath];
  
  if (manifestEntry && manifestEntry.sizes) {
    const sizes = Object.entries(manifestEntry.sizes)
      .map(([width, data]) => `${data.path} ${width}w`)
      .join(', ');
    return sizes;
  }
  return imagePath;
}

function getFallbackSrc(imagePath) {
  const normalizedPath = imagePath.replace('/images/', '');
  const manifestEntry = imageManifest[normalizedPath];
  return manifestEntry?.fallback || imagePath;
}

export default function MenuCard({ item, showLogo = false }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    addItem(item, 1, {});
    setTimeout(() => setIsAdding(false), 300);
  };

  const handleCardClick = () => {
    navigate(`/product/${item.id}`);
  };

  const srcset = getResponsiveSrcset(item.image);
  const fallbackSrc = getFallbackSrc(item.image);

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group h-full flex flex-col"
      onClick={handleCardClick}
    >
      <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden">
        <img
          src={fallbackSrc}
          srcSet={srcset}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {showLogo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <img 
              src="/logo-goodfood.png" 
              alt="Goodfood" 
              className="w-24 h-auto opacity-90 drop-shadow-lg"
            />
          </div>
        )}
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