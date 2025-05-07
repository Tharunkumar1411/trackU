'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MenuBar from '@/components/MenuBar';
import Schedule from '@/components/Schedule';
import Profile from '@/components/Profile';
import History from '@/components/History';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    // if (!isAuthenticated) {
    //   router.push('/login');
    // }
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50">
      <MenuBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Schedule />
          </div>
          <div className="space-y-8">
            <Profile />
            <History />
          </div>
        </div>
      </div>
    </main>
  );
}
