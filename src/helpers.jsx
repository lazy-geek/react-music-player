export const getTime = (time) => {
    if (!time) return '00:00';
    let minute = Math.floor(time / 60);
    if (minute < 10){
        minute = '0' + minute;
    }
    let second = ("0" + Math.floor(time % 60)).slice(-2);
    return `${minute}:${second}`;
};

