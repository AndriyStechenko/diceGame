import ScoreTable from "../models/scoreTable.js"
import {readFromStorage, saveToStorage} from '../modules/storage.js'


function initializeScoreTable() {
    let currentScoreTable = new ScoreTable

    setPlayerNameInTable()
    setComputerNameInTable ()

    return currentScoreTable
}

function makeScoretableVisible () {
    let scoreTableContainer = document.getElementById("resalt-table-section");
    scoreTableContainer.classList.remove('invisible');
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

let sum
function scoreTableResultSum() {
    let turnScore = readFromStorage('currentTurn')
      sum = 0;
      for (const dice of turnScore.dices) {
        sum += dice.value;
      }
    
    let firstTurnRow = document.querySelector("#resalt-table-section tbody tr:nth-child(1)")
    const firstTdNode = firstTurnRow.querySelector("td");
    firstTdNode.textContent = sum

    return sum
}

function createScoretable () {
    let currentScoreTable = new ScoreTable

    saveToStorage ('currentScoreTable', currentScoreTable)
    return currentScoreTable
}

function addPlayersNameToScoreTable () {
    let currentTurn = readFromStorage('currentTurn')
    let existingScoreTable = readFromStorage('currentScoreTable')
    let currentScoreTable = new ScoreTable
    if (existingScoreTable) {
        currentScoreTable.firstPlayer = currentTurn.player
    }
    saveToStorage('currentScoreTable', currentScoreTable )
    return currentScoreTable
}

function addPlayerScoreToScoreTable () {
    let currentTurn = readFromStorage('currentTurn')
    let existingScoreTable = readFromStorage('currentScoreTable')
    let currentScoreTable = new ScoreTable
    if (existingScoreTable) {
        currentScoreTable.firstPlayer = currentTurn.player
        currentScoreTable.firstPlayerTotal = currentTurn.dicesSum
    }

    saveToStorage('currentScoreTable', currentScoreTable )

    return currentScoreTable
}

function setPlayerTurnsInfoToScoreTable () {
    let currentTurn = readFromStorage('currentTurn')
    let existingScoreTable = readFromStorage('currentScoreTable')
    let currentScoreTable = new ScoreTable
    if (existingScoreTable) {
        currentScoreTable.firstPlayer = currentTurn.player
        currentScoreTable.firstPlayerTotal = currentTurn.dicesSum
        currentScoreTable.firstPlayerTurnsHistory = currentTurn
        
    }

    saveToStorage('currentScoreTable', currentScoreTable )

    return currentScoreTable
}




function readScoreTable () {
    let currentScoreTable = readFromStorage('currentScoreTable')
    console.log (currentScoreTable)
}


function createResultTable() {
    const tableContainer = document.getElementById('resalt-table-section');
    const table = document.createElement('table');
    table.className = 'table';
  
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
  
    let existingScoreTable = readFromStorage('currentScoreTable');
    let headers = ['#', existingScoreTable.firstPlayer, existingScoreTable.secondPlayer, 'Player#3'];
  
    headers.forEach((headerText) => {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent = headerText;
      headRow.appendChild(th);
    });
  
    thead.appendChild(headRow);
    table.appendChild(thead);
  
    const tbody = document.createElement('tbody');
  
    for (let i = 1; i <= 6; i++) {
      const row = document.createElement('tr');
  
      const rowHeader = document.createElement('th');
      rowHeader.scope = 'row';
      rowHeader.textContent = i;
  
      const player1Cell = document.createElement('td');
      const player2Cell = document.createElement('td');
      const player3Cell = document.createElement('td');
  
      row.appendChild(rowHeader);
      row.appendChild(player1Cell);
      row.appendChild(player2Cell);
      row.appendChild(player3Cell);
  
      tbody.appendChild(row);
    }
  
    const remainingRowsData = [
      { text: 'Combo', colspan: 3, content: '***' },
      { text: 'Small strit', colspan: 3, content: '' },
      { text: 'Big Strit', colspan: 3, content: '' },
      { text: 'Full', colspan: 3, content: '' },
      { text: 'Success', colspan: 3, content: '' },
      { text: 'Pocker', colspan: 3, content: '' },
      { text: 'Total Score', colspan: 3, content: '' },
    ];
  
    remainingRowsData.forEach((rowData) => {
      const row = document.createElement('tr');
  
      const rowHeader = document.createElement('th');
      rowHeader.scope = 'row';
      rowHeader.textContent = rowData.text;
  
      const cell = document.createElement('td');
      cell.colSpan = rowData.colspan;
      cell.textContent = rowData.content;
  
      row.appendChild(rowHeader);
      row.appendChild(cell);
  
      tbody.appendChild(row);
    });
  
    table.appendChild(tbody);
  
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
    scoreTableResultSum()
  }
  
export {initializeScoreTable, scoreTableResultSum, makeScoretableVisible, createScoretable, addPlayersNameToScoreTable, addPlayerScoreToScoreTable, readScoreTable, setPlayerTurnsInfoToScoreTable, createResultTable}
