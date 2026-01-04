
import React, { useState, useEffect } from 'react';
import { CREDENTIALS_OPEN } from '../../constants.tsx';
import { gasApi } from '../../services/api.ts';
import { Delegate } from '../../types.ts';

export const Credentials: React.FC = () => {
  const [checkedInDelegate, setCheckedInDelegate] = useState<Delegate | null>(null);
  const [formData, setFormData] = useState({
    comments: '',
    rating: '5'
  });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({
    type: 'idle',
    message: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('checked_in_delegate');
    if (saved) {
      setCheckedInDelegate(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkedInDelegate) return;

    setStatus({ type: 'loading', message: 'Submitting report...' });
    const res = await gasApi.submitCredential({
      delegateId: checkedInDelegate.id,
      delegateName: checkedInDelegate.name,
      ...formData
    });

    if (res.success) {
      setStatus({ type: 'success', message: 'Credential report submitted successfully.' });
      setFormData({ comments: '', rating: '5' });
    } else {
      setStatus({ type: 'error', message: res.message });
    }
  };

  if (!CREDENTIALS_OPEN) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-[3rem] shadow-xl border border-gray-100">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <h2 className="text-3xl font-black text-red-900 uppercase tracking-tight">Report Portal Locked</h2>
        <p className="mt-4 text-gray-500 font-medium px-10">
          The Credential Report portal will open once the official session begins. Please check back later.
        </p>
      </div>
    );
  }

  if (!checkedInDelegate) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 bg-orange-50 rounded-[3rem] border border-orange-100">
        <h2 className="text-2xl font-black text-orange-900 uppercase tracking-tight">Check-in Required</h2>
        <p className="mt-4 text-orange-700 font-medium px-10">
          You must complete the <b>Venue Check-in</b> on the Registration page before submitting a Credential Report.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto fade-in">
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-red-800 p-10 text-white">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-2">Authenticated User</p>
          <h2 className="text-3xl font-black uppercase tracking-tight">{checkedInDelegate.name}</h2>
          <p className="text-sm font-bold opacity-70 mt-1">{checkedInDelegate.district} • Delegate</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="space-y-4">
            <label className="block text-xs font-black text-red-900 uppercase tracking-widest">Session Feedback / Credential Details</label>
            <textarea
              required
              rows={6}
              value={formData.comments}
              onChange={(e) => setFormData({...formData, comments: e.target.value})}
              placeholder="Enter your credential remarks here..."
              className="w-full px-6 py-5 bg-gray-50 border-2 border-gray-100 rounded-3xl focus:ring-red-600 focus:border-red-600 font-bold"
            ></textarea>
          </div>

          <button
            disabled={status.type === 'loading'}
            type="submit"
            className="w-full py-6 bg-red-700 text-white text-xl font-black rounded-3xl shadow-2xl hover:bg-red-800 transition-all uppercase tracking-widest"
          >
            {status.type === 'loading' ? 'Submitting...' : 'Submit Report'}
          </button>

          {status.message && (
            <div className={`p-4 rounded-xl text-center font-bold ${
              status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
