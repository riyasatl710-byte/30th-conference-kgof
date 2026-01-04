
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// --- CONFIG & CONSTANTS ---
const API_URL = 'https://script.google.com/macros/s/AKfycbyk-EKV-UPmaFRN3RZyYamCKkYaHHL8wwos_SNncgzGmn1hlsrJAmLIa3NFsz32T_lXcQ/exec';
const IS_PLACEHOLDER_URL = false;
const VENUE_COORDS = { lat: 11.87241, lng: 75.37092 };
const GEOFENCE_RADIUS_KM = 0.5;
const NOTICE_PDF_URL = "https://drive.google.com/file/d/13QJqUNehWOcFzBIEWNcUCq2_0dBfUXj3/view?usp=sharing";

enum Page {
  Home = 'home',
  Registration = 'registration',
  Schedule = 'schedule',
  Speakers = 'speakers',
  Gallery = 'gallery',
  Admin = 'admin'
}

const CONFERENCE_INFO = {
  nameML: "KGOF 30th സംസ്ഥാന സമ്മേളനം",
  nameEN: "KGOF 30th State Conference",
  datesML: "ജനുവരി 09 - 11, 2026",
  datesEN: "January 09 - 11, 2026",
  venueML: "ദിനേശ് ഓഡിറ്റോറിയം, കണ്ണൂർ",
  venueEN: "Dinesh Auditorium, Kannur",
  logoUrl: "https://drive.google.com/thumbnail?id=1Yl8o5Rn915JteROgfmv2LKubqHgX3Vob&sz=w1000",
  contactEmail: "info@kgofstate.org"
};

const KERALA_DISTRICTS = [
  "THIRUVANANTHAPURAM", "KOLLAM", "PATHANAMTHITTA", "ALAPPUZHA", "KOTTAYAM", 
  "IDUKKI", "ERNAKULAM", "THRISSUR", "PALAKKAD", "MALAPPURAM", 
  "KOZHIKODE", "WAYANAD", "KANNUR", "KASARAGOD"
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1540575861501-7c001173a271?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=80",
  "https://drive.google.com/thumbnail?id=1Yl8o5Rn915JteROgfmv2LKubqHgX3Vob&sz=w1000"
];

const MOCK_SPEAKERS = [
  { id: '1', name: 'Com. Binoy Viswam', designation: 'Secretary, CPI, Kerala', bio: 'Member of Parliament (Rajya Sabha) and a prominent national leader.', photoUrl: 'https://drive.google.com/thumbnail?id=1lP-8R0f1jikUjWppXPTTrfuGsE8PjwCt&sz=w800' },
  { id: '2', name: 'Adv. K. Rajan', designation: 'Revenue Minister, Kerala', bio: 'Cabinet Minister in the Government of Kerala.', photoUrl: 'https://drive.google.com/thumbnail?id=1xnnW09Ezwco6lB-eZHNKhBWKrbsct-0k&sz=w800' },
  { id: '3', name: 'Adv. G. R. Anil', designation: 'Food Minister, Kerala', bio: 'Minister for Food, Civil Supplies, Consumer Affairs.', photoUrl: 'https://drive.google.com/thumbnail?id=1cf3RJSlJUKguoR8XWAf3N2C-WVpG7rId&sz=w800' },
  { id: '4', name: 'Smt. J. Chinchurani', designation: 'Animal Husbandry Minister, Kerala', bio: 'Minister for Animal Husbandry & Dairy Development.', photoUrl: 'https://drive.google.com/thumbnail?id=1Ap4biDu8zYcsKmgL1YFR2SVO-92IsqGy&sz=w800' }
];

const MOCK_SCHEDULE = [
  { date: 'Jan 09', time: '11:00 AM', event: 'സംസ്ഥാന കമ്മിറ്റി യോഗം', speaker: 'കമ്മിറ്റി അംഗങ്ങൾ', venue: 'Dinesh Auditorium' },
  { date: 'Jan 09', time: '05:00 PM', event: 'പൊതുസമ്മേളനം (ഉദ്ഘാടനം)', speaker: 'അഡ്വ. കെ. രാജൻ', venue: 'Stadium Corner' },
  { date: 'Jan 10', time: '09:00 AM', event: 'പ്രതിനിധി സമ്മേളനം', speaker: 'കോം. ബിനോയ് വിശ്വം', venue: 'Dinesh Auditorium' }
];

// --- API SERVICE ---
const api = {
  async fetch(action: string, params: Record<string, string> = {}) {
    if (IS_PLACEHOLDER_URL) return null;
    const query = new URLSearchParams({ action, ...params }).toString();
    try {
      const res = await fetch(`${API_URL}?${query}`);
      return await res.json();
    } catch (e) {
      console.error(`API Error [${action}]:`, e);
      return null;
    }
  }
};

// --- COMPONENTS ---

const Header = ({ currentPage, onPageChange }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { label: 'Home', page: Page.Home },
    { label: 'Check-in', page: Page.Registration },
    { label: 'Schedule', page: Page.Schedule },
    { label: 'Speakers', page: Page.Speakers },
    { label: 'Gallery', page: Page.Gallery },
    { label: 'Admin', page: Page.Admin }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-md border-b-2 border-red-700 h-20">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => onPageChange(Page.Home)}>
          <img src={CONFERENCE_INFO.logoUrl} className="h-12 w-auto" alt="Logo" />
          <div className="ml-3 hidden sm:block">
            <span className="text-xl font-black text-red-800 leading-none block">KGOF</span>
            <span className="text-[9px] text-red-700 font-bold block uppercase tracking-widest">30th State Conference</span>
          </div>
        </div>
        <nav className="hidden lg:flex space-x-1">
          {links.map(l => (
            <button key={l.page} onClick={() => onPageChange(l.page)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${currentPage === l.page ? 'bg-red-700 text-white shadow-lg' : 'text-gray-600 hover:bg-red-50'}`}>{l.label}</button>
          ))}
        </nav>
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-red-700">
           <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </div>
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white shadow-2xl p-4 flex flex-col gap-2 z-50 border-t">
          {links.map(l => (
            <button key={l.page} onClick={() => { onPageChange(l.page); setIsOpen(false); }} className={`w-full py-4 rounded-xl text-left px-6 text-sm font-black uppercase tracking-widest ${currentPage === l.page ? 'bg-red-700 text-white' : 'bg-gray-50 text-gray-700'}`}>{l.label}</button>
          ))}
        </div>
      )}
    </header>
  );
};

const LoadingScreen = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
    <div className="pulse-custom mb-8"><img src={CONFERENCE_INFO.logoUrl} className="h-32 object-contain" /></div>
    <div className="text-center">
      <h2 className="text-2xl font-black text-red-900 uppercase tracking-tighter leading-none">{CONFERENCE_INFO.nameEN}</h2>
      <div className="mt-6 flex justify-center space-x-2">
        {[0,1,2].map(i => <div key={i} className="w-2.5 h-2.5 bg-red-600 rounded-full animate-bounce" style={{animationDelay: `${i*0.2}s`}}></div>)}
      </div>
    </div>
  </div>
);

const Home = ({ onPageChange }: any) => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-12 fade-in">
      <section className="relative w-full min-h-[500px] md:min-h-[600px] overflow-hidden rounded-[2.5rem] shadow-2xl bg-red-950">
        <div className="absolute inset-0">
          {HERO_IMAGES.map((img, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${active === i ? 'opacity-100' : 'opacity-0'}`}>
              {i === 2 && <div className="absolute inset-0 flex items-center justify-center"><div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-red-600/30 blur-[100px] rounded-full animate-pulse" /></div>}
              <img src={img} className={`w-full h-full ${i === 2 ? 'object-contain p-20 md:p-40 z-10' : 'object-cover opacity-40'} transition-transform duration-[6000ms] ${active === i ? 'scale-110' : 'scale-100'}`} />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 h-full flex items-center p-6 md:p-16 text-white">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-black mb-6 hero-text-shadow leading-tight tracking-tighter">
              <span className="block">KGOF 30th</span>
              <span className="block text-red-500">സംസ്ഥാന സമ്മേളനം</span>
            </h1>
            <p className="text-xl md:text-3xl font-bold mb-8 text-red-100 drop-shadow-md">2026 ജനുവരി 9, 10, 11 | കണ്ണൂർ</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => onPageChange(Page.Registration)} className="tap-feedback px-10 py-5 bg-red-600 rounded-2xl font-black uppercase tracking-widest shadow-2xl border-b-4 border-red-800">Check-In</button>
              <button onClick={() => onPageChange(Page.Schedule)} className="tap-feedback px-10 py-5 bg-white/10 backdrop-blur-md rounded-2xl font-black uppercase tracking-widest border border-white/20">Schedule</button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-xl border border-gray-100 text-center">
         <h2 className="text-3xl md:text-5xl font-black text-red-900 mb-6 leading-tight">അവകാശ പോരാട്ടങ്ങളിലെ കരുത്തുറ്റ സാന്നിധ്യം</h2>
         <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">കേരളത്തിലെ ഗസറ്റഡ് ഓഫീസർമാരുടെ അവകാശ പോരാട്ടങ്ങൾക്ക് കരുത്തുപകർന്ന്, സർവീസിൽ ജനോപകാരപ്രദമായ മാറ്റങ്ങൾക്കായി 30 വർഷമായി നിലകൊള്ളുന്ന കെ.ജി.ഒ.എഫ് 30-ാം സംസ്ഥാന സമ്മേളനത്തിന് കണ്ണൂർ നഗരം ആതിഥ്യമരുളുന്നു.</p>
      </section>
    </div>
  );
};

const Schedule = () => (
  <div className="max-w-5xl mx-auto space-y-8 fade-in">
    <div className="text-center space-y-4">
      <h2 className="text-4xl font-black text-red-900 uppercase">സമ്മേളന പരിപാടികൾ</h2>
      <a href={NOTICE_PDF_URL} target="_blank" className="inline-block px-6 py-3 bg-red-50 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-xl border border-red-100">View Full Notice (PDF)</a>
    </div>
    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-50 overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-[11px] font-black text-red-900 uppercase tracking-widest"><th className="p-8">Time</th><th className="p-8">Event</th><th className="p-8">Venue</th></thead>
        <tbody className="divide-y divide-gray-100">
          {MOCK_SCHEDULE.map((s, i) => (
            <tr key={i} className="hover:bg-red-50/20">
              <td className="p-8 whitespace-nowrap"><span className="px-4 py-2 bg-red-50 text-red-700 rounded-xl font-black text-sm">{s.time}</span></td>
              <td className="p-8">
                <div className="font-black text-gray-900 text-lg mb-1 leading-tight">{s.event}</div>
                <div className="text-xs font-bold text-red-600 uppercase tracking-widest">{s.speaker}</div>
              </td>
              <td className="p-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.venue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Speakers = () => (
  <div className="space-y-12 fade-in">
    <div className="text-center max-w-2xl mx-auto space-y-4">
      <h2 className="text-4xl font-black text-red-900 uppercase">Leading Voices</h2>
      <p className="text-gray-500 font-medium">Honored guests presiding over the 30th KGOF State Conference.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {MOCK_SPEAKERS.map(s => (
        <div key={s.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-50 group flex flex-col h-full">
          <div className="h-64 bg-gray-100 relative overflow-hidden">
            <img src={s.photoUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          </div>
          <div className="p-6 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-black text-gray-900 leading-tight">{s.name}</h3>
              <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mt-2">{s.designation}</p>
            </div>
            <button className="mt-6 w-full py-3 bg-red-50 text-red-700 font-black text-[10px] uppercase rounded-xl">Profile</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const App = () => {
  const [page, setPage] = useState(Page.Home);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('page') as Page;
    if (p) setPage(p);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handlePageChange = (p: Page) => {
    setPage(p);
    window.history.pushState({}, '', `?page=${p}`);
    window.scrollTo(0,0);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPage={page} onPageChange={handlePageChange} />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-10 md:py-16">
        {page === Page.Home && <Home onPageChange={handlePageChange} />}
        {page === Page.Schedule && <Schedule />}
        {page === Page.Speakers && <Speakers />}
        {page !== Page.Home && page !== Page.Schedule && page !== Page.Speakers && (
          <div className="py-32 text-center opacity-30"><h2 className="text-3xl font-black uppercase tracking-widest italic">Coming Soon</h2></div>
        )}
      </main>
      <footer className="bg-white border-t p-10 text-center">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">&copy; 2026 Kerala Gazetted Officers Federation (KGOF)</p>
      </footer>
    </div>
  );
};

// --- BOOTSTRAP ---
const el = document.getElementById('root');
if (el) {
  const loader = document.getElementById('fallback-loader');
  if (loader) loader.style.display = 'none';
  createRoot(el).render(<App />);
}
