import React from "react";
import PropTypes from "prop-types";
import { noop } from "../../utils/common";

const Playlist = ({ playlist, onClick, selected }) => {
  const isSelected = playlist.id === 2;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center space-x-4 rounded-md text-light md:w-64 w-full  whitespace-normal pr-6 transition-all ${
        isSelected === true
          ? "bg-spotify-dark-green hover:text-light"
          : "bg-dark-mode-gray hover:text-spotify-dark-green "
      }`}
    >
      <div>
        <img
          className=" w-20 h-16 object-cover"
          src={playlist.image}
          alt="playlist"
        />
      </div>
      <div className=" font-medium text-base font-montserrat">
        {playlist.name}
      </div>
    </button>
  );
};

Playlist.propTypes = {
  playlist: PropTypes.objectOf(PropTypes.any).isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.objectOf(PropTypes.any),
};

Playlist.defaultProps = {
  onClick: noop,
  selected: {},
};

export default Playlist;
