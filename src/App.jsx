import React, { useState, useRef, useEffect } from "react";
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import {ethers} from 'ethers'

import DMI_Contract_abi from './contracts/DMI-Contract_abi.json';
import { SongList } from './components/SongList';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { Player } from './components/Player';
import { UploadPage } from './components/UploadPage';
import LoadingOverlay from "react-loading-overlay";
import { Triangle } from 'react-loader-spinner';




function App() {
  // -----------------------------------------------------------------------------------------------------------
  let contractAddress = '0x152aE2599a1f85FcC9CFb5ed5cC47402004d050C';
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Login');

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
const fetchSongs = async ()  => {
  if (contract === null) return;
  let id =await contract.NewlyRealsed();
  id = parseInt(id.toHexString(),16);
  let songs=[];
  for(let i=0; i<id; i++){
    let song = await contract.getSongById(i);
    console.log(song);
    let temp = {
      'id':parseInt(song['_id'].toHexString(),16),
      'ArtistName':song['ArtistName'],
      'TrackURL': song['ArtURL'],
      "TrackTitle": song['SongName'],
      "ReleaseDate": parseInt(song['TimeStamp'].toHexString(),16),
      "ArtWorkURl": song['CoverURL'],
      "TrackLikes": 0,
      "TrackDuration": song['Length']
    }
    songs[i]=temp;
  }
  setSongList(songs);
  // console.log(songs);
}

useEffect(()=>{
  fetchSongs();
},[contract]);
  // ---------------------------------------------------------------------------------
  // Ref
  const audioRef = useRef(null);

  // State
  const [isUploading, setIsUploading] = useState(false);
  const [songList, setSongList] = useState([]);
  const [currentSong, setCurrentSong] = useState({
    'id':'',
      'ArtistName':'',
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
            <SideBar art={currentSong.ArtWorkURl} connectWalletHandler={connectWalletHandler} connButtonText={connButtonText}/>
          </div>
          <div className="col-start-2 col-end-3 row-start-1 row-end-2">
            <Header title="Newly Released" contract={contract} setSongList={setSongList} connectWalletHandler={connectWalletHandler} songList={songList}/>
          </div>
          <div className="col-start-2 col-end-3 row-start-2 row-end-3 overflow-y-scroll overflow-x-hidden">
            <SongList songs={songList} currentSong={currentSong} handleSongChange={handleSongChange} />
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
            <UploadPage setIsUploading={setIsUploading} contract={contract} connectWalletHandler={connectWalletHandler}/>
          </div>
        </LoadingOverlay>
      } />

    </Routes>

  );
}

export default App;
