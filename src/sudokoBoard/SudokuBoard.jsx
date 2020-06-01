import React from 'react';
import Board from '../board/BoardGuiFromMatrix.jsx'
import Toolbar from '../toolbar/Toolbar.jsx';
import * as solver from '../solvingAlgorithm/SolvingAlgorithm.jsx';
import getRandomizedBoard from '../board/RandomizedBoardMatrix.jsx';

const USER_COLOR = "lightblue";
const DEFAULT_COLOR = "black";

export default class SudokuBoard extends React.Component {
    constructor(props) {
        super(props);
        this.numOfElements = 35;
        this.isSolving = false;

        this.state = {
            board: [],
        }
    }

    componentDidMount() {
        this.getNewRandomizedBoard();
    }

    getNewRandomizedBoard = () => {
        if (!this.isSolving) {
            this.setState({
                board: getRandomizedBoard(this.numOfElements)
            }, () => { this.fixInitialValues(); })
        }
    }

    fixInitialValues() {
        const boardCells = document.getElementsByClassName('table-cell-text');
        const { board } = this.state;

        for (let i = 0; i < boardCells.length; ++i) {
            const r = Math.floor(i / 9), c = i % 9;

            boardCells[i].style.color = board[r][c] === 0 ? USER_COLOR : DEFAULT_COLOR;
            boardCells[i].readOnly = (board[r][c] !== 0);
        }
    }

    solve = () => {
        if (!this.isSolving) {
            this.isSolving = true;
            const { board } = this.state;
            const seqArr = solver.getSolvingSequence(board);

            setTimeout(() => {
                this.setState({
                    board: board
                })

                const boardCells = document.getElementsByClassName('table-cell-text');
                const isSolved = solver.isSolved(board);

                for (let i = 0; i < boardCells.length; ++i) {
                    if(isSolved) {
                        boardCells[i].style.color = DEFAULT_COLOR;
                    } else {
                        if (boardCells[i].value === '') {
                            boardCells[i].style.color = USER_COLOR;
                        }
                        boardCells[i].readOnly = !(boardCells[i].style.color === USER_COLOR);
                    }
                }

                this.isSolving = false;
            }, solver.solvingAnimation(seqArr));
        }
    }

    onSliderChange = (event) => {
        this.numOfElements = event.target.value;
        this.getNewRandomizedBoard();
    }

    onUserInput = (event) => {
        const value = event.target.value % 10;
        if (isNaN(value)) {
            return;
        }

        const { board } = this.state;
        const index = event.target.className.split(' ')[1];
        const r = Math.floor(index / 9), c = index % 9;

        if (board[r][c] !== value) {
            board[r][c] = solver.possible(board, r, c, value) ? value : board[r][c];
        }
        this.setState({ board: board });
    }

    render() {
        return (
            <div className="App">
                <Toolbar onSliderChange={this.onSliderChange}>
                    <button onClick={this.getNewRandomizedBoard}>Randomize Board</button>
                    <button onClick={this.solve}>Solve</button>
                </Toolbar>
                <Board onUserInput={this.onUserInput}>
                    {this.state.board}
                </Board>
            </div>
        );
    }
}
