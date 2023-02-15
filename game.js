function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-name">PLAYER NAME</span>!';

    gameOverElement.style.display = 'none';

    let gameBoardIndex = 0;
    for(let i=0; i<3; i++)
    {
        for(let j=0; j<3; j++)
        {
            gameData[i][j] = 0;
            const gameBoardItemElement = gameBoradElement.children[gameBoardIndex];
            gameBoardItemElement.textContent = '';
            gameBoardItemElement.classList.remove('disabled');
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
    if(players[0].name === '' || players[1].name === '')
    {
        alert('Please set custom player names for both players!');
        return;
    }

    resetGameStatus();
    
    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
}

function switchPlayer() {
    if(activePlayer === 0)
    {
        activePlayer = 1;
    }
    else
    {
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    if(event.target.tagName !== 'LI' || gameIsOver)
    {
        return;
    }

    const selectedField = event.target;
    const selectColumn = selectedField.dataset.col - 1;
    const selectRow = selectedField.dataset.row - 1;

    if(gameData[selectRow][selectColumn] > 0)
    {
        alert('Please select an empty field!');
        return;
    }

    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add('disabled');


    gameData[selectRow][selectColumn] = activePlayer + 1;

    const winnerID = checkForGameOver();

    if(winnerID !== 0)
    {
        endGame(winnerID);
    }

    currentRound += 1;
    switchPlayer();
}

function checkForGameOver() {
    // Checking for rows
    for(let i=0; i<3; i++)
    {
        if(gameData[i][0] > 0 && gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2])
        {
            return gameData[i][0];
        }
    }

    // Checking for columns
    for(let i=0; i<3; i++)
    {
        if(gameData[0][i] > 0 && gameData[0][i] === gameData[1][i] && gameData[1][i] === gameData[2][i])
        {
            return gameData[0][i];
        }
    }

    // Checking for diagonals
    if(gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2])
    {
        return gameData[0][0];
    }

    if(gameData[0][2] > 0 && gameData[0][2] === gameData[1][1] && gameData[1][1] === gameData[2][0])
    {
        return gameData[0][2];
    }

    if(currentRound === 9)
    {
        return -1;
    }
    return 0;
}

function endGame(winnerID) {
    gameIsOver = true;

    gameOverElement.style.display = 'block';
    if(winnerID > 0)
    {
        gameOverElement.firstElementChild.firstElementChild.textContent = players[winnerID - 1].name;
    }
    else
    {
        gameOverElement.firstElementChild.textContent = 'It\'s a Draw!'
    }
}