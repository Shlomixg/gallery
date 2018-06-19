'use strict';

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

// Paginate an array (Source: https://stackoverflow.com/questions/42761068/paginate-javascript-array)
function paginate(arr, pageSize, pageNumber) {
	--pageNumber; // because pages logically start with 1, but technically with 0
	return arr.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
}
