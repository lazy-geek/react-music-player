
import { SongCard } from './SongCard';
export const SongList = ({ songs }) => {
    return (
        <div className=" grid grid-cols-1 gap-2">
            {songs.map((song) => {
               return <SongCard key={song.name} cover={song.cover} songName={song.name} songDuration={song.duration} artist={song.artist} />
            })}
        </div>
    )
}


