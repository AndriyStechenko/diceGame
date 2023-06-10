import ScoreTable from "../models/scoreTable.js"
import {readFromStorage} from '../modules/storage.js'


function initializeScoreTable() {
    let scoreTableContainer = document.getElementById("resalt-table-section");
    scoreTableContainer.classList.remove('invisible');

    let currentScoreTable = new ScoreTable

    // let tableCell = document.getElementById('mark')
    // tableCell.textContent = currentScoreTable.diceTotal

    setPlayerNameInTable()
    setComputerNameInTable ()

    return currentScoreTable
}

function setPlayerNameInTable() {
    let playerNameCell = document.getElementById('player1Name')
    let currentPlayerName = readFromStorage('player')

    if (currentPlayerName) {
        playerNameCell.textContent = currentPlayerName.name
    } else if (currentPlayerName === undefined ) {

    }

}

function setComputerNameInTable () {
    let playerNameCell = document.getElementById('player2Name')
    let currentPlayerName = new ScoreTable

    playerNameCell.textContent = currentPlayerName.secondPlayer
}

function scoreTableResultSum() {
    let turnScore = readFromStorage('currentTurn')
      console.log(turnScore)
      let sum = 0;
      for (const dice of turnScore.dices) {
        sum += dice.value;
      }
      
    let tableCell = document.getElementById('mark')
    tableCell.textContent = sum

    console.log("Sum of all 'value' properties:", sum);
      
}



export {initializeScoreTable, scoreTableResultSum}
