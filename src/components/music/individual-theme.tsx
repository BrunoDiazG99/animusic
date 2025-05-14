import { AnimeTheme } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useSpotifyIframeApi from "./useSpotifyIframeApi.tsx";

type IndividualThemeProps = {
  theme: AnimeTheme;
};

function IndividualTheme({ theme }: IndividualThemeProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [themeUri, setThemeUri] = useState<string>("");
  const iframeRef = useRef<HTMLDivElement>(null);
  const IFrameAPI = useSpotifyIframeApi();

  const changeThemeUri = () => {
    setLoading(true);
    setTimeout(() => {
      setThemeUri("spotify:track:43vYPeFCegw1GVNbbgB7N0");
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    console.log("a: ", IFrameAPI, iframeRef, themeUri);
    if (!themeUri) return;
    console.log("a: ", IFrameAPI, iframeRef, themeUri);
    if (!IFrameAPI || !iframeRef.current) return;

    const options = {
      uri: themeUri,
    };

    // @ts-expect-error - we assume the API exists once loaded
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    const callback = (controller: any) => {
      console.log("Embed controller ready for:", themeUri);
    };

    IFrameAPI.createController(iframeRef.current, options, callback);
  }, [IFrameAPI, iframeRef, themeUri]);

  return (
    <div>
      <p
        key={`${theme.name}-${theme.artist}`}
        className="py-1"
      >{`${theme.name} by ${theme.artist} (eps ${theme.episodes})`}</p>
      <Button onClick={changeThemeUri}>
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <Search /> Buscar tema
          </>
        )}
      </Button>
      <div ref={iframeRef}></div>
    </div>
  );
}

export default IndividualTheme;
