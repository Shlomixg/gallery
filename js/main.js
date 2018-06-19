console.log('Starting up');

function initPage() {
    createProjects();
    renderProjects();
}

function renderProjects() {
    gProjs.forEach(function (proj) {
        $('#portfolio .project-items').append(`
        <div class="col-md-3 col-sm-6 mx-2 mb-3 p-0 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" onclick="renderModal(${proj.id})" href="#portfolioModal">
                <div class="portfolio-hover">
                    <div class="portfolio-hover-content">
                        <i class="fa fa-plus fa-3x"></i>
                    </div>
                </div>
                <img class="img-fluid" src="img/portfolio/${proj.id}.png" alt="${proj.title}">
            </a>
            <div class="portfolio-caption">
                <h4>${proj.name}</h4>
                <p class="text-muted">${proj.title}</p>
            </div>
        </div>`);
    });
}

function renderModal(projID) {
    var proj = getProjByID(projID);
    var date = (proj.publishedAt);
    date = date.toLocaleDateString('it');
    // var date = date.toLocaleDateString('he-IL');
    $('.modal-body h2').text(proj.name);
    $('.item-intro').text(proj.title);
    $('.item-desc').text(proj.desc);
    $('.item-date').text(date);
    $('.item-labels').html('');
    $('.item-labels').append(createLabels(proj));
    $('.item-img').attr('src', `img/portfolio/${proj.id}.png`);
    $('.open-proj').attr('href', proj.url);
}

function createLabels(proj) {
    var labels = proj.labels;
    var strHTML = ''
    labels.forEach(function (label) {
        strHTML += `<span class="badge badge-info m-1">${label}</span>`;
    });
    return strHTML;
}

function createProjects() {
    addProject('In-Picture', 'A lot of gifs and questions', 'A lot Gifs and easy questions. Identify every character, anwer and win. What can go wrong? Have Fun!',
        'projs/in-picture/index.html', new Date('06/05/2018'), ['in-picture', 'flex', 'gif', 'button', 'answer', 'game']);
    addProject('Touch-Nums', 'Speed and precision', 'Click on numbers in the right order. It\'s not easy like it sounds',
        'projs/touch-nums/index.html', new Date('05/29/2018'), ['touch-nums', 'flex', 'table', 'hover', 'game']);
    addProject('Mine Sweeper', 'Mine, Survive, Win', 'Find Mines, disarm, and win the game. Can you do it?',
        'projs/Sprint1/3-Sat/index.html', new Date('06/02/2018'), ['minesweeper', 'flex', 'table', 'hover', 'game', 'score']);
    addProject('Pacman', 'Speed, Food and Fun', 'Eat cherries, points and weak ghosts to win',
        'projs/Pacman/index.html', new Date('06/07/2018'), ['pacman', 'flex', 'table', 'game', 'render']);
    addProject('Calculator', 'Numbers, right? Calc them!', 'The BEST Calculator ever. Try it.',
        'projs/calc/index.html', new Date('05/29/2018'), ['calc', 'table', 'hover', 'not-game']);
    addProject('Ball board', 'Speed and precision. Not really.', 'Can you collect all the balls and break the record? Probably yes, it\'s easy',
        'projs/ball-board/index.html', new Date('05/29/2018'), ['Ball board', 'table', 'game']);
    addProject('Todo App', 'Manage your time better', 'A simple todo app to manage your time. Because simple is better.',
        'projs/Todo/index.html', new Date('06/09/2018'), ['Todo', 'table', 'not-game']);
    addProject('Book Shop', 'Your own book shop!', 'Manage easily your online book shop. Don\'t bankrupt!',
        'projs/book-shop/index.html', new Date('06/12/2018'), ['Book Shop', 'Books', 'table', 'not-game']);
    addProject('Guess Me', 'The computer will read you mind', 'Think on personality, The computer will do the rest',
        'projs/GuessMe/index.html', new Date('06/15/2018'), ['Guess', 'Computer', 'Flex', 'game']);
        addProject('Blogin', 'Blog, Blog, Blog', 'Example to responsive blogs site',
        'projs/psdToHtml/index.html', new Date('06/17/2018'), ['Blogin', 'Blog', 'Flex', 'Responsive', 'Mobile']);
}

function sendMail() {
    var adminMail = 'shlomixg@gmail.com';
    var mail = $('#inputEmail').val();
    var subject = $('#inputSubject').val();
    var body = $('#contactTextArea').val();
    strHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${adminMail}&su=${subject}&body=${body}&bcc=${mail}`;
    window.open(`${strHref}`, '_blank');
}

function openProj(url) {
    window.open(url, '_blank');
}