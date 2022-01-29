
import { SongCard } from './SongCard';
export const SongList = ({ songs, currentSong, handleSongChange }) => {
    return (
        <div className="flex flex-col gap-2 mt-2 items-center">
            {songs.map((song, pos) => {
                return <SongCard key={song._id} pos={pos + 1} song={song} handleSongChange={handleSongChange} isActive={currentSong.TrackTitle === song.TrackTitle}/>
            })}
        </div>
    )

    
}


