import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import Q from "q";
import SpotifyApi from "../utils/spotify-web-api";

const AppContext = React.createContext();
const spotify = new SpotifyApi();
spotify.setPromiseImplementation(Q);

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [playlists, setAllPlaylists] = useState([]);
  const [devices, setDevices] = useState([]);
  const [message, setMessage] = useState("asdas");

  const getData = useCallback(async () => {
    if (accessToken) {
      try {
        spotify.setAccessToken(accessToken);
        setLoading(true);
        const resolvedPromises = await Promise.all([
          spotify.getUserPlaylists({ limit: 50 }),
          spotify.getMyDevices(),
        ]);
        const [playlistsData, devicesData] = resolvedPromises;
        setAllPlaylists(playlistsData.items);
        const availableDevices = devicesData.devices.filter(
          (device) => !device.is_restricted
        );
        setDevices(availableDevices);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setMessage({ type: "error", body: "Error! Please refresh the page." });
      }
    }
  }, [accessToken]);

  const refresh = useCallback(async () => {
    await getData();
  }, [getData]);

  useEffect(() => {
    getData();
  }, [accessToken, getData]);

  const values = useMemo(
    () => ({
      message,
      setMessage,
      loading,
      setLoading,
      accessToken,
      setAccessToken,
      expiresAt,
      setExpiresAt,
      spotify,
      playlists,
      devices,
      getData,
      refresh,
    }),
    [
      accessToken,
      loading,
      refresh,
      devices,
      expiresAt,
      getData,
      playlists,
      message,
      setMessage,
    ]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  if (!AppProvider) {
    throw new Error("Need a AppProvider");
  }

  const {
    loading,
    setLoading,
    accessToken,
    setAccessToken,
    expiresAt,
    setExpiresAt,
    // eslint-disable-next-line no-shadow
    spotify,
    playlists,
    devices,
    refresh,
    message,
    setMessage,
  } = useContext(AppContext);

  return {
    loading,
    setLoading,
    accessToken,
    setAccessToken,
    expiresAt,
    setExpiresAt,
    spotify,
    playlists,
    devices,
    refresh,
    message,
    setMessage,
  };
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useAppContext, AppProvider };
