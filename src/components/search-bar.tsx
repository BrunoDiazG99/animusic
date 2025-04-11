import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useDebounce from "../lib/hooks/useDebounce";

type SearchBarProps = {
  getMusicData: MouseEventHandler<HTMLButtonElement>;
  loading: boolean;
};

function SearchBar({ getMusicData, loading }: SearchBarProps) {
  const isFirst = useRef(true); //For first render
  const [search, setSearch] = useState<string>("");

  const debouncedSearchValue = useDebounce(search, 800);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    console.log("123123");
  }, [debouncedSearchValue]);

  return (
    <>
      <Input
        type="text"
        id="animeId"
        placeholder="Anime ID"
        value={search}
        onChange={handleSearch}
      />
      <Button variant="outline" onClick={getMusicData}>
        {loading && <Loader2 className="animate-spin" />}
        Get music
      </Button>
    </>
  );
}

export default SearchBar;
