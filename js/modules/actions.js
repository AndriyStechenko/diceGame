
import {initializeTurn, setPlayersNameToTurn} from './turnInitialization.js';
import {createDicesWithDiceValues, drawAllDices} from './dicesDrawer.js';
import {saveToStorage} from './storage.js';


function rollDice() {
  const turn = initializeTurn();
  const dices = createDicesWithDiceValues();
  turn.clearDices();
  dices.forEach((dice) => {
    turn.dices.push(dice);
  });
  drawAllDices(dices);
  saveToStorage('currentTurn', turn);
  setPlayersNameToTurn();
}

export {rollDice};
