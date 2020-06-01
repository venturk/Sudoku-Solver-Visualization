import React from 'react';
import Board from '../board/BoardGuiFromMatrix.jsx'
import Toolbar from '../toolbar/Toolbar.jsx';
import * as solver from '../solvingAlgorithm/SolvingAlgorithm.jsx';
import getRandomizedBoard from '../board/RandomizedBoardMatrix.jsx';

export default class SudokuBoard extends React.Component {
    constructor(props) {
        super(props);
        this.numOfElements = 35;
        this.state = {
            board: [],
        }
    }

    componentDidMount() {
        this.getNewRandomizedBoard();
    }

    getNewRandomizedBoard = () => {
        const board = getRandomizedBoard(this.numOfElements);
        this.setState({ board: board });
    }

    solve = () => {
        const seqArr = [];
        const { board } = this.state;
        console.log(board);
        solver.solve(board, seqArr);
        this.setState({ board: board });
    }

    onSliderChange = (event) => { // TODO implement onSliderChange
        this.numOfElements = event.target.value;
        this.getNewRandomizedBoard();
    }

    render() {
        return (
            <div className="App">
                <Toolbar onSliderChange={this.onSliderChange}>
                    <button onClick={this.getNewRandomizedBoard}>Randomize Board</button>
                    <button onClick={this.solve}>Solve</button>
                </Toolbar>
                <Board>
                    {this.state.board}
                </Board>
            </div>
        );
    }
}
