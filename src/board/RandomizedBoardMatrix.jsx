function getDefaultBoardCopy() {
    return [
        [8, 2, 7, 1, 5, 4, 3, 9, 6],
        [9, 6, 5, 3, 2, 7, 1, 4, 8],
        [3, 4, 1, 6, 8, 9, 7, 5, 2],
        [5, 9, 3, 4, 6, 8, 2, 7, 1],
        [4, 7, 2, 5, 1, 3, 6, 8, 9],
        [6, 1, 8, 9, 7, 2, 4, 3, 5],
        [7, 8, 6, 2, 3, 5, 9, 1, 4],
        [1, 5, 4, 7, 9, 6, 8, 2, 3],
        [2, 3, 9, 8, 4, 1, 5, 6, 7]
    ];
}

function popRndElementsFromBoard(numOfElements) { // Change function name
    const rndIdxArr = []; // Random index array
    const board = getDefaultBoardCopy();

    for (let i = 0; i < 81; ++i) { // Init index array with 0 - 80 index values
        rndIdxArr.push(i);
    }

    let currIdx = rndIdxArr.length;
    let temp, rndIdx;

    // While there remain elements to shuffle...
    while (0 !== currIdx) {

        // Pick a remaining element...
        rndIdx = Math.floor(Math.random() * currIdx);

        // Swap it with current element.
        temp = rndIdxArr[--currIdx];
        rndIdxArr[currIdx] = rndIdxArr[rndIdx];
        rndIdxArr[rndIdx] = temp;
    }

    // Pop elements
    for (let i = 0; i < rndIdxArr.length - numOfElements; ++i) {
        let r = Math.floor(rndIdxArr[i] / 9);
        let c = rndIdxArr[i] % 9;
        board[r][c] = 0;
    }

    return board;
}

function getRandomizedBoard(numOfElements) {
    const board = popRndElementsFromBoard(numOfElements);

    for (let i = 0; i < 9; i += 3) {
        // Swapping rows
        let k = randomNumberInRange(i, i + 2);
        if (k !== i) {
            const temp = board[i];
            board[i] = board[k];
            board[k] = temp;
        }

        // Swapping columns
        k = randomNumberInRange(i, i + 2);
        if (k !== i) {
            for (let j = 0; j < 9; ++j) {
                const temp = board[j][i];
                board[j][i] = board[j][k];
                board[j][k] = temp;
            }
        }
    }

    // Swaping rows of boxes
    const k = 3 * randomNumberInRange(0, 2);
    if (k !== 0) {
        for (let i = 0; i < 3; ++i) {
            const temp = board[i];
            board[i] = board[k + i];
            board[k + i] = temp;
        }
    }

    return board;
}

function randomNumberInRange(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

export default getRandomizedBoard;