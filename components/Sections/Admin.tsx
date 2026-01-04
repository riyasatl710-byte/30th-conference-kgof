
import React, { useState } from 'react';
import { gasApi } from '../../services/api.ts';
import { AdminStats } from '../../types.ts';
import { IS_PLACEHOLDER_URL, MOCK_ADMIN_STATS } from '../../constants.tsx';

export const Admin: React.FC = () => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await gasApi.getAdminStats(pin);
      if (result) {
        setStats(result);
        setIsAuthenticated(true);
      } else {
        setError('Administrative Access Denied. Check your PIN.');
      }
    } catch (err: any) {
      setError(`Connection Error: ${err.message || 'Failed to fetch'}.`);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(153,27,27,0.15)] border border-red-50 text-center">
          <div className="inline-flex items-center justify-center p-6 bg-red-50 rounded-[2rem] mb-8">
            <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-red-900 uppercase tracking-tight mb-2">Admin Security</h2>
          <p className="text-gray-500 font-medium mb-10">Restricted portal for summit management.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-6 py-5 text-center text-3xl tracking-[0.5em] border-2 border-red-50 rounded-2xl focus:ring-red-500 focus:border-red-600 bg-red-50/30 transition-all font-black"
              maxLength={4}
            />
            {error && (
              <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                <p className="text-red-600 text-[10px] font-black uppercase tracking-widest leading-relaxed">{error}</p>
              </div>
            )}
            <button
              disabled={loading}
              className="w-full py-5 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-red-700 shadow-xl shadow-red-200 transition-all disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Authorize Access'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 fade-in">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-8 rounded-3xl border border-red-50 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-red-900 uppercase tracking-tighter leading-none">Management Dashboard</h2>
          <p className="text-red-600 font-bold text-xs uppercase tracking-widest mt-2">Live Summit Metrics</p>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="px-6 py-3 border-2 border-red-600 rounded-xl text-xs font-black text-red-600 uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
        >
          Secure Logout
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group">
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Total Delegates</p>
          <p className="text-6xl font-black text-red-600 mt-2 tracking-tighter">{stats?.total ?? 0}</p>
        </div>
        
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden group">
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Present Now</p>
          <p className="text-6xl font-black text-red-900 mt-2 tracking-tighter">{stats?.present ?? 0}</p>
        </div>

        <div className="bg-red-700 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
          <p className="text-xs font-black text-red-200 uppercase tracking-[0.2em]">Attendance %</p>
          <p className="text-6xl font-black mt-2 tracking-tighter">
            {stats?.total ? Math.round((stats.present / stats.total) * 100) : 0}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registrations Table */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-10 py-8 bg-gray-50 border-b border-gray-100">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Latest Check-ins</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Time Marked</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {stats?.recent && stats.recent.length > 0 ? (
                  stats.recent.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-red-50/10 transition-colors">
                      <td className="px-8 py-6 text-sm font-bold text-gray-900">{entry.name}</td>
                      <td className="px-8 py-6 text-[10px] text-gray-400 font-bold uppercase">
                        {new Date(entry.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'})}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-8 py-14 text-center text-sm text-gray-400 italic">No check-ins today.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* District Distribution List */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-10 py-8 bg-gray-50 border-b border-gray-100">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Attendance by District</h3>
          </div>
          <div className="p-10 space-y-6">
            {Object.entries(stats?.byDistrict ?? {}).sort((a,b) => (b[1] as number) - (a[1] as number)).map(([district, count]) => (
              <div key={district} className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-700">{district}</span>
                  <span className="text-sm font-black text-red-600">{count as number}</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-600 transition-all duration-1000 ease-out" 
                    style={{ width: `${((count as number) / (stats?.present || 1)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {Object.keys(stats?.byDistrict ?? {}).length === 0 && (
              <p className="text-center text-sm text-gray-400 italic py-14">Awaiting data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
