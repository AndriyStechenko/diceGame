import Player from './player.js';
import {readFromStorage} from '../modules/storage.js';


export default class ScoreTable {
  constructor() {
    this.diceTotal = 1;

    this.firstPlayer = new Player;
    this.firstPlayerTurns = [];

    this.secondPlayer = 'Computer';
    this.secondPlayerTurns = [];

    this.firstPlayerTotal = null;
    this.secondPlayerTotal = null;

    this.firstPlayerComboUsed = null;
    this.secondPlayerComboUsed = null;
  }

  setFirstPlayerName() {
    const player = readFromStorage('currentPlayer');
    this.firstPlayer = player.name;
  }

  setFirstPlayerTurns() {

  }

  setFirstPlayerTotalScore() {

  }
}
