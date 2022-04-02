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

export const SideBar = ({ art }) => {

    return (
        <div className="w-full h-full bg-[#FCFCFC] ">
            <Header></Header>

            <div className="h-[320px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scroll-smooth">

                <UserCard />

                <div className="mb-4">
                    <h3 className="text-[#c2c0cc] font-black text-lg uppercase tracking-wider pl-8">Discover</h3>
                    <div className="text-[#6a677a] font-medium text-sm pl-12">Feed</div>
                    <div className="text-[#6a677a] font-medium text-sm pl-12">Trending</div>
                    <div className="text-[#6a677a] font-medium text-sm pl-12">Explore</div>
                </div>

                <div className="mb-4">
                    <h3 className="text-[#c2c0cc] font-black text-lg uppercase tracking-wider pl-8">Library</h3>
                    <div className="text-[#6a677a] font-medium text-sm pl-12">Favorites</div>
                    <div className="text-[#6a677a] font-medium text-sm pl-12">History</div>
                    <div className="text-[#6a677a] font-medium text-sm pl-12">Explore</div>
                </div>

                <div className="mb-4">
                    <h3 className="text-[#c2c0cc] font-black text-lg uppercase tracking-wider pl-8">Playlists</h3>
                </div>

            </div>

            <div className="flex flex-col border-t-[1px] border-[#e9eaed] items-center">
                <button className="uppercase my-4 bg-fuchsia-500 text-base font-bold py-1 px-10 text-white  rounded-sm scale-100 hover:scale-110 transition-all duration-150">Sign Up</button>
                <div className=" bg-custom-grey border-white rounded-xl border-4 w-52 h-52 overflow-hidden">
                    {art &&

                        <img src={art} alt="song art" />
                    }
                </div>
            </div>
        </div>
    )
}
