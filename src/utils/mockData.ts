import { StudyData } from '@/types/study';

export function generateMockStudyData(days: number = 30): StudyData[] {
  const data: StudyData[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate random but realistic data
    const totalTasks = Math.floor(Math.random() * 5) + 3; // 3-7 tasks per day
    const completedTasks = Math.floor(Math.random() * (totalTasks + 1)); // 0 to totalTasks
    const studyTime = Math.floor(Math.random() * 180) + 60; // 1-4 hours per day

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      completedTasks,
      totalTasks,
      studyTime
    });
  }

  return data;
} 