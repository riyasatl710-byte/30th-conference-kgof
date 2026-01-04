
import React, { useState, useEffect } from 'react';
import { gasApi } from '../../services/api.ts';
import { Delegate } from '../../types.ts';
import { KERALA_DISTRICTS, VENUE_COORDS, GEOFENCE_RADIUS_KM } from '../../constants.tsx';

export const Registration: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDelegate, setSelectedDelegate] = useState<Delegate | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'requesting' | 'denied' | 'error' | 'success'>('idle');
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({
    type: 'idle',
    message: ''
  });

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      return;
    }
    setLocationStatus('requesting');
    navigator.geolocation.getCurrentPosition((pos) => {
      const d = calculateDistance(pos.coords.latitude, pos.coords.longitude, VENUE_COORDS.lat, VENUE_COORDS.lng);
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      setDistance(d);
      setLocationStatus('success');
    }, (err) => {
      setLocationStatus('denied');
      console.warn("Location access denied.");
    }, { enableHighAccuracy: true });
  };

  useEffect(() => {
    if (selectedDistrict) {
      setStatus({ type: 'loading', message: 'Fetching delegate list...' });
      setDelegates([]); // Clear old list
      gasApi.getDelegatesByDistrict(selectedDistrict)
        .then(data => {
          setDelegates(data);
          setStatus({ type: 'idle', message: '' });
        })
        .catch(err => {
          setStatus({ type: 'error', message: `Could not load list: ${err.message}` });
        });
    }
  }, [selectedDistrict]);

  const filteredDelegates = delegates.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckIn = async () => {
    if (!selectedDelegate) return;
    if (distance !== null && distance > GEOFENCE_RADIUS_KM) {
      setStatus({ type: 'error', message: `Location Error: You are currently ${distance.toFixed(2)}km away. Attendance is restricted to the venue area.` });
      return;
    }

    setStatus({ type: 'loading', message: 'Recording attendance...' });
    try {
      const res = await gasApi.markPresence(selectedDelegate.id);
      if (res.success) {
        setStatus({ type: 'success', message: `Check-in Complete! Welcome ${selectedDelegate.name}.` });
        localStorage.setItem('checked_in_delegate', JSON.stringify(selectedDelegate));
      } else {
        setStatus({ type: 'error', message: res.message });
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 fade-in">
      <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-red-800 p-8 text-white">
          <h2 className="text-2xl font-black uppercase tracking-tight">Venue Check-in</h2>
          <p className="text-sm opacity-80 mt-1 font-bold">Mark your presence at the venue</p>
        </div>

        <div className="p-6 space-y-8">
          <div className={`p-6 rounded-2xl border-2 transition-all ${
            locationStatus === 'success' && distance !== null && distance <= GEOFENCE_RADIUS_KM 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-100'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-red-900 uppercase tracking-widest mb-1">Venue Verification</p>
                <p className="text-sm font-bold text-gray-700">
                  {locationStatus === 'idle' && 'Location check required'}
                  {locationStatus === 'requesting' && 'Acquiring GPS fix...'}
                  {locationStatus === 'denied' && 'GPS Access Denied'}
                  {locationStatus === 'success' && distance !== null && (
                    distance <= GEOFENCE_RADIUS_KM ? 'Verified: Inside Venue' : `Too Far: ${distance.toFixed(1)}km away`
                  )}
                </p>
              </div>
              {locationStatus !== 'success' && (
                <button 
                  onClick={requestLocation}
                  className="tap-feedback px-4 py-2 bg-red-600 text-white text-xs font-black uppercase rounded-lg shadow-md"
                >
                  Verify Now
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest block">1. Your District</label>
            <div className="grid grid-cols-2 gap-2">
              {KERALA_DISTRICTS.map(dist => (
                <button
                  key={dist}
                  onClick={() => { setSelectedDistrict(dist); setSelectedDelegate(null); setSearchQuery(''); }}
                  className={`tap-feedback h-12 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                    selectedDistrict === dist ? 'bg-red-600 border-red-600 text-white shadow-lg' : 'bg-gray-50 border-gray-100 text-gray-500'
                  }`}
                >
                  {dist}
                </button>
              ))}
            </div>
          </div>

          {selectedDistrict && (
            <div className="space-y-3 fade-in">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block">2. Select Your Name</label>
              <input
                type="text"
                placeholder="Start typing your name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 px-5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-red-600 outline-none font-bold text-lg"
              />
              
              <div className="max-h-[300px] overflow-y-auto rounded-xl border border-gray-100 divide-y divide-gray-50 mt-2 -webkit-overflow-scrolling-touch">
                {status.type === 'loading' ? (
                   <div className="p-8 text-center text-gray-400 font-bold">Loading names...</div>
                ) : filteredDelegates.length > 0 ? filteredDelegates.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDelegate(d)}
                    className={`w-full text-left p-4 tap-feedback flex items-center justify-between ${
                      selectedDelegate?.id === d.id ? 'bg-red-50' : ''
                    }`}
                  >
                    <div>
                      <span className="block font-black text-gray-900 text-sm">{d.name}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{d.role}</span>
                    </div>
                    {selectedDelegate?.id === d.id && (
                      <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                      </div>
                    )}
                  </button>
                )) : selectedDistrict && (
                  <div className="p-10 text-center">
                    <p className="text-xs font-bold text-gray-400 italic">No delegates found for this search/district.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedDelegate && (
            <div className="pt-4">
              <button
                disabled={status.type === 'loading' || locationStatus !== 'success' || (distance !== null && distance > GEOFENCE_RADIUS_KM)}
                onClick={handleCheckIn}
                className="tap-feedback w-full h-16 bg-red-700 text-white text-lg font-black rounded-2xl shadow-xl disabled:opacity-30 uppercase tracking-widest"
              >
                {status.type === 'loading' ? 'Processing...' : 'Confirm My Presence'}
              </button>
            </div>
          )}

          {status.message && (
            <div className={`p-4 rounded-xl text-center text-sm font-black ${
              status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
