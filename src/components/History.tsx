'use client';

interface StudyHistory {
  id: string;
  date: string;
  completedItems: number;
  totalItems: number;
  totalTime: number;
  morningCompleted: boolean;
  eveningCompleted: boolean;
}

const mockHistory: StudyHistory[] = [
  {
    id: '1',
    date: 'Today',
    completedItems: 4,
    totalItems: 6,
    totalTime: 140,
    morningCompleted: true,
    eveningCompleted: false,
  },
  {
    id: '2',
    date: 'Yesterday',
    completedItems: 6,
    totalItems: 6,
    totalTime: 140,
    morningCompleted: true,
    eveningCompleted: true,
  },
  {
    id: '3',
    date: '2 days ago',
    completedItems: 5,
    totalItems: 6,
    totalTime: 130,
    morningCompleted: true,
    eveningCompleted: false,
  },
];

export default function History() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Study History</h2>
      <div className="space-y-4">
        {mockHistory.map((day) => (
          <div key={day.id} className="border-b border-gray-200 pb-4 last:border-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-800">{day.date}</h3>
              <span className="text-sm text-gray-600">
                {day.completedItems}/{day.totalItems} items
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <div>
                <span className={day.morningCompleted ? 'text-green-600' : 'text-red-600'}>
                  Morning {day.morningCompleted ? '✓' : '✗'}
                </span>
                {' • '}
                <span className={day.eveningCompleted ? 'text-green-600' : 'text-red-600'}>
                  Evening {day.eveningCompleted ? '✓' : '✗'}
                </span>
              </div>
              <span>{day.totalTime} minutes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 