
import React, { useState } from 'react';
import { Page } from '../../types.ts';
import { NAVIGATION_LINKS, CONFERENCE_INFO } from '../../constants.tsx';

interface HeaderProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-md border-b-2 border-red-700">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center cursor-pointer tap-feedback py-1"
          onClick={() => onPageChange(Page.Home)}
        >
          <div className="h-14 w-14 flex-shrink-0">
            {!imgError ? (
              <img 
                src={CONFERENCE_INFO.logoUrl} 
                alt="KGOF Logo" 
                onError={() => setImgError(true)}
                className="h-full w-auto object-contain"
              />
            ) : (
              <div className="h-full w-full bg-red-700 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-inner">K</div>
            )}
          </div>
          <div className="ml-4 hidden sm:block">
            <span className="text-2xl font-[1000] text-red-800 leading-none block uppercase tracking-tighter">KGOF</span>
            <span className="text-[10px] text-red-700 font-black block uppercase tracking-widest mt-0.5">30th State Conference</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {NAVIGATION_LINKS.map((link) => (
            <button
              key={link.page}
              onClick={() => onPageChange(link.page)}
              className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase transition-all ${
                currentPage === link.page 
                  ? 'bg-red-700 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-red-50 hover:text-red-700'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden -mr-2 p-3 tap-feedback text-red-700"
          aria-label="Toggle Menu"
        >
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-50 p-4 overflow-y-auto fade-in">
          <div className="grid grid-cols-1 gap-3">
            {NAVIGATION_LINKS.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  onPageChange(link.page);
                  setIsMenuOpen(false);
                }}
                className={`w-full h-16 rounded-2xl text-left px-6 text-base font-black uppercase tracking-widest tap-feedback shadow-sm ${
                  currentPage === link.page 
                    ? 'bg-red-700 text-white' 
                    : 'bg-gray-50 text-gray-700 border border-gray-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
