
import {initializePage} from './modules/pageInitialisation.js';
import {startGameBtnActions, afterSaveNewPlayerActions, afterRollDiceActions, endTurnBtnActions, endGameBtnActions, startNewGameActionsFromModal, hideendTurnBtnAndShowRerollBtn} from './modules/callbacks.js';
import {reRollDiceActions} from './modules/reRollFeature.js';

const startGameBtn = document.getElementById('start-game-btn');
const submitBtn = document.getElementById('submitBtn');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const endTurnBtn = document.getElementById('end-turn-btn');
const endGameBtn = document.getElementById('end-game-btn');
const startNewGameBtnModal = document.getElementById('startNewGameBtnModal');
const choseDiceForRerollBtn = document.getElementById('chooseAndReRollDices');
const reRollDiceBtn = document.getElementById('re-roll-dice-btn');

startGameBtn.addEventListener('click', startGameBtnActions);
submitBtn.addEventListener('click', afterSaveNewPlayerActions);
rollDiceBtn.addEventListener('click', afterRollDiceActions);
endTurnBtn.addEventListener('click', endTurnBtnActions);
endGameBtn.addEventListener('click', endGameBtnActions);
startNewGameBtnModal.addEventListener('click', startNewGameActionsFromModal);
choseDiceForRerollBtn.addEventListener('click', hideendTurnBtnAndShowRerollBtn);
reRollDiceBtn.addEventListener('click', reRollDiceActions);


initializePage();
