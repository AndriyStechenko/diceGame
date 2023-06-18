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
    }
}

function setComputerNameInTable () {
    let playerNameCell = document.getElementById('player2Name')
    let currentPlayerName = new ScoreTable
    playerNameCell.textContent = currentPlayerName.secondPlayer
}

function scoreTableResultSum() {
    let sum
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
    console.log(currentScoreTable)
}

function createResultTable() {
    const tableContainer = document.getElementById('resalt-table-section');
    const table = document.createElement('table');
    table.className = 'table';
  
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
  
    let existingScoreTable = readFromStorage('currentScoreTable');
    let headers = ['#', existingScoreTable.firstPlayer, existingScoreTable.secondPlayer];
  
    headers.forEach((headerText) => {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent = headerText;
      headRow.appendChild(th);
    });
  
    thead.appendChild(headRow);
    table.appendChild(thead);
  
    const tbody = document.createElement('tbody');
  
    for (let columnNumber = 1; columnNumber <= 6; columnNumber++) {
      const row = document.createElement('tr');
  
      const rowHeader = document.createElement('th');
      rowHeader.scope = 'row';
      rowHeader.textContent = i;
  
      const player1Cell = document.createElement('td');
      const player2Cell = document.createElement('td');

      row.appendChild(rowHeader);
      row.appendChild(player1Cell);
      row.appendChild(player2Cell);
  
      tbody.appendChild(row);
    }
  
    const remainingRowsData = [
      { text: 'Combo', colspan: 2, content: '***' },
      { text: 'Small strit', colspan: 2, content: '' },
      { text: 'Big Strit', colspan: 2, content: '' },
      { text: 'Full', colspan: 2, content: '' },
      { text: 'Success', colspan: 2, content: '' },
      { text: 'Pocker', colspan: 2, content: '' },
      { text: 'Total Score', colspan: 2, content: '' },
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
