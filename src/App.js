import React from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import DeviceSelect from "./components/DeviceSelect";
import Playlists from "./components/Playlists";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Play from "./components/icons/Play";
import Refresh from "./components/icons/Refresh";
import { useAppContext } from "./Context/AppContext";
import useHook from "./hooks/useHook";
import { useSelectedOptions } from "./Context/SelectedOptionsContext";

function App() {
  const { loading, playlists, devices, refresh, message, setMessage } =
    useAppContext();
  const { handlePlay, selectAllPlaylists, clearAllSelectedPlaylists } =
    useSelectedOptions();
  useHook();
  return (
    <>
      <div className="md:w-9/12 w-11/12 mx-auto py-12 flex flex-col items-center space-y-12 justify-center ">
        <Header />
        <div className="flex md:space-x-16 md:space-y-0 md:static fixed bottom-0 left-0 right-0">
          <Button
            onClick={handlePlay}
            className="flex space-x-3 border-spotify-green border border-opacity-20 bg-dark-mode-gray py-3 w-full justify-center hover:bg-spotify-green hover:text-white  text-spotify-green"
          >
            <span>PLAY</span>
            <span className="flex items-center">
              <Play />
            </span>
          </Button>
          <Button
            onClick={refresh}
            className="flex space-x-3 border-spotify-green border border-opacity-20 bg-dark-mode-gray py-3 w-full justify-center hover:bg-spotify-green hover:text-white  text-spotify-green"
          >
            <span>REFRESH</span>
            <span className="flex items-center">
              <Refresh />
            </span>
          </Button>
        </div>
        <div className=" w-full">
          <DeviceSelect devices={devices} />
        </div>
        <div className="w-full">
          <Playlists
            selectAllPlaylists={selectAllPlaylists}
            playlists={playlists}
            clearAllSelectedPlaylists={clearAllSelectedPlaylists}
          />
        </div>
      </div>
      {loading && <Loader />}
      <Alert message={message} onRemove={setMessage} />
    </>
  );
}

export default App;
