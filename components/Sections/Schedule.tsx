
import React, { useState, useEffect, useMemo } from 'react';
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
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await gasApi.getSchedule();
        const safeData = Array.isArray(data) ? data : [];
        setScheduleData(safeData);
        
        if (safeData.length > 0) {
          // Default to the first date found in the schedule
          const uniqueDates = Array.from(new Set(safeData.map(item => item.date)));
          setSelectedDate(uniqueDates[0]);
        }
      } catch (err) {
        console.error("Critical error loading schedule:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const dates = useMemo(() => {
    return Array.from(new Set(scheduleData.map(item => item.date)));
  }, [scheduleData]);

  const filteredSchedule = useMemo(() => {
    return scheduleData.filter(item => item.date === selectedDate);
  }, [scheduleData, selectedDate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mb-6"></div>
        <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">Syncing Schedule...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 fade-in">
      {/* Header Section */}
      <div className="text-center px-4 space-y-6">
        <h2 className="text-5xl font-black text-red-900 uppercase tracking-tighter">സമ്മേളന പരിപാടികൾ</h2>
        <p className="text-gray-500 font-bold tracking-widest text-xs uppercase opacity-60">
          Official Schedule for the 30th KGOF State Conference
        </p>
        
        <div className="pt-4">
          <a 
            href={NOTICE_PDF_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="tap-feedback inline-flex items-center px-8 py-4 bg-white text-red-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl border-2 border-red-50 shadow-xl shadow-red-900/5 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
          >
            <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Full Notice (PDF)
          </a>
        </div>
      </div>

      {/* Day Selection Tabs - Simplified to show only Malayalam date */}
      <div className="sticky top-24 z-30 flex flex-wrap justify-center gap-4 px-4 py-2">
        {dates.map(date => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`flex-1 min-w-[160px] sm:flex-none px-8 py-6 rounded-[1.5rem] text-sm font-black transition-all shadow-2xl tap-feedback border-2 ${
              selectedDate === date 
                ? 'bg-red-700 border-red-800 text-white scale-105 z-10' 
                : 'bg-white border-white text-gray-500 hover:text-red-700 hover:border-red-50'
            }`}
          >
            <span className="block tracking-tight whitespace-nowrap">
              {DATE_DISPLAY_LABELS[date] || date}
            </span>
          </button>
        ))}
      </div>

      {/* Schedule Table Container */}
      <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(153,27,27,0.12)] overflow-hidden border border-gray-50 mx-4">
        <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-10 py-8 text-left text-[11px] font-black text-red-900 uppercase tracking-[0.2em]">Time</th>
                <th className="px-10 py-8 text-left text-[11px] font-black text-red-900 uppercase tracking-[0.2em]">Session / Speaker</th>
                <th className="px-10 py-8 text-left text-[11px] font-black text-red-900 uppercase tracking-[0.2em]">Venue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {filteredSchedule.map((item, idx) => (
                <tr key={idx} className="hover:bg-red-50/20 transition-all group">
                  <td className="px-10 py-8 whitespace-nowrap">
                    <span className="inline-flex items-center px-4 py-2 bg-red-50 text-red-700 text-sm font-black rounded-xl tabular-nums group-hover:bg-red-600 group-hover:text-white transition-colors">
                      {item.time}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="text-lg font-black text-gray-900 leading-tight mb-3 tracking-tight">
                      {item.event}
                    </div>
                    {item.speaker && item.speaker !== '-' && (
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                          <span className="text-sm font-black text-red-700 uppercase tracking-wide">{item.speaker}</span>
                        </div>
                        {item.speakerDesignation && (
                          <span className="text-xs font-bold text-gray-400 ml-3.5 italic">{item.speakerDesignation}</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-10 py-8 whitespace-nowrap">
                    <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <div className="p-2 bg-red-50 rounded-lg mr-3">
                        <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </div>
                      {item.venue}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSchedule.length === 0 && (
          <div className="text-center py-32 bg-gray-50/30 flex flex-col items-center">
             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
                </svg>
             </div>
             <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs">No sessions found for this day.</p>
          </div>
        )}
      </div>
    </div>
  );
};
