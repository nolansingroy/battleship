import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ShipComponent from './ShipComponent';
import { Ship } from '../../types/gameTypes';

describe('ShipComponent', () => {
    it('renders correctly based on props', () => {
      const testShip: Ship = {
          name: 'Destroyer',
          length: 4,
          placed: false,
          id: '',
          coordinates: []
      };
  
      const { getByText } = render(
        <ShipComponent ship={testShip} onDragStart={() => {}} />
      );
  
      expect(getByText('Destroyer')).toBeInTheDocument();
    });
  
    it('calls onDragStart when dragged', () => {
      const testShip: Ship = {
          name: 'Cruiser',
          length: 3,
          placed: false,
          id: '',
          coordinates: []
      };
  
      const mockOnDragStart = jest.fn();
      const { getByText } = render(
        <ShipComponent ship={testShip} onDragStart={mockOnDragStart} />
      );
  
      const shipElement = getByText('Cruiser');
      fireEvent.dragStart(shipElement);
  
      expect(mockOnDragStart).toHaveBeenCalled();
    });

    // test rendering with different Props
    it('applies the correct class when the ship is placed', () => {
        const placedShip: Ship = {
            name: 'Submarine', length: 3, placed: true,
            id: '',
            coordinates: []
        };
        const { getByText } = render(
          <ShipComponent ship={placedShip} onDragStart={() => {}} />
        );
      
        const shipElement = getByText('Submarine');
        expect(shipElement).toHaveClass('ship placed');
      });
      
      it('applies the correct class when the ship is not placed', () => {
        const notPlacedShip: Ship = {
            name: 'Battleship', length: 5, placed: false,
            id: '',
            coordinates: []
        };
        const { getByText } = render(
          <ShipComponent ship={notPlacedShip} onDragStart={() => {}} />
        );
      
        const shipElement = getByText('Battleship');
        expect(shipElement).toHaveClass('ship');
      });
      
      //test drag and drop based on the ship.placed proptery
      it('is draggable when not placed', () => {
        const testShip: Ship = {
            name: 'Carrier', length: 5, placed: false,
            id: '',
            coordinates: []
        };
        const { getByText } = render(
          <ShipComponent ship={testShip} onDragStart={() => {}} />
        );
      
        const shipElement = getByText('Carrier');
        expect(shipElement).toHaveAttribute('draggable', 'true');
      });
      
      it('is not draggable when placed', () => {
        const testShip: Ship = {
            name: 'Patrol Boat', length: 2, placed: true,
            id: '',
            coordinates: []
        };
        const { getByText } = render(
          <ShipComponent ship={testShip} onDragStart={() => {}} />
        );
      
        const shipElement = getByText('Patrol Boat');
        expect(shipElement).toHaveAttribute('draggable', 'false');
      });
  
    // Additional tests can be written to test other behaviors and props
  });
  