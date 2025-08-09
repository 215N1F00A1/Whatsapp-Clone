import { useState, useEffect } from 'react';
import { Profile } from '../types';

export const useAuth = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock authentication - in real app, this would check actual auth state
    const mockProfile: Profile = {
      id: 'current-user',
      display_name: 'You',
      phone_number: '+1234567899',
      avatar_url: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150',
      status: 'Available',
      is_online: true,
      last_seen: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setTimeout(() => {
      setProfile(mockProfile);
      setLoading(false);
    }, 500);
  }, []);

  return { profile, loading };
};