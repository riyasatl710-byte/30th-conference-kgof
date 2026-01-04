
import { API_URL, IS_PLACEHOLDER_URL, MOCK_ADMIN_STATS, MOCK_SCHEDULE } from '../constants.tsx';
import { ScheduleItem, AdminStats, Delegate } from '../types.ts';

export const gasApi = {
  async getSchedule(): Promise<ScheduleItem[]> {
    if (IS_PLACEHOLDER_URL) return MOCK_SCHEDULE;
    try {
      const response = await fetch(`${API_URL}?action=getSchedule`);
      if (!response.ok) throw new Error('Failed to fetch schedule');
      const data = await response.json();
      
      // Safety check: Ensure the response is an array
      if (Array.isArray(data)) {
        return data;
      } else {
        console.warn('Schedule API did not return an array, using fallback.', data);
        return MOCK_SCHEDULE;
      }
    } catch (error) {
      console.error('Schedule fetch error:', error);
      return MOCK_SCHEDULE; // Fallback to hardcoded if API fails
    }
  },

  async getDelegatesByDistrict(district: string): Promise<Delegate[]> {
    if (IS_PLACEHOLDER_URL) {
      return [
        { id: 'KGOF001', name: 'John Doe', district: 'Kannur', phone: '123', email: 'j@d.com', role: 'Delegate', isPresent: false },
      ].filter(d => d.district.toLowerCase() === district.toLowerCase());
    }
    try {
      const response = await fetch(`${API_URL}?action=getDelegates&district=${encodeURIComponent(district)}`);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        return data;
      } else {
        console.warn('Delegates API did not return an array:', data);
        return [];
      }
    } catch (error: any) {
      console.error('Delegates fetch error:', error);
      throw new Error(error.message || 'Connection failed.');
    }
  },

  async markPresence(delegateId: string): Promise<{ success: boolean; message: string }> {
    if (IS_PLACEHOLDER_URL) return { success: true, message: 'Demo Mode' };
    try {
      const response = await fetch(`${API_URL}?action=markPresence&id=${encodeURIComponent(delegateId)}`);
      return await response.json();
    } catch (error: any) {
      return { success: false, message: `Error: ${error.message}` };
    }
  },

  async submitCredential(data: { delegateId: string; delegateName: string; comments: string; rating: string }): Promise<{ success: boolean; message: string }> {
    if (IS_PLACEHOLDER_URL) return { success: true, message: 'Demo Mode: Credential Submitted' };
    try {
      const queryParams = new URLSearchParams({
        action: 'submitCredential',
        id: data.delegateId,
        name: data.delegateName,
        comments: data.comments,
        rating: data.rating
      }).toString();
      const response = await fetch(`${API_URL}?${queryParams}`);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return await response.json();
    } catch (error: any) {
      return { success: false, message: `Error: ${error.message}` };
    }
  },

  async getAdminStats(pin: string): Promise<AdminStats | null> {
    if (IS_PLACEHOLDER_URL) return pin === '1234' ? MOCK_ADMIN_STATS : null;
    try {
      const response = await fetch(`${API_URL}?action=getStats&pin=${encodeURIComponent(pin)}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      return null;
    }
  }
};
