### BattleShip in React techincal Exam

## Visit the site live [Battleship.com](https://battleship-51dea.web.app/)
## Please turn your sound on as this game as audio effects 
*** Notes I allow the user to cheat by viewing the Enemy / compuuter board if they scroll to the bottom of the page ****


## Git Clone this project 
`git clone https://github.com/nolansingroy/battleship.git`

## Available Scripts
In the project directory, you can run:
### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
Use React Developer (Chrome Inspector Tool)[https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en] 


### Prettier Code Linter 
`npx prettier --write src/components/GameBoard/GameBoard.tsx`


### `npm test`

`npm test src/components/GameBoard/GameBoard.test.tsx`
... src/components/GameBoard/GameBoardFunctions.test.tsx

<img width="930" alt="Pasted Graphic 3" src="https://github.com/nolansingroy/battleship/assets/5677688/0d61982e-d6b9-42fb-a679-35b086bdd6d8">

`npx jest --coverage`

### `npm run build`

Builds the app for production to the `build` folder.\

### `firebse depoly`
`firebase hosting` 


### Project Structure 
<img width="376" alt="image" src="https://github.com/nolansingroy/battleship/assets/5677688/45544dab-fa48-487f-9dd9-e92438efecf5">


### Future Considerations 
** TODO: Create a KABAN github and list backlog features converted to Issues **

## 1. Better Logic for the computer
- Once a target has been identified, a alorithm to target areas around that position
    - **Track Hits:** When the computer scores a 'hit', record the coordinates of that hit. This is important for the computer to remember where it was successful.
    - **Prioritize Adjacent Slots:** After a hit, the computer should prioritize attacking the adjacent slots in subsequent turns. In Battleship, ships are placed in straight lines, so once you hit a part of a ship, adjacent slots are likely to be part of the same ship.
    - **Determine Attack Pattern:** The computer should intelligently choose which adjacent slot to hit next. It could try horizontally (left or right of the hit) or vertically (above or below the hit) adjacent slots.
    - **Handle Multiple Hits:** If the computer hits multiple parts of a ship, it should continue attacking along the line formed by these hits. For instance, if it hits two adjacent slots vertically, it should continue to attack above or below this line.
    - **Avoid Repeated Attacks:** Ensure the computer doesn't attack a slot it has already attacked, whether it was a hit or miss.
    - **Fallback to Random Attacks:** If the computer finishes attacking a ship (or if the adjacent attacks are all misses), it should revert to random attacks until it scores another hit.

## 2. Handle touch events on the mobile version of the site
