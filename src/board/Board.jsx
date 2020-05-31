import React from 'react';
import './Board.css';

const Board = props => {
    return (
        <table>
            <tbody>
                {
                    props.children.map((row, i) => (
                        <tr key={i}>
                            {
                                row.map((val, j) =>
                                    <td className="table-cell" key={j} value={i * 9 + j}>
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