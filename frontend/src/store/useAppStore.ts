import { create } from 'zustand';
import { FlyerData, OriginalContent, WorkflowStep } from '../types';

const initialFlyerData: FlyerData = {
  title: '',
  subtitle: '',
  type: '',
  products: [],
  description: '',
  enhancedContent: null,
  selectedTemplate: 'modern',
  colorScheme: 'default',
  finalImageUrl: null
};

const initialOriginalContent: OriginalContent = {
  title: '',
  subtitle: '',
  description: ''
};

interface AppStore {
  currentStep: WorkflowStep;
  flyerData: FlyerData;
  originalContent: OriginalContent | null;
  setCurrentStep: (step: WorkflowStep) => void;
  updateFlyerData: (data: Partial<FlyerData>) => void;
  setOriginalContent: (content: OriginalContent) => void;
  resetFlyerData: () => void;
  resetOriginalContent: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentStep: 'template',
  flyerData: initialFlyerData,
  originalContent: null,
  setCurrentStep: (step) => set({ currentStep: step }),
  updateFlyerData: (data) => set((state) => ({ flyerData: { ...state.flyerData, ...data } })),
  setOriginalContent: (content) => set({ originalContent: content }),
  resetFlyerData: () => set({ flyerData: initialFlyerData }),
  resetOriginalContent: () => set({ originalContent: initialOriginalContent })
})); 