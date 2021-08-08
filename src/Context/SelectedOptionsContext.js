import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useAppContext } from "./AppContext";
import { shuffleArray } from "../utils/common";

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
    setLoading,
  } = useAppContext();

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

  const handlePlay = async () => {
    setLoading(true);
    const allPromises = selectedPlaylistsOrder.map((selectedPlaylist) => {
      const fn = getPlaylistTracks(selectedPlaylists[selectedPlaylist]);
      return typeof fn === "function" ? fn() : undefined;
    });
    const _ = await Promise.all(allPromises);
    const shuffledTracks = shuffleArray(_.flat());
    await spotify.play({
      uris: shuffledTracks.slice(0, Math.min(385, shuffledTracks.length)),
    });
    setLoading(false);
  };

  const values = {
    selectedPlaylists,
    setSelectedPlaylists,
    setSelectedDevice,
    selectedDevice,
    selectedPlaylistsOrder,
    setSelectedPlaylistsOrder,
    handlePlay,
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
  } = useContext(SelectedOptionsContext);
  return {
    selectedDevice,
    selectedPlaylists,
    setSelectedDevice,
    setSelectedPlaylists,
    selectedPlaylistsOrder,
    setSelectedPlaylistsOrder,
    handlePlay,
  };
};

SelectedOptionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useSelectedOptions, SelectedOptionsProvider };
