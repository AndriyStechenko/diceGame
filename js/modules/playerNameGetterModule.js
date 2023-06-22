import {initializeScoreTable} from './scoreTableInitialization.js';
import {initializePlayer} from './playerInitialization.js';
import {readFromStorage} from './storage.js';


const playerNameModal = document.getElementById('playerNameModal');
const closeBtn = document.getElementsByClassName('close')[0];
const playerNameInput = document.getElementById('playerNameInput');
const defaultPlayerName = 'Serun Hatniy';
const playerNameHolder = document.getElementById('playerNameHolder');

function closeModal() {
  playerNameModal.style.display = 'none';
}

function _playerIsKnown() {
  return readFromStorage('currentPlayer') ? true : false;
}


function createNewPlayerFromModal() {
  if (_playerIsKnown()) {
    return;
  } else {
    playerNameModal.style.display = 'block';
  }
}

function submitPlayersNameFromModyle() {
  let playerName;
  if (playerNameInput.value == '') {
    playerName = defaultPlayerName;
  } else {
    playerName = playerNameInput.value;
  }
  closeModal();
  const player = initializePlayer(playerName);
  playerNameHolder.innerHTML = `Player ${playerName} turn!`;// name from memory

  return player;
}

closeBtn.addEventListener('click', closeModal);

export {submitPlayersNameFromModyle, createNewPlayerFromModal};
