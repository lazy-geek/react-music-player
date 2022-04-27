
import playIcon from "../assets/play.svg"
import pauseIcon from "../assets/pause.svg"
import { getTime } from "../helpers";
import leftIcon from "../assets/left.png";
import rightIcon from "../assets/right.png";
import { useEffect, useState } from "react";

export const Player = ({ currentSong, audioRef, isPlaying, setIsPlaying ,songList,handleSongChange}) => {

    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
      });
    const [flag,setFlag] = useState(false);
    const updateTimeHandler = (e) => {
		const currentTime = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({ ...songInfo, currentTime, duration });
	};

    const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};
    const skipTrackHandler = (direction) => {
        if(!songList) return;
		let currentIndex = songList.findIndex((song) => song.id === currentSong.id);
		if (direction === "skip-forward") {
			handleSongChange(songList[(currentIndex + 1) % songList.length]);
		} else if (direction === "skip-back") {
			if ((currentIndex - 1) % songList.length === -1) {
				handleSongChange(songList[songList.length - 1]);
			} else {
				handleSongChange(songList[(currentIndex - 1) % songList.length]);
			}
		}
	}
//       useEffect(()=>{
//     if (isPlaying === true) {
//         audioRef.current.play();
//     }
//     else {
//         audioRef.current.pause();
//     }
// },[isPlaying]);
    function togglePlay(e) {
        if(currentSong.TrackTitle ==="") return;
        if (isPlaying === true) {
            setIsPlaying(false);
        }
        else {
            setIsPlaying(true);
        }
    }
    return (
        <div className="flex flex-col w-full h-full bg-[#FCFCFC] z-50 items-center justify-center">
            <audio ref={audioRef} onTimeUpdate={updateTimeHandler}>
                <source src={currentSong?.TrackURL} type="audio/mpeg" />
            </audio>
            <div className="flex flex-row w-[60%] justify-between">
            <p>{getTime(songInfo.currentTime)}</p>
            <input className="w-full mx-2"
						onChange={dragHandler}
						min={0}
						max={audioRef?.current?.duration || 0}
						value={songInfo.currentTime}
						type="range"
					/>
            <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="flex flex-row items-center">

            <img className="w-6 h-6 cursor-pointer" src={leftIcon} alt="left icon" onClick={() => skipTrackHandler("skip-back")}></img>
            {isPlaying ?
                <img src={pauseIcon} alt="pause" onClick={togglePlay} className="w-10 cursor-pointer mx-2" /> :
                <img src={playIcon} alt="play" onClick={togglePlay} className="w-10 cursor-pointer mx-2" />
            }
            <img className="w-6 h-6 cursor-pointer" src={rightIcon} alt="right icon" onClick={() => skipTrackHandler("skip-forward")}></img>
            </div>
        </div>
    )
}