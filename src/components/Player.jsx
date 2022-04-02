
import playIcon from "../assets/play.svg"
import pauseIcon from "../assets/pause.svg"
import { getTime } from "../helpers";

export const Player = ({ currentSong, audioRef, isPlaying, setIsPlaying ,songInfo,setSongInfo}) => {

    

    const updateTimeHandler = (e) => {
		const currentTime = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({ ...songInfo, currentTime, duration });
	};

    const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

    function togglePlay(e) {
        if (isPlaying === true) {
            setIsPlaying(false);
            audioRef.current.pause();
        }
        else {
            setIsPlaying(true);
            audioRef.current.play();
        }
    }
    return (
        <div className="flex flex-col w-full h-full bg-[#FCFCFC] z-50 items-center justify-center">
            <audio ref={audioRef} onTimeUpdate={updateTimeHandler}>
                <source src={currentSong.TrackURL} type="audio/mpeg" />
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
            {isPlaying ?
                <img src={pauseIcon} alt="pause" onClick={currentSong.TrackTitle !=="" ? togglePlay : null} className="w-10" /> :
                <img src={playIcon} alt="play" onClick={currentSong.TrackTitle !=="" ? togglePlay : null} className="w-10" />
            }
        </div>
    )
}