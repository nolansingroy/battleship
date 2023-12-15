import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import GameBoard from './GameBoard';

describe('GameBoard Component', () => {
  it('renders the game board during the playing phase', () => {
    render(<GameBoard />);
    
    // You might need to simulate actions to transition to the playing phase
    // For example, setting up ships and clicking a 'Start Game' button
    // fireEvent.click(screen.getByText('Start Game')); 

    // Check if the game board is rendered
    expect(screen.getByTestId('game-board')).toBeInTheDocument();
  });

  it('shows player and computer scores', () => {
    render(<GameBoard />);

    // Check if the scoreboard is rendered
    expect(screen.getByText('Player Score:')).toBeInTheDocument();
    expect(screen.getByText('Computer Score:')).toBeInTheDocument();
  });

  it('updates player score when the player scores', () => {
    render(<GameBoard />);

    // Simulate the conditions for the player to score
    // This depends on your game logic
    // For example, a hit on the enemy fleet
    // fireEvent.click(screen.getByTestId('enemy-cell'));

    // Check if the player score is updated
    // You might need to adjust the expected score based on your game's scoring logic
    expect(screen.getByText('Player Score: ')).toBeInTheDocument();
  });

  it('updates computer score when the computer scores', () => {
    render(<GameBoard />);

    // Simulate the conditions for the computer to score
    // Depending on how your game logic is set, you might need to mock this or trigger an event

    // Check if the computer score is updated
    // You might need to adjust the expected score based on your game's scoring logic
    expect(screen.getByText('Computer Score: 1')).toBeInTheDocument();
  });

  // Add more tests as needed to cover other functionalities and scenarios
});