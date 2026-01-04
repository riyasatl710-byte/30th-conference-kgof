
import React, { useState } from 'react';
import { CONFERENCE_INFO } from '../../constants.tsx';

export const Footer: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <footer className="bg-white border-t border-gray-100 mt-6">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Identity Block - Enlarged Logo */}
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 flex-shrink-0">
              {!imgError ? (
                <img 
                  src={CONFERENCE_INFO.logoUrl} 
                  alt="KGOF" 
                  onError={() => setImgError(true)}
                  className="h-full w-auto object-contain"
                />
              ) : (
                <div className="h-12 w-12 bg-red-700 rounded-xl flex items-center justify-center text-white font-black text-lg">K</div>
              )}
            </div>
            <div className="leading-tight">
              <h3 className="text-xs font-black text-red-900 uppercase tracking-tighter">
                {CONFERENCE_INFO.nameEN}
              </h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                {CONFERENCE_INFO.venueEN}
              </p>
            </div>
          </div>

          {/* Quick Stats/Copyright */}
          <div className="flex items-center space-x-6">
            <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} KGOF
            </div>
            <div className="h-4 w-[1px] bg-gray-100 hidden sm:block"></div>
            <div className="flex space-x-6">
              <a href={`mailto:${CONFERENCE_INFO.contactEmail}`} className="text-[10px] font-black text-red-700 uppercase hover:text-red-900 tap-feedback">Support</a>
              <a href="#" className="text-[10px] font-black text-red-700 uppercase hover:text-red-900 tap-feedback">Privacy</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
