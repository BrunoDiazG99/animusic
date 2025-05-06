import { AnimeTheme } from "@/lib/utils";
import { create } from "zustand";

interface AnimusicState {
  musicFound: boolean;
  animeName: string;
  animeId: string;
  animeImageURL: string;
  openingsData: AnimeTheme[];
  endingsData: AnimeTheme[];
  
}

const useAnimusicStore = create<AnimusicState>()((set) => ({
  musicFound: false,
  animeName: "",
  animeId: "",
  animeImageURL: "",
  openingsData: [],
  endingsData: [],
}));

export default useAnimusicStore;
