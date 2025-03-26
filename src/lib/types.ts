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
