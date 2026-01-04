
import React, { useState } from 'react';
import { CONFERENCE_INFO } from '../../constants.tsx';

export const LoadingScreen: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="pulse-custom mb-10 max-w-[80vw] relative">
        <div className="absolute inset-0 bg-red-100/30 blur-3xl rounded-full scale-150" />
        
        {!imgError ? (
          <img 
            src={CONFERENCE_INFO.logoUrl} 
            alt="KGOF Logo" 
            onError={() => setImgError(true)}
            className="h-28 md:h-36 object-contain relative z-10 filter drop-shadow-xl"
          />
        ) : (
          <div className="h-24 w-24 bg-red-600 rounded-3xl flex items-center justify-center text-white font-black text-4xl shadow-2xl relative z-10">
            K
          </div>
        )}
      </div>
      <div className="text-center px-4 relative z-10">
        <h2 className="text-3xl font-black text-red-900 tracking-tighter uppercase leading-tight">
          {CONFERENCE_INFO.nameEN}
        </h2>
        <div className="mt-6 flex items-center justify-center space-x-2">
          <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-bounce"></div>
          <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
        <p className="mt-8 text-gray-400 font-black tracking-[0.4em] text-[10px] uppercase">
          Kerala Gazetted Officers Federation
        </p>
      </div>
    </div>
  );
};
