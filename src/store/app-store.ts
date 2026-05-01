"use client";

import { create } from "zustand";

type AppStoreState = {
  activeScreenId: string | null;
  lastCompletedActionKey: string | null;
  setActiveScreenId: (screenId: string) => void;
  setLastCompletedActionKey: (actionKey: string) => void;
};

export const useAppStore = create<AppStoreState>((set) => ({
  activeScreenId: null,
  lastCompletedActionKey: null,
  setActiveScreenId: (screenId) => set({ activeScreenId: screenId }),
  setLastCompletedActionKey: (actionKey) =>
    set({ lastCompletedActionKey: actionKey }),
}));
