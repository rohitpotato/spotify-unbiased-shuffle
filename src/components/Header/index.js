import React from "react";

const Header = () => (
  <div className="text-center">
    <div className="flex items-center space-x-3 text-center justify-center">
      <img
        className="md:h-18s md:w-18s h-12 w-12"
        src="/spotify-logo.png"
        alt="spotify-logo"
      />
      <div className=" text-light opacity-80">
        <div className="font-montserrat md:text-3xl text-xl font-medium">
          Spofity Unbiased Shuffle
        </div>
      </div>
    </div>
    <div className="text-base mt-4 font-montserrat text-light text-opacity-70 text-center font-medium">
      Unbiased shuffle for spotify playlists, combine and shuffle playlists for
      the ultimate experience!
    </div>
  </div>
);

export default Header;
