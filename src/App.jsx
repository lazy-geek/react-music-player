import React, { useState, useRef, useEffect } from "react";
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import axios from 'axios';
import { ethers } from 'ethers'

import DMI_Contract_abi from './contracts/DMI-Contract_abi.json';
import { SongList } from './components/SongList';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { Player } from './components/Player';
import { UploadPage } from './components/UploadPage';
import LoadingOverlay from "react-loading-overlay";
import { Triangle } from 'react-loader-spinner';


const serverUrl = "https://dml-server.herokuapp.com";


function App() {
  // -----------------------------------------------------------------------------------------------------------
  let contractAddress = '0x592c841d597Ee9289f981FC184A068A3d36C284e';
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [jwtToken, setJwtToken] = useState("");
  const [playlists, setPlaylists] = useState(null);
  const [ownedSongIds, setOwnedSongIds] = useState([]);
  const [connButtonText, setConnButtonText] = useState('Login');
  const [activeTile, setActiveTile] = useState("Newly Released");
  const [currentContractVal, setCurrentContractVal] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWalletHandler = () => {
    console.log("call");
    if (window.ethereum && window.ethereum.isMetaMask) {

      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          console.log(result);
          accountChangedHandler(result[0]);
          setConnButtonText('Connected');

        })
        .catch(error => {
          setErrorMessage(error.message);
          console.log(error)
        });

    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  }

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  }

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  }


  // listen for account changes
  window.ethereum.on('accountsChanged', accountChangedHandler);

  window.ethereum.on('chainChanged', chainChangedHandler);

  const updateEthers = () => {
    console.log('contrxctr');
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, DMI_Contract_abi, tempSigner);
    setContract(tempContract);
  }
  // ---------------------------------------------------------------------------------
  const searchSongByName = async (names) => {
    if (contract === null) return;
    if(!names || names == "errors") return;
    if(names.length == 0) return;
    let songs = [];
    for (let i = 0; i < names.length; i++) {
      let song = await contract.SearchSong(names[i]['Track']);
      let temp = {
        'id': parseInt(song['_id'].toHexString(), 16),
        'ArtistName': song['ArtistName'],
        'TrackURL': song['ArtURL'],
        "TrackTitle": song['SongName'],
        "ReleaseDate": parseInt(song['TimeStamp'].toHexString(), 16),
        "ArtWorkURl": song['CoverURL'],
        "TrackLikes": 0,
        "TrackDuration": song['Length']
      }
      songs[i] = temp;
    }
    setSongList(songs);

  }

  const fetchSongs = async () => {
    if (contract === null) return;
    let id = await contract.NewlyRealsed();
    id = parseInt(id.toHexString(), 16);
    let songs = [];
    for (let i = 0; i < id; i++) {
      let song = await contract.getSongById(i);
      console.log(song);
      let temp = {
        'id': parseInt(song['_id'].toHexString(), 16),
        'ArtistName': song['ArtistName'],
        'TrackURL': song['ArtURL'],
        "TrackTitle": song['SongName'],
        "ReleaseDate": parseInt(song['TimeStamp'].toHexString(), 16),
        "ArtWorkURl": song['CoverURL'],
        "TrackLikes": 0,
        "TrackDuration": song['Length']
      }
      songs[i] = temp;
    }
    setSongList(songs);
    setActiveTile("Newly Released");
    fetchOwnedSongsIds();
    // console.log(songs);
  }

  const fetchSongsByGenre = async (g) => {
    if (contract === null) return;
    let names = await contract.Explore(g);

    let songs = [];
    for (let i = 0; i < names.length; i++) {
      let song = await contract.SearchSong(names[i]);
      let temp = {
        'id': parseInt(song['_id'].toHexString(), 16),
        'ArtistName': song['ArtistName'],
        'TrackURL': song['ArtURL'],
        "TrackTitle": song['SongName'],
        "ReleaseDate": parseInt(song['TimeStamp'].toHexString(), 16),
        "ArtWorkURl": song['CoverURL'],
        "TrackLikes": 0,
        "TrackDuration": song['Length']
      }
      songs[i] = temp;
    }
    setSongList(songs);
    setActiveTile("Newly Released");
    // console.log(songs);
  }

  const fetchOwnedSongsIds = async () => {
    if (contract === null || defaultAccount === null) return;
    let ids = await contract.GetListOfNFTOwned();
    let temp=[];
    if(ids){
      ids.forEach(element => {
        temp.push(parseInt(element.toHexString(), 16));
      });
    }
    setOwnedSongIds(temp);
  }

  const fetchBoughtSongs = async () => {
    if (contract === null || defaultAccount === null || !ownedSongIds) return;
    let songs = [];
    for (let i = 0; i < ownedSongIds.length; i++) {
      let  id = ownedSongIds[i];
      let song = await contract.getSongById(id);
      console.log(song);
      
      let temp = {
        'id': parseInt(song['_id'].toHexString(), 16),
        'ArtistName': song['ArtistName'],
        'TrackURL': song['ArtURL'],
        "TrackTitle": song['SongName'],
        "ReleaseDate": parseInt(song['TimeStamp'].toHexString(), 16),
        "ArtWorkURl": song['CoverURL'],
        "TrackLikes": 0,
        "TrackDuration": song['Length']
      }
      songs[i] = temp;
    }
    setSongList(songs);
    setActiveTile("Bought");
  }
  const connectToDML = async () => {
    if (defaultAccount === null) return;
    console.log('connecting to server');
    console.log(defaultAccount);
    const a = {
      wallet: defaultAccount,
    };
    let res = await axios.post(`${serverUrl}/playlist/connect`, a);
      
        console.log(res.data);
        setJwtToken(res.data['authToken']);
  }
  useEffect(() => {
    fetchSongs();
  }, [contract]);

  useEffect( () => {
     connectToDML();
    
  }, [defaultAccount]);

  useEffect(() => {
    getAllPlaylist();
  },[jwtToken]);

  const addPlaylist = (pname) => {
    if (jwtToken === "" || defaultAccount === null || pname.trim() == '') return;
    console.log('adding playlist');
    // console.log(defaultAccount);
    const a = {
      wallet: defaultAccount,
      playlistTitle: pname
    };
    axios.post(`${serverUrl}/playlist/createPlaylist`, a, {
      headers: {
        "token": `${jwtToken}`,
      }
    }).then(res => {
      console.log(res);
      console.log(res.data);
    });
    getAllPlaylist();
  }

  const addSongToPlaylist = (playlistId,song) => {
    if (jwtToken === "" || defaultAccount === null || !playlistId || !song) return;
    console.log('adding playlist');
    // console.log(defaultAccount);
    const a = {
      wallet: defaultAccount,
      PlaylistID: playlistId,
      Track: song
    };
    axios.post(`${serverUrl}/playlist/Add`, a, {
      headers: {
        "token": `${jwtToken}`,
      }
    }).then(res => {
      console.log(res);
      console.log(res.data);
    });
  }

  const deleteSongFromPlaylist  = (playlistId,song) => {
    if (jwtToken === "" || defaultAccount === null || !playlistId || !song) return;
    console.log(`deleting ${song.id}`);
    // console.log(defaultAccount);
    const a = {
      wallet: defaultAccount,
      PlaylistID: playlistId,
      id: song.id
    };
    axios.post(`${serverUrl}/playlist/Remove`, a, {
      headers: {
        "token": `${jwtToken}`,
      }
    }).then(res => {
      console.log(res);
      console.log(res.data);
    });
  }
  const getAllPlaylist = () => {
    if (jwtToken === "" || defaultAccount === null) return;
    console.log("getAllPlaylist");
    const a = {
      wallet: defaultAccount,
    };
    axios.post(`${serverUrl}/playlist/fetchPlaylist`,a, {
      headers: {
        "token": `${jwtToken}`,
      }
    }).then(res => {
      console.log(res);
      console.log('playlists: '+res.data);
      setPlaylists(res.data["Playlists"]);
    });
  }

  const uploadSongToMongoDB = (sname) => {
    if (jwtToken === "" || defaultAccount === null) return;
    console.log("upload to mongodb");
    const a = {
      wallet: defaultAccount,
      track: sname
    };
    axios.post(`${serverUrl}/playlist/AddSearch`,a, {
      headers: {
        "token": `${jwtToken}`,
      }
    }).then(res => {
      console.log('uploaded to mongo:' + res);
    });
  }
  // ---------------------------------------------------------------------------------
  // Ref
  const audioRef = useRef(null);

  // State
  const [isUploading, setIsUploading] = useState(false);
  const [songList, setSongList] = useState([]);
  const [currentSong, setCurrentSong] = useState({
    'id': '',
    'ArtistName': '',
    'TrackURL': '',
    "TrackTitle": '',
    "ReleaseDate": '',
    "ArtWorkURl": '',
    "TrackLikes": 0,
    "TrackDuration": ''
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  function handleSongChange(song) {
    audioRef.current.pause();
    setIsPlaying(false);
    setCurrentSong(song);
    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true);
  }


  // useEffect(() => {
  //   fetch('https://decentralized-music-library.herokuapp.com/Trending/TrendingList', { method: "GET" })
  //     .then((response) => response.json())
  //     .then((data) => setSongList(data))
  //     .catch((error) => console.log(error.message));
  // }, []);

  return (


    <Routes>
      <Route path="/" element={
        <div className="bg-custom-grey grid grid-cols-[20%_auto] grid-rows-[auto_auto_10%] h-screen overflow-hidden">
          <div className="col-start-1 col-end-2 row-start-1 row-end-3">
            <SideBar art={currentSong.ArtWorkURl} connectWalletHandler={connectWalletHandler} connButtonText={connButtonText} addPlaylist={addPlaylist} playlists={playlists} setSongList={setSongList} fetchSongs={fetchSongs} activeTile={activeTile} setActiveTile={setActiveTile} fetchBoughtSongs={fetchBoughtSongs}/>
          </div>
          <div className="col-start-2 col-end-3 row-start-1 row-end-2">
            <Header title={activeTile} contract={contract} setSongList={setSongList} connectWalletHandler={connectWalletHandler} fetchSongs={fetchSongs} fetchSongsByGenre={fetchSongsByGenre} searchSongByName={searchSongByName}/>
          </div>
          <div className="col-start-2 col-end-3 row-start-2 row-end-3 overflow-y-scroll overflow-x-hidden">
            <SongList songs={songList} currentSong={currentSong} handleSongChange={handleSongChange} playlists={playlists} addSongToPlaylist={addSongToPlaylist} deleteSongFromPlaylist={deleteSongFromPlaylist} ownedSongIds={ownedSongIds} buySong={(e) => contract.BuyNFT(e, defaultAccount, 'abararmalek007@gmail.com')} />
          </div>
          <div className="col-start-1 col-end-3 row-start-3 row-end-4 ">
            <Player currentSong={currentSong} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} songInfo={songInfo} setSongInfo={setSongInfo} />

          </div>
        </div>
      } />
      <Route path="upload" element={
        <LoadingOverlay active={isUploading} spinner={<Triangle ariaLabel="loading-indicator" />}>
          <div className="flex flex-col bg-custom-grey h-screen max-h-full items-center justify-center">
            {/* {console.log('up: '+contract)} */}
            <UploadPage setIsUploading={setIsUploading} contract={contract} connectWalletHandler={connectWalletHandler} uploadSongToMongoDB={uploadSongToMongoDB}/>
          </div>
        </LoadingOverlay>
      } />

    </Routes>

  );
}

export default App;
