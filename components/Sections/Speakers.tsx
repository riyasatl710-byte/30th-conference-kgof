
import React, { useState } from 'react';
import { MOCK_SPEAKERS } from '../../constants.tsx';

export const Speakers: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Ministers' | 'Leaders'>('All');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredSpeakers = MOCK_SPEAKERS.filter(s => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Ministers') return s.designation.toLowerCase().includes('minister');
    if (activeFilter === 'Leaders') return !s.designation.toLowerCase().includes('minister');
    return true;
  });

  const handleImageError = (id: string) => {
    setFailedImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-12 fade-in">
      <div className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <h2 className="text-4xl font-black text-red-900 uppercase tracking-tighter">Leading Voices</h2>
        <p className="text-lg text-gray-500 font-medium">
          Honored guests and visionaries presiding over the 30th KGOF State Conference.
        </p>
      </div>

      {/* Attractive Tab Navigation */}
      <div className="flex justify-center px-4">
        <div className="bg-white p-1.5 rounded-[1.25rem] shadow-lg border border-gray-100 flex items-center space-x-1">
          {(['All', 'Ministers', 'Leaders'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeFilter === tab 
                  ? 'bg-red-600 text-white shadow-md scale-105' 
                  : 'text-gray-400 hover:text-red-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {filteredSpeakers.map((speaker) => (
          <div 
            key={speaker.id} 
            className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col"
          >
            <div className="relative h-72 overflow-hidden bg-gray-50">
              {!failedImages[speaker.id] ? (
                <img 
                  src={speaker.photoUrl} 
                  alt={speaker.name}
                  onError={() => handleImageError(speaker.id)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 text-red-200">
                  <span className="text-6xl font-black opacity-20">{speaker.name.charAt(0)}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest mt-4 opacity-40">Photo Missing</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl">
                   <p className="text-[10px] text-white font-bold leading-tight line-clamp-2">
                     {speaker.bio}
                   </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-red-600 transition-colors">
                  {speaker.name}
                </h3>
                <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mt-2 leading-relaxed">
                  {speaker.designation}
                </p>
              </div>
              
              <button className="mt-6 w-full py-3 bg-red-50 text-red-700 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-red-600 hover:text-white transition-all transform active:scale-95">
                Full Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSpeakers.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 italic font-medium">No speakers found in this category.</p>
        </div>
      )}
    </div>
  );
};
