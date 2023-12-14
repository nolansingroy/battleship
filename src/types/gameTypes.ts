export interface Ship {
    id: string;
    name: string;
    length: number;
    placed: boolean;
    coordinates: Array<[number, number]>;
  }
  
  export const initialShips: Ship[] = [
    { id: 'carrier', name: 'Carrier', length: 5, placed: false, coordinates: [] },
    { id: 'battleship', name: 'Battleship', length: 4, placed: false, coordinates: [] },
    { id: 'cruiser', name: 'Cruiser', length: 3, placed: false, coordinates: [] },
    { id: 'submarine', name: 'Submarine', length: 3, placed: false, coordinates: [] },
  ];