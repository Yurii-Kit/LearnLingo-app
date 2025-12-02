import { create } from "zustand";
import type { TeachersState, Teacher } from "../../types";

export const useTeachersStore = create<TeachersState>((set) => ({
  teachers: [],
  setTeachers: (teachers: Teacher[]) => set({ teachers }),

  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  isError: false,
  setIsError: (isError: boolean) => set({ isError }),
}));
