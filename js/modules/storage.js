
function saveToStorage (key, data) {
    let jsonData = JSON.stringify(data)
    console.log('saveToStorage...', key, jsonData )
    localStorage.setItem(key, jsonData)
}

function readFromStorage (key) {
   let jsonData = localStorage.getItem(key)
   let data = JSON.parse(jsonData)
   console.log('readFromStorage...', key, data )
    return data
}

export {saveToStorage, readFromStorage}