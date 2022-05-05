import { useEffect, useState,useCallback } from "react";
import socketIOClient from "socket.io-client";


export const Header = (props) => {
    const ENDPOINT="https://dml-server.herokuapp.com";
    const [searchTxt,setSearchTxt] = useState("");
    const [currentGenre,setCurrentGenre] = useState("");
    // const [socket , setSocket] = useState(null);
    const [isFirstTime,setisFirstTime] = useState(true);
    // useEffect(() =>{
    //     props.connectWalletHandler();
    // },[]);
    // const throttleSearch = useCallback(
	// 	throttle(nextValue => search(nextValue), 1000),
	// 	[], // will be created only once initially
	// );
    const search = (value)=>{
        // socket.emit("searchQuery", { searchQuery: value});
        // socket.on("found", (data) => {
        //     console.log("data found");
        //     console.log(data)
            // console.log(JSON.stringify(data));
            
            props.searchSongByName(value);
        // });
    };
    const socket = socketIOClient(ENDPOINT);
    useEffect(()=>{
        // socket.on("connect",()=>{
        //     console.log("socket connected");
            // socket.on("found", (data) => {
            //     console.log("found");
            //     console.log(data)
            //     console.log(JSON.stringify(data));
                // let result = await props.contract.SearchSong(data);
            // setisFirstTime(false);
            // const song = {
            //     'id': parseInt(result['_id'].toHexString(), 16),
            // 'ArtistName': result['ArtistName'],
            // 'TrackURL': result['ArtURL'],
            // "TrackTitle": result['SongName'],
            // "ReleaseDate": parseInt(result['TimeStamp'].toHexString(), 16),
            // "ArtWorkURl": result['CoverURL'],
            // "TrackLikes": 0,
            // "TrackDuration": result['Length']
            //   };
              
            // props.setSongList([song]);
            // console.log(result);
            //   });
        // });

        
    },[]);

    const handleChange = (e) => {
        setSearchTxt(e.target.value);
        console.log(e.target.value);
        if(e.target.value.trim() == "" ){
            props.fetchSongs();
            return;
        }
        // throttleSearch(e.target.value.toString());
        search(e.target.value.trim().toString());
        // console.log(props.contract);
        // console.log(isFirstTime);
        // if(searchTxt.trim() == ''){
        //     if(!isFirstTime) {
        //        // fetch all songs
        //     //    props.setSongList(allsongs)
        //     }
        //     return;
        // };
        
    }

    const onGenreChange = (g)=>{
        setCurrentGenre(g);
        setSearchTxt("");
        if(g==""){
            props.fetchSongs();
        }
        else {
            console.log("genre changed")
            props.fetchSongsByGenre(g);
        }
    }
    const activeStyle=(a)=>{
        const active = "text-white bg-secondary border-[1px] border-secondary";
        const notactive = "text-[#AAA7B8] bg-white border-[1px] border-[#C2C0CC]  hover:bg-[#9849D6] hover:text-[#fff] hover:border-[#9849D6]";
        const mystyle =currentGenre === a ? " "+active:" "+notactive;
        return mystyle;
    }
    return (
        <div className="bg-white p-10 w-full z-50 ">
           {/* TODO: Add Search Bar Component */}
           <div className="flex flex-row items-end justify-between">
           <h1 className="text-transparent text-4xl font-black bg-gradient-to-r from-[#5B23E1] to-[#A22FEB] bg-clip-text p-1">{props.title}</h1>
           <input type="text" name="searchTxt" id="searchTxt" value={searchTxt} onChange={(e) => handleChange(e)} placeholder="Search Song Name" className="bg-white p-1 w-80 outline-none border-[#dee2e6] border-[1px]"/>
           <div className="flex flex-row gap-2">
            {/* TODO: Make Chip into its own Component */}
            <button className={"px-2 py-0.5 rounded-lg font-semibold " + activeStyle("")} onClick={()=>onGenreChange("")}>All Genres</button>
            <button className={"px-2 py-0.5 rounded-lg font-semibold " + activeStyle("Electonic")} onClick={()=>onGenreChange("Electonic")}>Electonic</button>
            <button className={"px-2 py-0.5 rounded-lg font-semibold " + activeStyle("Hip-Hop")} onClick={()=>onGenreChange("Hip-Hop")}>Hip-Hop</button>
            <button className={"px-2 py-0.5 rounded-lg font-semibold " + activeStyle("Other")} onClick={()=>onGenreChange("Other")}>Other</button>
           </div>
            </div>
        </div>
    )
}