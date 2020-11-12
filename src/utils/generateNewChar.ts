const generateNewChar = (charName: string) => {
    return {
        "name": charName,
        "energy": 100,
        "knowledge": 100,
        "popularity": 100,
        "level": 1
    }
}

export default generateNewChar;
