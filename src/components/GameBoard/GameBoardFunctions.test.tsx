import { areAllShipsSunk } from '../GameBoard/GameBoard';

describe('areAllShipsSunk', () => {
  it('returns true when all ships are sunk', () => {
    const grid = /* create a grid where all ships are sunk */;
    expect(areAllShipsSunk(grid)).toBe(true);
  });

  it('returns false when not all ships are sunk', () => {
    const grid = /* create a grid where not all ships are sunk */;
    expect(areAllShipsSunk(grid)).toBe(false);
  });
});