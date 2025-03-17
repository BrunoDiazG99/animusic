import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ThemesHttpResponse = {
  openings: string[];
  endings: string[];
};

export type AnimeTheme = {
  name: string;
  artist: string;
  episodes: string;
};

export function parseAnimeThemes(themes: ThemesHttpResponse): {
  parsedOpenings: AnimeTheme[];
  parsedEndings: AnimeTheme[];
} {
  console.log(themes);
  const themeRegex = /"(.+?)"\sby\s(.+?)\s\(eps\s(.+?)\)/;
  const openings = themes.openings;
  const endings = themes.endings;
  const parsedOpenings: AnimeTheme[] = [];
  const parsedEndings: AnimeTheme[] = [];

  openings.forEach((theme) => {
    const extractedThemes = theme.match(themeRegex);
    if (!extractedThemes) return;
    const currentTheme: AnimeTheme = {
      name: extractedThemes[1],
      artist: extractedThemes[2],
      episodes: extractedThemes[3],
    };
    parsedOpenings.push(currentTheme);
  });

  endings.forEach((theme) => {
    const extractedThemes = theme.match(themeRegex);
    if (!extractedThemes) return;
    const currentTheme: AnimeTheme = {
      name: extractedThemes[1],
      artist: extractedThemes[2],
      episodes: extractedThemes[3],
    };
    parsedEndings.push(currentTheme);
  });

  console.table(parsedOpenings);
  console.table(parsedEndings);

  return { parsedOpenings, parsedEndings };
}
