import { create } from "zustand";
import type {
  OptionsState,
  LanguageOption,
  LevelOption,
  PriceOption,
} from "../../types";

export const useOptionsStore = create<OptionsState>((set) => ({
  languageOptions: [],
  setLanguageOptions: (languageOptions: LanguageOption[]) =>
    set({ languageOptions }),

  levelOptions: [],
  setLevelOptions: (levelOptions: LevelOption[]) => set({ levelOptions }),

  priceOptions: [],
  setPriceOptions: (priceOptions: PriceOption[]) => set({ priceOptions }),
}));
