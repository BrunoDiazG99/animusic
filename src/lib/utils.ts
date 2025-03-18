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

function extractThemes(themesArray: string[]): AnimeTheme[] {
  console.log(themesArray);
  const themeRegex = /"(.+?)"\sby\s(.+?)\s\(eps\s(.+?)\)/;
  const themes: AnimeTheme[] = [];
  themesArray.forEach((theme) => {
    const extractedThemes = theme.match(themeRegex);
    if (!extractedThemes) return;
    const currentTheme: AnimeTheme = {
      name: extractedThemes[1],
      artist: extractedThemes[2],
      episodes: extractedThemes[3],
    };
    themes.push(currentTheme);
  });
  return themes;
}

export function parseAnimeThemes(themes: ThemesHttpResponse): {
  parsedOpenings: AnimeTheme[];
  parsedEndings: AnimeTheme[];
} {
  const openings = themes.openings;
  const endings = themes.endings;
  const parsedOpenings = extractThemes(openings);
  const parsedEndings = extractThemes(endings);

  return { parsedOpenings, parsedEndings };
}
