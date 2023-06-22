import ScoreTable from '../models/scoreTable.js';
import {readFromStorage, saveToStorage} from '../modules/storage.js';


function initializeScoreTable() {
  const currentScoreTable = new ScoreTable;
  currentScoreTable.setFirstPlayerName();

  showFirstPlayerInTable(currentScoreTable);
  showSecondPlayerInTable(currentScoreTable);

  return currentScoreTable;
}

function showScoreTable() {
  const scoreTableContainer = document.getElementById('resalt-table-section');
  scoreTableContainer.classList.remove('invisible');
}

function showFirstPlayerInTable(currentScoreTable) {
  const playerNameCell = document.getElementById('player1Name');
  playerNameCell.textContent = currentScoreTable.firstPlayer.name;
}

function showSecondPlayerInTable(currentScoreTable) {
  const playerNameCell = document.getElementById('player2Name');
  playerNameCell.textContent = currentScoreTable.secondPlayer.name;
}

function scoreTableResultSum() {
  let sum = 0;
  const turnScore = readFromStorage('currentTurn');
  for (const dice of turnScore.dices) {
    sum += dice.value;
  }

  const firstTurnRow = document.querySelector('#resalt-table-section tbody tr:nth-child(1)');
  const firstTdNode = firstTurnRow.querySelector('td');
  firstTdNode.textContent = sum;

  return sum;
}

function createScoreTable(currentScoreTable) {
  saveToStorage('currentScoreTable', currentScoreTable);
  return currentScoreTable;
}

function addPlayersNameToScoreTable() {
  const currentTurn = readFromStorage('currentTurn');
  const existingScoreTable = readFromStorage('currentScoreTable');
  const currentScoreTable = new ScoreTable;
  if (existingScoreTable) {
    currentScoreTable.firstPlayer = currentTurn.player;
  }
  saveToStorage('currentScoreTable', currentScoreTable );

  return currentScoreTable;
}

function addPlayerScoreToScoreTable() {
  const currentTurn = readFromStorage('currentTurn');
  const existingScoreTable = readFromStorage('currentScoreTable');
  const currentScoreTable = new ScoreTable;
  if (existingScoreTable) {
    currentScoreTable.firstPlayer = currentTurn.player;
    currentScoreTable.firstPlayerTotal = currentTurn.dicesSum;
  }
  saveToStorage('currentScoreTable', currentScoreTable );

  return currentScoreTable;
}

function setPlayerTurnsInfoToScoreTable() {
  const currentTurn = readFromStorage('currentTurn');
  const existingScoreTable = readFromStorage('currentScoreTable');
  const currentScoreTable = new ScoreTable;
  if (existingScoreTable) {
    currentScoreTable.firstPlayer = currentTurn.player;
    currentScoreTable.firstPlayerTotal = currentTurn.dicesSum;
    currentScoreTable.firstPlayerTurnsHistory = currentTurn;
  }
  saveToStorage('currentScoreTable', currentScoreTable );

  return currentScoreTable;
}

function readScoreTable() {
  const currentScoreTable = readFromStorage('currentScoreTable');
  console.log(currentScoreTable);
}

function createResultTable() {
  const tableContainer = document.getElementById('resalt-table-section');
  const table = document.createElement('table');
  table.className = 'table';

  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');

  const existingScoreTable = readFromStorage('currentScoreTable');
  const headers = ['#', existingScoreTable.firstPlayer.name, existingScoreTable.secondPlayer.name];

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
    rowHeader.textContent = columnNumber;

    const player1Cell = document.createElement('td');
    const player2Cell = document.createElement('td');

    row.appendChild(rowHeader);
    row.appendChild(player1Cell);
    row.appendChild(player2Cell);

    tbody.appendChild(row);
  }

  const remainingRowsData = [
    {text: 'Combo', colspan: 2, content: '***'},
    {text: 'Small strit', colspan: 2, content: ''},
    {text: 'Big Strit', colspan: 2, content: ''},
    {text: 'Full', colspan: 2, content: ''},
    {text: 'Success', colspan: 2, content: ''},
    {text: 'Pocker', colspan: 2, content: ''},
    {text: 'Total Score', colspan: 2, content: ''},
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
  scoreTableResultSum();
}

export {initializeScoreTable, scoreTableResultSum, showScoreTable, createScoreTable, addPlayersNameToScoreTable, addPlayerScoreToScoreTable, readScoreTable, setPlayerTurnsInfoToScoreTable, createResultTable};
