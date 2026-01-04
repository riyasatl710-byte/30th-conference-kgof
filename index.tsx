
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// --- TYPES ---
enum Page {
  Home = 'home',
  Registration = 'registration',
  Schedule = 'schedule',
  Speakers = 'speakers',
  Gallery = 'gallery',
  Admin = 'admin'
}

interface Speaker {
  id: string;
  name: string;
  designation: string;
  bio: string;
  photoUrl: string;
}

interface ScheduleItem {
  date: string;
  time: string;
  event: string;
  speaker: string;
  speakerDesignation?: string;
  venue: string;
}

// --- CONSTANTS ---
const CONFERENCE_INFO = {
  nameML: "KGOF 30th സംസ്ഥാന സമ്മേളനം",
  nameEN: "KGOF 30th State Conference",
  datesML: "ജനുവരി 09 - 11, 2026",
  datesEN: "January 09 - 11, 2026",
  venueML: "ദിനേശ് ഓഡിറ്റോറിയം, കണ്ണൂർ",
  venueEN: "Dinesh Auditorium, Kannur",
  logoUrl: "https://drive.google.com/thumbnail?id=1Yl8o5Rn915JteROgfmv2LKubqHgX3Vob&sz=w1000",
};

const HERO_CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1540575861501-7c001173a271?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=80",
  "https://drive.google.com/thumbnail?id=1Yl8o5Rn915JteROgfmv2LKubqHgX3Vob&sz=w1000"
];

const NAVIGATION_LINKS = [
  { label: 'Home', page: Page.Home },
  { label: 'Check-in', page: Page.Registration },
  { label: 'Schedule', page: Page.Schedule },
  { label: 'Speakers', page: Page.Speakers },
  { label: 'Gallery', page: Page.Gallery },
  { label: 'Admin', page: Page.Admin },
];

// --- COMPONENTS ---

const LoadingScreen = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
    <div className="pulse-custom mb-10"><img src={CONFERENCE_INFO.logoUrl} className="h-32 object-contain" /></div>
    <div className="text-center">
      <h2 className="text-2xl font-black text-red-900 uppercase tracking-tighter">{CONFERENCE_INFO.nameEN}</h2>
      <div className="mt-4 flex justify-center space-x-1">
        {[0,1,2].map(i => <div key={i} className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{animationDelay: `${i*0.2}s`}}></div>)}
      </div>
    </div>
  </div>
);

const Header = ({ currentPage, onPageChange }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-md border-b-2 border-red-700">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => onPageChange(Page.Home)}>
          <img src={CONFERENCE_INFO.logoUrl} className="h-12 w-auto" />
          <div className="ml-3">
            <span className="text-xl font-black text-red-800 leading-none block">KGOF</span>
            <span className="text-[9px] text-red-700 font-bold block uppercase tracking-widest">30th State Conference</span>
          </div>
        </div>
        <nav className="hidden lg:flex space-x-1">
          {NAVIGATION_LINKS.map(link => (
            <button key={link.page} onClick={() => onPageChange(link.page)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${currentPage === link.page ? 'bg-red-700 text-white shadow-lg' : 'text-gray-600 hover:bg-red-50'}`}>{link.label}</button>
          ))}
        </nav>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-red-700">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white shadow-2xl p-4 flex flex-col gap-2 z-50">
          {NAVIGATION_LINKS.map(link => (
            <button key={link.page} onClick={() => {onPageChange(link.page); setIsMenuOpen(false);}} className={`w-full py-4 rounded-xl text-left px-6 text-sm font-black uppercase tracking-widest ${currentPage === link.page ? 'bg-red-700 text-white' : 'bg-gray-50 text-gray-700'}`}>{link.label}</button>
          ))}
        </div>
      )}
    </header>
  );
};

const Home = ({ onPageChange }: any) => {
  const [activeHero, setActiveHero] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActiveHero(p => (p + 1) % HERO_CAROUSEL_IMAGES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-12 fade-in">
      <section className="relative w-full min-h-[500px] md:min-h-[600px] overflow-hidden rounded-[2.5rem] shadow-2xl bg-red-950">
        <div className="absolute inset-0">
          {HERO_CAROUSEL_IMAGES.map((img, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${activeHero === idx ? 'opacity-100' : 'opacity-0'}`}>
              {idx === 2 && <div className="absolute inset-0 flex items-center justify-center"><div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-red-600/20 blur-[120px] rounded-full animate-pulse" /></div>}
              <img src={img} className={`w-full h-full ${idx === 2 ? 'object-contain p-20 md:p-32 z-10 drop-shadow-2xl' : 'object-cover opacity-40'} transition-transform duration-[6000ms] ${activeHero === idx ? 'scale-110' : 'scale-100'}`} />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 h-full flex items-center p-6 md:p-16 text-white">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-black mb-6 hero-text-shadow leading-tight">
              <span className="block">KGOF 30th</span>
              <span className="block text-red-500">സംസ്ഥാന സമ്മേളനം</span>
            </h1>
            <p className="text-lg md:text-2xl font-bold mb-8 text-red-100">2026 ജനുവരി 9, 10, 11 | ദിനേശ് ഓഡിറ്റോറിയം, കണ്ണൂർ</p>
            <div className="flex gap-4">
              <button onClick={() => onPageChange(Page.Registration)} className="px-8 py-4 bg-red-600 rounded-2xl font-black uppercase tracking-widest shadow-xl">Check-In</button>
              <button onClick={() => onPageChange(Page.Schedule)} className="px-8 py-4 bg-white/10 backdrop-blur rounded-2xl font-black uppercase tracking-widest border border-white/20">Schedule</button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-xl border border-gray-100 text-center">
         <h2 className="text-3xl md:text-5xl font-black text-red-900 mb-6 leading-tight">അവകാശ പോരാട്ടങ്ങളിലെ കരുത്തുറ്റ സാന്നിധ്യം</h2>
         <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">കേരളത്തിലെ ഗസറ്റഡ് ഓഫീസർമാരുടെ അവകാശ പോരാട്ടങ്ങൾക്ക് കരുത്തുപകർന്ന്, സർവീസിൽ ജനോപകാരപ്രദമായ മാറ്റങ്ങൾക്കായി 30 വർഷമായി നിലകൊള്ളുന്ന കെ.ജി.ഒ.എഫ് 30-ാം സംസ്ഥാന സമ്മേളനത്തിന് ചരിത്രമുറങ്ങുന്ന കണ്ണൂർ നഗരം ആതിഥ്യമരുളുന്നു.</p>
      </section>
    </div>
  );
};

const Schedule = () => {
  const mockSchedule = [
    { time: '11:00 AM', event: 'സംസ്ഥാന കമ്മിറ്റി യോഗം', speaker: 'കമ്മിറ്റി അംഗങ്ങൾ', venue: 'ദിനേശ് ഓഡിറ്റോറിയം' },
    { time: '05:00 PM', event: 'പൊതുസമ്മേളനം (ഉദ്ഘാടനം)', speaker: 'അഡ്വ. കെ. രാജൻ', venue: 'Stadium Corner, Kannur' },
    { time: '09:00 AM', event: 'പ്രതിനിധി സമ്മേളനം', speaker: 'കോം. ബിനോയ് വിശ്വം', venue: 'ദിനേശ് ഓഡിറ്റോറിയം' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 fade-in">
      <div className="text-center"><h2 className="text-4xl font-black text-red-900 uppercase">സമ്മേളന പരിപാടികൾ</h2></div>
      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-50">
        <table className="w-full">
          <thead className="bg-gray-50"><tr className="text-left text-[11px] font-black text-red-900 uppercase tracking-widest"><th className="p-8">Time</th><th className="p-8">Event</th><th className="p-8">Venue</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {mockSchedule.map((s, i) => (
              <tr key={i} className="hover:bg-red-50/20">
                <td className="p-8"><span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg font-black text-sm">{s.time}</span></td>
                <td className="p-8">
                  <div className="font-black text-gray-900 text-lg mb-1">{s.event}</div>
                  <div className="text-xs font-bold text-red-600 uppercase tracking-widest">{s.speaker}</div>
                </td>
                <td className="p-8 text-xs font-bold text-gray-400 uppercase">{s.venue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(Page.Home);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('page') as Page;
    if (p) setCurrentPage(p);
    setTimeout(() => setIsLoading(false), 1200);
  }, []);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    window.history.pushState({}, '', `?page=${page}`);
    window.scrollTo(0,0);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 md:py-12">
        {currentPage === Page.Home && <Home onPageChange={handlePageChange} />}
        {currentPage === Page.Schedule && <Schedule />}
        {currentPage !== Page.Home && currentPage !== Page.Schedule && (
          <div className="py-20 text-center"><h2 className="text-2xl font-black text-gray-300 uppercase tracking-widest">Section under final polish...</h2></div>
        )}
      </main>
      <footer className="bg-white border-t p-8 text-center"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">&copy; 2026 Kerala Gazetted Officers Federation (KGOF)</p></footer>
    </div>
  );
};

// --- BOOTSTRAP ---
const container = document.getElementById('root');
if (container) {
  container.innerHTML = '';
  const root = createRoot(container);
  root.render(<App />);
}
