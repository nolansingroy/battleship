import React from 'react';
import { Ship } from '../../types/gameTypes';
import './ShipComponent.css';

interface ShipComponentProps {
  ship: Ship;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, ship: Ship) => void;
}

const ShipComponent: React.FC<ShipComponentProps> = ({ ship, onDragStart }) => {
  const shipClass = ship.placed ? 'ship placed' : 'ship';

  return (
    <div className="ship-container">
      <div
        draggable={!ship.placed}
        onDragStart={(e) => onDragStart(e, ship)}
        className={shipClass}
        style={{ width: `calc(30px * ${ship.length})` }} // Assuming each grid cell is 30px wide
      >
        {ship.name}
      </div>
    </div>
  );
};

export default ShipComponent;
