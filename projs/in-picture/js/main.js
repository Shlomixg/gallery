'use strict';

// Global Variables
var gQuests = [];
var gCurrQuestIdx;
var gQuestsCount;
var gQuestID = 1;

function initGame() {
    gCurrQuestIdx = 0;
    createQuests();
    renderQuest();
}

function resetGame() {
    var elPlayButton = document.querySelector('.btn-play');
    elPlayButton.style.display = 'none';
    toggleButtonsDisplay(true);
    renderQuest();
    var elText = document.querySelector('.text');
    elText.innerText = ('Choose the correct answer');
}

function createQuests() {
    gQuests.push({ id: gQuestID++, opt: ['Andy', 'Woody', 'Buzz Lightyear', 'Zord'], correctOptIndex: 1 });
    gQuests.push({ id: gQuestID++, opt: ['Baby Groot', 'Groot', 'Vin Diesel'], correctOptIndex: 0 });
    gQuests.push({ id: gQuestID++, opt: ['Cristiano Ronaldo', 'Lionel Messi', 'Eran Zahavi', 'Loris Karius'], correctOptIndex: 2 });
    gQuestsCount = gQuests.length;
}

function renderQuest() {
    var currQuest = gQuests[gCurrQuestIdx];
    var elOptsDiv = document.querySelector('.opts');
    var strHTML = '';
    for (var i = 0; i < currQuest.opt.length; i++) {
        strHTML += '<button onclick="checkAnswer(' + i + ')" class="btn-answers">' + currQuest.opt[i] + '</button>';
    }
    elOptsDiv.innerHTML = strHTML;
    var elImg = document.querySelector('img');
    var imgType = (gCurrQuestIdx !== 2) ? '.gif' : '.png';
    var strImg = 'img/' + (gCurrQuestIdx + 1) + imgType;
    elImg.src = strImg;
}

function checkAnswer(optIdx) {
    if ((optIdx) === gQuests[gCurrQuestIdx].correctOptIndex) {
        gCurrQuestIdx++;
        if (gCurrQuestIdx >= gQuestsCount) {
            playerWon();
            return;
        }
        renderQuest();
    } else {
        console.log('Wrong. Try again');
    }
}

function playerWon() {
    gCurrQuestIdx = 0;
    console.log('You Won! Great Common Knowledge');
    var elImg = document.querySelector('img');
    elImg.src = 'img/victory.gif';
    var elPlayButton = document.querySelector('.btn-play');
    elPlayButton.style.display = 'inline-block';
    toggleButtonsDisplay(false);
    var elText = document.querySelector('.text');
    elText.innerText = ('You Won!');
}

function toggleButtonsDisplay(toDisplay) {
    var display = (toDisplay) ? 'inline-block' : 'none';
    var elOpts = document.querySelectorAll('.btn-answers');
    for (var i = 0; i < elOpts.length; i++) {
        elOpts[i].style.display = display;
    }
}