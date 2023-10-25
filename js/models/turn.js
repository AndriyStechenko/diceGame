import {readFromStorage} from '../modules/storage.js';

export default class Turn {
  constructor() {
    this.number = null;
    this.player = null;// Player{}
    this.usedCombo = false;
    this.dices = []; // Array[] of dices
    this.dicesSum = null;
  }

  clearDices() {
    this.dices = [];
  }

  setPlayerName() {
    const playerName = readFromStorage('currentPlayer');
    this.player = playerName.name;
  }

  setCompName() {
    const playerName = readFromStorage('computer');
    this.player = playerName.name;
  }
}
