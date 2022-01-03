// Coding Steps:
//
// Using any of the tools you’ve worked with so far, 
//         create a game of tic-tac-toe.
// A heading should say whether it is X’s or O’s turn and change with 
//         each move made.
// Create a tic-tac-toe grid using your HTML element of choice. When a 
//         cell in the grid is clicked, an X or O should appear in 
//         that spot depending on whose turn it is.
// A button should be available to clear the grid and restart the game.
// When a player has won, or the board is full and the game results in
//         a draw, a Bootstrap alert or similar Bootstrap 
//         component should appear across the screen announcing the 
//         winner.


// DONE:  1. H1 Title for the Game
// DONE:  2. Develop 3 * 3 grid layout -- table with 9 buttons
// DONE:  3. Apply some CSS effects on the same. 
//           H3 -- Show text showing whose turn it is.
// DONE:  
//        4. Define a button to reset the game.
//          * redraw the table 
//          * alert box which appears and goes away
//          * reset winning strategy
//                  game_status['NO WINNER','','','','','','','','','']
//      NOTE:  index will be the position of the button
//              Winning combinations: 
//                  Horizontal:
//                      [1,2,3]
//                      [4,5,6]
//                      [7,8,9]
//                  Vertical:
//                      [1,4,7]
//                      [2,5,8]
//                      [3,6,9]
//                  Diagonal:
//                      [1,5,9]
//                      [3,5,7]
//



let gameId = 0; // always increments, never resets
let gameOver = false; // boolean, used to end the game

// increments during a game, reset when game is reset
let numOfTurn = 1; //turn counter

// play position array
let gameStatus = ['NO WINNER','','','','','','','','',''];

onClick('reset-game', () => {  
    let headerText = document.getElementById('turn');
    // let winAlert = document.getElementById('game-over');
    // winAlert.remove;
     // clear the winning strategy 
    gameStatus = ['NO WINNER','','','','','','','','',''];
    // reset turn counter 'numOfTurn' to 1
    numOfTurn = 1;
    gameOver = false;
    // clear the game and reset
    drawDOM();
    console.log('Tic-Tac-Toe Game Reset!');
    headerText.innerHTML = "Game restarted -- Turn #1: X's turn";

});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function drawDOM() {
    // clear the view, and re"draw" the table
    let tictactoeDiv = document.getElementById('game-page');
    for (let index=1; index<=9; index++ ) {
        //reset each button to original value
        document.getElementById(`btn-p-${index}`).innerHTML=index;
    }
    if (gameId > 0) {
        $('#restart-game').show();
    } else {
        let lineBreak = document.createElement('br');
        tictactoeDiv.appendChild(lineBreak);
        lineBreak = document.createElement('br');
        tictactoeDiv.appendChild(lineBreak);
        let alert = document.createElement('alert');
        alert.setAttribute('class', 'alert alert-success');
        alert.setAttribute('role', 'alert');
        alert.setAttribute('id', 'restart-game');
        alert.innerHTML = 'Tic-Tac-Toe Game has been restarted!';
        tictactoeDiv.appendChild(alert);
    }
    gameId++;
    // Use setTimeout() to hide it again after 5 seconds
    setTimeout(() => $('#restart-game').hide(), 2000);
}



// Set-up an EventListener for each btn in the game.  

for (let btnIndex=1; btnIndex <=9; btnIndex++) {
    onClick(`btn-p-${btnIndex}`, () => {
        // Change Button to display players symbol
        if (!gameOver) {
            let headerText = document.getElementById('turn');
            console.log(gameStatus);
            if (gameStatus[btnIndex] == '') {
                console.log(`Turn #${numOfTurn}:`);  
                if (numOfTurn % 2) {
                    // X's turn
                    document.getElementById(`btn-p-${btnIndex}`).innerHTML = 'X'
                    //activeButton1.innerHTML = 'X';
                    gameStatus[btnIndex] = 'X';
                    console.log(`\t\t\t X's turn!`);
                    headerText.innerHTML = `Turn #${numOfTurn+1}: O's turn`;
                } else {
                    // O's turn
                    document.getElementById(`btn-p-${btnIndex}`).innerHTML = 'O'
                    //activeButton1.innerHTML = 'O';
                    gameStatus[btnIndex] = 'O';
                    console.log(`\t\t\t O's turn!`);
                    headerText.innerHTML = `Turn #${numOfTurn+1}: X's turn`;
                }
                numOfTurn++;
        // *************************************************************
        // NOTE:  After each turn, check for a winner!
        // Check the winner
        // When the game is a draw, or there is a winner --
        //  Bootstrap alert or message across the screen 
        //          to announce the winner!
        // *************************************************************
                let winner = checkForWinner();
                console.log(winner);
                if (winner != '') {
                    let headerText = document.getElementById('turn');
                    headerText.innerHTML = `Game over!  ${winner}`;
                    console.log(`Game over! ${winner}`); 
                    // prompt/alert  
                    if (gameId > 0) {
                        $('#game-over').show();
                    } else {
                        let tictactoeDiv = document.getElementById('game-page');
                        let lineBreak = document.createElement('br');
                        tictactoeDiv.appendChild(lineBreak);
                        let gameOverAlert = document.createElement('alert');
                        gameOverAlert.setAttribute('class', 'alert alert-success');
                        gameOverAlert.setAttribute('role', 'alert');
                        gameOverAlert.setAttribute('id', 'game-over');
                        gameOverAlert.innerHTML = 'Tic-Tac-Toe Game has ended!';
                        tictactoeDiv.appendChild(gameOverAlert);  
                    }
                    // Use setTimeout() to hide it again after 3 seconds
                    setTimeout(() => $('#game-over').hide(), 3000);
                }
                
            } else {
                console.log('INVALID CHOICE');
            }
        } else {
            numOfTurn++;
            console.log('Game Over');
        }
    });
}


//   Winning combinations: 
//      Horizontal:
//         [1,2,3] OR [4,5,6] OR [7,8,9]
//      Vertical:
//         [1,4,7] OR [2,5,8] OR [3,6,9]
//      Diagonal:
//         [1,5,9] OR [3,5,7]
//

function checkForWinner() {
    let winner = '';
    console.log(gameStatus);
    if ( (gameStatus[1] === gameStatus[2]) && (gameStatus[1] === gameStatus[3])
         && (gameStatus[1] !== '')) {
        winner = `Winner is ${gameStatus[1]}`;
        gameOver = true;
    } else if ( (gameStatus[4] === gameStatus[5]) && (gameStatus[4] === gameStatus[6])
                && (gameStatus[4] !== '')) {
        winner = `Winner is ${gameStatus[4]}`;
        gameOver = true;
    } else if ( (gameStatus[7] === gameStatus[8]) && (gameStatus[7] === gameStatus[9])
                && (gameStatus[7] !== '') ) {
        winner = `Winner is ${gameStatus[7]}`;
        gameOver = true;
    } else if ( (gameStatus[1] === gameStatus[4]) && (gameStatus[1] === gameStatus[7]) 
                && (gameStatus[1] !== '')) {
        winner = `Winner is ${gameStatus[1]}`;
        gameOver = true;
    } else if ( (gameStatus[2] === gameStatus[5]) && (gameStatus[2] === gameStatus[8])
                && (gameStatus[2] !== '')) {
        winner = `Winner is ${gameStatus[2]}`;
        gameOver = true;
    } else if ( (gameStatus[3] === gameStatus[6]) && (gameStatus[3] === gameStatus[9])
                && (gameStatus[3] !== '')) {
        winner = `Winner is ${gameStatus[3]}`;
        gameOver = true;
    } else if ( (gameStatus[1] === gameStatus[5]) && (gameStatus[1] === gameStatus[9])
                && (gameStatus[1] !== '')) {
        winner = `Winner is ${gameStatus[1]}`;
        gameOver = true;
    } else if (( gameStatus[3] === gameStatus[5]) && (gameStatus[3] === gameStatus[7])
                && (gameStatus[3] !== '')) {
        winner = `Winner is ${gameStatus[3]}`;
        gameOver = true;
    } else if (numOfTurn > 9){
        winner = `The game is a draw!`;
        gameOver = true;
    }  
    return winner;
}