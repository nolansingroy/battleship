import { areAllShipsSunk } from '../GameBoard/GameBoard';
import  { playerScores } from '../GameBoard/GameBoard';
import { handlePlayerAttack } from '../GameBoard/GameBoard.tsx';


describe('areAllShipsSunk', () => {
  it('returns true when all ships are sunk', () => {
    const grid = [
      ['miss', 'miss', 'miss', 'miss', 'miss'],
      ['miss', 'hit', 'hit', 'hit', 'miss'],
      ['miss', 'miss', 'miss', 'miss', 'miss'],
      ['hit', 'hit', 'hit', 'miss', 'miss'],
      ['miss', 'miss', 'miss', 'miss', 'miss']
    ];
    expect(areAllShipsSunk(grid)).toBe(true);
  });

  it('returns false when not all ships are sunk', () => {
    const grid = [
      ['miss', 'ship', 'miss', 'miss', 'miss'],
      ['miss', 'hit', 'ship', 'hit', 'miss'],
      ['miss', 'miss', 'miss', 'miss', 'miss'],
      ['hit', 'hit', 'miss', 'miss', 'miss'],
      ['miss', 'miss', 'miss', 'ship', 'miss']
    ];
    expect(areAllShipsSunk(grid)).toBe(false);
  });
});



/////////// playerScore function /////////////// 

describe('playerScores', () => {
    it('increments score and plays hit sound if score is less than 15', () => {
      const setPlayerScore = jest.fn();
      const playHitSound = jest.fn();
      const setGamePhase = jest.fn();
      const triggerConfetti = jest.fn();
  
      playerScores(10, setPlayerScore, setGamePhase, playHitSound, triggerConfetti);
  
      expect(setPlayerScore).toHaveBeenCalledWith(expect.any(Function));
      expect(playHitSound).toHaveBeenCalled();
      expect(setGamePhase).not.toHaveBeenCalled();
      expect(triggerConfetti).not.toHaveBeenCalled();
    });
  
    it('sets game phase to gameOver and triggers confetti if score is 15', () => {
      const setPlayerScore = jest.fn();
      const playHitSound = jest.fn();
      const setGamePhase = jest.fn();
      const triggerConfetti = jest.fn();
  
      playerScores(15, setPlayerScore, setGamePhase, playHitSound, triggerConfetti);  
      expect(setPlayerScore).not.toHaveBeenCalled();
      expect(playHitSound).not.toHaveBeenCalled();
      expect(setGamePhase).toHaveBeenCalledWith('gameOver');
      expect(triggerConfetti).toHaveBeenCalled();
    });
  });



  

///// handlePlayerAttack //////////
describe('handlePlayerAttack', () => {
  // Mock initial states and functions
  let mockAttackGrid, mockComputerGrid;
  let mockSetAttackGrid, mockPlayerScores, mockPlayMissSound;
  let mockAreAllShipsSunk, mockSetGamePhase, mockSetIsPlayersTurn, mockHandleComputerAttack;




  beforeEach(() => {
    mockComputerGrid = Array(10).fill(null).map(() => Array(10).fill('empty'));
    mockAttackGrid = Array(10).fill(null).map(() => Array(10).fill('unknown'));
    
    // Example ship placements (you can adjust as needed)
    mockComputerGrid[0][0] = 'ship'; // A ship at (0, 0)
    mockComputerGrid[3][4] = 'ship'; // A ship at (3, 4)
    mockComputerGrid[7][8] = 'ship'; // A ship at (7, 8)
    mockSetAttackGrid = jest.fn();
    mockPlayerScores = jest.fn();
    mockPlayMissSound = jest.fn();
    mockAreAllShipsSunk = jest.fn();
    mockSetGamePhase = jest.fn();
    mockSetIsPlayersTurn = jest.fn();
    mockHandleComputerAttack = jest.fn();
  });

  it('should do nothing if it is not the player\'s turn', () => {
    handlePlayerAttack(0, 0, false, mockAttackGrid, mockComputerGrid, mockSetAttackGrid, mockPlayerScores, mockPlayMissSound, mockAreAllShipsSunk, mockSetGamePhase, mockSetIsPlayersTurn, mockHandleComputerAttack);

    expect(mockSetAttackGrid).not.toHaveBeenCalled();
    expect(mockPlayerScores).not.toHaveBeenCalled();
  });

  it('should mark a cell as hit when a ship is hit', () => {
    // Assume a ship is at (0, 0) in the computer grid
    mockComputerGrid[0][0] = 'ship';
    handlePlayerAttack(0, 0, true, mockAttackGrid, mockComputerGrid, mockSetAttackGrid, mockPlayerScores, mockPlayMissSound, mockAreAllShipsSunk, mockSetGamePhase, mockSetIsPlayersTurn, mockHandleComputerAttack);

    // Verify that the attack grid is updated correctly
    expect(mockSetAttackGrid).toHaveBeenCalledWith(/* expected new grid with a hit */);
    expect(mockPlayerScores).toHaveBeenCalled();
  });

  it('should mark a cell as miss when no ship is hit', () => {
    handlePlayerAttack(1, 1, true, mockAttackGrid, mockComputerGrid, mockSetAttackGrid, mockPlayerScores, mockPlayMissSound, mockAreAllShipsSunk, mockSetGamePhase, mockSetIsPlayersTurn, mockHandleComputerAttack);

    expect(mockSetAttackGrid).toHaveBeenCalledWith(/* expected new grid with a miss */);
    expect(mockPlayMissSound).toHaveBeenCalled();
  });

  it('should end the game if all ships are sunk', () => {
    mockAreAllShipsSunk.mockReturnValue(true);
    handlePlayerAttack(2, 2, true, mockAttackGrid, mockComputerGrid, mockSetAttackGrid, mockPlayerScores, mockPlayMissSound, mockAreAllShipsSunk, mockSetGamePhase, mockSetIsPlayersTurn, mockHandleComputerAttack);

    expect(mockSetGamePhase).toHaveBeenCalledWith('gameOver');
  });

  // Add more test cases as needed...
});
