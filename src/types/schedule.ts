export interface StudyItem {
  id: string;
  name: string;
  duration: number; // in minutes
  completed: boolean;
  timeOfDay: 'morning' | 'evening';
}

export interface DailySchedule {
  date: string;
  items: StudyItem[];
  totalTime: number;
  morningCompleted: boolean;
  eveningCompleted: boolean;
} 