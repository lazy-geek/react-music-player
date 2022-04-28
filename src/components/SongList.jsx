
import { SongCard } from './SongCard';
export const SongList = ({fetchArtistSongs, songs, currentSong, handleSongChange,playlists,addSongToPlaylist,deleteSongFromPlaylist,buySong, ownedSongIds }) => {
    
    return (
        <div className="flex flex-col gap-2 mt-2 items-center">
            {songs.map((song, pos) => {
                return <SongCard key={song.TrackTitle + song.id} pos={pos + 1} song={song} handleSongChange={handleSongChange} isActive={currentSong.TrackTitle === song.TrackTitle} addSongToPlaylist={addSongToPlaylist} deleteSongFromPlaylist={deleteSongFromPlaylist} fetchArtistSongs={fetchArtistSongs} buySong={buySong} playlists={playlists} disableBuy={ownedSongIds.includes(song.id)}/>
            })}
        </div>
    )

    
}


