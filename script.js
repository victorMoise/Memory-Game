let gridSize = 4; // Default grid size
let sequence = [];
let userInputSequence = [];
let isGameActive = false;

function getDifficulty() {
    return document.getElementById("difficulty").value;
}

function startGame() {
    gridSize = parseInt(document.getElementById('grid-size').value, 10);

    if (gridSize < 2 || gridSize > 15) {
        alert('Please enter a grid size between 2 and 15.');
        return;
    }

    sequence = generateRandomSequence();
    userInputSequence = [];
    isGameActive = true;
    renderGrid();
}

function generateRandomSequence() {
    const difficulty = getDifficulty();
    const sequence = [];
    for (let i = 0; i < gridSize + difficulty * 2; i++) {
        sequence.push(Math.floor(Math.random() * (gridSize * gridSize)));
    }
    return sequence;
}

function renderGrid() {
    const gameGrid = document.getElementById('game-grid');
    gameGrid.innerHTML = '';
    gameGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = i;
        cardElement.addEventListener('click', handleCardClick);
        gameGrid.appendChild(cardElement);
    }

    if (isGameActive) {
        playSequence();
    }
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        const cardIndex = sequence[i];
        const card = document.querySelectorAll('.card')[cardIndex];
        card.classList.add('active');
        setTimeout(() => {
            card.classList.remove('active');
        }, 500);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 1000);
}

function handleCardClick(event) {
    if (!isGameActive) return;

    const selectedCard = event.target;
    const selectedCardIndex = parseInt(selectedCard.dataset.index, 10);
    
    selectedCard.classList.add('clicked'); // Add the 'clicked' class to change color
    setTimeout(() => {
        selectedCard.classList.remove('clicked');
    }, 300);

    userInputSequence.push(selectedCardIndex);

    if (userInputSequence.length === sequence.length) {
        clearInterval(interval);
        checkUserInput();
    } else if (sequence[userInputSequence.length - 1] !== userInputSequence[userInputSequence.length - 1]) {
        handleWrongClick(selectedCard);
    }
}

function handleWrongClick(card) {
    card.classList.add('wrong'); // Add the 'wrong' class to flash red
    setTimeout(() => {
        card.classList.remove('wrong');
        endGame();
    }, 500);
}

function endGame() {
    isGameActive = false;
    alert('Wrong sequence. Game Over!');
}

function checkUserInput() {
    for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] !== userInputSequence[i]) {
            alert('Wrong sequence. Game Over!');
            isGameActive = false;
            return;
        }   
    }
    alert('Congratulations! You completed the sequence!');
    isGameActive = false;
}
