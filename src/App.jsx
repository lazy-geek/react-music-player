import './App.css';
import { SongList } from './components/SongList';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';

let songs = [
  { name: "New Year Mix 2022", duration: "02:08", artist: "DrewsThatDude", cover: "https://creatornode3.audius.co/ipfs/QmRz3S1g7u28qrC4JweoXxaocg6VBAhd6RxmXUWYKALo1g/150x150.jpg", url: "https://bafybeif2piaeljpxwaswmvyjwnn7fz6p7lazhcubsnoflif4sy3eunufpa.ipfs.astyanax.io/audio.mpeg" },
  { name: "New Year Mix 2022", duration: "02:08", artist: "DrewsThatDude", cover: "https://creatornode3.audius.co/ipfs/QmRz3S1g7u28qrC4JweoXxaocg6VBAhd6RxmXUWYKALo1g/150x150.jpg", url: "https://mp3.chillhop.com/serve.php/?mp3=10075" },
  { name: "New Year Mix 2022", duration: "02:08", artist: "DrewsThatDude", cover: "https://creatornode3.audius.co/ipfs/QmRz3S1g7u28qrC4JweoXxaocg6VBAhd6RxmXUWYKALo1g/150x150.jpg", url: "https://bafybeif2piaeljpxwaswmvyjwnn7fz6p7lazhcubsnoflif4sy3eunufpa.ipfs.astyanax.io/audio.mpeg" },
  { name: "New Year Mix 2022", duration: "02:08", artist: "DrewsThatDude", cover: "https://creatornode3.audius.co/ipfs/QmRz3S1g7u28qrC4JweoXxaocg6VBAhd6RxmXUWYKALo1g/150x150.jpg", url: "https://bafybeif2piaeljpxwaswmvyjwnn7fz6p7lazhcubsnoflif4sy3eunufpa.ipfs.astyanax.io/audio.mpeg" },
  { name: "New Year Mix 2022", duration: "02:08", artist: "DrewsThatDude", cover: "https://creatornode3.audius.co/ipfs/QmRz3S1g7u28qrC4JweoXxaocg6VBAhd6RxmXUWYKALo1g/150x150.jpg", url: "https://bafybeif2piaeljpxwaswmvyjwnn7fz6p7lazhcubsnoflif4sy3eunufpa.ipfs.astyanax.io/audio.mpeg" },
]
function App() {
  return (
    <div className="bg-custom-grey grid grid-cols-[20%_auto] grid-rows-[auto_auto_10%] h-screen overflow-hidden">
      <div className="col-start-1 col-end-2 row-start-1 row-end-3">
        <SideBar />
      </div>
      <div className="col-start-2 col-end-3 row-start-1 row-end-2">
      <Header title="Trending" />
      </div>
      <div className="col-start-2 col-end-3 row-start-2 row-end-3 overflow-y-scroll overflow-x-hidden">
        <SongList songs={songs}/>
      </div>
      <div className="col-start-1 col-end-3 row-start-3 row-end-4 ">
          <Player/>
      </div>
    </div>

  );
}

export default App;
