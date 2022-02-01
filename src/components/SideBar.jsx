const Header =() =>{
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

export const SideBar = () => {
    return (
        <div className="w-full h-full bg-[#FCFCFC] ">
            <Header></Header>
            <h3 className="text-[#c2c0cc] font-black text-lg uppercase tracking-wider pl-8">Discover</h3>
            <div className="text-[#6a677a] font-medium text-sm pl-12">Feed</div>
            <div className="text-[#6a677a] font-medium text-sm pl-12">Trending</div>
            <div className="text-[#6a677a] font-medium text-sm pl-12">Explore</div>
        </div>
    )
}
