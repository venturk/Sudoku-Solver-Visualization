export function solve(board, seqArr) {
    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            if (board[i][j] === 0) {
                for (let v = 1; v <= 9; ++v) {
                    if (possible(board, i, j, v)) {
                        board[i][j] = v;
                        seqArr.push([i, j, v]); // sequence

                        if (solve(board, seqArr)) {
                            return true;
                        }

                        board[i][j] = 0;
                        seqArr.push([i, j, 0]); // sequence
                    }
                }

                return false;
            }
        }
    }

    return true;
}

export function possible(board, r, c, val) {
    if (val === 0) {
        return true;
    }

    // Check if value is in same row or column
    for (let i = 0; i < 9; ++i) {
        if (board[r][i] === val) {
            return false;
        }

        if (board[i][c] === val) {
            return false;
        }

        // Check if value is in same square
        let startR = Math.floor(r / 3) * 3;
        for (let r2 = startR; r2 < startR + 3; ++r2) {
            let startC = Math.floor(c / 3) * 3;
            for (let c2 = startC; c2 < startC + 3; ++c2) {
                if ((c2 !== c || r2 !== r) && board[r2][c2] === val) {
                    return false;
                }
            }
        }
    }

    return true;
}

export function checkIfSolved(board) {
    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            // If there's an empty cell --> board is NOT solved
            if (board[i][j] === 0) {
                return false;
            }
        }
    }
    
    return true;
}