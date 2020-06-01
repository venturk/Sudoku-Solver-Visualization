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
            boardCells[i].readOnly = (board[r][c] !== 0);
            boardCells[i].style.color = boardCells[i].readOnly === false ? USER_COLOR : DEFAULT_COLOR;
            boardCells[i].value = board[r][c] !== 0 ? board[r][c] : '';
        }
    }

    solve = () => {
        if (!this.isSolving) {
            this.isSolving = true;
            const { board } = this.state;
            const seqArr = solver.solve(board);

            const boardCells = document.getElementsByClassName('table-cell-text');
            setTimeout(() => {
                this.setState({ board: board });
                this.isSolving = false;
            }, solver.solvingAnimation(boardCells, seqArr));
        }
    }

    onSliderChange = (event) => { // TODO implement onSliderChange
        this.numOfElements = event.target.value;
        this.getNewRandomizedBoard();
    }

    onUserInput = (event) => {
        const value = event.target.value % 10;
        if (isNaN(value) || this.isSolving) {
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
