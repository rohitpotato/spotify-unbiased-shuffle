import React from "react";
import PropTypes from "prop-types";
import Playlist from "../Playlist";
import SectionSeparator from "../SectionSeparator";
import { noop } from "../../utils/common";

const Playlists = ({ playlists = [], onClick, selected }) => (
  <>
    <SectionSeparator title="Your Playlists" />
    <div className="flex items-center flex-wrap gap-4 w-full">
      {playlists.map((playlist) => (
        <Playlist
          key={playlist.id}
          playlist={playlist}
          onClick={onClick}
          selected={selected}
        />
      ))}
    </div>
  </>
);

Playlists.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
  selected: PropTypes.objectOf(PropTypes.any),
};

Playlists.defaultProps = {
  playlists: [],
  onClick: noop,
  selected: {},
};

export default Playlists;
