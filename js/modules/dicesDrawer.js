import Dice from '../models/dice.js';
import {readFromStorage, saveToStorage} from './storage.js';
import {showRollDiceBtn, showEndTurnBnt} from './callbacks.js';

function createDiceWithValue() {
  const dice = new Dice();
  dice.throwDice();
  return dice;
}

function drawNewDiceFromObj(diceContainer, dice) {
  const newDiv = document.createElement('div');
  newDiv.className = `dice_pic_${dice.value} main_item dice`;
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
  const diceElements = document.querySelectorAll('.dice');
  diceElements.forEach((diceElement) => {
    diceElement.addEventListener('click', holdDice);
  });
  diceElements.forEach((diceElement) => {
    diceElement.addEventListener('click', readLightToggle);
  });
  diceElements.forEach((diceElement) => {
    diceElement.addEventListener('click', removeOnHoldFromDice);
  });
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
  const currentScoreTable = readFromStorage('currentScoreTable');
  if (currentScoreTable === null) {
    showRollDiceBtn();
    showEndTurnBnt();
  }
}

function drawDicesFromLastTurn() {
  clearDiceContainer();
  const currentTurn = readFromStorage('currentTurn');
  if (currentTurn) {
    const currentDices = currentTurn.dices;
    drawAllDices(currentDices);
  }
}

function holdDice(event) {
  // read dice from memory by number
  const currentTurn = readFromStorage('currentTurn');
  console.log('currentTurn:', currentTurn);
  let diceNumber = event.target.id;
  diceNumber = diceNumber[diceNumber.length-1];
  const diceData = currentTurn.dices.find((dice) => dice.id.toString() === diceNumber);
  if (diceData) {
    diceData.onHold = true;
  }
  const index = currentTurn.dices.findIndex((dice) => dice.id === diceData.id);
  if (index !== -1) {
    currentTurn.dices[index] = diceData;
  };
  saveToStorage('currentTurn', currentTurn);
}

function readLightToggle(event) {
  const diceNumberId = event.target.id;
  const diceElement = document.getElementById(diceNumberId);
  diceElement.classList.toggle('red-light');
};

function removeOnHoldFromDice(event) {
  const diceClass = event.target.classList[event.target.classList.length-1];
  let diceNumber = event.target.id;
  diceNumber = diceNumber[diceNumber.length-1];
  if (diceClass !== 'red-light') {
    diceOnHoldSwitcher(diceNumber);
  }
}

function diceOnHoldSwitcher(diceNumber) {
  const currentTurn = readFromStorage('currentTurn');
  const diceWithId = currentTurn.dices.find((dice) => dice.id.toString() === diceNumber);
  if (diceWithId) {
    diceWithId.onHold = false;
  }
  saveToStorage('currentTurn', currentTurn);
}

function addBacklinghtFromCurrentTurn() {
  const currentTurn = readFromStorage('currentTurn');
  if (currentTurn) {
    for (const dice of currentTurn.dices) {
      const diceId = dice.id;
      const diceOnHoldValue = dice.onHold;
      if (diceOnHoldValue === true) {
        const diceIdInHtml = `dice_${diceId}`;
        const diceElement = document.getElementById(diceIdInHtml);
        diceElement.classList.add('red-light');
      }
    }
  }
}

export {createDicesWithDiceValues, drawAllDices, eraseDicesContainer, drawEmptyDices, makeDiceSectionVisible, drawDicesFromLastTurn, holdDice, addBacklinghtFromCurrentTurn};
