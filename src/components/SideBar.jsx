const Header =() =>{
    return (
        <div className="bg-white h-14">

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
