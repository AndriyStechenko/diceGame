import Turn from '../models/turn.js';
import Player from '../models/player.js';
import {scoreTableResultSum} from '../modules/scoreTableInitialization.js';
import {readFromStorage, saveToStorage} from '../modules/storage.js';

function initializeTurn() {
  const existingTurnObj = readFromStorage('currentTurn');
  const currentTurn = new Turn;

  if (existingTurnObj) {
    currentTurn.number = existingTurnObj.number;

    currentTurn.player = new Player;
    if (existingTurnObj.player) {
      currentTurn.player.name = existingTurnObj.player.name;
    }

    currentTurn.usedCombo = existingTurnObj.usedCombo;

    if (existingTurnObj.dices.length > 0) {
      currentTurn.dices = existingTurnObj.dices;
    }
  } else {
    saveToStorage('currentTurn', currentTurn);
  }

  return currentTurn;
}

function setPlayersNameToTurn() {
  const existingPlayerObj = readFromStorage('currentPlayer');
  const existingTurnObj = readFromStorage('currentTurn');
  const currentTurn = new Turn;
  if (existingTurnObj) {
    currentTurn.dices = existingTurnObj.dices;
    currentTurn.setPlayerName(existingPlayerObj.name);
  } else {
    alert('no info');
  }
  saveToStorage('currentTurn', currentTurn);
}

function setDiceScoreToTurn() {
  const existingTurnObj = readFromStorage('currentTurn');
  const currentTurn = new Turn;
  if (existingTurnObj) {
    currentTurn.dices = existingTurnObj.dices;
    currentTurn.player = existingTurnObj.player;
    currentTurn.dicesSum = scoreTableResultSum();
    currentTurn.usedCombo = existingTurnObj.usedCombo;
  } else {
    alert('no info');
  }
  saveToStorage('currentTurn', currentTurn);
}

export {initializeTurn, setPlayersNameToTurn, setDiceScoreToTurn};
