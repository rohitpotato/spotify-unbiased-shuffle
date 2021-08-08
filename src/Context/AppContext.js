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
        // handle errors gracefully
      }
    }
  }, [accessToken]);

  useEffect(() => {
    getData();
  }, [accessToken, getData]);

  const values = {
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
  };

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
  };
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useAppContext, AppProvider };
