import {
  CLIENT_ID,
  REDIRECT_URI,
  SCOPES,
  SPOTIFY_AUTH_URL,
  SPOTIFY_TOKEN_URL,
} from "@/lib/consts";

export function generateCodeVerifier(length = 128): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(36))
    .join("")
    .substring(0, length);
}

export async function generateCodeChallenge(
  codeVerifier: string
): Promise<string> {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function redirectToAuth() {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("pkce_verifier", verifier);

  console.log(REDIRECT_URI);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  // console.log(`${SPOTIFY_AUTH_URL}?${params.toString()}`);
  window.location.href = `${SPOTIFY_AUTH_URL}?${params.toString()}`;
}

export async function fetchAccessToken(code: string): Promise<string> {
  const verifier = localStorage.getItem("pkce_verifier");

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    code_verifier: verifier || "",
  });

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await response.json();
  return data.access_token;
}
