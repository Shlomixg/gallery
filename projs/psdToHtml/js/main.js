'use strict';

function toggleMenu(elBtn) {
    elBtn.classList.toggle('is-active');
    var elMenu = document.querySelector('.main-menu');
    elMenu.classList.toggle('open');
}

function toggleModal() {
    var elModal = document.querySelector('.modal');
    elModal.classList.toggle('open-modal');
}

function toggleDropdown() {
    // TODO: Make the generic function
    var elDropdown = document.querySelector('.dropdown-list');
    elDropdown.classList.toggle('open-dropdown');
}