// Types that support the JikanApiAnimeHttpResultType
export type ImageFormats = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};

export type Images = {
  jpg: ImageFormats;
  webp: ImageFormats;
};

export type TrailerImages = {
  image_url: string;
  small_image_url: string;
  medium_image_url: string;
  large_image_url: string;
  maximum_image_url: string;
};

export type Trailer = {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: TrailerImages;
};

export type Title = {
  type: string;
  title: string;
};

export type AiredProp = {
  from: { day: number; month: number; year: number };
  to: { day: number; month: number; year: number };
};

export type Aired = {
  from: string;
  to: string;
  prop: AiredProp;
  string: string;
};

export type Broadcast = {
  day: string;
  time: string;
  timezone: string;
  string: string;
};

export type Entity = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};
// Types that support the JikanApiAnimeHttpResultType - end

export type JikanApiAnimeHttpResultType = {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: Entity[];
  licensors: Entity[];
  studios: Entity[];
  genres: Entity[];
  explicit_genres: Entity[];
  themes: Entity[];
  demographics: Entity[];
};

export enum AnimeStatusEnum {
  watching = "Watching",
  completed = "Completed",
  onHold = "On-Hold",
  dropped = "Dropped",
  plaToWatch = "Plan to Watch",
}

export type AnimeStatus =
  | "Watching"
  | "Completed"
  | "On-Hold"
  | "Dropped"
  | "Plan to Watch";

export type RawAnime = {
  series_animedb_id: number;
  series_title: string;
  series_type: string;
  series_episodes: number;
  my_id: number;
  my_watched_episodes: number;
  my_start_date: Date;
  my_finish_date: Date;
  my_rated: number;
  my_score: number;
  my_storage: number;
  my_storage_value: number;
  my_status: AnimeStatus;
  my_comments: string;
  my_times_watched: number;
  my_rewatch_value: number;
  my_priority: number;
  my_tags: string;
  my_rewatching: number;
  my_rewatching_ep: number;
  my_discuss: string;
  my_sns: number;
  update_on_import: number;
};

export type Anime = {
  series_animedb_id: number;
  series_title: string;
  my_score: number;
  my_status: AnimeStatus;
  my_watched_episodes: number;
};

export type MyInfo = {
  user_id: number;
  user_name: string;
  user_export_type: string;
  user_total_anime: number;
  user_total_watching: number;
  user_total_completed: number;
  user_total_onhold: number;
  user_total_dropped: number;
  user_total_plantowatch: number;
};

export type BasicAnimeInfo = {
  series_animedb_id: number;
  series_title: string;
};
