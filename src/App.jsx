import React, { useState, useRef } from "react";
import './App.css';
import { SongList } from './components/SongList';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { Player } from './components/Player';


let songs = [
  { name: "New Year Mix 2022", duration: "02:08", artist: "DrewsThatDude", cover: "https://creatornode3.audius.co/ipfs/QmRz3S1g7u28qrC4JweoXxaocg6VBAhd6RxmXUWYKALo1g/150x150.jpg", url: "https://bafybeif2piaeljpxwaswmvyjwnn7fz6p7lazhcubsnoflif4sy3eunufpa.ipfs.astyanax.io/audio.mpeg" },
  { name: "Alley Cat Song", duration: "02:08", artist: "DrewsThatDude", cover: "https://creatornode3.audius.co/ipfs/QmRz3S1g7u28qrC4JweoXxaocg6VBAhd6RxmXUWYKALo1g/150x150.jpg", url: "https://bafybeidte5gehbi2ot6j5hydynvnmtt2ml5qg3tpuzgr6bq2kekooxmsyi.ipfs.astyanax.io/Wiz%20Khalifa%20-%20See%20You%20Again%20ft.%20Charlie%20Puth.flac" },
  { name: "Almost Doesn't Count", duration: "02:08", artist: "DrewsThatDude", cover: "https://creatornode3.audius.co/ipfs/QmRz3S1g7u28qrC4JweoXxaocg6VBAhd6RxmXUWYKALo1g/150x150.jpg", url: "https://bafybeif2piaeljpxwaswmvyjwnn7fz6p7lazhcubsnoflif4sy3eunufpa.ipfs.astyanax.io/audio.mpeg" },
  { name: "Almost Like Being in Love", duration: "02:08", artist: "DrewsThatDude", cover: "https://creatornode3.audius.co/ipfs/QmRz3S1g7u28qrC4JweoXxaocg6VBAhd6RxmXUWYKALo1g/150x150.jpg", url: "https://bafybeif2piaeljpxwaswmvyjwnn7fz6p7lazhcubsnoflif4sy3eunufpa.ipfs.astyanax.io/audio.mpeg" },
]
function App() {
  // Ref
  const audioRef = useRef(null);

  // State
  const [currentSong, setCurrentSong] = useState({ name: "", duration: "", artist: "", cover: "", url: "" },
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});

  function handleSongChange(song) {
    audioRef.current.pause();
    setIsPlaying(false);
    setCurrentSong(song);
    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true);
  }

  return (
    <div className="bg-custom-grey grid grid-cols-[20%_auto] grid-rows-[auto_auto_10%] h-screen overflow-hidden">
      <div className="col-start-1 col-end-2 row-start-1 row-end-3">
        <SideBar />
      </div>
      <div className="col-start-2 col-end-3 row-start-1 row-end-2">
        <Header title="Trending" />
      </div>
      <div className="col-start-2 col-end-3 row-start-2 row-end-3 overflow-y-scroll overflow-x-hidden">
        <SongList songs={songs} currentSong={currentSong} handleSongChange={handleSongChange} />
      </div>
      <div className="col-start-1 col-end-3 row-start-3 row-end-4 ">
        <Player currentSong={currentSong} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} songInfo={songInfo} setSongInfo={setSongInfo}/>

      </div>
    </div>

  );
}

export default App;
