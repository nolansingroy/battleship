// GameBoard.tsx
import './GameBoard.css';
import React, { useState, useEffect } from 'react';
import { Ship, initialShips } from '../../types/gameTypes';
import ShipComponent from '../ShipComponent/ShipComponent';
import hitMissile from '../../assets/audio/explosion.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';

const initialGridValue = Array(10)
  .fill(null)
  .map(() => Array(10).fill('empty'));

const GameBoard: React.FC = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [isPlayersTurn, setIsPlayersTurn] = useState(true);

  const [grid, setGrid] = useState(initialGridValue); //playerGrid
  const [computerGrid, setComputerGrid] = useState(initialGridValue); //computerGrid

  const [gamePhase, setGamePhase] = useState('setup'); // 'setup', 'playing', 'gameOver'
  const initialAttackGridValue = Array(10)
    .fill(null)
    .map(() => Array(10).fill('empty'));
  const [attackGrid, setAttackGrid] = useState(initialAttackGridValue);

  const [computerAttackGrid, setComputerAttackGrid] =
    useState(initialGridValue);

  const [ships, setShips] = useState<Ship[]>(initialShips);
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(
    'horizontal'
  );

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    console.log('use effect called');
    if (gamePhase === 'gameOver' && !areAllShipsSunk(grid)) {
      triggerConfetti();
    }
  }, [gamePhase, grid]);

  const playHitSound = () => {
    console.log('Hit Missile sound playing now!');
    const audio = new Audio(hitMissile);
    audio.play();
  };

  const playMissSound = () => {
    // todo: find missed sound audio file
    console.log('Missed Missle sound playing now!');
    // missSound.play();
  };

  const playerScores = () => {
    if (playerScore < 15) {
      setPlayerScore((prevScore) => prevScore + 1);
      playHitSound();
      console.log('player scores');
    } else {
      setGamePhase('gameOver');
      triggerConfetti(); // confetti animation
    }
  };

  const computerScores = () => {
    if (computerScore < 15) {
      setComputerScore((prevScore) => prevScore + 1);
      playHitSound();
      console.log('computer scores');
    }
  };

  const startGame = () => {
    placeComputerShips();
    setGamePhase('playing');
    console.log('start game called');
  };

  const areAllShipsSunk = (grid: any[]) => {
    // Log the entire grid for debugging
    console.log('Grid:', grid);

    // Count the number of 'hit' cells
    let hitCount = 0;
    grid.forEach((row) => {
      row.forEach((cell: string) => {
        if (cell === 'hit') {
          hitCount++;
        }
      });
    });

    console.log('Hit count:', hitCount);

    // Check if the number of 'hit' cells equals the total number of ship tiles
    const totalShipTiles = 15; // Total number of ship tiles
    return hitCount === totalShipTiles;
  };

  const handleComputerAttack = () => {
    let attacked = false;
    while (!attacked) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);

      // Ensure the computer doesn't attack the same cell twice
      if (
        computerAttackGrid[row][col] === 'empty' ||
        computerAttackGrid[row][col] === 'ship'
      ) {
        const result = grid[row][col] === 'ship' ? 'hit' : 'miss';
        const newComputerAttackGrid = computerAttackGrid.map((r) => [...r]);
        newComputerAttackGrid[row][col] = result;
        console.log(`result new computer grid: ${result}`);
        setComputerAttackGrid(newComputerAttackGrid);

        // Increment computer score if it's a hit
        if (result === 'hit') {
          computerScores();
        } else if (result === 'miss') {
          // playMissSound();
          console.log('playing missed missle sound');
        }

        attacked = true;
        console.log(`Computer attacked: Row ${row + 1}, Column ${col + 1}`);
      }
    }

    // After updating the grid, check if all player ships are sunk
    if (areAllShipsSunk(computerAttackGrid)) {
      setGamePhase('gameOver');
      console.log('set GameOver - computer won');
    } else {
      setIsPlayersTurn(true);
    }
  };

  const handlePlayerAttack = (row: number, col: number) => {
    if (!isPlayersTurn || attackGrid[row][col] !== 'empty') {
      return; // Ignore if it's not the player's turn or if the cell is already attacked
    }

    // Check if the cell on the attackGrid has already been attacked
    if (attackGrid[row][col] !== 'empty') {
      return; // Ignore if the cell has already been attacked
    }

    const newAttackGrid = attackGrid.map((r) => [...r]);

    // Check the computer's grid to see if there's a ship at the specified coordinates
    if (computerGrid[row][col] === 'ship') {
      newAttackGrid[row][col] = 'hit'; // Mark as hit on the attack grid
      console.log('missile hit a ship!');
      playerScores(); // update player scores function
    } else {
      newAttackGrid[row][col] = 'miss'; // Mark as miss on the attack grid
      console.log('missile missed!');
      playMissSound();
    }

    setAttackGrid(newAttackGrid); // Update the attack grid state
    // After updating the attack grid, check if all computer ships are sunk
    if (areAllShipsSunk(newAttackGrid)) {
      setGamePhase('gameOver');
      console.log('gameover - you won');
      //update a variable
    } else {
      setIsPlayersTurn(false);
      setTimeout(handleComputerAttack, 500);
    }
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    ship: Ship
  ) => {
    // Logic to handle the start of a drag
    setSelectedShip(ship);
    console.log('Dragging ship: ', ship);
  };

  const toggleOrientation = () => {
    const newOrientation =
      orientation === 'horizontal' ? 'vertical' : 'horizontal';
    setOrientation(newOrientation);
    console.log('New Orientation: ', newOrientation);
  };

  interface Tile {
    row: number;
    col: number;
  }

  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);

  const handleDrop = (rowIndex: number, colIndex: number) => {
    if (!selectedShip) return;

    const newGrid = [...grid]; // Create a copy of the current grid
    let canPlaceShip = true; // Flag to check if the ship can be placed
    let shipCoordinates = []; // Array to store ship's coordinates

    for (let i = 0; i < selectedShip.length; i++) {
      const newRow = orientation === 'horizontal' ? rowIndex : rowIndex + i;
      const newCol = orientation === 'horizontal' ? colIndex + i : colIndex;

      if (newRow >= 10 || newCol >= 10 || newGrid[newRow][newCol] === 'ship') {
        canPlaceShip = false;
        break;
      }

      shipCoordinates.push({ row: newRow, col: newCol });
    }

    if (canPlaceShip) {
      shipCoordinates.forEach((coord) => {
        newGrid[coord.row][coord.col] = 'ship';
      });

      setGrid(newGrid);
      setShips(
        ships.map((ship) =>
          ship.id === selectedShip.id ? { ...ship, placed: true } : ship
        )
      );
      setSelectedTiles(shipCoordinates); // Update the selected tiles state
      setSelectedShip(null); // Optionally clear the selected ship
    }
  };

  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  // Computer Logic //

  const placeComputerShips = () => {
    const newComputerGrid = Array(10)
      .fill(null)
      .map(() => Array(10).fill('empty'));
    const shipSizes = [5, 4, 3, 3]; // Assuming you have 4 ships with these sizes

    shipSizes.forEach((size) => {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const horizontal = Math.random() > 0.5;

        if (canPlaceShip(newComputerGrid, row, col, size, horizontal)) {
          placeShip(newComputerGrid, row, col, size, horizontal);
          placed = true;
        }
      }
    });

    setComputerGrid(newComputerGrid);
  };

  // define the type for the ship
  type GridCell = 'empty' | 'ship'; // Add other states as needed
  type Grid = GridCell[][];

  const canPlaceShip = (
    grid: Grid,
    row: number,
    col: number,
    size: number,
    horizontal: boolean
  ): boolean => {
    for (let i = 0; i < size; i++) {
      const r = row + (horizontal ? 0 : i);
      const c = col + (horizontal ? i : 0);

      if (r >= 10 || c >= 10 || grid[r][c] !== 'empty') {
        return false;
      }
    }
    return true;
  };

  const placeShip = (
    grid: Grid,
    row: number,
    col: number,
    size: number,
    horizontal: boolean
  ): void => {
    for (let i = 0; i < size; i++) {
      const r = row + (horizontal ? 0 : i);
      const c = col + (horizontal ? i : 0);
      grid[r][c] = 'ship';
    }
  };

  return (
    <div className="window">
      {/* <h1 className="title">Battleship</h1> */}
      <div className="rules">
        <p>
          Rules: Deploy your fleet of ships on your board and start the game.
          Then the enemy will deploy their fleet of ships. Fire in the adverse
          grid and try to sink the enemy's fleet. The player who destroys the
          totality of their opponent's fleet wins the game.
          <br></br>
          <li>
            {' '}
            <FontAwesomeIcon
              icon={faSquare}
              beatFade
              style={{ color: '#ced2da' }}
            />{' '}
            Grey: You missed!
          </li>
          <li>
            <FontAwesomeIcon
              icon={faSquare}
              beatFade
              style={{ color: '#ff0000' }}
            />
            <span> </span>
            Red: It's a hit!
          </li>
          <hr></hr>
        </p>
      </div>

      <h1>Ship Inventory</h1>

      <div className="ship-selector">
        {ships.map((ship) => (
          <ShipComponent
            key={ship.id}
            ship={ship}
            onDragStart={handleDragStart}
          />
        ))}
        <button className="toggleOrientationButton" onClick={toggleOrientation}>
          Orientation: {orientation}
        </button>
      </div>

      <div className="game-board">
        <h1>Strategy Panel</h1>
        <div className="grid-row">
          <div className="grid-cell header-cell"></div>
          {columns.map((col, index) => (
            <div key={index} className="grid-cell header-cell">
              {col}
            </div>
          ))}
        </div>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {/* Row number */}
            <div className="grid-cell header-cell">{rowIndex + 1}</div>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${
                  cell === 'ship'
                    ? 'ship'
                    : cell === 'hit'
                      ? 'hit'
                      : cell === 'miss'
                        ? 'miss'
                        : ''
                }`}
                onDrop={() => handleDrop(rowIndex, colIndex)}
                onDragOver={(e) => e.preventDefault()} // Allow drop
              />
            ))}
          </div>
        ))}
      </div>

      {gamePhase === 'setup' && (
        <button className="startGameBtn" onClick={startGame}>
          Start Game
        </button>
      )}

      {gamePhase === 'gameOver' && (
        <div className="game-over-container">
          <p className="game-message">
            {areAllShipsSunk(grid)
              ? 'Game Over: You Lose!'
              : 'Game Over: You Win!'}
          </p>
          <button
            className="playAgainBtn"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </div>
      )}

      {gamePhase === 'playing' && (
        <>
          <h1>{isPlayersTurn ? 'Your Turn' : "Computer's Turn"}</h1>

          <div className="grids-container">
            <div className="attack-container">
              <h1>Enemy Fleet</h1>
              <div className="grid-row">
                <div className="grid-cell header-cell"></div>
                {columns.map((col, index) => (
                  <div key={index} className="grid-cell header-cell">
                    {col}
                  </div>
                ))}
              </div>
              <div className="attack-grid">
                {attackGrid.map((row, rowIndex) => (
                  <div key={rowIndex} className="row">
                    {/* Row number */}
                    <div className="grid-cell header-cell">{rowIndex + 1}</div>
                    {row.map((cell, colIndex) => (
                      <div
                        key={colIndex}
                        className={`cell ${
                          cell === 'hit' ? 'hit' : cell === 'miss' ? 'miss' : ''
                        }`}
                        onClick={() => handlePlayerAttack(rowIndex, colIndex)}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="scoreboard">
                <p>Player Score: {playerScore}</p>
              </div>
            </div>
            <h1>VS</h1>

            <div className="computer-attack-container">
              <h1>Your Fleet</h1>
              <div className="grid-row">
                <div className="grid-cell header-cell"></div>
                {columns.map((col, index) => (
                  <div key={index} className="grid-cell header-cell">
                    {col}
                  </div>
                ))}
              </div>
              <div className="computer-attack-grid">
                {computerAttackGrid.map((row, rowIndex) => (
                  <div key={rowIndex} className="row">
                    {/* Row number */}
                    <div className="grid-cell header-cell">{rowIndex + 1}</div>
                    {row.map((cell, colIndex) => (
                      <div
                        key={colIndex}
                        className={`cell ${
                          cell === 'hit' ? 'hit' : cell === 'miss' ? 'miss' : ''
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="scoreboard">
                <p>Computer Score: {computerScore}</p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="computers-board">
        <h1>Enemy Fleet</h1>
        {/* Grid for debugging purposes */}
        <button className="positionComputerButton" onClick={placeComputerShips}>
          Position Computer's Ships
        </button>
        <div className="grid-row">
          <div className="grid-cell header-cell"></div>
          {columns.map((col, index) => (
            <div key={index} className="grid-cell header-cell">
              {col}
            </div>
          ))}
        </div>
        <div className="computer-grid">
          {computerGrid.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {/* Row number */}
              <div className="grid-cell header-cell">{rowIndex + 1}</div>
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`cell ${cell}`}
                  onClick={() => handlePlayerAttack(rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;


////// --- Exporting Functions for Jest Testing --- /////


export const areAllShipsSunk = (grid: any[]) => {
  // Log the entire grid for debugging
  console.log('Grid:', grid);

  // Count the number of 'hit' cells
  let hitCount = 0;
  grid.forEach((row) => {
    row.forEach((cell: string) => {
      if (cell === 'hit') {
        hitCount++;
      }
    });
  });

  console.log('Hit count:', hitCount);

  // Check if the number of 'hit' cells equals the total number of ship tiles
  const totalShipTiles = 15; // Total number of ship tiles
  return hitCount === totalShipTiles;
};


export const playerScores = (playerScore: number, setPlayerScore: (arg0: (prevScore: number) => number) => void, setGamePhase: (arg0: string) => void, playHitSound: () => void, triggerConfetti: () => void) => {
  if (playerScore < 15) {
    setPlayerScore((prevScore: number) => prevScore + 1);
    playHitSound();
    // console.log('player scores'); // Commented out as logs are not usually tested
  } else {
    setGamePhase('gameOver');
    triggerConfetti();
  }
};