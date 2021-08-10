const clientId = "2d0b7822774843d295a29aa196459737";
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

export { clientId, redirectUrl, scopes, stateKey };
