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
import { BigNumber } from '@ethersproject/bignumber';
import { parseUnits } from '@ethersproject/units';
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
  let contractAddress = '0x42D462c030CC2276780E5345210E6245b6EB1Aa5';
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [jwtToken, setJwtToken] = useState("");
  const [playlists, setPlaylists] = useState(null);
  const [ownedSongIds, setOwnedSongIds] = useState([]);
  const [isBuying,setIsBuying] = useState(0);
  const [connButtonText, setConnButtonText] = useState('Login');
  const [activeTile, setActiveTile] = useState("Newly Released");
  const [currentContractVal, setCurrentContractVal] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const getIPFSLink=(str) =>{
    let hash = str.split(".")[0].split(":")[1].slice(2);
    let filename =str.split("/").pop();
    // console.log("ipfslink: "+ "https://cloudflare-ipfs.com/ipfs/" +hash + "/"+filename);
    return "https://cloudflare-ipfs.com/ipfs/" +hash + "/"+filename;
}

 useEffect(()=>{
  connectWalletHandler();
 },[]);
  const connectWalletHandler = () => {
    console.log("connect To Wallet");
    if (window.ethereum && window.ethereum.isMetaMask) {

      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          accountChangedHandler(result[0]);
          setConnButtonText('Connected');

        })
        .catch(error => {
          setErrorMessage(error.message);
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
      let price  = await contract.getIndividualNFT(parseInt(song['_id'].toHexString(), 16));
      price = price.TokenValue;
      let temp = {
        'id': parseInt(song['_id'].toHexString(), 16),
        'ArtistName': song['ArtistName'],
        'Price': ethers.utils.formatUnits(price),
        'TrackURL': getIPFSLink(song['ArtURL']),
        "TrackTitle": song['SongName'],
        "ReleaseDate": parseInt(song['TimeStamp'].toHexString(), 16),
        "ArtWorkURl": getIPFSLink(song['CoverURL']),
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
    console.log("fetchSongs");

    for (let i = 0; i < id; i++) {
      let song = await contract.getSongById(i);
      let price  = await contract.getIndividualNFT(i);
      price = price.TokenValue;
      let temp = {
        'id': parseInt(song['_id'].toHexString(), 16),
        'ArtistName': song['ArtistName'],
        'Price': ethers.utils.formatUnits(price),
        'TrackURL': getIPFSLink(song['ArtURL']),
        "TrackTitle": song['SongName'],
        "ReleaseDate": parseInt(song['TimeStamp'].toHexString(), 16),
        "ArtWorkURl": getIPFSLink(song['CoverURL']),
        "TrackLikes": 0,
        "TrackDuration": song['Length']
      }
      songs[i] = temp;
      console.log(`{
        'id': ${temp.id},
        'ArtistName': '${temp.ArtistName}',
        'Price': ${temp.Price},
        'TrackURL': '${song['ArtURL']}',
        "TrackTitle": '${temp.TrackTitle}',
        "ReleaseDate": ${temp.ReleaseDate},
        "ArtWorkURl": '${song['CoverURL']}',
        "TrackLikes": 0,
        "TrackDuration": ${temp.TrackDuration}
        "quantity": 10,
      }`);
    }
    setSongList(songs);
    setActiveTile("Newly Released");
    fetchOwnedSongsIds();
    setCurrentSong(songs[0]);
    audioRef?.current?.load();
  }

  const fetchSongsByGenre = async (g) => {
    if (contract === null) return;
    let names = await contract.Explore(g);
    console.log("fetchSongsByGenre");
    
    let songs = [];
    for (let i = 0; i < names.length; i++) {
      let song = await contract.SearchSong(names[i]);
      let price  = await contract.getIndividualNFT(parseInt(song['_id'].toHexString(), 16));
      price = price.TokenValue;
      let temp = {
        'id': parseInt(song['_id'].toHexString(), 16),
        'ArtistName': song['ArtistName'],
        'Price': ethers.utils.formatUnits(price),
        'TrackURL': getIPFSLink(song['ArtURL']),
        "TrackTitle": song['SongName'],
        "ReleaseDate": parseInt(song['TimeStamp'].toHexString(), 16),
        "ArtWorkURl": getIPFSLink(song['CoverURL']),
        "TrackLikes": 0,
        "TrackDuration": song['Length']
      }
      songs[i] = temp;
    }
    setSongList(songs);
    setActiveTile("Newly Released");
    setCurrentSong(songs[0]);
    audioRef.current.load();
  }

  const fetchOwnedSongsIds = async () => {
    console.log("fetchOwnedSongsIds");
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
    console.log("fetchBoughtSongs");
    if (contract === null || defaultAccount === null || !ownedSongIds) return;
    let songs = [];
    for (let i = 0; i < ownedSongIds.length; i++) {
      let  id = ownedSongIds[i];
      let song = await contract.getSongById(id);
      let price  = await contract.getIndividualNFT(id);
      price = price.TokenValue;
      let temp = {
        'id': parseInt(song['_id'].toHexString(), 16),
        'ArtistName': song['ArtistName'],
        'Price': ethers.utils.formatUnits(price),
        'TrackURL': getIPFSLink(song['ArtURL']),
        "TrackTitle": song['SongName'],
        "ReleaseDate": parseInt(song['TimeStamp'].toHexString(), 16),
        "ArtWorkURl": getIPFSLink(song['CoverURL']),
        "TrackLikes": 0,
        "TrackDuration": song['Length']
      }
      songs[i] = temp;
    }
    setSongList(songs);
    setActiveTile("Bought");
    setCurrentSong(songs[0]);
    audioRef.current.load();
  }
  const connectToDML = async () => {
    if (defaultAccount === null) return;
    console.log('connecting DML to server');
    console.log('Account: '+defaultAccount);
    const a = {
      wallet: defaultAccount,
    };
    let res = await axios.post(`${serverUrl}/playlist/connect`, a);
        setJwtToken(res.data['authToken']);
  }
  const buySong = async (i,email) => {
    if (defaultAccount === null) return;
    setIsBuying(1);
    // console.log("loading");
    // sleep(10000);
    
    // console.log("song bought");
    let price  = await contract.getIndividualNFT(i);
    price = price.TokenValue;
    let finalPrice = ethers.utils.formatUnits(price);
    console.log("final price:"+finalPrice);
    let options = {value: ethers.utils.parseEther(finalPrice)};
    await contract.BuyNFT(BigNumber.from(i), defaultAccount, email,options).then((res)=>{
      console.log("res data :"+res.data.message);
    });
    await fetchSongs();
    setIsBuying(0);
  }
  // useEffect(()=>{
  //   console.log("is buying: "+ isBuying);
  // },[isBuying]);
  // function sleep(milliseconds) {
  //   const date = Date.now();
  //   let currentDate = null;
  //   do {
  //     currentDate = Date.now();
  //   } while (currentDate - date < milliseconds);
  // }
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
      getAllPlaylist();
    });
  }

  const addSongToPlaylist = (playlistId,song) => {
    if (jwtToken === "" || defaultAccount === null || !playlistId || !song) return;
    console.log('adding song to playlist');
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
      console.log(res.data);
      getAllPlaylist();
    });
  }

  const deleteSongFromPlaylist  = (playlistId,song) => {
    if (jwtToken === "" || defaultAccount === null || !playlistId || !song) return;
    console.log(`deleting ${song.id}`);
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
      console.log(res.data);
    getAllPlaylist();

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
      console.log('playlists: '+res.data);
      setPlaylists(res.data["Playlists"]);
    });
  }

  const uploadSongToMongoDB = (sname) => {
    if (jwtToken === "" || defaultAccount === null) return;
    console.log("upload song to mongodb");
    const a = {
      wallet: defaultAccount,
      track: sname
    };
    axios.post(`${serverUrl}/playlist/AddSearch`,a, {
      headers: {
        "token": `${jwtToken}`,
      }
    }).then(res => {
      console.log('uploaded song to mongodb: ' + res);
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
    'Price':0,
    'TrackURL': '',
    "TrackTitle": '',
    "ReleaseDate": '',
    "ArtWorkURl": '',
    "TrackLikes": 0,
    "TrackDuration": ''
  });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(()=>{
    console.log("play changed :"+ isPlaying);
    if (isPlaying === true) {
        audioRef?.current?.play();
    }
    else {
        audioRef?.current?.pause();
    }
},[isPlaying]);


  function handleSongChange(song) {
     setIsPlaying(false);
     setCurrentSong(song);
     audioRef.current.load();
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
        <LoadingOverlay active={parseInt(isBuying)} spinner={<Triangle ariaLabel="loading-indicator" />}>
        <div className="bg-custom-grey grid grid-cols-[20%_auto] grid-rows-[auto_auto_10%] h-screen overflow-hidden">
          <div className="col-start-1 col-end-2 row-start-1 row-end-3">
            <SideBar art={currentSong?.ArtWorkURl ?? ""} connectWalletHandler={connectWalletHandler} connButtonText={connButtonText} addPlaylist={addPlaylist} playlists={playlists} setSongList={setSongList} songList={songList} fetchSongs={fetchSongs}  activeTile={activeTile} setActiveTile={setActiveTile} fetchBoughtSongs={fetchBoughtSongs}/>
          </div>
          <div className="col-start-2 col-end-3 row-start-1 row-end-2">
            <Header title={activeTile} contract={contract} setSongList={setSongList} connectWalletHandler={connectWalletHandler} fetchSongs={fetchSongs} fetchSongsByGenre={fetchSongsByGenre} searchSongByName={searchSongByName}/>
          </div>
          <div className="col-start-2 col-end-3 row-start-2 row-end-3 overflow-y-scroll overflow-x-hidden">
            <SongList songs={songList} currentSong={currentSong} handleSongChange={handleSongChange} playlists={playlists} addSongToPlaylist={addSongToPlaylist} deleteSongFromPlaylist={deleteSongFromPlaylist} ownedSongIds={ownedSongIds} buySong={(e) => buySong(e)} />
          </div>
          <div className="col-start-1 col-end-3 row-start-3 row-end-4 ">
            <Player currentSong={currentSong} handleSongChange={handleSongChange} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying}  songList={songList}/>

          </div>
        </div>
        </LoadingOverlay>
      } />
      <Route path="upload" element={
        <LoadingOverlay active={isUploading} spinner={<Triangle ariaLabel="loading-indicator" />}>
          <div className="flex flex-col bg-custom-grey min-h-screen max-h-full items-center justify-center">
            {/* {console.log('up: '+contract)} */}
            <UploadPage setIsUploading={setIsUploading} contract={contract} connectWalletHandler={connectWalletHandler} uploadSongToMongoDB={uploadSongToMongoDB}/>
          </div>
        </LoadingOverlay>
      } />

    </Routes>

  );
}

export default App;
