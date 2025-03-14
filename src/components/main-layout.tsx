import { NavBar } from "./navbar";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useState } from "react";

function MainLayout() {
  const [musicData, setMusicData] = useState<string>("");
  const [animeName, setAnimeName] = useState<string>("");
  const [errorString, setErrorString] = useState<string>("");

  const clearState = () => {
    setMusicData("");
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
        console.log(res);
        setAnimeName(res.data.title);
        setMusicData(JSON.stringify(res.data.theme));
      })
      .catch((error) => {
        console.error(error);
        setErrorString(error);
      });
  };

  return (
    <main className="w-full min-h-screen">
      <NavBar />
      <div className="mx-auto my-0">
        <h1>Animusic</h1>
        <p>--something about anime--</p>
        <div className="grid mx-auto my-2 w-full max-w-sm items-center gap-2">
          <Label htmlFor="animeId">Anime ID</Label>
          <Input type="number" id="animeId" placeholder="Anime ID" />
          <Button variant="outline" onClick={getMusicData}>
            Get music
          </Button>
        </div>
        <div className="flex flex-wrap mx-auto my-2 w-full max-w-sm items-center gap-2">
          <p>{animeName}</p>
          <p>{musicData}</p>
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
