import React from 'react';
import Board from '../board/BoardGuiFromMatrix.jsx'
import Toolbar from '../toolbar/Toolbar.jsx';
import * as solver from '../solvingAlgorithm/SolvingAlgorithm.jsx';
import getRandomizedBoard from '../board/RandomizedBoardMatrix.jsx';

const NUM_OF_ELEMENTS = 35;

export default class SudokuBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            board: [],
        }
    }

    componentDidMount() {
        this.getNewRandomizedBoard();
    }

    getNewRandomizedBoard = () => {
        const board = getRandomizedBoard(NUM_OF_ELEMENTS);
        this.setState({ board: board });
    }

    solve = () => {
        const seqArr = [];
        const { board } = this.state;
        console.log(board);
        solver.solve(board, seqArr);
        this.setState({ board: board });
    }

    render() {
        return (
            <div className="App">
                <Toolbar>
                    <button onClick={this.getNewRandomizedBoard}>Randomize Board</button>
                    <button onClick={this.solve}>Solve</button>
                </Toolbar>
                <Board numOfElements={NUM_OF_ELEMENTS}>
                    {this.state.board}
                </Board>
            </div>
        );
    }
}
