'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MenuBar from '@/components/MenuBar';
import Schedule from '@/components/Schedule';
import Profile from '@/components/Profile';
import History from '@/components/History';
import CareerGraph from '@/components/CareerGraph';
import { useAuthStore } from '@/store/authStore';
import { useStudyStore } from '@/store/studyStore';
import { useUIStore } from '@/store/uiStore';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { studyData, fetchStudyData } = useStudyStore();
  const { activeTab, setActiveTab } = useUIStore();

  useEffect(() => {
    // Check authentication
    if (!user) {
      router.push('/login');
      return;
    }

    // Fetch study data
    fetchStudyData();
  }, [user, router, fetchStudyData]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <MenuBar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'schedule'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Schedule
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              History
            </button>
          </div>

          {activeTab === 'schedule' && (
            <div className="space-y-8">
              <CareerGraph data={studyData} />
              <Schedule />
            </div>
          )}
          {activeTab === 'profile' && <Profile />}
          {activeTab === 'history' && <History />}
        </div>
      </main>
    </div>
  );
}
