import { NavBar } from "./navbar";
import { AlertCircle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useState } from "react";
import { parseAnimeThemes } from "@/lib/utils";
// import { XMLParserComponent } from "./xml-parser";
import SearchBar from "./search-bar";
// import Spotify from "./music/spoti";
import { Link } from "@tanstack/react-router";
import useAnimusicStore from "@/state/store.ts";
import Themes from "./music/themes.tsx";

function MainLayout() {
  const clearState = useAnimusicStore((state) => state.clearState);
  const updateState = useAnimusicStore((state) => state.updateState);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorString, setErrorString] = useState<string>("");

  const clear = () => {
    clearState();
    setErrorString("");
    setLoading(false);
  };

  const getMusicData = (animeId: string | number) => {
    clear();
    setLoading(true);
    fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`)
      .then((res) => {
        if (res.ok) return res.json();
        else {
          return Promise.reject(res.statusText);
        }
      })
      .then((res) => {
        const { parsedOpenings, parsedEndings } = parseAnimeThemes(
          res.data.theme
        );
        updateState({
          animeId: res.data.mal_id,
          animeName: res.data.title,
          animeImageURL: res.data.images.jpg.large_image_url,
          openingsData: parsedOpenings,
          endingsData: parsedEndings,
          musicFound: true,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        updateState({ musicFound: false });
        setErrorString(error);
        setLoading(false);
      });
  };

  return (
    <main className="w-full min-h-screen">
      <NavBar />
      <div className="mx-auto my-0 max-w-xl">
        <h1 className="text-6xl my-5">
          <Link to="/animusic">Animusic</Link>
        </h1>
        <p className="my-10">
          This is a small project for searching (and in the future listening,
          hopefully) anime opening and ending themes
        </p>
        <div className="grid mx-auto my-2 w-full max-w-md items-center gap-2">
          <Label htmlFor="animeId">Search your anime here:</Label>
          <SearchBar getMusicData={getMusicData} />
          {errorString && (
            <Alert
              variant="destructive"
              className="text-left border-destructive"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorString}</AlertDescription>
            </Alert>
          )}
        </div>
        {loading && (
          <div className="min-w-x">
            <Loader2 className="animate-spin mx-auto my-0" />
          </div>
        )}

        {/* <XMLParserComponent /> */}
        {/* <Spotify /> */}
        <Themes />
      </div>
    </main>
  );
}

export default MainLayout;
