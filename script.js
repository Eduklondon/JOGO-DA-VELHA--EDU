document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartBtn = document.getElementById('restartBtn');

    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        checkResult();
        togglePlayer();
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.innerHTML = `É a vez do jogador ${currentPlayer}`;
    }

    function checkResult() {
        for (let i = 0; i < winningCombos.length; i++) {
            const [a, b, c] = winningCombos[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                status.innerHTML = `O jogador ${currentPlayer} ganhou!`;
                gameActive = false;
                return;
            }
        }

        if (!gameState.includes('')) {
            status.innerHTML = 'Empate!';
            gameActive = false;
            return;
        }
    }

    function restartGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.innerHTML = `É a vez do jogador ${currentPlayer}`;
        cells.forEach(cell => {
            cell.innerHTML = '';
        });
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartBtn.addEventListener('click', restartGame);
});