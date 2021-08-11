import React from "react";
import PropTypes from "prop-types";
import { useSelectedOptions } from "../../Context/SelectedOptionsContext";

const Playlist = ({ playlist = {} }) => {
  const {
    selectedPlaylists,
    setSelectedPlaylists,
    selectedPlaylistsOrder,
    setSelectedPlaylistsOrder,
  } = useSelectedOptions();
  const isSelected = !!selectedPlaylists?.[playlist?.id];
  const getImage = playlist?.images?.[0]?.url || "";
  const playlistId = playlist?.id;

  const handlePlaylistClick = () => {
    if (isSelected) {
      const selected = { ...selectedPlaylists };
      delete selected[playlistId];
      setSelectedPlaylists(selected);
      const index = selectedPlaylistsOrder.findIndex((id) => id === playlistId);
      const playlistOrder = [...selectedPlaylistsOrder];
      playlistOrder.splice(index, 1);
      setSelectedPlaylistsOrder(playlistOrder);
    } else {
      setSelectedPlaylists((s) => ({ ...s, [playlistId]: playlist }));
      setSelectedPlaylistsOrder((s) => [...s, playlistId]);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePlaylistClick}
      className="bg-dark-mode-gray hover:text-spotify-green"
    >
      <div>
        <div className="p-4">
          <img src={getImage} alt="playlist-cover" />
        </div>
      </div>
      <div
        className={`${
          isSelected ? "bg-spotify-green" : "bg-dark-mode-gray"
        }  px-4 py-6 rounded-md`}
      >
        <span className="text-white font-montserrat text-opacity-80 font-medium">
          {playlist.name.substring(0, 14)}..
        </span>
      </div>
    </button>

    // <button
    //   type="button"
    //   onClick={handlePlaylistClick}
    //   className={`flex items-center space-x-4 rounded-md text-light md:w-64 w-full  whitespace-nowrap pr-6 transition-all overflow-hidden ${
    //     isSelected === true
    //       ? "bg-spotify-dark-green hover:text-light"
    //       : "bg-dark-mode-gray hover:text-spotify-dark-green "
    //   }`}
    // >
    //   <div className="">
    //     <img
    //       className=" min-w-max w-20 h-16 object-fit"
    //       src={getImage}
    //       alt="playlist"
    //     />
    //   </div>
    //   <div className=" font-medium text-base font-montserrat overflow-ellipsis flex-1">
    //     {playlist.name}
    //   </div>
    // </button>
  );
};

Playlist.propTypes = {
  playlist: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Playlist;
