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
  const carouselElementId = carouselElement.target.id;
  const combinationToDiceClassMap = {
    'oneCombination': '.dice_pic_1',
    'twoCombination': '.dice_pic_2',
    'threeCombination': '.dice_pic_3',
    'fourCombination': '.dice_pic_4',
    'fiveCombination': '.dice_pic_5',
    'sixCombination': '.dice_pic_6',
    'smallStritCombination': [1, 2, 3, 4, 5],
  };

  if (carouselElementId === 'smallStritCombination') {
    console.log('Finally smallStritCombination');
  } else {
    if (carouselElementId in combinationToDiceClassMap) {
      const diceElements = document.querySelectorAll(combinationToDiceClassMap[carouselElementId]);
      _diceLighter(diceElements);
    }
  }
}

function _diceLighter(diceElements) {
  diceElements.forEach((diceElement) => {
    diceElement.classList.add('dice-on-hold-back-light');
  });
}

function lightOffDices(carouselElement) {
  const carouselElementId = carouselElement.target.id;
  const combinationToDiceClassMap = {
    'oneCombination': '.dice_pic_1',
    'twoCombination': '.dice_pic_2',
    'threeCombination': '.dice_pic_3',
    'fourCombination': '.dice_pic_4',
    'fiveCombination': '.dice_pic_5',
    'sixCombination': '.dice_pic_6',
    'smallStritCombination': [1, 2, 3, 4, 5],
  };

  if (carouselElementId in combinationToDiceClassMap && !optionClicked) {
    const diceElements = document.querySelectorAll(combinationToDiceClassMap[carouselElementId]);
    _diceLighterOff(diceElements);
  }
  optionClicked = false;
}

function _diceLighterOff(diceElements) {
  diceElements.forEach((diceElement) => {
    diceElement.classList.remove('dice-on-hold-back-light');
  });
}

function makeDiceOnHoldInTurn() {
  const elementId = event.target.id;
  console.log(elementId);
  const currentTurn = readFromStorage('currentTurn');
  const combinationMap = {
    'oneCombination': 1,
    'twoCombination': 2,
    'threeCombination': 3,
    'fourCombination': 4,
    'fiveCombination': 5,
    'sixCombination': 6,
    'smallStritCombination': [1, 2, 3, 4, 5],
  };

  const diceValueToHold = combinationMap[elementId];
  console.log(diceValueToHold);

  for (const dice of currentTurn.dices) {
    if (dice.value === diceValueToHold) {
      dice.onHold = true;
      currentTurn.usedCombo = elementId;
      currentTurn.dicesSum += dice.value;
    }
  }

  saveToStorage('currentTurn', currentTurn);
}

// function _checkSmallStritCombination(obj) {
//   const diceValues = obj.dices.map((dice) => dice.value);
//   const smallStritValues = [1, 2, 3, 4, 5];
//   const isSmallStritCombination = smallStritValues.every((value) => diceValues.includes(value));

//   if (isSmallStritCombination) {
//     console.log('JaPerdole this is ', 'smallStritCombination');
//   }
// }


// Add event listener to each option
options.forEach((option) => option.addEventListener('click', selectOption));

options.forEach((option) => option.addEventListener('mouseover', turnOnBorderLight));

options.forEach((option) => option.addEventListener('mouseover', lightDices));

options.forEach((option) => option.addEventListener('mouseout', turnOffBorderLight));

options.forEach((option) => option.addEventListener('mouseout', lightOffDices));

options.forEach((option) => option.addEventListener('click', makeDiceOnHoldInTurn));

export {showModal};
