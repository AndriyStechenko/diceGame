import {readFromStorage, saveToStorage} from './storage.js';
import Dice from '../models/dice.js';
import {drawAllDices} from './dicesDrawer.js';
import {showEndTurnBnt, hideReRollDiceBtn} from './callbacks.js';
import {showModal} from './comboCaruselModule.js';

let diceWithOnHoldFalse = [];
let dices = [];

function createDiceWithValue() {
  const dice = new Dice();
  dice.throwDice();
  return dice;
}

function showWhatDicesNotOnHold(dices) {
  dices.forEach((dice) => {
    if (dice.onHold !== true) {
      diceWithOnHoldFalse.push(dice);
    }
  });
  console.log(diceWithOnHoldFalse);
  return diceWithOnHoldFalse;
}

function removeDicesFromScreen(diceWithOnHoldFalse) {
  const elementsToRemove = diceWithOnHoldFalse;

  elementsToRemove.forEach((element) => {
    const id = element.id;
    const elementToRemove = document.getElementById(`dice_${id}`);
    if (elementToRemove) {
      elementToRemove.remove();
    }
  });
}

function createNewDicesAfterReroll() {
  const amountOfDiecesToDraw = diceWithOnHoldFalse.length;
  for (let i = amountOfDiecesToDraw; i > 0; i--) {
    console.log('I will shake dices here');
    const dice = createDiceWithValue();
    dice.setId(i + 1);
    dices.push(dice);
  }
  console.log(dices);
  return dices;
}

function eraseDicesWithOnHoldFalseFromCurrentTurn() {
  const currentTurn = readFromStorage('currentTurn');

  const idsToRemove = diceWithOnHoldFalse.map((element) => element.id);
  const filteredArray = currentTurn.dices.filter((element) => !idsToRemove.includes(element.id));

  currentTurn.dices = filteredArray;
  saveToStorage('currentTurn', currentTurn);
  console.log(currentTurn, dices);
  return currentTurn;
}

function pushNewDicesToCurrentTurn() {
  const currentTurn = readFromStorage('currentTurn');
  currentTurn.dices = currentTurn.dices.concat(dices);
  console.log(currentTurn);
  saveToStorage('currentTurn', currentTurn);
}

function clearArraysAfetrReroll() {
  diceWithOnHoldFalse = [];
  dices = [];
}

function removeClassFromDiceContainers() {
  const diceContainers = document.querySelectorAll('.dice-on-hold-back-light');

  diceContainers.forEach((diceContainer) => {
    diceContainer.classList.remove('dice-on-hold-back-light');
  });
}

function reRollDiceActions() {
  const currentTurn = readFromStorage('currentTurn');
  showWhatDicesNotOnHold(currentTurn.dices);
  removeDicesFromScreen(diceWithOnHoldFalse);
  createNewDicesAfterReroll();
  eraseDicesWithOnHoldFalseFromCurrentTurn();
  drawAllDices(dices);
  pushNewDicesToCurrentTurn();
  showEndTurnBnt();
  hideReRollDiceBtn();
  clearArraysAfetrReroll();
  removeClassFromDiceContainers();
  showModal();
}

export {reRollDiceActions};
