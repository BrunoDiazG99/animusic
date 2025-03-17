import { NavBar } from "./navbar";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useState } from "react";
import { AnimeTheme, parseAnimeThemes } from "@/lib/utils";

function MainLayout() {
  const [openingsData, setOpeningsData] = useState<AnimeTheme[]>([]);
  const [endingsData, setEndingsData] = useState<AnimeTheme[]>([]);
  const [animeName, setAnimeName] = useState<string>("");
  const [animeImageURL, setAnimeImageURL] = useState<string>("");
  const [found, setFound] = useState<boolean>(false);
  const [errorString, setErrorString] = useState<string>("");

  const clearState = () => {
    setOpeningsData([]);
    setEndingsData([]);
    setAnimeName("");
    setErrorString("");
  };

  const getMusicData = () => {
    clearState();
    const animeIdInput = document.getElementById("animeId") as HTMLInputElement;
    if (!animeIdInput.value) return;
    const animeId = animeIdInput.value;
    fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`)
      .then((res) => {
        if (res.ok) return res.json();
        else {
          return Promise.reject(res.statusText);
        }
      })
      // .then((res) => setMusicData(JSON.stringify(res.data.theme)));
      .then((res) => {
        setAnimeName(res.data.title);
        setAnimeImageURL(res.data.images.jpg.large_image_url);
        const { parsedOpenings, parsedEndings } = parseAnimeThemes(
          res.data.theme
        );
        setOpeningsData(parsedOpenings);
        setEndingsData(parsedEndings);
        setFound(true);
      })
      .catch((error) => {
        console.error(error);
        setErrorString(error);
        setFound(false);
      });
  };

  return (
    <main className="w-full min-h-screen">
      <NavBar />
      <div className="mx-auto my-0">
        <h1>Animusic</h1>
        <p>--something about anime--</p>
        <div className="grid mx-auto my-2 w-full max-w-md items-center gap-2">
          <Label htmlFor="animeId">Anime ID</Label>
          <Input type="number" id="animeId" placeholder="Anime ID" />
          <Button variant="outline" onClick={getMusicData}>
            Get music
          </Button>
        </div>
        <div className="flex flex-wrap mx-auto my-2 w-full max-w-md items-center justify-center gap-2">
          {found && (
            <>
              <p>{animeName}</p>
              <img
                src={animeImageURL}
                alt={animeName}
                width={240}
                height={240}
              />
              <div>
                {openingsData.map((op) => (
                  <p
                    key={`${op.name}-${op.artist}`}
                  >{`${op.name} by ${op.artist} (eps ${op.episodes})`}</p>
                ))}
              </div>
              <div>
                {endingsData.map((ed) => (
                  <p
                    key={`${ed.name}-${ed.artist}`}
                  >{`${ed.name} by ${ed.artist} (eps ${ed.episodes})`}</p>
                ))}
              </div>
            </>
          )}
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
      </div>
    </main>
  );
}

export default MainLayout;
