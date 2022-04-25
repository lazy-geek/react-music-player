import React from 'react';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Header = () => {
    return (
        <div className="bg-white h-14">

        </div>
    )
}
const UserCard = () => {
    return (
        <div className="flex flex-row pl-8 my-4">
            <div className="bg-fuchsia-500 h-10 w-10 rounded-full mr-4"></div>
            <div className="flex flex-col">
                <span className="text-sm font-semibold">Have an Account?</span>
                <span className="text-xs text-[#7e1bcc]">Sign In</span>
            </div>
        </div>
    )
}

export const SideBar = (props) => {
    const contentStyle = { width: 'max-content' };
    const [playlistName, setPlaylistName] = useState("");

    // if(props.playlists) console.log("in sidebar:"+props.playlists[0]['id']);
    const activeStyle=(a,active,notactive)=>{
        const mystyle =props.activeTile === a ? " "+active:" "+notactive;
        // console.log(mystyle);
        return mystyle;
    }
    return (
        <div className="w-full h-full bg-[#FCFCFC] ">
            <Header></Header>

            <div className="h-[320px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scroll-smooth">

                <UserCard />

                <div className="mb-4">
                    <h3 className="text-[#c2c0cc] font-black text-lg uppercase tracking-wider pl-8">Discover</h3>
                    <div className={" font-medium text-sm pl-12 cursor-pointer" + activeStyle("Newly Released","text-secondary","text-[#6a677a]")} onClick={()=>props.fetchSongs()}>Newly Released</div>
                    <div className={" font-medium text-sm pl-12 cursor-pointer" + activeStyle("Trending","text-secondary","text-[#6a677a]")}>Trending</div>
                    <div className={" font-medium text-sm pl-12 cursor-pointer" + activeStyle("Explore","text-secondary","text-[#6a677a]")}>Explore</div>
                </div>

                <div className="mb-4">
                    <h3 className="text-[#c2c0cc] font-black text-lg uppercase tracking-wider pl-8">Library</h3>
                    <div className={"font-medium text-sm pl-12 cursor-pointer" + activeStyle("Bought","text-secondary","text-[#6a677a]")} onClick={()=>props.fetchBoughtSongs()}>Bought</div>
                    <div className={"font-medium text-sm pl-12 cursor-pointer" + activeStyle("History","text-secondary","text-[#6a677a]")} >History</div>
                    <div className={"font-medium text-sm pl-12 cursor-pointer" + activeStyle("Explore2","text-secondary","text-[#6a677a]")}>Explore2</div>
                </div>

                <div className="flex mb-4 flex-row pl-8 pr-10 items-baseline justify-between">
                    <h3 className="text-[#c2c0cc] font-black text-lg uppercase tracking-wider ">Playlists</h3>
                    <Popup trigger={<button className="text-2xl text-[#c2c0cc] ">+</button>} position="bottom center" contentStyle={contentStyle}>
                        <div className="flex flex-col">

                            <input type="text" name="playlistName" id="playlistName" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} placeholder="Playlist Name" className="bg-white p-2 mb-2  outline-none border-[#dee2e6] border-[1px]" />
                            <button className="self-center  w-full uppercase  bg-fuchsia-500 text-base font-bold py-1 text-white  rounded-sm scale-100 hover:scale-105 transition-all duration-150" onClick={() => {props.addPlaylist(playlistName)}}>Add</button>
                        </div>


                    </Popup>

                </div>
                <div className="flex flex-col pl-8 pr-10">
                    {props.playlists!=null && props.playlists.map(playlist => {
                        return <li key={playlist.id} className="list-none">
                            <button className={" mb-2 text-base uppercase tracking-wider" + activeStyle(playlist.id,"text-secondary","text-black")} onClick={()=>{
                                props.setActiveTile(playlist.id);
                                props.setSongList(playlist.List)}}>
                            {playlist.ListTitle} 

                            </button>
                        </li>
                    })}
                </div>

            </div>

            <div className="flex flex-col border-t-[1px] border-[#e9eaed] items-center">
                <button className="uppercase my-4 bg-fuchsia-500 text-base font-bold py-1 px-10 text-white  rounded-sm scale-100 hover:scale-110 transition-all duration-150" onClick={props.connectWalletHandler}>{props.connButtonText}</button>
                <div className=" bg-custom-grey border-white rounded-xl border-4 w-52 h-52 overflow-hidden">
                    {props.art &&

                        <img src={props.art} alt="song art" />
                    }
                </div>
            </div>
        </div>
    )
}
