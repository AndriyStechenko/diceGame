
function saveToStorage(key, data) {
  const jsonData = JSON.stringify(data);
  console.log('saveToStorage...', key, jsonData );
  localStorage.setItem(key, jsonData);
}

function readFromStorage(key) {
  const jsonData = localStorage.getItem(key);
  const data = JSON.parse(jsonData);
  console.log('readFromStorage...', key, data );
  return data;
}

function deleteFromStorage(key) {
  return localStorage.removeItem(key);
}

export {saveToStorage, readFromStorage, deleteFromStorage};
