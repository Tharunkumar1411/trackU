import { create } from 'zustand';
import { StudyData } from '@/types/study';
import { generateMockStudyData } from '@/utils/mockData';

interface StudyState {
  studyData: StudyData[];
  isLoading: boolean;
  error: string | null;
  fetchStudyData: () => void;
  addStudyData: (data: StudyData) => void;
  updateStudyData: (date: string, data: Partial<StudyData>) => void;
  setError: (error: string | null) => void;
}

export const useStudyStore = create<StudyState>((set) => ({
  studyData: [],
  isLoading: false,
  error: null,

  fetchStudyData: () => {
    set({ isLoading: true, error: null });
    try {
      const data = generateMockStudyData();
      set({ studyData: data, isLoading: false });
    } catch {
      set({ error: 'Failed to fetch study data', isLoading: false });
    }
  },

  addStudyData: (data: StudyData) => {
    set((state) => ({
      studyData: [...state.studyData, data],
    }));
  },

  updateStudyData: (date: string, data: Partial<StudyData>) => {
    set((state) => ({
      studyData: state.studyData.map((item) =>
        item.date === date ? { ...item, ...data } : item
      ),
    }));
  },

  setError: (error: string | null) => set({ error }),
})); 