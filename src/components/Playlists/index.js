import React, { useState } from "react";
import PropTypes from "prop-types";
import Playlist from "../Playlist";
import SectionSeparator from "../SectionSeparator";
import "./Playlists.css";

const Playlists = ({
  playlists = [],
  selectAllPlaylists,
  clearAllSelectedPlaylists,
}) => {
  const [allPlaylistsSelected, setAllPlaylistsSelected] = useState(false);
  return (
    <>
      <div className="flex flex-row justify-between items-center w-full">
        <SectionSeparator title="Select one or more playlists" />
        <div>
          <label htmlFor="selectAllPlaylists">
            <span className="text-white font-montserrat text-opacity-80 font-medium">
              Select All Playlists
            </span>
            <input
              onClick={() => {
                if (allPlaylistsSelected) {
                  setAllPlaylistsSelected(false);
                  clearAllSelectedPlaylists();
                } else {
                  setAllPlaylistsSelected(true);
                  selectAllPlaylists();
                }
              }}
              className="ml-3"
              type="checkbox"
              id="selectAllPlaylists"
            />
          </label>
        </div>
      </div>
      <div className="container">
        {playlists.map((playlist) => (
          <Playlist key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </>
  );
};

Playlists.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.object),
  selectAllPlaylists: PropTypes.func,
  clearAllSelectedPlaylists: PropTypes.func,
};

Playlists.defaultProps = {
  playlists: [],
  selectAllPlaylists: () => {},
  clearAllSelectedPlaylists: () => {},
};

export default Playlists;
