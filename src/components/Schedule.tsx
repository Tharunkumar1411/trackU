'use client';

import { useState, useEffect } from 'react';
import Timer from './Timer';
import StudyCardManager from './StudyCardManager';

interface StudyItem {
  id: string;
  name: string;
  duration: number;
  timeOfDay: 'morning' | 'evening';
  completed: boolean;
}

export default function Schedule() {
  const [studyItems, setStudyItems] = useState<StudyItem[]>([]);
  const [activeTimer, setActiveTimer] = useState<string | null>(null);

  // Load study items from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('studyItems');
    if (savedItems) {
      setStudyItems(JSON.parse(savedItems));
    }
  }, []);

  // Save study items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studyItems', JSON.stringify(studyItems));
  }, [studyItems]);

  const handleTimerComplete = (id: string) => {
    setStudyItems(studyItems.map(item =>
      item.id === id ? { ...item, completed: true } : item
    ));
    setActiveTimer(null);
  };

  const startTimer = (id: string) => {
    setActiveTimer(id);
  };

  const handleNewCard = (card: Omit<StudyItem, 'completed'>) => {
    const newItem: StudyItem = {
      id: Date.now().toString(),
      ...card,
      completed: false
    };
    setStudyItems([...studyItems, newItem]);
  };

  const morningItems = studyItems.filter(item => item.timeOfDay === 'morning');
  const eveningItems = studyItems.filter(item => item.timeOfDay === 'evening');

  return (
    <div className="space-y-8">
      <StudyCardManager onNewCard={handleNewCard} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Morning Schedule */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-2 h-8 bg-orange-400 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">Morning Schedule</h2>
          </div>
          <div className="space-y-4">
            {morningItems.map(item => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  item.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:border-blue-200 hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {item.duration} minutes
                      </span>
                      {item.completed && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                  {activeTimer === item.id ? (
                    <Timer
                      duration={item.duration}
                      onComplete={() => handleTimerComplete(item.id)}
                      isActive={true}
                    />
                  ) : (
                    !item.completed && (
                      <button
                        onClick={() => startTimer(item.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                      >
                        Start
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
            {morningItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No morning study items added yet
              </div>
            )}
          </div>
        </div>

        {/* Evening Schedule */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-2 h-8 bg-indigo-400 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">Evening Schedule</h2>
          </div>
          <div className="space-y-4">
            {eveningItems.map(item => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  item.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:border-blue-200 hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {item.duration} minutes
                      </span>
                      {item.completed && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                  {activeTimer === item.id ? (
                    <Timer
                      duration={item.duration}
                      onComplete={() => handleTimerComplete(item.id)}
                      isActive={true}
                    />
                  ) : (
                    !item.completed && (
                      <button
                        onClick={() => startTimer(item.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                      >
                        Start
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
            {eveningItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No evening study items added yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 