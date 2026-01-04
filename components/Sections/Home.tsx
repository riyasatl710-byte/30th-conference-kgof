
import React, { useState, useEffect } from 'react';
import { Page } from '../../types.ts';
import { CONFERENCE_INFO, HERO_CAROUSEL_IMAGES, ABOUT_CAROUSEL_IMAGES } from '../../constants.tsx';

interface HomeProps {
  onPageChange: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ onPageChange }) => {
  const [activeHero, setActiveHero] = useState(0);
  const [activeAbout, setActiveAbout] = useState(0);

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % HERO_CAROUSEL_IMAGES.length);
    }, 6000);
    
    const aboutTimer = setInterval(() => {
      setActiveAbout((prev) => (prev + 1) % ABOUT_CAROUSEL_IMAGES.length);
    }, 5000);

    return () => {
      clearInterval(heroTimer);
      clearInterval(aboutTimer);
    };
  }, []);

  const programs = [
    "പൊതു സമ്മേളനം",
    "പ്രതിനിധി സമ്മേളനം",
    "സുഹൃദ് സമ്മേളനം",
    "സാംസ്‌കാരിക സമ്മേളനം",
    "സെമിനാർ",
    "ഗസൽ കലാസന്ധ്യ"
  ];

  return (
    <div className="space-y-12 fade-in">
      {/* Hero Section */}
      <section className="relative w-full min-h-[550px] md:min-h-[650px] overflow-hidden rounded-[2.5rem] shadow-2xl bg-red-950">
        <div className="absolute inset-0">
          {HERO_CAROUSEL_IMAGES.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Slide ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                activeHero === idx ? 'opacity-40' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-black/20 to-transparent" />
        </div>

        <div className="relative h-full z-10 flex items-center p-6 md:p-16">
          <div className="max-w-4xl text-white">
            <div className="inline-flex items-center px-4 py-1.5 bg-red-600 rounded-lg text-[10px] md:text-xs font-black tracking-[0.3em] uppercase mb-8 shadow-2xl">
              KERALA GAZETTED OFFICERS FEDERATION
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[1] mb-8 hero-text-shadow tracking-tighter">
              <span className="block mb-1">KGOF</span>
              <span className="block mb-1 text-red-500">30th</span>
              <span className="block text-3xl md:text-5xl lg:text-6xl">സംസ്ഥാന സമ്മേളനം</span>
            </h1>

            <div className="space-y-4 mb-10 hero-text-shadow">
              <p className="text-xl md:text-2xl font-bold text-red-100">
                2026 ജനുവരി 9, 10, 11 | കണ്ണൂർ
              </p>
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span className="text-lg font-medium">{CONFERENCE_INFO.venueML}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onPageChange(Page.Registration)}
                className="tap-feedback px-10 py-4.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-2xl transition-all text-base uppercase tracking-widest border-b-4 border-red-800"
              >
                Deligate Check-In
              </button>
              <button 
                onClick={() => onPageChange(Page.Schedule)}
                className="tap-feedback px-10 py-4.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-black rounded-2xl transition-all text-base uppercase tracking-widest"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3 z-20">
          {HERO_CAROUSEL_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveHero(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeHero === idx ? 'w-12 bg-red-500' : 'w-4 bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section with Secondary Carousel */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4 py-8">
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 bg-red-50 text-red-600 rounded-md text-[10px] font-black uppercase tracking-widest">
            30 Years of Excellence
          </div>
          <h2 className="text-4xl font-black text-red-900 leading-tight tracking-tight">
            അവകാശ പോരാട്ടങ്ങളിലെ <br/>
            <span className="text-red-600">കരുത്തുറ്റ സാന്നിധ്യം</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            കേരളത്തിലെ ഗസറ്റഡ് ഓഫീസർമാരുടെ അവകാശ പോരാട്ടങ്ങൾക്ക് കരുത്തുപകർന്ന്, സർവീസിൽ ജനോപകാരപ്രദമായ മാറ്റങ്ങൾക്കായി 30 വർഷമായി നിലകൊള്ളുന്ന കെ.ജി.ഒ.എഫ് 30-ാം സംസ്ഥാന സമ്മേളനത്തിന് ചരിത്രമുറങ്ങുന്ന കണ്ണൂർ നഗരം ആതിഥ്യമരുളുന്നു.
          </p>
          
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">പ്രധാന പരിപാടികൾ</h3>
            <div className="flex flex-wrap gap-2">
              {programs.map((program, idx) => (
                <span 
                  key={idx} 
                  className="px-4 py-2 bg-red-50 text-red-900 font-bold text-sm rounded-xl border border-red-100"
                >
                  {program}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Optimized Image Carousel Container for Posters */}
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] md:border-[12px] border-white group bg-[#fdfaf8] aspect-[4/5] sm:aspect-[4/3] flex items-center justify-center">
           {ABOUT_CAROUSEL_IMAGES.map((img, idx) => (
             <img 
               key={idx}
               src={img} 
               alt={`About ${idx + 1}`} 
               className={`absolute inset-0 w-full h-full object-contain p-2 transition-all duration-1000 transform ${
                 activeAbout === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
               }`} 
               onError={(e) => {
                 (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1540575861501-7c001173a271?auto=format&fit=crop&w=1200&q=80";
               }}
             />
           ))}
           <div className="absolute inset-0 bg-red-900/[0.02] pointer-events-none" />
           
           {/* Navigation Dots for About Section */}
           {ABOUT_CAROUSEL_IMAGES.length > 1 && (
             <div className="absolute bottom-6 flex space-x-2 z-10">
               {ABOUT_CAROUSEL_IMAGES.map((_, idx) => (
                 <button 
                   key={idx}
                   onClick={() => setActiveAbout(idx)}
                   className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${
                     activeAbout === idx ? 'w-8 bg-red-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                   }`}
                   aria-label={`Go to slide ${idx + 1}`}
                 />
               ))}
             </div>
           )}
        </div>
      </section>
    </div>
  );
};
