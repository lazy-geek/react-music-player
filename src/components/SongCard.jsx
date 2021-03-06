import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import playlistIcon from "../assets/playlist.png";
import buyIcon from "../assets/buy.png";

export const SongCard = (props) => {
    const popupcontentStyle = { width: 'max-content' };
    const contentStyle = { width: '150px', max_width: 'max-content' };
    // console.log(new Date(props.song.ReleaseDate));
    const [checkboxes, setCheckboxes] = useState(new Map());
    const [email,setEmail] =  useState("");
    // const [inPlaylists, setInPlaylists] = useState([]);
    // const isInPlayList = (playlist) => {

    //     return playlist.List.includes(props.song);
    // }
    const activeStyle = (active,notActive)=>{
        return props.disableBuy ? " "+active: " "+notActive;
    }
    const toggleCheck = (e) => {
        const playlistId = e.target.name.toString();
        const ischecked = e.target.checked;
        const all = new Map();
        checkboxes.forEach((value, key, map) => {
            if (playlistId === key) {
                all.set(playlistId, ischecked);
                if (ischecked) { props.addSongToPlaylist(playlistId, props.song); }
                else {
                    props.deleteSongFromPlaylist(playlistId, props.song)
                }
            }
            else {
                all.set(key, value);
            }
            // all.set(key,true);
        });
        console.log(`updated playlist: ${playlistId}`);
        setCheckboxes(all);
    }
    const setIntitialCheckbox = () => {
        if (props.playlists == null) return;
        const all = new Map();
        props.playlists.forEach((playlist) => {
            if (playlist.List.find(song=> song.id == props.song.id)) {
                all.set(playlist.id.toString(), true);
            }
            else {
                all.set(playlist.id.toString(), false);
            }
        });
        console.log("end");
        setCheckboxes(all);
        // setInPlaylists(a);
    };
    const buySong=  ()=>{
        // setIsLoading(true);
        props.buySong(props.song.id,email);
        // setIsLoading(false);
    }
    // const getLoadingStyle = ()=>{
    //     return isLoading ? " translate-y-1.5":" ";
    // }
    const handleClick= (artist)=>{
        props.fetchArtistSongs(artist);
    }
    console.log("price: "+props.song.Price);
    const text_style = props.isActive ? 'text-fuchsia-600' : 'text-neutral';
    return (
        <div className="bg-[#fff] py-4 pr-2 rounded-lg flex flex-row shadow-card max-w-3xl h-min scale-100 hover:scale-[1.008] transition-all duration-150 w-full">
            <div className="flex justify-center items-center p-2 text-lg font-bold text-neutral">{props.pos}</div>
            <img className="mr-2 rounded-sm w-[150px]" src={props.song.ArtWorkURl} alt="test" onClick={() => props.handleSongChange(props.song)} />
            <div className="flex flex-col relative w-full">
                <div className="text-neutral absolute top-0 right-1">{props.song.TrackDuration}</div>
                <div className={"text-lg font-bold " + text_style}>{props.song.TrackTitle}</div>
                <div className="flex flex-row items-center">
                    {/* <span className={"mr-1 " + text_style}>{props.song.artist}</span> */}
                    <span className={"mr-1 cursor-pointer " + text_style} onClick={()=> handleClick(props.song.ArtistName)}>{props.song.ArtistName}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM16.3999 6.455C16.6046 6.19429 16.898 6.03083 17.2145 6.00425C17.5296 5.97634 17.8433 6.08677 18.0835 6.30906C18.325 6.53148 18.4736 6.84946 18.4968 7.18955C18.52 7.5312 18.4163 7.86839 18.2077 8.12754L10.7218 17.5509C10.4995 17.8306 10.1776 17.9941 9.83652 18H9.81872C9.48448 18 9.16534 17.8484 8.94012 17.5819L5.31256 13.2987C4.86783 12.7746 4.90197 11.9618 5.38767 11.4818C5.87325 11.0032 6.62637 11.04 7.06976 11.5642L9.79007 14.7755L16.3999 6.455Z" fill="#CC0FE0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.2145 6.00425C16.898 6.03083 16.6046 6.19429 16.3999 6.455L9.79007 14.7755L7.06976 11.5642C6.62637 11.04 5.87325 11.0032 5.38767 11.4818C4.90197 11.9618 4.86783 12.7746 5.31256 13.2987L8.94012 17.5819C9.16534 17.8484 9.48448 18 9.81872 18H9.83652C10.1776 17.9941 10.4995 17.8306 10.7218 17.5509L18.2077 8.12754C18.4163 7.86839 18.52 7.5312 18.4968 7.18955C18.4736 6.84946 18.325 6.53148 18.0835 6.30906C17.8433 6.08677 17.5296 5.97634 17.2145 6.00425Z" fill="#ffffff"></path></svg>
                </div>

                <div className="self-end mt-auto items-baseline">
                    <Popup onOpen={setIntitialCheckbox} trigger={<button className="mr-4 inline uppercase  bg-fuchsia-500 text-base font-bold p-1 text-white  rounded-sm scale-100 hover:scale-105 transition-all duration-150" onClick={() => props.buySong(props.song.id)}><img className="w-6 inline" src={playlistIcon} alt="playlist icon"></img></button>} position="bottom center" contentStyle={contentStyle}>
                        {props.playlists != null && props.playlists.map(playlist => {
                            return <li key={playlist.id} className="list-none">
                                <label className="uppercase" htmlFor={playlist.id}><Checkbox checked={checkboxes.get(playlist.id.toString())} name={playlist.id} onChange={(e) => toggleCheck(e)} /> {playlist.ListTitle} </label>
                                {/* <label htmlFor={playlist.id}><Checkbox checked name={playlist.id}/> {playlist.ListTitle} </label> */}
                            </li>
                        })}


                    </Popup>

                    {/* <button className={"w-40 uppercase text-base font-bold py-1 text-white  rounded-sm scale-100 transition-all duration-150"  + activeStyle("bg-gray-300","bg-fuchsia-500 hover:scale-105") + getLoadingStyle()} disabled={props.disableBuy} onClick={buySong}><TailSpin ariaLabel="loading-indicator"color="white" radius="1" width="35" height="25" visible={isLoading} wrapperClass="justify-center" /> {isLoading.toString()}</button> */}
                    <Popup trigger={
                    <button className={"w-40 inline uppercase text-base font-bold py-1 text-white  rounded-sm scale-100 transition-all duration-150"  + activeStyle("bg-gray-300","bg-fuchsia-500 hover:scale-105")} disabled={props.disableBuy}><img className="w-6 inline" src={buyIcon} alt="buy icon"></img> {props.song.Price.toString() + " Eth  "}</button>

                    } position="bottom center" contentStyle={popupcontentStyle}>
                        <div className="flex flex-col">

                            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="bg-white p-2 mb-2  outline-none border-[#dee2e6] border-[1px]" />
                            <button className="self-center  w-full uppercase  bg-fuchsia-500 text-base font-bold py-1 text-white  rounded-sm scale-100 hover:scale-105 transition-all duration-150" onClick={() => {buySong}}>Buy</button>
                        </div>


                    </Popup>
                </div>

            </div>
        </div>
    )
}

