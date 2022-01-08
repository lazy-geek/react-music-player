import './App.css';
import { SongList } from './components/SongList';

let songs = [
  { name: "New Year Mix 2022", duration: "02:08", artist: "DrewsThatDude", cover: "https://creatornode3.audius.co/ipfs/QmRz3S1g7u28qrC4JweoXxaocg6VBAhd6RxmXUWYKALo1g/150x150.jpg" },
  { name: "New Year Mix 2022", duration: "02:08", artist: "DrewsThatDude", cover: "https://creatornode3.audius.co/ipfs/QmRz3S1g7u28qrC4JweoXxaocg6VBAhd6RxmXUWYKALo1g/150x150.jpg" },
]
function App() {
  return (
    <SongList songs={songs}/>
  );
}

export default App;
