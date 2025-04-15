import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

import useDebounce from "../lib/hooks/useDebounce";
import SearchBarResults from "./search-bar-results";
import { BasicAnimeInfo, JikanApiAnimeHttpResultType } from "@/lib/types";

type SearchBarProps = {
  getMusicData: (animeId: string | number) => void;
};

function SearchBar({ getMusicData }: SearchBarProps) {
  const isFirst = useRef(true); //For first render
  const searchWrapperRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<BasicAnimeInfo[]>([]);
  const [showData, setShowData] = useState<boolean>(false);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);

  const debouncedSearchValue = useDebounce(search, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleAnimeId = (animeId: string | number) => {
    getMusicData(animeId);
    setShowData(false);
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (search == e.target.value) {
      setShowData(true);
    }
  };

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (debouncedSearchValue === "") return;

    let ignore = false; // Helps control undesired searches given multiple inputs

    // Cleaning data first
    setSearchData([]);
    setShowData(true);
    setLoadingSearch(true);

    const searchQuery = (debouncedSearchValue as string).replace(/ /g, "%20");

    fetch(
      `https://api.jikan.moe/v4/anime?page=1&limit=20&order_by=title&sort=asc&q=${searchQuery}`
    )
      .then((res) => {
        if (res.ok) return res.json();
        else {
          return Promise.reject(res.statusText);
        }
      })
      .then((res) => {
        if (ignore) return;
        if (!res.data.length) {
          setSearchData([]);
          setShowData(false);
          return;
        }
        const animeData = res.data.map((data: JikanApiAnimeHttpResultType) => {
          const parsedAnime: BasicAnimeInfo = {
            series_animedb_id: data.mal_id,
            series_title: data.title,
          };
          return parsedAnime;
        });
        setSearchData(animeData);
        setShowData(true);
      })
      .finally(() => {
        setLoadingSearch(false);
      });

    return () => {
      ignore = true;
    };
  }, [debouncedSearchValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target as Node)
      ) {
        setShowData(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="w-full" ref={searchWrapperRef}>
        <Input
          type="text"
          id="animeId"
          autoComplete="off"
          placeholder="Anime Name or ID "
          value={search}
          onChange={handleSearch}
          onFocus={handleOnFocus}
        />
        {showData && (
          <SearchBarResults
            loading={loadingSearch}
            handleAnimeId={handleAnimeId}
            searchData={searchData}
          ></SearchBarResults>
        )}
      </div>
    </>
  );
}

export default SearchBar;
