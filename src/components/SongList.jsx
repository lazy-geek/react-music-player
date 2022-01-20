
import { SongCard } from './SongCard';
export const SongList = ({ songs }) => {
    return (
        <div className="flex flex-col gap-2 mt-2 items-center">
            {songs.map((song, pos) => {
                return <SongCard key={song.name} pos={pos + 1} song={song} />
            })}
        </div>
    )
}


