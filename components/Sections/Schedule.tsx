
import React, { useState, useEffect } from 'react';
import { gasApi } from '../../services/api.ts';
import { ScheduleItem } from '../../types.ts';
import { NOTICE_PDF_URL } from '../../constants.tsx';

const DATE_DISPLAY_LABELS: Record<string, string> = {
  'Jan 09': 'ജനുവരി 09 വെള്ളി',
  'Jan 10': 'ജനുവരി 10 ശനി',
  'Jan 11': 'ജനുവരി 11 ഞായർ'
};

export const Schedule: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    gasApi.getSchedule().then(data => {
      // Ensure data is an array before setting state
      const safeData = Array.isArray(data) ? data : [];
      setScheduleData(safeData);
      if (safeData.length > 0) {
        setSelectedDate(safeData[0].date);
      }
      setLoading(false);
    }).catch(err => {
      console.error("Failed to load schedule:", err);
      setLoading(false);
    });
  }, []);

  // Use a safer check for scheduleData
  const safeSchedule = Array.isArray(scheduleData) ? scheduleData : [];
  const dates = Array.from(new Set(safeSchedule.map(item => item.date)));
  const filteredSchedule = safeSchedule.filter(item => item.date === selectedDate);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Live Schedule...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 fade-in">
      <div className="text-center px-4 space-y-4">
        <h2 className="text-4xl font-black text-red-900 uppercase tracking-tight">സമ്മേളന പരിപാടികൾ</h2>
        <p className="text-gray-500 font-medium tracking-wide">30-ാം സംസ്ഥാന സമ്മേളനത്തിന്റെ ഔദ്യോഗിക ഷെഡ്യൂൾ.</p>
        
        <div className="pt-2">
          <a 
            href={NOTICE_PDF_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-red-50 text-red-700 text-xs font-black uppercase tracking-widest rounded-xl border border-red-100 hover:bg-red-600 hover:text-white transition-all shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Full Notice (PDF)
          </a>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 px-4">
        {dates.map(date => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`flex-1 min-w-[140px] sm:flex-none px-6 py-4 rounded-2xl text-[11px] font-black uppercase transition-all shadow-lg tap-feedback ${
              selectedDate === date 
                ? 'bg-red-600 text-white scale-105 z-10' 
                : 'bg-white text-red-600 border border-red-50 hover:bg-red-50'
            }`}
          >
            {DATE_DISPLAY_LABELS[date] || date}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 mx-4">
        <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-6 text-left text-[10px] font-black text-red-900 uppercase tracking-widest">Time</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-red-900 uppercase tracking-widest">Session / Speaker</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-red-900 uppercase tracking-widest">Venue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {filteredSchedule.map((item, idx) => (
                <tr key={idx} className="hover:bg-red-50/20 transition-colors">
                  <td className="px-8 py-7 whitespace-nowrap">
                    <span className="text-sm font-black text-red-600 tabular-nums">{item.time}</span>
                  </td>
                  <td className="px-8 py-7">
                    <div className="text-base font-bold text-gray-900 leading-tight mb-2">{item.event}</div>
                    {item.speaker && item.speaker !== '-' && (
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-red-600">{item.speaker}</span>
                        {item.speakerDesignation && (
                          <span className="text-xs font-normal text-gray-500 mt-0.5">{item.speakerDesignation}</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-7 whitespace-nowrap">
                    <div className="flex items-center text-xs font-black text-gray-400 uppercase tracking-tight">
                      <svg className="w-3.5 h-3.5 mr-1.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {item.venue}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredSchedule.length === 0 && (
        <div className="text-center py-24 bg-gray-50/50 rounded-[2.5rem] border-2 border-dashed border-gray-100 mx-4">
          <p className="text-gray-400 font-bold">No sessions found for this day.</p>
        </div>
      )}
    </div>
  );
};
