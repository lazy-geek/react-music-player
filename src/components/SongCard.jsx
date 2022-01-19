export const SongCard = ({cover,songName,songDuration,artist,pos}) => {
    return (
        <div className="bg-[#fff] py-4 pr-2 rounded-lg flex flex-row shadow-card max-w-3xl h-min scale-100 hover:scale-[1.008] transition-all duration-150 w-full">
            <div className="flex justify-center items-center p-2 text-lg font-bold text-neutral">{pos}</div>
            <img className="mr-2 rounded-sm" src={cover} alt="test"/>
            <div className="flex flex-col relative w-full">
                <div className="text-neutral absolute top-0 right-1">{songDuration}</div>
                <div className="text-lg font-bold text-neutral">{songName}</div>
                <div className="flex flex-row items-center">
                    <span className="mr-1  text-neutral">{artist}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM16.3999 6.455C16.6046 6.19429 16.898 6.03083 17.2145 6.00425C17.5296 5.97634 17.8433 6.08677 18.0835 6.30906C18.325 6.53148 18.4736 6.84946 18.4968 7.18955C18.52 7.5312 18.4163 7.86839 18.2077 8.12754L10.7218 17.5509C10.4995 17.8306 10.1776 17.9941 9.83652 18H9.81872C9.48448 18 9.16534 17.8484 8.94012 17.5819L5.31256 13.2987C4.86783 12.7746 4.90197 11.9618 5.38767 11.4818C5.87325 11.0032 6.62637 11.04 7.06976 11.5642L9.79007 14.7755L16.3999 6.455Z" fill="#CC0FE0"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.2145 6.00425C16.898 6.03083 16.6046 6.19429 16.3999 6.455L9.79007 14.7755L7.06976 11.5642C6.62637 11.04 5.87325 11.0032 5.38767 11.4818C4.90197 11.9618 4.86783 12.7746 5.31256 13.2987L8.94012 17.5819C9.16534 17.8484 9.48448 18 9.81872 18H9.83652C10.1776 17.9941 10.4995 17.8306 10.7218 17.5509L18.2077 8.12754C18.4163 7.86839 18.52 7.5312 18.4968 7.18955C18.4736 6.84946 18.325 6.53148 18.0835 6.30906C17.8433 6.08677 17.5296 5.97634 17.2145 6.00425Z" fill="#ffffff"></path></svg></div>
            </div>
        </div>
    )
}