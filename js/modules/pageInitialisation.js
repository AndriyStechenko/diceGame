import {readFromStorage} from './storage.js';
import {showRollDiceBtn, showEndTurnBnt, makeDiceSectionVisible, createResultTable, showScoreTable, toggleVisebilityStartGameBtn, hideEndGameBtn, showEndGameBtn, hideReRollDiceBtn} from './callbacks.js';
import {drawEmptyDices, drawDicesFromLastTurn, addBacklinghtFromCurrentTurn} from './dicesDrawer.js';

const rollDiceBtn = document.getElementById('roll-dice-btn');
const endTurnBtn = document.getElementById('end-turn-btn');


function initializePage() {
  hideEndGameBtn();
  hideReRollDiceBtn();
  const currentScoreTable = readFromStorage('currentScoreTable');
  if (currentScoreTable) {
    if (rollDiceBtn.classList.contains('invisible')) {
      showRollDiceBtn();
    }
    // showRollDiceBtn();
    if (!endTurnBtn.classList.contains('invisible')) {
      showEndTurnBnt();
    }
    // showEndTurnBnt();
    makeDiceSectionVisible();
    drawEmptyDices();
    drawDicesFromLastTurn();
    showScoreTable();
    createResultTable();
    addBacklinghtFromCurrentTurn();
    toggleVisebilityStartGameBtn();
    showEndGameBtn();
  }
  // if (endTurnBtn.classList.contains('invisible')) {
  //   showEndTurnBnt();
  // }
  // if (rollDiceBtn.classList.contains('invisible')) {
  //   showRollDiceBtn();
  // }
}

export {initializePage};
