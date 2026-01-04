
import React, { useState, useEffect } from 'react';
import { GalleryImage } from '../../types.ts';

const CATEGORIES = [
  { id: 'opening', label: 'Summit Opening' },
  { id: 'keynote', label: 'Keynote Theatre' },
  { id: 'workshop', label: 'Workshops' },
  { id: 'social', label: 'Networking' },
];

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('opening');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockImages: GalleryImage[] = Array.from({ length: 6 }).map((_, i) => ({
        url: `https://picsum.photos/800/600?random=${activeCategory}-${i}`,
        thumb: `https://picsum.photos/400/300?random=${activeCategory}-${i}`,
        name: `Moment ${i + 1}`
      }));
      setImages(mockImages);
      setLoading(false);
    }, 600);
  }, [activeCategory]);

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-red-900 uppercase tracking-tight">Visual Archive</h2>
        <p className="mt-2 text-gray-500 font-medium">Highlighting the energy of the 2026 Summit.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeCategory === cat.id 
                ? 'bg-red-600 text-white shadow-lg scale-105' 
                : 'bg-white text-gray-500 hover:text-red-600 border-2 border-gray-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-video bg-gray-100 animate-pulse rounded-[2rem]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-[2rem] aspect-video bg-gray-100 cursor-pointer shadow-xl transition-shadow border-4 border-transparent hover:border-red-600">
              <img 
                loading="lazy"
                src={img.thumb} 
                alt={img.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-red-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <span className="text-white font-black text-sm uppercase tracking-widest bg-red-600 px-6 py-3 rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform">Enlarge</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
