import { useEffect, useState } from "react";

export default function useSpotifyIframeApi() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [api, setApi] = useState<any | null>(null);

  useEffect(() => {
    const scriptId = "spotify-iframe-api";
    const existingScript = document.getElementById(scriptId);

    // @ts-expect-error - we assume the API exists once loaded
    if (api || window.SpotifyIframe) return;

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
      script.async = true;
      document.body.appendChild(script);
      console.log("script loaded");
    }

    // @ts-expect-error - we assume the API exists once loaded
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      console.log("iframe api ready");
      setApi(IFrameAPI);
    };
  }, [api]);

  return api;
}
