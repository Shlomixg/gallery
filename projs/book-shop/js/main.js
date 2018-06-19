'use strict';

function unitTesting() {
    addBook('The Lord Of The Rings: The Fellowship of the Ring', 19.99);
    addBook('The Lord Of The Rings: The Two Towers', 19.99);
    addBook('The Lord Of The Rings: The Return of the King', 19.99);
    addBook('The Lord Of The Rings: The Collection', 54.99);
    addBook('A Song of Ice and Fire: A Game of Thrones', 18.99);
    addBook('A Song of Ice and Fire: A Clash of Kings', 19.99);
    addBook('A Song of Ice and Fire: A Storm of Swords', 21.99);
    addBook('A Song of Ice and Fire: A Feast for Crows', 21.99);
    addBook('A Song of Ice and Fire: A Dance with Dragons', 29.99);
    addBook('DREAM TEAM', 99.99);
    addBook('The Great Gatsby', 49.99);
    addBook('The Godfather', 49.99);
    addBook('The Adventures of Shrelock Holmes', 49.99);
}

function init() {
    gBooks = loadBooks();
    if (!gBooks || gBooks.length === 0) {
        gBooks = [];
        unitTesting();
        saveBooks(gBooks);
    }
    renderBooks();
}

function renderBooks() {
    $('.books-table tbody').html('');
    var page = 0;
    var books = getBooksForDisplay();
    for (var i = 0; i < books.length; i++) {
        if (i % gBooksPerPage === 0) page++;
        renderBookRow(books[i], page);
    }
    renderPagination(page);
}

function renderPagination() {
    var pagesCount = Math.ceil( gBooks.length / gBooksPerPage );

    $('.pagination').html('');
    for (var i = 1; i <= pagesCount; i++) {
        var isActive = (i === gCurrPage) ? 'active' : '';
        $('.pagination').append(`<li class="page-item ${isActive}">
                                    <a class="page-link" href="#" onclick="movePage(${i})">${i}</a>
                                 </li>`);
    }
}

function renderBookRow(book, page) {
    var bookPrice = (+book.price).toFixed(2);
    $('.books-table tbody').append(
        `<tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${bookPrice}</td>
            <td>
                <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#bookDetails" onclick="onReadBook(${book.id})">Read</button>
            </td>
            <td>
                <button type="button" class="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#updateBook" onclick="readToUpdateBook(${book.id})">Update</button>
            </td>
            <td>
                <button type="button" class="btn btn-outline-danger btn-sm" onclick="onDeleteBook(${book.id})">Delete</button>
            </td>
        </tr>`);
}

function movePage(pageNum) {
    setCurrentPage(pageNum++)
    renderBooks();
}

function onReadBook(bookID) {
    var book = getBookByID(bookID);
    $('.modal.bookDetails h5').text(`${book.title}`);
    $('.field.price').text(`${book.price}`);
    $('.field.rate').text(`${book.rate}`);
    $('.cover').attr('src', `img/${book.cover}`);
    $('.thumb-up').attr('onclick', `upVoteRate(${book.id})`);
    $('.thumb-down').attr('onclick', `downVoteRate(${book.id})`);
}

function readToUpdateBook(bookID) {
    var book = getBookByID(bookID);
    $('.modal.updateBook h5').text(`${book.title}`);
    $('.inputTitle').val('');
    $('.inputPrice').val(`${book.price}`);
    $('.btn-update-book').attr('onclick', `onUpdateBook(${book.id})`);
}

function onUpdateBook(bookID) {
    var newTitle = $('.inputTitle').val();
    var newPrice = $('.inputPrice').val();
    if (!newPrice || newPrice < 0) return;
    updateBook(bookID, newTitle, newPrice);
    renderBooks();
}

function onDeleteBook(bookID) {
    deleteBook(bookID);
    renderBooks();
}

function readAndAddNewBook() {
    var title = $('.in-book-title').val();
    var price = $('.in-book-price').val();
    if (!title || !price || price < 0) return;
    addBook(title, price);
    renderBooks();
    // Clear input data
    $('.in-book-title').val('');
    $('.in-book-price').val('');
}

function upVoteRate(bookID) {
    var book = getBookByID(bookID);
    if (book.rate < 10) {
        updateBookRate(book, 'up');
        $('.field.rate').text(`${book.rate}`);
    }
    if (book.rate === 1) {
        $('.thumb-down').hover(function () {
            $(this).css('cursor', 'pointer');
        });
    }
    if (book.rate >= 10) {
        $('.thumb-up').hover(function () {
            $(this).css('cursor', 'not-allowed');
        });
    }
}

function downVoteRate(bookID) {
    var book = getBookByID(bookID);
    if (book.rate > 0) {
        updateBookRate(book, 'down');
        $('.field.rate').text(`${book.rate}`);
    }
    if (book.rate === 9) {
        $('.thumb-up').hover(function () {
            $(this).css('cursor', 'pointer');
        });
    }
    if (book.rate <= 0) {
        $('.thumb-down').hover(function () {
            $(this).css('cursor', 'not-allowed');
        });
    }
}

function onSortBy(str) {
    if (str === 'id') sortByID(gBooks);
    else if (str === 'title') sortByAlphabet(gBooks);
    else if (str === 'price') sortByPrice(gBooks);

    renderBooks();
}