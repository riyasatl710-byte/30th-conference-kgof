import React from 'react';
import { Page, Speaker, ScheduleItem, PressRelease, AdminStats } from './types.ts';

// YOUR ACTUAL API URL
export const API_URL = 'https://script.google.com/macros/s/AKfycbyk-EKV-UPmaFRN3RZyYamCKkYaHHL8wwos_SNncgzGmn1hlsrJAmLIa3NFsz32T_lXcQ/exec';

// Set this to false to enable your live Google Sheet connection.
export const IS_PLACEHOLDER_URL = false;

// VENUE CONFIGURATION
export const VENUE_COORDS = { lat: 11.87241, lng: 75.37092 }; // Dinesh Auditorium, Kannur
export const GEOFENCE_RADIUS_KM = 0.5; 

// PDF Notice URL
export const NOTICE_PDF_URL = "https://drive.google.com/file/d/13QJqUNehWOcFzBIEWNcUCq2_0dBfUXj3/view?usp=sharing";

// FEATURE TOGGLES
export const CREDENTIALS_OPEN = false; 

export const CONFERENCE_INFO = {
  nameML: "KGOF 30th സംസ്ഥാന സമ്മേളനം",
  nameEN: "KGOF 30th State Conference",
  datesML: "ജനുവരി 09 - 11, 2026",
  datesEN: "January 09 - 11, 2026",
  venueML: "ദിനേശ് ഓഡിറ്റോറിയം, കണ്ണൂർ",
  venueEN: "Dinesh Auditorium, Kannur",
  tagline: "Bridging Innovation and Excellence for the Future",
  logoUrl: "https://drive.google.com/thumbnail?id=1Yl8o5Rn915JteROgfmv2LKubqHgX3Vob&sz=w1000",
  contactEmail: "info@kgofstate.org",
  organization: "KERALA GAZETTED OFFICERS FEDERATION (KGOF)",
};

export const ABOUT_CAROUSEL_IMAGES = [
  "https://drive.google.com/thumbnail?id=1_SvI_2rlQrRPo3jVsecWObepcqPm1JfH&sz=w1200",
  "https://drive.google.com/thumbnail?id=1Yl8o5Rn915JteROgfmv2LKubqHgX3Vob&sz=w1200" 
];

export const KERALA_DISTRICTS = [
  "THIRUVANANTHAPURAM", "KOLLAM", "PATHANAMTHITTA", "ALAPPUZHA", "KOTTAYAM", 
  "IDUKKI", "ERNAKULAM", "THRISSUR", "PALAKKAD", "MALAPPURAM", 
  "KOZHIKODE", "WAYANAD", "KANNUR", "KASARAGOD"
];

export const NAVIGATION_LINKS = [
  { label: 'Home', page: Page.Home },
  { label: 'Check-in', page: Page.Registration },
  { label: 'Schedule', page: Page.Schedule },
  { label: 'Speakers', page: Page.Speakers },
  { label: 'Gallery', page: Page.Gallery },
  { label: 'Admin', page: Page.Admin },
];

export const MOCK_ADMIN_STATS: AdminStats = {
  total: 1200,
  present: 450,
  byDistrict: { "KANNUR": 150, "ALAPPUZHA": 100 },
  recent: []
};

export const MOCK_SPEAKERS: Speaker[] = [
  { 
    id: '1', 
    name: 'Sri. Binoy Viswam', 
    designation: 'CPI Secretary, Kerala', 
    bio: 'Member of Parliament (Rajya Sabha) and a prominent national leader of the Communist Party of India.', 
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=500&q=80' 
  },
  { 
    id: '2', 
    name: 'Adv. K. Rajan', 
    designation: 'Revenue Minister, Kerala', 
    bio: 'Cabinet Minister in the Government of Kerala representing Ollur.', 
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=500&q=80' 
  },
  { 
    id: '3', 
    name: 'Adv. G. R. Anil', 
    designation: 'Food & Civil Supplies Minister, Kerala', 
    bio: 'Minister for Food, Civil Supplies, Consumer Affairs and Legal Metrology.', 
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=500&q=80' 
  },
  { 
    id: '4', 
    name: 'Smt. J. Chinchurani', 
    designation: 'Animal Husbandry Minister, Kerala', 
    bio: 'The first female minister from CPI in Kerala.', 
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=500&q=80' 
  },
  { 
    id: '5', 
    name: 'Sri. P. Prasad', 
    designation: 'Agriculture Minister, Kerala', 
    bio: 'Minister for Agriculture and Farmers Welfare.', 
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=500&q=80' 
  },
  { 
    id: '6', 
    name: 'Com. K. P. Rajendran', 
    designation: 'National Executive Member, CPI', 
    bio: 'Former Minister for Revenue in Kerala and senior leader.', 
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=500&q=80' 
  },
  { 
    id: '7', 
    name: 'Adv. Santhosh Kumar', 
    designation: 'MP, Rajya Sabha', 
    bio: 'Serving Member of Parliament representing Kerala.', 
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=500&q=80' 
  },
  { 
    id: '8', 
    name: 'Sri. Sathyan Mokeri', 
    designation: 'State Assistant Secretary, CPI', 
    bio: 'Assistant Secretary of the CPI Kerala State Council.', 
    photoUrl: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=400&h=500&q=80' 
  }
];

export const MOCK_SCHEDULE: ScheduleItem[] = [
  { date: 'Jan 09', time: '11:00 AM', event: 'സംസ്ഥാന കമ്മിറ്റി യോഗം', speaker: 'കമ്മിറ്റി അംഗങ്ങൾ', speakerDesignation: 'കെ.ജി.ഒ.എഫ്', venue: 'Dinesh Auditorium' },
  { date: 'Jan 09', time: '02:00 PM', event: 'സംസ്ഥാന കൗൺസിൽ യോഗം', speaker: 'കൗൺസിൽ അംഗങ്ങൾ', speakerDesignation: 'കെ.ജി.ഒ.എഫ്', venue: 'Dinesh Auditorium' },
  { date: 'Jan 09', time: '05:00 PM', event: 'പൊതുസമ്മേളനം (ഉദ്ഘാടനം)', speaker: 'അഡ്വ. കെ. രാജൻ', speakerDesignation: 'ബഹു. റവന്യു - ഭവന നിർമ്മാണ വകുപ്പ് മന്ത്രി', venue: 'Stadium Corner, Kannur' },
  { date: 'Jan 09', time: '06:30 PM', event: 'സാംസ്‌കാരിക സന്ധ്യ (അലോഷി പാടുന്നു)', speaker: 'അലോഷി ആദം', speakerDesignation: '', venue: 'ദിനേശ് ഓഡിറ്റോറിയം' },
  { date: 'Jan 10', time: '09:00 AM', event: 'പ്രതിനിധി രജിസ്ട്രേഷൻ', speaker: '', speakerDesignation: '', venue: 'Dinesh Auditorium' },
  { date: 'Jan 10', time: '10:00 AM', event: 'പതാക ഉയർത്തൽ', speaker: 'ഡോ. കെ. ആർ. ബിനു പ്രശാന്ത്', speakerDesignation: 'സംസ്ഥാന പ്രസിഡന്റ്, കെ.ജി.ഒ.എഫ്', venue: 'Auditorium Premises' },
  { date: 'Jan 10', time: '10:30 AM', event: 'പ്രതിനിധി സമ്മേളനം (ഉദ്ഘാടനം)', speaker: 'സ. ബിനോയ്‌ വിശ്വം', speakerDesignation: 'സി.പി.ഐ സംസ്ഥാന സെക്രട്ടറി', venue: 'Dinesh Auditorium' },
  // Fix: Added missing 'time' property
  { date: 'Jan 10', time: '12:00 PM', event: 'മുഖ്യ പ്രഭാഷണം', speaker: 'അഡ്വ. ജി ആർ അനിൽ', speakerDesignation: 'ബഹു. ഭക്ഷ്യ പൊതുവിതരണ വകുപ്പ് മന്ത്രി', venue: 'Dinesh Auditorium' },
  { date: 'Jan 10', time: '01:00 PM', event: 'റിപ്പോർട്ട് അവതരണം', speaker: 'ഡോ. ഹാരിസ് വി എം', speakerDesignation: 'സംസ്ഥാന ജനറൽ സെക്രട്ടറി, കെ.ജി.ഒ.എഫ്', venue: 'Dinesh Auditorium' },
  // Fix: Added missing 'time' property
  { date: 'Jan 10', time: '02:00 PM', event: 'വരവ് ചെലവ് കണക്ക് അവതരണം', speaker: 'സ. എം എസ് വിമൽ കുമാർ', speakerDesignation: 'സംസ്ഥാന ട്രഷർ, കെ.ജി.ഒ.എഫ്', venue: 'Dinesh Auditorium' },
  // Fix: Added missing 'time' property
  { date: 'Jan 10', time: '03:00 PM', event: 'ബൈലോ ഭേദഗതി അവതരണം', speaker: 'ഡോ. കെ. എസ്. സജികുമാർ', speakerDesignation: 'സംസ്ഥാന സെക്രട്ടറിയറ്റ് അംഗം', venue: 'Dinesh Auditorium' }, 
  { date: 'Jan 10', time: '04:00 PM', event: 'സുഹൃദ് സമ്മേളനം ഉദ്ഘാടനം', speaker: 'ശ്രീമതി. ജെ. ചിഞ്ചuറാണി', speakerDesignation: 'ബഹു. മൃഗസംരക്ഷണ - ക്ഷീര വികസന വകുപ്പ് മന്ത്രി', venue: 'Dinesh Auditorium' },
  { date: 'Jan 10', time: '06:00 PM', event: 'സാംസ്‌കാരിക സമ്മേളനം', speaker: 'അഡ്വ. സന്തോഷ് കുമാർ എം.പി.', speakerDesignation: 'രാജയസഭ അംഗം', venue: 'Dinesh Auditorium' },
  { date: 'Jan 10', time: '07:00 PM', event: 'സാംസ്‌കാരിക സന്ധ്യ', speaker: 'ഗസൽ സാംസ്‌കാരിക വേദി, കെ ജി ഒ എഫ്', speakerDesignation: '', venue: 'Dinesh Auditorium' },
  { date: 'Jan 11', time: '11:00 AM', event: 'സെമിനാർ: ലേബർ കോഡും ഇന്ത്യൻ തൊഴിൽ നിയമങ്ങളും (ഉദ്ഘാടനം)', speaker: 'പി പ്രസാദ് ', speakerDesignation: 'ബഹു. കൃഷി വകുപ്പ് മന്ത്രി', venue: 'Dinesh Auditorium' },
  // Fix: Added missing 'time' property
  { date: 'Jan 11', time: '12:00 PM', event: 'വിഷയാവതരണം' , speaker: 'സ. ബേബി കാസ്ട്രോ', speakerDesignation: 'റിട്ട. ജോയിന്റ് ലേബർ കമ്മീഷണർ', venue: 'Dinesh Auditorium' },
  // Fix: Added missing 'time' property
  { date: 'Jan 11', time: '01:00 PM', event: 'മുഖ്യ പ്രഭാഷണം' , speaker: 'സ. ടി. ടി. ജിസ്മോൻ', speakerDesignation: 'സംസ്ഥാന സെക്രട്ടറി, എ ഐ വൈ എഫ്', venue: 'Dinesh Auditorium' },
  { date: 'Jan 11', time: '03:00 PM', event: 'ക്രെഡൻഷ്യൽ റിപ്പോർട്ട്‌ അവതരണം', speaker: 'റിപ്പോർട്ടിംഗ് കമ്മിറ്റി', speakerDesignation: 'കെ.ജി.ഒ.എഫ്', venue: 'Dinesh Auditorium' },
  { date: 'Jan 11', time: '04:00 PM', event: 'പ്രമേയ അവതരണം', speaker: 'പ്രമേയ കമ്മിറ്റി', speakerDesignation: 'കെ.ജി.ഒ.എഫ്', venue: 'Dinesh Auditorium' },
  { date: 'Jan 11', time: '04:30 PM', event: 'ഭാരവാഹികളുടെ തെരഞ്ഞെടുപ്പ്', speaker: 'റിട്ടേണിംഗ് ഓഫീസർ', speakerDesignation: 'കെ.ജി.ഒ.എഫ്', venue: 'Dinesh Auditorium' }
];

export const MOCK_PRESS_RELEASES: PressRelease[] = [
  {
    date: 'Dec 15, 2025',
    title: 'KGOF Announces 30th State Conference in Kannur',
    summary: 'The Kerala Gazetted Officers Federation is proud to host its landmark 30th State Conference.',
    pdfUrl: '#'
  }
];

export const HERO_CAROUSEL_IMAGES = [
  'https://images.unsplash.com/photo-1540575861501-7c001173a271?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=80',
];