import React from 'react';
import Board from './board/BoardGuiFromMatrix.jsx'
import Toolbar from './toolbar/Toolbar.jsx';

function App() {
  return (
    <div className="App">
      <Toolbar>
        <button onClick="">Randomize Board</button>
        <button onClick="">Solve</button>
      </Toolbar>
      <Board numOfElements="35">
      </Board>
    </div>
  );
}

export default App;
