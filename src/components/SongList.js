
import { SongCard } from './SongCard';
export const SongList = ({ songs }) => {
    return (
        <div className="flex flex-col gap-2 mt-2">
            {songs.map((song,pos) => {
               return <SongCard key={song.name} pos={pos+1} cover={song.cover} songName={song.name} songDuration={song.duration} artist={song.artist} />
            })}
        </div>
    )
}


