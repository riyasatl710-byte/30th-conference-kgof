
import React from 'react';
// Corrected import path to include .tsx and ensure it points to the existing file
import { MOCK_PRESS_RELEASES } from '../../constants.tsx';

export const PressReleases: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-black text-red-900 uppercase tracking-tight">Press & Updates</h2>
        <p className="mt-2 text-gray-500 font-medium">Official announcements and media resources.</p>
      </div>

      <div className="space-y-6">
        {MOCK_PRESS_RELEASES.map((pr, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:border-red-200 transition-colors">
            <span className="text-sm font-black text-red-600 uppercase tracking-widest">{pr.date}</span>
            <h3 className="text-xl font-bold text-gray-900 mt-2 mb-4">{pr.title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{pr.summary}</p>
            <a 
              href={pr.pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-red-600 font-black text-xs uppercase tracking-widest hover:underline"
            >
              Read Full Release (PDF)
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        ))}
      </div>
      
      <div className="bg-red-900 p-10 rounded-3xl text-white text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-800 rounded-full -mr-16 -mt-16 opacity-50 blur-2xl"></div>
        <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Media Inquiries</h3>
        <p className="text-red-100 mb-6 font-medium">For interviews or official statements, please reach out to our media relations team.</p>
        <a href="mailto:info@stateconference2026.org" className="px-10 py-4 bg-white text-red-900 font-black rounded-2xl hover:bg-red-50 transition-colors uppercase tracking-widest text-sm inline-block shadow-lg">
          Contact Media Team
        </a>
      </div>
    </div>
  );
};
