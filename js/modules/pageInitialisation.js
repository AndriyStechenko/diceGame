import {readFromStorage} from './storage.js';
import {showRollDiceBtn, showEndTurnBnt, makeDiceSectionVisible, createResultTable, showScoreTable} from './callbacks.js';
import {playerIsKnown} from './playerNameGetterModule.js';
import {initializeScoreTable} from './scoreTableInitialization.js';
import {drawAllDices, drawEmptyDices, drawDicesFromLastTurn} from './dicesDrawer.js';

function initializePage() {
  const currentScoreTable = readFromStorage('currentScoreTable');
  if (currentScoreTable) {
    // alert('bla bla bla');
    showRollDiceBtn();
    showEndTurnBnt();
    makeDiceSectionVisible();
    drawEmptyDices();
    drawDicesFromLastTurn();
    // drawAllDices();
    showScoreTable();
    createResultTable();
  }
}

export {initializePage};
