// Coding Steps:
//
// Using any of the tools you’ve worked with so far, 
//         Create a game of tic-tac-toe. 
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
// DONE:  4. Define a button to reset the game.
//          * redraw the table 
//          * alert box which appears and goes away
//          * reset winning strategy
//                  game_status['NO WINNER','','','','','','','','','']
//      NOTE:  index will be the position of the button
//              Winning combinations: 
//                  Horizontal:
//                      [1,2,3] OR [4,5,6] OR [7,8,9]
//                  Vertical:
//                      [1,4,7] OR [2,5,8] OR [3,6,9]
//                  Diagonal:
//                      [1,5,9] OR [3,5,7]
//

$(function() {
    let gameId = 0; // always increments, never resets
    let gameOver = false; // boolean, used to end the game
    let xWin = 0;
    let oWin = 0;

    // increments during a game, reset when game is reset
    let numOfTurn = 1; //turn counter

    // play position array
    let gameStatus = ['NO WINNER','','','','','','','','',''];

    onClick('reset-game', () => {  
        // clear the winning strategy 
        gameStatus = ['NO WINNER','','','','','','','','',''];
        // reset turn counter 'numOfTurn' to 1
        numOfTurn = 1;
        gameOver = false;
        // clear the game and reset
        drawDOM();
        console.log('Tic-Tac-Toe Game Reset!');
        $("#turn-header").text("Game restarted -- Turn #1: X's turn");
        $("#tally").text(`SCORE: Team X: ${xWin} vs. Team O: ${oWin}`);
    });

    function onClick(id, action) {
        return $(`#${id}`).on('click',action);
    }

    function drawDOM() {
        // clear the view, and re"draw" the table
        let tictactoeDiv = document.getElementById('game-page');
        //let tictactoeDiv = $('#game-page');
        for (let index=1; index<=9; index++ ) {
            //reset each button to original number value
            $(`#btn-p-${index}`).text(`${index}`);
        }
        if (gameId > 0) {
            $('#restart-game').show();
        } else {
            let lineBreak = document.createElement('br');
            tictactoeDiv.appendChild(lineBreak);
            lineBreak = document.createElement('br');
            tictactoeDiv.appendChild(lineBreak);
            let alert = document.createElement('alert');
            alert.setAttribute('class', 'alert alert-info');
            alert.setAttribute('role', 'alert');
            alert.setAttribute('id', 'restart-game');
            alert.innerHTML = 'Tic-Tac-Toe Game has been restarted!';
            tictactoeDiv.appendChild(alert);
        }
        gameId++;
        // Use setTimeout() to hide it again after 5 seconds
        setTimeout(() => $('#restart-game').hide(), 2000);
    } // end of function drawDOM()

    // Set-up an EventListener for each btn in the game.  
    for (let btnIndex=1; btnIndex <=9; btnIndex++) {
        onClick(`btn-p-${btnIndex}`, (evt) => {
            // Change Button to display players symbol
            if (!gameOver) {
                if (gameStatus[btnIndex] == '') {
                    console.log(`Turn #${numOfTurn}:`);  
                    if (numOfTurn % 2) {
                        // X's turn
                        evt.target.innerText = 'X';
                        gameStatus[btnIndex] = 'X';
                        console.log(`\t\t\t X's turn!`);
                        $('#turn-header').text(`Turn #${numOfTurn+1}: O's turn`);
                    } else {
                        // O's turn
                        evt.target.innerText = 'O';
                        gameStatus[btnIndex] = 'O';
                        console.log(`\t\t\t O's turn!`);
                        $('#turn-header').text(`Turn #${numOfTurn+1}: X's turn`);
                    }
                    numOfTurn++;
            // *************************************************************
            // NOTE:  Starting with turn #5, after each turn, 
            //        Check for a WINNER!
            // 
            // When the game is a draw, OR there is a winner --
            //  Bootstrap alert or message across the screen 
            //          to announce the winner!
            // *************************************************************
                    if (numOfTurn > 5) {
                        let winner = checkForWinner();
                        console.log(winner);
                        if (winner != '') {
                            $('#turn-header').text(`Game over! ${winner}`);
                            console.log(`Game over! ${winner}`); 
                            // prompt/alert  
                            if (gameId > 0) {
                                $('#game-over').show();
                            } else {
                                let tictactoeDiv = document.getElementById('game-page');
                                let lineBreak = document.createElement('br');
                                tictactoeDiv.appendChild(lineBreak);
                                let gameOverAlert = document.createElement('alert');
                                gameOverAlert.setAttribute('class', 'alert alert-info');
                                gameOverAlert.setAttribute('role', 'alert');
                                gameOverAlert.setAttribute('id', 'game-over');
                                gameOverAlert.innerHTML = 'Tic-Tac-Toe Game has ended!';
                                tictactoeDiv.appendChild(gameOverAlert);  
                            }
                            // Use setTimeout() to hide it again after 3 seconds
                            setTimeout(() => $('#game-over').hide(), 3000);
                        }
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

    //   Winning combinations for Tic-Tac-Toe: 
    //      Horizontal:
    //         [1,2,3] OR [4,5,6] OR [7,8,9]
    //      Vertical:
    //         [1,4,7] OR [2,5,8] OR [3,6,9]
    //      Diagonal:
    //         [1,5,9] OR [3,5,7]
    //

    function checkForWinner() {
        let winner = '';
        gameOver = true;
        let teamWin = '';
        console.log("Checking gameStatus: ");
        console.log(gameStatus);
        if ( (gameStatus[1] === gameStatus[2]) && (gameStatus[1] === gameStatus[3])
            && (gameStatus[1] !== '')) {
            winner = `Winner is ${gameStatus[1]}`;
            teamWin = gameStatus[1];
        } else if ( (gameStatus[4] === gameStatus[5]) && (gameStatus[4] === gameStatus[6])
                    && (gameStatus[4] !== '')) {
            winner = `Winner is ${gameStatus[4]}`;
            teamWin = gameStatus[4];
        } else if ( (gameStatus[7] === gameStatus[8]) && (gameStatus[7] === gameStatus[9])
                    && (gameStatus[7] !== '') ) {
            winner = `Winner is ${gameStatus[7]}`;
            teamWin = gameStatus[7];
        } else if ( (gameStatus[1] === gameStatus[4]) && (gameStatus[1] === gameStatus[7]) 
                    && (gameStatus[1] !== '')) {
            winner = `Winner is ${gameStatus[1]}`;
            teamWin = gameStatus[1];
        } else if ( (gameStatus[2] === gameStatus[5]) && (gameStatus[2] === gameStatus[8])
                    && (gameStatus[2] !== '')) {
            winner = `Winner is ${gameStatus[2]}`;
            teamWin = gameStatus[2];
        } else if ( (gameStatus[3] === gameStatus[6]) && (gameStatus[3] === gameStatus[9])
                    && (gameStatus[3] !== '')) {
            winner = `Winner is ${gameStatus[3]}`;
            teamWin = gameStatus[3];
        } else if ( (gameStatus[1] === gameStatus[5]) && (gameStatus[1] === gameStatus[9])
                    && (gameStatus[1] !== '')) {
            winner = `Winner is ${gameStatus[1]}`;
            teamWin = gameStatus[1];
        } else if (( gameStatus[3] === gameStatus[5]) && (gameStatus[3] === gameStatus[7])
                    && (gameStatus[3] !== '')) {
            winner = `Winner is ${gameStatus[3]}`;
            teamWin = gameStatus[3];
        } else if (numOfTurn > 9){
            winner = `A draw: \n${gameStatus[0]}`;
        }  else {
            gameOver=false;
        }
        if (teamWin === 'X') xWin++;
        if (teamWin === 'O') oWin++;
        $("#tally").text(`SCORE: Team X: ${xWin} vs. Team O: ${oWin}`);
        return winner;
    } // end of function checkForWinner()

});