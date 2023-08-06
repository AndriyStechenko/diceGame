
import {initializePage} from './modules/pageInitialisation.js';
import {startGameBtnActions, afterSaveNewPlayerActions, afterRollDiceActions, endRollBtnActions} from './modules/callbacks.js';

const startGameBtn = document.getElementById('start-game-btn');
const submitBtn = document.getElementById('submitBtn');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const endRollBtn = document.getElementById('end-turn-btn');

startGameBtn.addEventListener('click', startGameBtnActions);
submitBtn.addEventListener('click', afterSaveNewPlayerActions);
rollDiceBtn.addEventListener('click', afterRollDiceActions);
endRollBtn.addEventListener('click', endRollBtnActions);


initializePage();
