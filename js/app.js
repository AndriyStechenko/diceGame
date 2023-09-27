
import {initializePage} from './modules/pageInitialisation.js';
import {startGameBtnActions, afterSaveNewPlayerActions, afterRollDiceActions, endRollBtnActions, endGameBtnActions, startNewGameActionsFromModal} from './modules/callbacks.js';

const startGameBtn = document.getElementById('start-game-btn');
const submitBtn = document.getElementById('submitBtn');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const endRollBtn = document.getElementById('end-turn-btn');
const endGameBtn = document.getElementById('end-game-btn');
const startNewGameBtnModal = document.getElementById('startNewGameBtnModal');

startGameBtn.addEventListener('click', startGameBtnActions);
submitBtn.addEventListener('click', afterSaveNewPlayerActions);
rollDiceBtn.addEventListener('click', afterRollDiceActions);
endRollBtn.addEventListener('click', endRollBtnActions);
endGameBtn.addEventListener('click', endGameBtnActions);
startNewGameBtnModal.addEventListener('click', startNewGameActionsFromModal);


initializePage();
