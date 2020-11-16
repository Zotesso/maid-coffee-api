const checkForLevelUp = (knowledge: number, popularity: number, actualLevel: number):number => {
    if(((popularity * 5 + knowledge * 2) / 2) >= actualLevel * 1000){
        return 1;
    }
    return 0;
}

export default checkForLevelUp;
