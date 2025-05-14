// import { useEffect, useRef, useState } from "react";
import { useEffect, useState } from "react";
import {
  redirectToAuth,
  fetchAccessToken,
} from "../../services/auth/authUtils.ts";
import { checkForStringNonEmpty } from "@/lib/utils.ts";
import useAnimusicStore from "@/state/store.ts";
import IndividualTheme from "./individual-theme.tsx";
import { Button } from "../ui/button.tsx";

function Themes() {
  const [token, setToken] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [playlists, setPlaylists] = useState<any>(null);

  const {
    musicFound: found,
    animeId,
    animeImageURL,
    animeName,
    openingsData,
    endingsData,
  } = useAnimusicStore((state) => state);

  useEffect(() => {
    if (token) {
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("profile data: ", data);
          setProfile(data);
        });
      fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("playlists data: ", data);
          setPlaylists(data);
        });
    }
  }, [token]);

  useEffect(() => {
    function getAccessCode() {
      const code = localStorage.getItem("access_code") as string;
      if (checkForStringNonEmpty(code)) {
        console.log("is this running");
        fetchAccessToken(code).then((accessToken) => {
          setToken(accessToken);
        });
      }
    }
    return () => getAccessCode();
  }, []);

  // const iframeRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const scriptId = "spotify-iframe-api";
  //   const existingScript = document.getElementById(scriptId);
  //   const loadSpotifyIframeAPI = () => {
  //     if (!existingScript) {
  //       console.log("is this also running");
  //       const script = document.createElement("script");
  //       script.id = scriptId;
  //       script.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
  //       script.async = true;
  //       document.body.appendChild(script);

  //       script.onload = () => {
  //         console.log("script loaded");
  //         // @ts-expect-error - we assume the API exists once loaded
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
  //           console.log("iframe ready");
  //           const element = document.getElementById("embed-iframe");
  //           const options = {
  //             uri: "spotify:track:43vYPeFCegw1GVNbbgB7N0",
  //           };
  //           // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //           const callback = (EmbedController: any) => {
  //             console.log("Spotify Embed Controller ready:", EmbedController);
  //           };
  //           console.log("ref and element status: ", iframeRef.current, element);
  //           if (iframeRef.current) {
  //             console.log("creating controller");
  //             IFrameAPI.createController(element, options, callback);
  //           }
  //         };
  //       };
  //     }
  //   };

  //   if (checkForStringNonEmpty(token)) {
  //     console.log("loading frame");
  //     loadSpotifyIframeAPI();
  //   }
  //   return () => {
  //     console.log("removing script");
  //     // @ts-expect-error - we assume the API exists
  //     window.onSpotifyIframeApiReady = undefined;
  //     if (existingScript && existingScript.parentNode) {
  //       console.log("removing script 2");
  //       existingScript.parentNode.removeChild(existingScript);
  //     }
  //   };
  // }, [token]);

  if (!token) {
    return (
      <div>
        <Button onClick={redirectToAuth}>Login with Spotify</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap mx-auto my-2 w-full max-w-2xl items-center justify-center gap-3">
      {profile && (
        <>
          {/* <div className="flex flex-col justify-center items-center">
            {JSON.stringify(profile)}
          </div> */}
          {/* <div className="flex flex-col justify-center items-start gap-4 max-w-xl">
            <p>Spotify Iframe</p>
            <div ref={iframeRef} id="embed-iframe"></div>
          </div> */}
          <div className="flex flex-col justify-center items-start gap-4 max-w-xl">
            {playlists &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              playlists.items.map((playlist: any) => {
                return (
                  <div
                    key={playlist.id}
                    className="flex flex-row items-center justify-center gap-4"
                  >
                    <img
                      src={playlist.images[0].url}
                      alt={playlist.description}
                      width={80}
                      height={80}
                    />
                    <p>{playlist.name}</p>
                  </div>
                );
              })}
          </div>
        </>
      )}
      {found && (
        <>
          <div className="min-w-xl">
            <p>{animeName}</p>
            <a
              href={`https://myanimelist.net/anime/${animeId}`}
              target="_blank"
            >
              <img
                className="inline"
                src={animeImageURL}
                alt={animeName}
                width={240}
                height={240}
              />
            </a>
          </div>
          {openingsData.length === 0 && (
            <div className="min-w-xl">
              <h3>No Opening Themes Data</h3>
            </div>
          )}
          {openingsData.length > 0 && (
            <div className="min-w-xl">
              <h3>Opening Themes</h3>
              {openingsData.map((op) => (
                <IndividualTheme key={`${op.name}-${op.artist}`} theme={op} />
                // <p
                //   key={`${op.name}-${op.artist}`}
                //   className="py-1"
                // >{`${op.name} by ${op.artist} (eps ${op.episodes})`}</p>
              ))}
            </div>
          )}
          {endingsData.length === 0 && (
            <div className="min-w-xl">
              <h3>No Ending Themes Data</h3>
            </div>
          )}
          {endingsData.length > 0 && (
            <div className="min-w-xl ">
              <h3>Ending Themes</h3>
              {endingsData.map((ed) => (
                <p
                  key={`${ed.name}-${ed.artist}`}
                  className="py-1"
                >{`${ed.name} by ${ed.artist} (eps ${ed.episodes})`}</p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Themes;
