import { areAllShipsSunk } from '../GameBoard/GameBoard';

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