// import {holdDice} from './dicesDrawer.js';
import {readFromStorage} from './storage.js';
import {saveToStorage} from './storage.js';

const modal = document.getElementById('comboModal');
const options = document.querySelectorAll('.comboModal-option');
let optionClicked = false;

function showModal() {
  modal.style.display = 'flex';
}

function hideModal() {
  modal.style.display = 'none';
}

function selectOption(carouselElement) {
  console.log(`Selected Option: ${carouselElement.target.textContent}`);
  hideModal();
  optionClicked = true;
}

function turnOnBorderLight(carouselElement) {
  carouselElement.target.classList.add('dice-on-hold-back-light');
}

function turnOffBorderLight(carouselElement) {
  carouselElement.target.classList.remove('dice-on-hold-back-light');
}

function lightDices(carouselElement) {
  if (carouselElement.target.id === 'oneCombination') {
    const diceElements = document.querySelectorAll('.dice_pic_1');
    diceElements.forEach((diceElement) => {
      diceElement.classList.add('dice-on-hold-back-light');
    });
  }
}

function lightOffDices(carouselElement) {
  if (carouselElement.target.id === 'oneCombination' && !optionClicked) {
    const diceElements = document.querySelectorAll('.dice_pic_1');
    diceElements.forEach((diceElement) => {
      diceElement.classList.remove('dice-on-hold-back-light');
    });
  }
  optionClicked = false;
}

function makeDiceOnHoldInTurn() {
  const elementId = event.target.id;
  const currentTurn = readFromStorage('currentTurn');
  if (elementId === 'oneCombination') {
    for (const dice of currentTurn.dices) {
      if (dice.value === 1) {
        dice.onHold = true;
        currentTurn.usedCombo = elementId;
      }
    }
  }
  saveToStorage('currentTurn', currentTurn);
}


// Add event listener to each option
options.forEach((option) => option.addEventListener('click', selectOption));

options.forEach((option) => option.addEventListener('mouseover', turnOnBorderLight));

options.forEach((option) => option.addEventListener('mouseover', lightDices));

options.forEach((option) => option.addEventListener('mouseout', turnOffBorderLight));

options.forEach((option) => option.addEventListener('mouseout', lightOffDices));

options.forEach((option) => option.addEventListener('click', makeDiceOnHoldInTurn));

export {showModal};
