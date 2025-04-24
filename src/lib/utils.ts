import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { XMLParser } from "fast-xml-parser";
import data from "../../data/haruchon-data.xml?raw";
import { Anime, AnimeStatusEnum, MyInfo, RawAnime } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkForStringNonEmpty(item: string | null) {
  return typeof item === "string" && item?.trim() !== "";
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
  const themeRegex = /"(.+?)"\sby\s(.+?)(?:\s\(eps\s(.+?)\))?$/;
  // const themeRegex = /"(.+?)"\sby\s(.+?)(?:\s\(eps\s(.+?)\))?/;
  // const themeRegex = /"(.+?)"\sby\s(.+?)\s\(eps\s(.+?)\)/;
  const themes: AnimeTheme[] = [];
  themesArray.forEach((theme) => {
    const extractedThemes = theme.match(themeRegex);
    if (!extractedThemes) return;
    const currentTheme: AnimeTheme = {
      name: extractedThemes[1],
      artist: extractedThemes[2],
      episodes: extractedThemes[3] || "N/A",
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

export function parseXML() {
  const parser = new XMLParser();
  const jsonObj = parser.parse(data);

  const { myinfo, anime }: { myinfo: MyInfo; anime: RawAnime[] } =
    jsonObj.myanimelist;

  const planToWatchAnime: Anime[] = [];
  const droppedAnime: Anime[] = [];
  const onHoldAnime: Anime[] = [];
  const completedAnime: Anime[] = [];
  const watchingAnime: Anime[] = [];

  anime.forEach((anime) => {
    const newAnime: Anime = {
      series_animedb_id: anime.series_animedb_id,
      series_title: anime.series_title,
      my_score: anime.my_score,
      my_watched_episodes: anime.my_watched_episodes,
      my_status: anime.my_status,
    };

    switch (anime.my_status) {
      case AnimeStatusEnum.watching:
        watchingAnime.push(newAnime);
        break;

      case AnimeStatusEnum.completed:
        completedAnime.push(newAnime);
        break;

      case AnimeStatusEnum.onHold:
        onHoldAnime.push(newAnime);
        break;

      case AnimeStatusEnum.dropped:
        droppedAnime.push(newAnime);
        break;

      case AnimeStatusEnum.plaToWatch:
        planToWatchAnime.push(newAnime);
        break;
    }
  });

  console.log(myinfo);
  console.table(watchingAnime);
  console.table(completedAnime);
  console.table(onHoldAnime);
  console.table(planToWatchAnime);
  console.table(droppedAnime);
}
