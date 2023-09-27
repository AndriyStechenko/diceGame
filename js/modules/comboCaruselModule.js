import {readFromStorage} from './storage.js';
import {saveToStorage} from './storage.js';

const modal = document.getElementById('comboModal');
const options = document.querySelectorAll('.comboModal-option');
let optionClicked = false;

function showModal() {
  modal.classList.remove('d-none');
  modal.classList.add('d-flex');
}

function hideModal() {
  modal.classList.remove('d-flex');
  modal.classList.add('d-none');
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
    'bigStritCombination': [2, 3, 4, 5, 6],
    'fullCombination': [6, 6, 6, 5, 5],
    'successCombination': [6, 6, 6, 6, 6],
    'pokerCombination': null,
  };
  const diceElements = document.querySelectorAll('.main_item.dice');
  const diceValues = [...diceElements].map((diceElement) => diceElement.getAttribute('data-value'));

  if (carouselElementId === 'pokerCombination') {
    const uniqValues = diceValues.filter((value, index, self) => self.indexOf(value) === index);
    console.log(uniqValues);
    if (uniqValues.length === 1) {
      diceElements.forEach((diceElement)=> diceElement.classList.add('dice-on-hold-back-light'));
    }
  }

  if ( ['smallStritCombination', 'bigStritCombination', 'fullCombination', 'successCombination'].includes(carouselElementId)) {
    if (diceValues.sort().toString() == combinationToDiceClassMap.smallStritCombination.toString()) {
      diceElements.forEach((diceElement)=> diceElement.classList.add('dice-on-hold-back-light'));
    }
  } else {
    const diceElements = document.querySelectorAll(combinationToDiceClassMap[carouselElementId]);
    _diceLighter(diceElements);
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
    'bigStritCombination': [2, 3, 4, 5, 6],
    'fullCombination': [6, 6, 6, 5, 5],
    'successCombination': [6, 6, 6, 6, 6],
    'pokerCombination': null,
  };

  const diceElements = document.querySelectorAll('.main_item.dice');
  const diceValues = [...diceElements].map((diceElement) => diceElement.getAttribute('data-value'));

  if (carouselElementId === 'pokerCombination') {
    const uniqValues = diceValues.filter((value, index, self) => self.indexOf(value) === index);
    console.log(uniqValues);
    if (uniqValues.length === 1) {
      diceElements.forEach((diceElement)=> diceElement.classList.remove('dice-on-hold-back-light'));
    }
  }

  if ( ['smallStritCombination', 'bigStritCombination', 'fullCombination', 'successCombination'].includes(carouselElementId)) {
    if (diceValues.sort().toString() == combinationToDiceClassMap.smallStritCombination.toString()) {
      diceElements.forEach((diceElement)=> diceElement.classList.remove('dice-on-hold-back-light'));
    }
  } else if (carouselElementId in combinationToDiceClassMap && !optionClicked) {
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
  const carouselElementId = elementId;
  const currentTurn = readFromStorage('currentTurn');
  const combinationToDiceClassMap = {
    'oneCombination': 1,
    'twoCombination': 2,
    'threeCombination': 3,
    'fourCombination': 4,
    'fiveCombination': 5,
    'sixCombination': 6,
    'smallStritCombination': [1, 2, 3, 4, 5],
    'bigStritCombination': [2, 3, 4, 5, 6],
    'fullCombination': [6, 6, 6, 5, 5],
    'successCombination': [6, 6, 6, 6, 6],
    'pokerCombination': null,
  };
  const diceValueToHold = combinationToDiceClassMap[elementId];
  const diceElements = document.querySelectorAll('.main_item.dice');
  const diceValues = [...diceElements].map((diceElement) => diceElement.getAttribute('data-value'));


  if (elementId === 'pokerCombination') {
    const uniqValues = diceValues.filter((value, index, self) => self.indexOf(value) === index);
    if (uniqValues.length === 1) {
      for (const dice of currentTurn.dices) {
        dice.onHold = true;
        currentTurn.usedCombo = elementId;
        currentTurn.dicesSum += dice.value;
      }
    }
  }

  if ( ['smallStritCombination', 'bigStritCombination', 'fullCombination', 'successCombination'].includes(carouselElementId)) {
    if (diceValues.sort().toString() == combinationToDiceClassMap.smallStritCombination.toString()) {
      for (const dice of currentTurn.dices) {
        dice.onHold = true;
        currentTurn.usedCombo = elementId;
        currentTurn.dicesSum += dice.value;
      }
    }
  } else {
    for (const dice of currentTurn.dices) {
      if (dice.value === diceValueToHold) {
        dice.onHold = true;
        currentTurn.usedCombo = elementId;
        currentTurn.dicesSum += dice.value;
      }
    }
  }

  saveToStorage('currentTurn', currentTurn);
}

function checkedWhatComboAlreadyUsed() {
  const currentScoreTable = readFromStorage('currentScoreTable');
  const usedCombos = currentScoreTable.firstPlayerTurns.map((combo) => combo.usedCombo);
  _makeUsedBtnInCauruselDisabled(usedCombos);
  return usedCombos;
};

function _makeUsedBtnInCauruselDisabled(usedCombos) {
  usedCombos.forEach((cauruselBtn) => {
    const btn = document.getElementById(cauruselBtn);
    if (btn) {
      btn.classList.add('non-clickable-carousel-Btn');
    }
  });
}

function makeUsedBtnInCauruselClickeble() {
  const cauruselBtns = document.querySelectorAll('.comboModal-option');
  console.log(cauruselBtns);
  cauruselBtns.forEach((element) => {
    if (element.classList.contains('non-clickable-carousel-Btn')) {
      element.classList.remove('non-clickable-carousel-Btn');
    }
  });
}

// Add event listener to each option
options.forEach((option) => option.addEventListener('click', selectOption));

options.forEach((option) => option.addEventListener('mouseover', turnOnBorderLight));

options.forEach((option) => option.addEventListener('mouseover', lightDices));

options.forEach((option) => option.addEventListener('mouseout', turnOffBorderLight));

options.forEach((option) => option.addEventListener('mouseout', lightOffDices));

options.forEach((option) => option.addEventListener('click', makeDiceOnHoldInTurn));

export {showModal, checkedWhatComboAlreadyUsed, makeUsedBtnInCauruselClickeble};
