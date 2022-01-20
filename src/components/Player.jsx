
import playIcon from "../assets/play.svg"
import pauseIcon from "../assets/pause.svg"

export const Player = ({ currentSong, audioRef, isPlaying, setIsPlaying }) => {

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
            <audio ref={audioRef}>
                <source src={currentSong.url} type="audio/mpeg" />
            </audio>

            {isPlaying ?
                <img src={pauseIcon} alt="pause" onClick={currentSong.name !=="" ? togglePlay : null} className="w-14" /> :
                <img src={playIcon} alt="play" onClick={currentSong.name !=="" ? togglePlay : null} className="w-14" />
            }
        </div>
    )
}