import React from "react";
import Header from "./components/Header";
// import { Loader } from "./components/Loader";
import DeviceSelect from "./components/DeviceSelect";
import Playlists from "./components/Playlists";
import Button from "./components/Button";
import Play from "./components/icons/Play";
import Refresh from "./components/icons/Refresh";

function App() {
  return (
    <div className="md:w-9/12 w-11/12 mx-auto py-12 flex flex-col items-center space-y-12 justify-center">
      <Header />
      <div className="flex md:space-x-16 md:space-y-0 space-y-4 flex-col md:flex-row ">
        <Button type="primary" className="flex items-center space-x-2">
          <span>PLAY</span>
          <span className="flex items-center">
            <Play />
          </span>
        </Button>
        <Button type="primary" className="flex items-center space-x-2">
          <span>REFRESH</span>
          <span className="flex items-center">
            <Refresh />
          </span>
        </Button>
      </div>
      <div className=" w-full">
        <DeviceSelect
          devices={[
            {
              id: 1,
              name: "Mac OS",
            },
            {
              id: 2,
              name: "Pixel OS",
            },
            {
              id: 3,
              name: "Redmi OS",
            },
          ]}
        />
      </div>
      <div className="w-full">
        <Playlists
          playlists={[
            {
              id: 1,
              name: "Ihaveaweirdtaste",
              image:
                "https://blog.dozmia.com/content/images/2019/01/Portrait-The-Weeknd.jpg",
            },
            {
              id: 2,
              name: "DarkTrapOrSumm",
              image:
                "https://townsquare.media/site/812/files/2020/05/Illustrated-album-covers.jpg?w=1200",
            },
            {
              id: 3,
              name: "Vh1 Classics",
              image:
                "https://cdn.vox-cdn.com/thumbor/zki-yrLTa4XBlKE0SXo2RDtOrLY=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19345947/HarryStylesAlbumCover_HarryStyles_Getty_Ringer.jpg",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
