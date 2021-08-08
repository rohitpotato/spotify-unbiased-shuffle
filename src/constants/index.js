const clientId = "2d0b7822774843d295a29aa196459737";
const redirectUrl = "http://localhost:3000/callback";
const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-modify-playback-state",
  "user-library-read",
  "user-read-playback-state",
];
const stateKey = "state";

export { clientId, redirectUrl, scopes, stateKey };
