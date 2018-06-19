'use strict';

var gBooks = [];
var gBookID = 1;
var gBooksPerPage = 5;
var gCurrPage = 1;

var BOOKS_KEY = 'books';

function getBookByID(id) {
    for (var i = 0; i < gBooks.length; i++) {
        if (id === gBooks[i].id) return gBooks[i];
    }
}

function addBook(title, price) {
    var book = {
        id: gBookID,
        title: title,
        price: price,
        cover: `${gBookID++}.jpg`,
        rate: 0
    }
    gBooks.push(book);
    return book;
}

function updateBook(bookID, bookTitle, bookPrice) {
    var book = getBookByID(bookID);
    book.price = bookPrice;
    if (bookTitle !== '') {
        book.title = bookTitle;
    }
}

function deleteBook(id) {
    for (var i = 0; i < gBooks.length; i++) {
        if (id === gBooks[i].id) gBooks.splice(i, 1);
    }
}

function updateBookRate(book, op) {
    if (op === 'up') book.rate++;
    else if (op === 'down') book.rate--;
}

function sortByID(arr) {
    arr.sort(function (item1, item2) {
        return item1.id - item2.id;
    });
}

function sortByAlphabet(arr) {
    arr.sort(function (item1, item2) {
        var title1 = item1.title.toUpperCase();
        var title2 = item2.title.toUpperCase();
        if (title1 < title2) return -1;
        if (title1 > title2) return 1;
        return 0;
    });
}

function sortByPrice(arr) {
    arr.sort(function (item1, item2) {
        return item1.price - item2.price;
    });
}

function saveBooks(books) {
    saveToStorage(BOOKS_KEY, books);
}

function loadBooks() {
    return loadFromStorage(BOOKS_KEY);
}

// Set/update current page
function setCurrentPage(pageNum) {
    gCurrPage = pageNum;
}

// Retrieve the books the will be displayed on screen
function getBooksForDisplay() {
    var books = gBooks.slice();
    // Paginate Books
    books = paginate(books, gBooksPerPage, gCurrPage);
    return books;
}