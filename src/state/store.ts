import { AnimeTheme } from "@/lib/utils";
import { create } from "zustand";

type AnimusicStateUpdate = {
  musicFound?: boolean;
  animeName?: string;
  animeId?: string;
  animeImageURL?: string;
  openingsData?: AnimeTheme[];
  endingsData?: AnimeTheme[];
};

interface AnimusicState {
  musicFound: boolean;
  animeName: string;
  animeId: string;
  animeImageURL: string;
  openingsData: AnimeTheme[];
  endingsData: AnimeTheme[];
  updateState: (newdata: AnimusicStateUpdate) => void;
  clearState: () => void;
}

const useAnimusicStore = create<AnimusicState>()((set) => ({
  musicFound: false,
  animeName: "",
  animeId: "0",
  animeImageURL: "",
  openingsData: [],
  endingsData: [],
  updateState: (newData) => set((state) => ({ ...state, ...newData })),
  clearState: () =>
    set((state) => ({
      ...state,
      musicFound: false,
      animeName: "",
      animeId: "0",
      animeImageURL: "",
      openingsData: [],
      endingsData: [],
    })),
}));

export default useAnimusicStore;
