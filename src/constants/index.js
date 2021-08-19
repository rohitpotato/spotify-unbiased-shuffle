const clientId = "599c9c94cdd24f20bac550bc1444541c";
const LOCAL_URL = "http://localhost:3000/callback";
const PROD_URL = "https://spotify-unbiased-shuffle.vercel.app/callback";
const redirectUrl =
  process.env.NODE_ENV === "production" ? PROD_URL : LOCAL_URL;
const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-modify-playback-state",
  "user-library-read",
  "user-read-playback-state",
];
const stateKey = "state";
const likedSongsKey = "likedSongs";

export { clientId, redirectUrl, scopes, stateKey, likedSongsKey };
