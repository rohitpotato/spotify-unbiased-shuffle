import React from "react";
import PropTypes from "prop-types";
import Playlist from "../Playlist";
import SectionSeparator from "../SectionSeparator";

const Playlists = ({ playlists = [] }) => (
  <>
    <SectionSeparator title="Your Playlists" />
    <div className="flex items-center flex-wrap gap-4 w-full">
      {playlists.map((playlist) => (
        <Playlist key={playlist.id} playlist={playlist} />
      ))}
    </div>
  </>
);

Playlists.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.object),
};

Playlists.defaultProps = {
  playlists: [],
};

export default Playlists;
