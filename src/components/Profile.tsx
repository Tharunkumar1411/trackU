'use client';

import { useState, useEffect } from 'react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  totalStudyDays: number;
  totalStudyHours: number;
  streak: number;
  lastActive: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'User',
    email: '',
    totalStudyDays: 0,
    totalStudyHours: 0,
    streak: 0,
    lastActive: 'Today',
  });

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setProfile(prev => ({
        ...prev,
        email,
        name: email.split('@')[0],
      }));
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl">
          {profile.name[0].toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Study Days</p>
          <p className="text-2xl font-semibold text-gray-800">{profile.totalStudyDays}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Study Hours</p>
          <p className="text-2xl font-semibold text-gray-800">{profile.totalStudyHours}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Current Streak</p>
          <p className="text-2xl font-semibold text-gray-800">{profile.streak} days</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Last Active</p>
          <p className="text-2xl font-semibold text-gray-800">{profile.lastActive}</p>
        </div>
      </div>
    </div>
  );
} 