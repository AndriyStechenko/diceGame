import { initializePlayer } from "/js/modules/playerInitialization.js";

const playerNameModal = document.getElementById("playerNameModal");
const closeBtn = document.getElementsByClassName("close")[0];
const playerNameInput = document.getElementById("playerNameInput");
const defaultPlayerName = "Serun Hatniy";
const playerNameHolder = document.getElementById("playerNameHolder");

function closeModal() {
  playerNameModal.style.display = "none";
}

function createNewPlayerFromModal() {
  playerNameModal.style.display = "block";
}

function submitPlayersNameFromModyle() {
  let playerName;
  if (playerNameInput.value == "") {
    playerName = defaultPlayerName;
  } else {
    playerName = playerNameInput.value;
  }
  closeModal();
  let player = initializePlayer(playerName);
  playerNameHolder.innerHTML = `Player ${playerName} turn!`;

  return player;
}

closeBtn.addEventListener("click", closeModal);

export { submitPlayersNameFromModyle, createNewPlayerFromModal };
