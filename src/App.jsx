import React, { useState, useRef , useEffect} from "react";
import './App.css';
import { SongList } from './components/SongList';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { Player } from './components/Player';





function App() {
  // Ref
  const audioRef = useRef(null);

  // State
  const [songList, setSongList] = useState([]);
  const [currentSong, setCurrentSong] = useState({
    "_id": "",
    "TrackTitle": "",
    "TrackURL": "",
    "ReleaseDate": "",
    "ArtWorkURl": "",
    "TrackLikes": 0,
    "TrackDuration": ""
});
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


  useEffect(() => {
    fetch('https://decentralized-music-library.herokuapp.com/Trending/TrendingList',{method: "GET"})
      .then((response) => response.json())
      .then((data) => setSongList(data))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div className="bg-custom-grey grid grid-cols-[20%_auto] grid-rows-[auto_auto_10%] h-screen overflow-hidden">
      <div className="col-start-1 col-end-2 row-start-1 row-end-3">
        <SideBar art={currentSong.ArtWorkURl}/>
      </div>
      <div className="col-start-2 col-end-3 row-start-1 row-end-2">
        <Header title="Trending" />
      </div>
      <div className="col-start-2 col-end-3 row-start-2 row-end-3 overflow-y-scroll overflow-x-hidden">
        <SongList songs={songList} currentSong={currentSong} handleSongChange={handleSongChange} />
      </div>
      <div className="col-start-1 col-end-3 row-start-3 row-end-4 ">
        <Player currentSong={currentSong} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} songInfo={songInfo} setSongInfo={setSongInfo}/>

      </div>
    </div>

  );
}

export default App;
