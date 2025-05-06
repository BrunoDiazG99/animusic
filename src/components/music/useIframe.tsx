import { checkForStringNonEmpty } from "@/lib/utils";
import { useEffect, useRef } from "react";

export default function useIframe(token: string, iframeId: string) {
  const iframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = "spotify-iframe-api";
    const existingScript = document.getElementById(scriptId);
    const loadSpotifyIframeAPI = () => {
      if (!existingScript) {
        console.log("is this also running");
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          console.log("script loaded");
          // @ts-expect-error - we assume the API exists once loaded
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
            console.log("iframe ready");
            const element = document.getElementById("embed-iframe");
            const options = {
              uri: "spotify:track:43vYPeFCegw1GVNbbgB7N0",
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const callback = (EmbedController: any) => {
              console.log("Spotify Embed Controller ready:", EmbedController);
            };
            console.log("ref and element status: ", iframeRef.current, element);
            if (iframeRef.current) {
              console.log("creating controller");
              IFrameAPI.createController(element, options, callback);
            }
          };
        };
      }
    };

    if (checkForStringNonEmpty(token)) {
      console.log("loading frame");
      loadSpotifyIframeAPI();
    }
    return () => {
      // @ts-expect-error - we assume the API exists
      window.onSpotifyIframeApiReady = undefined;
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [token]);

  return iframeRef;
}
