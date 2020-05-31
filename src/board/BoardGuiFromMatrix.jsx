import React from 'react';
import './BoardStyle.css';

const emptyBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

const Board = props => {
    const board = props.children !== undefined ? props.children : emptyBoard;

    return (
        <table>
            <tbody>
                {
                    board.map((row, i) => (
                        <tr key={i}>
                            {
                                row.map((val, j) =>
                                    <td className=
                                        {
                                            `${(i * 9 + j) % 9 === 3 || (i * 9 + j) % 9 === 6 || (i * 9 + j) % 9 === 0 ? "td-left-border" :
                                                (i * 9 + j) % 9 === 8 ? "td-right-border" : ""} 
                                            ${(i * 9 + j) % 27 >= 0 && (i * 9 + j) % 27 <= 8 ? "td-top-border" :
                                                (i * 9 + j) % 27 >= 18 && (i * 9 + j) % 27 <= 26 ? "td-bottom-border" : ""}
                                            `
                                        }
                                        key={j} value={i * 9 + j}>
                                        <input className={`table-cell-text ${i * 9 + j}`} type="text" value={val === 0 ? '' : val} onChange={props.onChange} />
                                    </td>
                                )
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default Board;