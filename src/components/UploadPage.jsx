import React, { useState, useEffect,useRef } from 'react';
import { Web3Storage } from 'web3.storage';
import { getTime } from '../helpers';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/myDatePicker.css";
import { BigNumber } from '@ethersproject/bignumber';
import { parseUnits } from '@ethersproject/units';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Popup from 'reactjs-popup';
import { UploadProgress } from './UploadProgress';
import data from "../data.json";

export const UploadPage = (props) => {
    const popupRef = useRef();
    const contentStyle = { width: 'max-content', borderRadius: '6px', borderWidth: '1px' };
    const Genres = [
        'Electonic', 'Hip-Hop', 'Other'
    ];

    const [activeSection, setActiveSection] = useState(0);
    const [selectedSongFile, setSelectedSongFile] = useState();
    const [selectedCoverFile, setSelectedCoverFile] = useState();
    const [songName, setSongName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [preview, setPreview] = useState();
    const [src, setSrc] = useState("");
    const [duration, setDuration] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [genre, setGenre] = useState("");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU2MTY1MzdmYkYyQTdFODI3YzJkNzc5NzVGMzU1RTg3NTJDMTE5NzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDc3MDA0MjI2OTQsIm5hbWUiOiJyZWFjdC1tdXNpYy10ZXN0In0.jNBkj3OArl-n_c5smjsme-p2QgxQbyYGhGrdmzCSbTM";
    const storage = new Web3Storage({ token });

    useEffect(() => {
        props.connectWalletHandler();
    }, []);
    useEffect(() => {
        if (!selectedCoverFile) {
            setPreview(undefined)
            return
        }
        // create the preview
        const objectUrl = URL.createObjectURL(selectedCoverFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedCoverFile]);

    useEffect(() => {
        if (!selectedSongFile) {
            // setSrc("")
            return
        }
        // create the preview
        const objectUrl = URL.createObjectURL(selectedSongFile)
        setSrc(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedSongFile]);

    const changeHandler = (event, type) => {
        const data = event.target.files[0];
        console.log(data);
        if (type === 'song') {
            setSelectedSongFile(data);
            // setIsSongFilePicked(true);
        } else {
            setSelectedCoverFile(data);
            // setIsCoverFilePicked(true);
        }


        event.preventDefault();
    };

    const handleSubmission = async () => {
        let uploadJson = false;
        if (uploadJson) {
            await uploadFromJson();
            return;
        }
        if (!songName || !artistName || !selectedSongFile || !selectedCoverFile) {
            alert("please fill all details");
            return;
        }
        if (price < 0) {
            alert("please enter valid price");
            return;
        }
        if (quantity < 1) {
            alert("quantity can't be less than 1");
            return;
        }
        console.log(`Uploading file`);
        props.setIsUploading(true);
        const newSongFile = renameFile(selectedSongFile, songName, artistName);
        const newCoverFile = renameFile(selectedCoverFile, songName, artistName);
        console.log("duration: " + duration);
        console.log("uploading to ipfs");
        setActiveSection(0);
        const cover_cid = await storage.put([newCoverFile]);
        console.log("uploaded cover to ipfs");
        setActiveSection(1);
        console.log("uploading song to ipfs");
        const song_cid = await storage.put([newSongFile]);
        console.log("uploaded song to ipfs");
        console.log("uploading metadata to blockchain");
        setActiveSection(2);
        await uploadSongDetails(newSongFile.name, song_cid, newCoverFile.name, cover_cid);
        console.log("uploaded metadata to blockchain");
        props.setIsUploading(false);
        setActiveSection(4);
        console.log('Content added with CID:', song_cid);
        console.log('Content added with CID:', cover_cid);
        popupRef.current.close();
    };

    const uploadSongDetails = async (songFile_name, song_cid, coverFile_name, cover_cid) => {
        const song_url = `https://${song_cid}.ipfs.infura-ipfs.io/${songFile_name}`;
        const cover_url = `https://${cover_cid}.ipfs.infura-ipfs.io/${coverFile_name}`;
        const result = await props.contract.UploadSong(artistName, songName, cover_url, song_url, startDate.getTime(), duration, genre, parseUnits(price.toString(), 'ether'), BigNumber.from(quantity));
        setActiveSection(3);
        await props.uploadSongToMongoDB(songName);
    }

    const uploadFromJson = async () => {
        let data2 = JSON.parse(JSON.stringify(data))
        console.log("json : " + data2);
        for (let i = 0; i < Object.values(data2).length; i++) {

            let song = data2[i];
            console.log(`Uploading song with id: ${song.id}`);

            const result = await props.contract.UploadSong(song.ArtistName, song.TrackTitle, song.ArtWorkURl, song.TrackURL, song.ReleaseDate, song.TrackDuration, genre, parseUnits(song.Price.toString(), 'ether'), BigNumber.from(song.quantity));
            console.log(`Uploaded song with id: ${song.id}`);
        }


    };
    const getFileExt = (f) => {
        return f.name.split('.').slice(-1)[0];
    }
    const renameFile = (f, sname, aname) => {
        let temp = sname.split(' ').join('_');
        let temp2 = aname.split(' ').join('_');
        temp = temp2 + '.' + temp + '.' + getFileExt(f);
        return new File([f], temp);
    }
    return (
        <div className=" flex flex-col border-[#dee2e6] border-[1px] max-w-lg px-16 py-12 bg-white  w-full">
            <audio src={src} onLoadedMetadata={(e) => setDuration(getTime(parseInt(e.target.duration)))}>

            </audio>
            <h1 className="font-bold text-4xl text-center mb-12">Upload Song</h1>
            <input type="text" name="artistName" id="artistName" value={artistName} onChange={(e) => setArtistName(e.target.value)} placeholder="Artist Name" className="bg-white p-2 mb-2  outline-none border-[#dee2e6] border-[1px]" />
            <input type="text" name="songName" id="songName" value={songName} onChange={(e) => setSongName(e.target.value)} placeholder="Song Name" className="bg-white p-2 mb-2 outline-none border-[#dee2e6] border-[1px]" />
            <input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="bg-white p-2 mb-2 outline-none border-[#dee2e6] border-[1px]" min={0} />
            <input type="number" name="quantity" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" className="bg-white p-2 mb-2 outline-none border-[#dee2e6] border-[1px]" min={1} />
            <label htmlFor="releaseDate" className="flex flex-row border-[#dee2e6] border-[1px] mb-2 p-2 text-[#7b7f85]">
                Release Date:
                <DatePicker id="releaseDate" required className="text-black" selected={startDate} onChange={(date) => setStartDate(date)} />
            </label>
            <Dropdown className="mb-2" options={Genres} onChange={e => setGenre(e.value)} value={genre} placeholder="Select a Genre" />
            <label htmlFor="song" className="cursor-pointer text-[#7b7f85]">
                <div className="p-2 bg-slate-200 mb-2 ">
                    <div className=" flex border-4 p-2 border-[#9fa4ab] border-dashed bg-transparent box-content justify-center">
                        {selectedSongFile && selectedSongFile.name}
                        {!selectedSongFile && "Select Song"}
                    </div>
                </div>
            </label>
            <input type="file" name="song" id='song' onChange={(e) => changeHandler(e, 'song')} hidden />

            <label htmlFor="cover" className="cursor-pointer text-[#7b7f85]">
                <div className="p-2 bg-slate-200 mb-2">
                    <div className="flex border-4 p-2 border-[#9fa4ab] border-dashed bg-transparent box-content justify-center">
                        {selectedCoverFile && <img src={preview} className="w-[150px]" />}
                        {!selectedCoverFile && "Select Cover"}
                    </div>
                </div>
            </label>
            <input type="file" name="cover" id='cover' onChange={(e) => changeHandler(e, 'cover')} accept="image/png,image/jpeg" hidden />


            <Popup ref={popupRef} trigger={<button className="bg-secondary p-4 text-xl text-white">Submit</button>} modal={true} onOpen={handleSubmission} contentStyle={contentStyle}>
                {close => <UploadProgress activeSection={activeSection} close={close}></UploadProgress>}


            </Popup>
        </div>
    )
};

// https://bafybeiciu7fpruozdjusjtha63dyjpfb2jtnvjragyic36a2dkvpnqbpva.ipfs.infura-ipfs.io/Wiz_Khalifa.See_you_Again.jpg