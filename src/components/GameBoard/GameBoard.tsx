// GameBoard.tsx
// import React from 'react';
// import './src/components/GameBoard/Gameboard.css'
import './GameBoard.css';
import React, { useState } from 'react';
import { Ship, initialShips } from '../../types/gameTypes';

const GameBoard: React.FC = () => {
  // Initialize a 10x10 grid
  const grid = Array(10).fill(Array(10).fill(null));

  const [ships, setShips] = useState<Ship[]>(initialShips);
  return (
    <div className="game-board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((_cell: any, cellIndex: React.Key | null | undefined) => (
            <div key={cellIndex} className="cell"></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
