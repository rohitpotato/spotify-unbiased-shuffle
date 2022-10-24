import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import { useAppContext } from "./AppContext";
import { shuffleArray, SpotifyError } from "../utils/common";
import { likedSongsKey } from "../constants";

const SelectedOptionsContext = createContext();

const SelectedOptionsProvider = ({ children }) => {
  const [selectedPlaylists, setSelectedPlaylists] = useState({});
  const [selectedPlaylistsOrder, setSelectedPlaylistsOrder] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");

  const {
    /**
     * Spotify Web API
     * @type {SpotifyWebApi}
     */
    spotify,
    devices,
    setLoading,
    setMessage,
    playlists,
  } = useAppContext();

  useEffect(() => {
    setSelectedDevice(devices?.[0]?.name);
  }, [devices, selectedDevice]);
  const getPlaylistTracks = (playlist) => {
    let i = 0;
    const { total } = playlist?.tracks || {};
    const { id } = playlist || {};
    if (!id || !total) {
      return console.warn("params missing, please refresh the page!");
    }
    const allTracks = [];
    return async function f() {
      const tracks = await spotify.getPlaylistTracks(id, {
        limit: 100,
        offset: i,
        fields: "items(track(uri))",
      });
      i += 100;

      tracks.items.map((obj) => allTracks.push(obj.track.uri));
      if (i < total) {
        await f();
      } else {
        return allTracks;
      }
      return allTracks;
    };
  };

  const getLikedSongs = () => {
    let i = 0;
    const allTracks = [];
    return async function f() {
      const likedSongs = await spotify.getMySavedTracks({
        limit: 50,
        offset: i,
        fields: "items(track(uri))",
      });
      i += 50;
      const { total } = likedSongs;
      likedSongs.items.map((obj) => allTracks.push(obj.track.uri));
      if (i < total) {
        await f();
      } else {
        return allTracks;
      }
      return allTracks;
    };
  };

  const handlePlay = async () => {
    try {
      setLoading(true);
      const currentDeviceId = devices.find(
        (d) => d.name === selectedDevice
      )?.id;
      if (!currentDeviceId) {
        throw new SpotifyError({
          type: "error",
          body: "Please select a device",
        });
      }

      if (!selectedPlaylistsOrder.length) {
        throw new SpotifyError({
          type: "info",
          body: "Please select one or more playlists.",
        });
      }
      const allPromises = selectedPlaylistsOrder.map((selectedPlaylist) => {
        const fn =
          selectedPlaylist === likedSongsKey
            ? getLikedSongs()
            : getPlaylistTracks(selectedPlaylists[selectedPlaylist]);
        return typeof fn === "function" ? fn() : undefined;
      });
      const _ = await Promise.allSettled(allPromises);
      const allTracks = _.map((__) => __.value);
      const shuffledTracks = shuffleArray(allTracks.flat());
      await spotify.play({
        uris: shuffledTracks.slice(0, Math.min(700, shuffledTracks.length)),
        device_id: currentDeviceId,
      });
      setLoading(false);
      setMessage({ type: "success", body: "Playing tracks." });
    } catch (e) {
      setLoading(false);
      const defaultError = { type: "error", body: "Something went wrong" };
      setMessage(e.body || defaultError);
      // handle errors gracefully
    }
  };

  const selectAllPlaylists = useCallback(() => {
    const allPlaylistIds = playlists.reduce((acc, playlist) => {
      acc[playlist.id] = playlist;
      return acc;
    }, {});
    setSelectedPlaylists(allPlaylistIds);
    setSelectedPlaylistsOrder(Object.keys(allPlaylistIds));
  }, [playlists]);

  const clearAllSelectedPlaylists = useCallback(() => {
    setSelectedPlaylists({});
    setSelectedPlaylistsOrder([]);
  });

  const values = {
    selectedPlaylists,
    setSelectedPlaylists,
    setSelectedDevice,
    selectedDevice,
    selectedPlaylistsOrder,
    setSelectedPlaylistsOrder,
    handlePlay,
    selectAllPlaylists,
    clearAllSelectedPlaylists,
  };
  return (
    <SelectedOptionsContext.Provider value={values}>
      {children}
    </SelectedOptionsContext.Provider>
  );
};

const useSelectedOptions = () => {
  if (!SelectedOptionsContext) {
    throw new Error("Need SelectedOptionsContext");
  }

  const {
    selectedDevice,
    selectedPlaylists,
    setSelectedPlaylists,
    setSelectedDevice,
    selectedPlaylistsOrder,
    setSelectedPlaylistsOrder,
    handlePlay,
    selectAllPlaylists,
    clearAllSelectedPlaylists,
  } = useContext(SelectedOptionsContext);
  return {
    selectedDevice,
    selectedPlaylists,
    setSelectedDevice,
    setSelectedPlaylists,
    selectedPlaylistsOrder,
    setSelectedPlaylistsOrder,
    handlePlay,
    selectAllPlaylists,
    clearAllSelectedPlaylists,
  };
};

SelectedOptionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useSelectedOptions, SelectedOptionsProvider };
