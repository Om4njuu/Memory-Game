const gameBoard = document.querySelector('.game-board');
const restartButton = document.getElementById('restart');

const icons = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍍', '🥭'];
let cards = [...icons, ...icons]; // Duplicate icons for matching pairs

let firstCard, secondCard;
let lockBoard = false;
let matches = 0;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    shuffle(cards);
    gameBoard.innerHTML = '';
    cards.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon;
        card.innerHTML = icon;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
    matches++;
    if (matches === icons.length) {
        setTimeout(() => alert('Congratulations! You found all matches!'), 500);
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function restartGame() {
    matches = 0;
    createBoard();
}

restartButton.addEventListener('click', restartGame);

createBoard();
