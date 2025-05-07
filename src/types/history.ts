export interface StudyHistory {
  id: string;
  date: string;
  completedItems: number;
  totalItems: number;
  totalTime: number;
  morningCompleted: boolean;
  eveningCompleted: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  totalStudyDays: number;
  totalStudyHours: number;
  streak: number;
  lastActive: string;
} 