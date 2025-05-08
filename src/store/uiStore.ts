import { create } from 'zustand';

interface UIState {
  activeTab: 'schedule' | 'profile' | 'history';
  setActiveTab: (tab: 'schedule' | 'profile' | 'history') => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: 'schedule',
  setActiveTab: (tab) => set({ activeTab: tab }),
})); 