import Dice from '../models/dice.js';
import {readFromStorage} from './storage.js';

function createDiceWithValue() {
  const dice = new Dice();
  dice.throwDice();
  return dice;
}

function drawNewDiceFromObj(diceContainer, dice) {
  const newDiv = document.createElement('div');
  newDiv.className = `dice_pic_${dice.value} main_item `;
  diceContainer.appendChild(newDiv);
  newDiv.setAttribute('id', `dice_${dice.id}`);
}

function createDicesWithDiceValues() {
  const dices = [];
  for (let i = 0; i < 5; i++) {
    const dice = createDiceWithValue();
    dice.setId(i + 1);
    dices.push(dice);
  }
  return dices;
}

function drawAllDices(dices) {
  const diceContainer = document.getElementById('dice-container');
  for (const dice of dices) {
    drawNewDiceFromObj(diceContainer, dice);
  }
}

function eraseDicesContainer() {
  const diceSectionElement = document.getElementById('dice-container');
  diceSectionElement.innerHTML = '';
}

function clearDiceContainer() {
  const diceContainer = document.getElementById('dice-container');
  const diceChildren = diceContainer.childNodes;

  for (let diceNode = diceChildren.length - 1; diceNode >= 0; diceNode--) {
    diceContainer.removeChild(diceChildren[diceNode]);
  }
}

function drawEmptyDices() {
  clearDiceContainer();

  const diceContainer = document.getElementById('dice-container');
  for (let i = 0; i < 5; i++) {
    const diceObject = document.createElement('img');
    diceObject.src = 'pic/dicePic/dice0.png';
    diceObject.alt = 'Dice ' + (i + 1);
    diceObject.className = 'main_item';
    diceContainer.appendChild(diceObject);
  }
}

function makeDiceSectionVisible() {
  const diceSectionElement = document.getElementById('dice-section');
  diceSectionElement.classList.toggle('invisible');
}

function drawDicesFromLastTurn() {
  clearDiceContainer();
  const currentTurn = readFromStorage('currentTurn');
  const currentDices = currentTurn.dices;
  drawAllDices(currentDices);
}

export {createDicesWithDiceValues, drawAllDices, eraseDicesContainer, drawEmptyDices, makeDiceSectionVisible, drawDicesFromLastTurn};
