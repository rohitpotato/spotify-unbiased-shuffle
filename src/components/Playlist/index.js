import React from "react";
import PropTypes from "prop-types";
import { useSelectedOptions } from "../../Context/SelectedOptionsContext";

const Playlist = ({ playlist }) => {
  const {
    selectedPlaylists,
    setSelectedPlaylists,
    selectedPlaylistsOrder,
    setSelectedPlaylistsOrder,
  } = useSelectedOptions();
  const isSelected = !!selectedPlaylists[playlist.id];
  const getImage = playlist.images[playlist.images.length - 1].url;

  const handlePlaylistClick = () => {
    if (isSelected) {
      const selected = { ...selectedPlaylists };
      delete selected[playlist.id];
      setSelectedPlaylists(selected);
      const index = selectedPlaylistsOrder.find((id) => id === playlist.id);
      const playlistOrder = [...selectedPlaylistsOrder];
      playlistOrder.splice(index, 1);
      setSelectedPlaylistsOrder(playlistOrder);
    } else {
      setSelectedPlaylists((s) => ({ ...s, [playlist.id]: playlist }));
      setSelectedPlaylistsOrder((s) => [...s, playlist.id]);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePlaylistClick}
      className={`flex items-center space-x-4 rounded-md text-light md:w-64 w-full  whitespace-normal pr-6 transition-all ${
        isSelected === true
          ? "bg-spotify-dark-green hover:text-light"
          : "bg-dark-mode-gray hover:text-spotify-dark-green "
      }`}
    >
      <div>
        <img
          className=" w-20 h-16 object-cover"
          src={getImage}
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
};

export default Playlist;
