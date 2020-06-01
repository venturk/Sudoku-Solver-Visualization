import React from 'react';
import './Toolbar.css';

const MIN_NUM_OF_ELEMENTS = "30";
const MAX_NUM_OF_ELEMENTS = "81";

const Toolbar = props => {
    return (
            <header className="toolbar">
                <nav className="toolbar__navigation">
                    <div></div>
                    <div className="toolbar__logo">
                        Sudoku Solver Visualization
                </div>

                    <div className="spacer"></div>

                    <div className="num-of-elements">{MIN_NUM_OF_ELEMENTS}</div>
                    <input className="slider" type="range" min={MIN_NUM_OF_ELEMENTS} max={MAX_NUM_OF_ELEMENTS} onChange={props.onSliderChange}></input>
                    <div className="num-of-elements">{MAX_NUM_OF_ELEMENTS}</div>

                    <div className="spacer"></div>

                    <div className="toolbar_navigation-items">
                        <ul>
                            {
                                props.children.map((child, i) => (
                                    <li key={i}>{child}</li>
                                ))
                            }
                        </ul>
                    </div>
                </nav>
            </header>
    );
}

export default Toolbar;