import { areAllShipsSunk } from '../GameBoard/GameBoard';
import  { playerScores } from '../GameBoard/GameBoard';


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



//// playerScore function 

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