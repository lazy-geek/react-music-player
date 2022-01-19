import './App.css';
import { SongList } from './components/SongList';
import { Header } from './components/Header';

let songs = [
  { name: "New Year Mix 2022", duration: "02:08", artist: "DrewsThatDude", cover: "https://creatornode3.audius.co/ipfs/QmRz3S1g7u28qrC4JweoXxaocg6VBAhd6RxmXUWYKALo1g/150x150.jpg" },
  { name: "New Year Mix 2022", duration: "02:08", artist: "DrewsThatDude", cover: "https://creatornode3.audius.co/ipfs/QmRz3S1g7u28qrC4JweoXxaocg6VBAhd6RxmXUWYKALo1g/150x150.jpg" },
]
function App() {
  return (
    <div className="bg-custom-grey h-[2000px]">
      <Header title="Trending" />
      <SongList songs={songs} />

    </div>

  );
}

export default App;
