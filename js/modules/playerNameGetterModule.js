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

function playerIsKnown() {
  return readFromStorage('currentPlayer') ? true : false;
}


function showNewPlayerFormModal() {
  if (playerIsKnown()) {
    return;
  } else {
    playerNameModal.style.display = 'block';
  }
}

function submitPlayersNameFormModule() {
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

function changeTextInPlayerNameHolder() {
  playerNameHolder.innerHTML = `Be ready to play the GAME !!!`;
}

closeBtn.addEventListener('click', closeModal);

export {submitPlayersNameFormModule, showNewPlayerFormModal, playerIsKnown, changeTextInPlayerNameHolder};
