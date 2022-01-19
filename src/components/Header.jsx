export const Header = ({title}) => {
    return (
        <div className="bg-white p-10 sticky top-0 right-0 z-50">
           {/* TODO: Add Search Bar Component */}
           <div className="flex flex-row items-end justify-between">
           <h1 className="text-transparent text-4xl font-black bg-gradient-to-r from-[#5B23E1] to-[#A22FEB] bg-clip-text p-1">{title}</h1>
           <div className="flex flex-row gap-2">
            {/* TODO: Make Chip into its own Component */}
            <label className="px-2 py-0.5 rounded-lg flex-shrink text-white bg-secondary border-[1px] border-secondary font-semibold">All Genres</label>
            <label className="px-2 py-0.5 rounded-lg flex-shrink text-[#AAA7B8] bg-white border-[1px] border-[#C2C0CC] font-semibold hover:bg-[#9849D6] hover:text-[#fff] hover:border-[#9849D6] ">Electonic</label>
            <label className="px-2 py-0.5 rounded-lg flex-shrink text-[#AAA7B8] bg-white border-[1px] border-[#C2C0CC] font-semibold hover:bg-[#9849D6] hover:text-[#fff] hover:border-[#9849D6] ">Hip-Hop/Rap</label>
            <label className="px-2 py-0.5 rounded-lg flex-shrink text-[#AAA7B8] bg-white border-[1px] border-[#C2C0CC] font-semibold hover:bg-[#9849D6] hover:text-[#fff] hover:border-[#9849D6] ">Alternative</label>
           </div>
            </div>
        </div>
    )
}