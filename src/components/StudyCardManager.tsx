import { useState } from 'react';

interface StudyCard {
  id: string;
  name: string;
  duration: number;
  timeOfDay: 'morning' | 'evening';
}

interface StudyCardManagerProps {
  onNewCard: (card: Omit<StudyCard, 'id'>) => void;
}

export default function StudyCardManager({ onNewCard }: StudyCardManagerProps) {
  const [cards, setCards] = useState<StudyCard[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newCard, setNewCard] = useState<Omit<StudyCard, 'id'>>({
    name: '',
    duration: 30,
    timeOfDay: 'morning'
  });

  const handleCreateCard = () => {
    if (!newCard.name.trim()) return;
    
    onNewCard(newCard);
    setNewCard({ name: '', duration: 30, timeOfDay: 'morning' });
    setIsCreating(false);
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-8 bg-blue-400 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">Study Cards</h2>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Add New Card</span>
        </button>
      </div>

      {isCreating && (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Create New Study Card</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
              <input
                type="text"
                value={newCard.name}
                onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                className="w-full px-4 py-2 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter subject name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
              <input
                type="number"
                value={newCard.duration}
                onChange={(e) => setNewCard({ ...newCard, duration: parseInt(e.target.value) })}
                min="1"
                className="w-full px-4 py-2 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time of Day</label>
              <select
                value={newCard.timeOfDay}
                onChange={(e) => setNewCard({ ...newCard, timeOfDay: e.target.value as 'morning' | 'evening' })}
                className="w-full px-4 py-2 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCard}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Create Card
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{card.name}</h3>
                <p className="text-sm text-gray-500">
                  {card.duration} minutes • {card.timeOfDay}
                </p>
              </div>
              <button
                onClick={() => handleDeleteCard(card.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 