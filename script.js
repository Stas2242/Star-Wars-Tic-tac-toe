'use strict'

const cells = document.querySelectorAll('.cell') 
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let currentPlayer = 'X'
let gameActive = true
let gameState = ['', '', '', '', '', '', '', '', '']
const gameStatus = document.querySelector('.game--status')
const buttonRestart = document.querySelector('.game--restart')
let stepxAudio = new Audio('audio/stepx.mp3')
let stepoAudio = new Audio('audio/stepo.mp3')

function init(event) {
    if (event.target.textContent === '') {
        gameState[event.target.dataset.cellIndex] = currentPlayer;       
        event.target.innerHTML = currentPlayer;
        if (currentPlayer === 'X') {
            stepxAudio.play();
        } else {stepoAudio.play();}
        win();
        changePlayer();
        if (!gameState.includes('') && gameActive) {
            gameStatus.innerHTML = 'Draw';
        }  

    } else {
        alert('Oops! Try another cell');
    }
}

function changePlayer() {
    if (gameActive) {
    (currentPlayer === 'X') ? (currentPlayer = 'O'):(currentPlayer = 'X');
    gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;
    }
}

function win() {
    for (let i = 0; i < winCombinations.length; i++) {
        
        const firstLine = gameState[winCombinations[i][0]]
        const secondLine = gameState[winCombinations[i][1]]
        const thirdLine = gameState[winCombinations[i][2]]
        
        if (firstLine === '' || secondLine === '' || thirdLine === '') {
            continue;
        }

        if (firstLine === secondLine && secondLine === thirdLine) {
            cells.forEach (cell => {
                cell.removeEventListener('click', init);
            })
            
            gameActive = false;
            gameStatus.innerHTML = `${currentPlayer} wins!`;    
        }
    }
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameStatus.innerHTML = `It's X's turn`;
    cells.forEach(cell => cell.innerHTML = '');
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach (cell => {
        cell.addEventListener('click', init);
    }) 
}

cells.forEach (cell => {
    cell.addEventListener('click', init);
})   

buttonRestart.addEventListener('click', restartGame)