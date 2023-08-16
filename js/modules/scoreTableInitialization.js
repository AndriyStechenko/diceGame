import ScoreTable from '../models/scoreTable.js';
import {readFromStorage, saveToStorage} from '../modules/storage.js';

function initializeScoreTable() {
  const currentScoreTable = new ScoreTable;
  currentScoreTable.setFirstPlayerName();
  currentScoreTable.setFirstPlayerTurns();
  currentScoreTable.setFirstPlayerTotalScore();
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
  if (playerNameCell) {
    playerNameCell.textContent = currentScoreTable.firstPlayer;
  } else {
    const resaltTableSection = document.getElementById('resalt-table-section');
    const playerNameCell = resaltTableSection.querySelector('th:nth-child(2)');
    playerNameCell.textContent = currentScoreTable.firstPlayer;
  }
}

function showSecondPlayerInTable(currentScoreTable) {
  const playerNameCell = document.getElementById('player2Name');
  if (playerNameCell) {
    playerNameCell.textContent = currentScoreTable.secondPlayer;
  } else {
    const resaltTableSection = document.getElementById('resalt-table-section');
    const playerNameCell = resaltTableSection.querySelector('th:nth-child(3)');
    playerNameCell.textContent = currentScoreTable.secondPlayer;
  }
}

function scoreTableResultSum() {
  let sum = 0;
  const currentTurn = readFromStorage('currentTurn');
  // for (const dice of currentTurn.dices) {
  //   sum += dice.value;
  // }
  sum = currentTurn.dicesSum;
  return sum;
}

function createScoreTable(currentScoreTable) {
  saveToStorage('currentScoreTable', currentScoreTable);
  return currentScoreTable;
}

function addPlayerScoreToScoreTable(currentScoreTable) {
  const currentTurn = readFromStorage('currentTurn');
  if (currentScoreTable) {
    currentScoreTable.firstPlayer = currentTurn.player;
    currentScoreTable.firstPlayerTotal = currentTurn.dicesSum;
  }
  saveToStorage('currentScoreTable', currentScoreTable );

  return currentScoreTable;
}

function setPlayerTurnsInfoToScoreTable() {
  const currentTurn = readFromStorage('currentTurn');
  const currentScoreTable = readFromStorage('currentScoreTable');

  if (currentScoreTable) {
    currentScoreTable.firstPlayer = currentTurn.player;
    currentScoreTable.firstPlayerTotal = currentTurn.dicesSum;
    currentScoreTable.firstPlayerComboUsed = currentTurn.usedCombo;
    currentScoreTable.firstPlayerTurns.push(currentTurn);
  }

  saveToStorage('currentScoreTable', currentScoreTable );

  return currentScoreTable;
}

function readScoreTable() {
  const currentScoreTable = readFromStorage('currentScoreTable');
  console.log(currentScoreTable);
}

// function createResultTable() {
//   const tableContainer = document.getElementById('resalt-table-section');
//   const table = document.createElement('table');
//   table.className = 'table';

//   const thead = document.createElement('thead');
//   const headRow = document.createElement('tr');

//   // const existingScoreTable = readFromStorage('currentScoreTable');
//   const currentScoreTable = readFromStorage('currentScoreTable');

//   const headers = ['#', currentScoreTable.firstPlayer, currentScoreTable.secondPlayer];

//   headers.forEach((headerText) => {
//     const th = document.createElement('th');
//     th.scope = 'col';
//     th.textContent = headerText;
//     headRow.appendChild(th);
//   });

//   thead.appendChild(headRow);
//   table.appendChild(thead);

//   const tbody = document.createElement('tbody');

//   for (let turnRowNumer = 1; turnRowNumer <= 6; turnRowNumer++) {
//     const row = document.createElement('tr');

//     const rowHeader = document.createElement('th');
//     rowHeader.scope = 'row';
//     rowHeader.textContent = turnRowNumer;

//     const player1Cell = document.createElement('td');
//     const player2Cell = document.createElement('td');

//     const firstPlayerTurn = currentScoreTable.firstPlayerTurns[turnRowNumer - 1];
//     player1Cell.textContent = firstPlayerTurn ? firstPlayerTurn.dicesSum : '-';

//     const secondPlayerTurn = currentScoreTable.secondPlayerTurns[turnRowNumer - 1];
//     player2Cell.textContent = secondPlayerTurn ? secondPlayerTurns.dicesSum : '-';

//     row.appendChild(rowHeader);
//     row.appendChild(player1Cell);
//     row.appendChild(player2Cell);

//     tbody.appendChild(row);
//   }


//   const remainingRowsData = [
//     {text: 'Combo', colspan: 2, content: '***'},
//     {text: 'Small strit', colspan: 2, content: ''},
//     {text: 'Big Strit', colspan: 2, content: ''},
//     {text: 'Full', colspan: 2, content: ''},
//     {text: 'Success', colspan: 2, content: ''},
//     {text: 'Pocker', colspan: 2, content: ''},
//     {text: 'Total Score', colspan: 2, content: ''},
//   ];

//   remainingRowsData.forEach((rowData) => {
//     const row = document.createElement('tr');

//     const rowHeader = document.createElement('th');
//     rowHeader.scope = 'row';
//     rowHeader.textContent = rowData.text;

//     const cell = document.createElement('td');
//     cell.colSpan = rowData.colspan;
//     cell.textContent = rowData.content;

//     row.appendChild(rowHeader);
//     row.appendChild(cell);

//     tbody.appendChild(row);
//   });

//   table.appendChild(tbody);

//   tableContainer.innerHTML = '';
//   tableContainer.appendChild(table);
// }

function createResultTable() {
  const tableContainer = document.getElementById('resalt-table-section');
  const table = document.createElement('table');
  table.className = 'table';

  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');

  const currentScoreTable = readFromStorage('currentScoreTable');

  const headers = ['#', currentScoreTable.firstPlayer, currentScoreTable.secondPlayer];

  headers.forEach((headerText) => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = headerText;
    headRow.appendChild(th);
  });

  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  for (let turnRowNumber = 1; turnRowNumber <= 6; turnRowNumber++) {
    const row = document.createElement('tr');

    const rowHeader = document.createElement('th');
    rowHeader.scope = 'row';
    rowHeader.textContent = turnRowNumber;

    const player1Cell = document.createElement('td');
    const player2Cell = document.createElement('td');

    const firstPlayerTurn = currentScoreTable.firstPlayerTurns[turnRowNumber - 1];
    player1Cell.textContent = firstPlayerTurn ? firstPlayerTurn.dicesSum : '-';

    const secondPlayerTurn = currentScoreTable.secondPlayerTurns[turnRowNumber - 1];
    player2Cell.textContent = secondPlayerTurn ? secondPlayerTurn.dicesSum : '-';

    row.appendChild(rowHeader);
    row.appendChild(player1Cell);
    row.appendChild(player2Cell);

    tbody.appendChild(row);
  }

  // Add combo rows
  const comboRowsData = [
    {text: 'Combo', content: '***'},
    {text: 'Small strit', content: ''},
    {text: 'Big Strit', content: ''},
    {text: 'Full', content: ''},
    {text: 'Success', content: ''},
    {text: 'Pocker', content: ''},
    {text: 'Total Score', content: ''},
  ];

  comboRowsData.forEach((rowData) => {
    const row = document.createElement('tr');

    const rowHeader = document.createElement('th');
    rowHeader.scope = 'row';
    rowHeader.textContent = rowData.text;

    const cell = document.createElement('td');
    cell.colSpan = 2;
    cell.textContent = rowData.content;

    row.appendChild(rowHeader);
    row.appendChild(cell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  tableContainer.innerHTML = '';
  tableContainer.appendChild(table);
}


export {initializeScoreTable, scoreTableResultSum, showScoreTable, createScoreTable, addPlayerScoreToScoreTable, readScoreTable, setPlayerTurnsInfoToScoreTable, createResultTable};
