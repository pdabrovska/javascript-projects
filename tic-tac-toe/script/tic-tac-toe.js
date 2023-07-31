let gameBoard = JSON.parse(localStorage.getItem('gameBoard')) || [[0,0,0],
                  [0,0,0],
                  [0,0,0]];

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0
};

let result = false;

let playerMoveId = JSON.parse(localStorage.getItem('player-move')) || choosePlayer();
let computerMoveId = JSON.parse(localStorage.getItem('computer-move'));
renderTheBoard();
blockMoves(1000);
playerMove();

updateScoreElement();

function renderTheBoard() {
  document.querySelectorAll('.js-sign-button').forEach((signButton, index) => {
   if (index <=2 ) {
      if(gameBoard[0][index] === 0) {
        signButton.innerHTML = 'null';
      } else if(gameBoard[0][index] === 1){
        signButton.innerHTML = 'X';
      } else if (gameBoard[0][index] === 2){
        signButton.innerHTML = 'O';
      }
    } else if (index > 2 && index <=5 ) {
      if(gameBoard[1][index - 3] === 0) {
        signButton.innerHTML = 'null';
      } else if(gameBoard[1][index - 3] === 1){
        signButton.innerHTML = 'X';
      } else if (gameBoard[1][index - 3] === 2){
        signButton.innerHTML = 'O';
      }
    } else if (index > 5 && index <=8) {
      if(gameBoard[2][index - 6] === 0) {
        signButton.innerHTML = 'null';
      } else if(gameBoard[2][index - 6] === 1){
        signButton.innerHTML = 'X';
      } else if (gameBoard[2][index - 6] === 2){
        signButton.innerHTML = 'O';
      }
    }
  });
};

function choosePlayer(){
  const chooseMessage = document.querySelector('.js-message-player');
  chooseMessage.innerHTML = `
    <div class="player-message">
      <p>Choose your player:</p>
        <div>
          <button class="js-choose-x choose-button">X</button>
          <button class="js-choose-o choose-button">O</button>
        </div>
    </div> 
    `
  const playerX =document.querySelector('.js-choose-x');
  const playerO = document.querySelector('.js-choose-o');

  playerX.addEventListener('click', () =>{
    chooseMessage.innerHTML = '';
    playerMoveId = 1;
    computerMoveId = 2;
    localStorage.setItem('computer-move', JSON.stringify(computerMoveId))
    localStorage.setItem('player-move', JSON.stringify(playerMoveId));
  })
  playerO.addEventListener('click', () => {
    chooseMessage.innerHTML = '';
    playerMoveId = 2;
    computerMoveId = 1;
    localStorage.setItem('computer-move', JSON.stringify(computerMoveId))
    localStorage.setItem('player-move', JSON.stringify(playerMoveId));
  })
};

function playerMove(){
  document.querySelectorAll('.js-sign-button').forEach((signButton, index) => {
    signButton.addEventListener('click', () =>{
      if(signButton.innerHTML === 'null'){
        if (index <= 2){
          gameBoard[0][index] = playerMoveId;
          localStorage.setItem('gameBoard', JSON.stringify(gameBoard));
        } else if (index > 2 && index <= 5){
          gameBoard[1][index-3] = playerMoveId;
          localStorage.setItem('gameBoard', JSON.stringify(gameBoard));
        } else if (index > 5 && index <= 8){
          gameBoard[2][index-6] = playerMoveId;
          localStorage.setItem('gameBoard', JSON.stringify(gameBoard));
        }
        renderTheBoard();
        checkResult();
        if (result === false) {
          setTimeout(function(){computerMove(); checkResult();}, 800);
        };
        setTimeout(function(){result = false}, 3000);
      }
      
    });
  });
};

function computerMove(){
  let O_number = 0;
  

  while(O_number < 1){
    const randomNumber = Math.random();
    const randomNumber2 = Math.random();
    let rowNumber;
    let columnNumber;

    if(randomNumber > 0 && randomNumber <= 1/3){
      rowNumber = 0;
    } else if(randomNumber > 1/3 && randomNumber <= 2/3){
      rowNumber = 1;
    } else if(randomNumber > 2/3 && randomNumber <= 1){
      rowNumber = 2;
    }
  
    if(randomNumber2 > 0 && randomNumber2 <= 1/3){
      columnNumber = 0;
    } else if(randomNumber2 > 1/3 && randomNumber2 <= 2/3){
      columnNumber = 1;
    } else if(randomNumber2 > 2/3 && randomNumber2 <= 1){
      columnNumber = 2;
    }

    if(gameBoard[rowNumber][columnNumber] === 0){
      gameBoard[rowNumber][columnNumber] = computerMoveId;
      localStorage.setItem('gameBoard', JSON.stringify(gameBoard));
      O_number++;
    }
  } 

  renderTheBoard();
};

function blockMoves(time){
  const buttons = document.querySelectorAll('.js-sign-button');
  function handleClick(){
    buttons.forEach(button => {
      button.disabled = true
      setTimeout(()=>{button.disabled = false}, time);
    })
  };

  buttons.forEach(button => {
    button.addEventListener('click', () =>{
      if(button.innerHTML === 'null'){
        handleClick();
      }
    });
  });
};

function checkResult(){
  let playerLetter, computerLetter; 
  if(playerMoveId === 1){
    playerLetter = 'X';
    computerLetter = 'O';
  } else {
    playerLetter = 'O';
    computerLetter = 'X';
  }
  for(let i = 0; i < gameBoard.length; i++){
    if(gameBoard[0][0] === playerMoveId && gameBoard[0][1] === playerMoveId && gameBoard[0][2] === playerMoveId){
      win(playerLetter);     
      return updateScoreElement();
    }
    if(gameBoard[0][i] === playerMoveId && gameBoard[1][i] === playerMoveId && gameBoard[2][i] === playerMoveId){
      win(playerLetter);         
      return updateScoreElement();
    }
    if(gameBoard[0][0] === playerMoveId && gameBoard[1][1] === playerMoveId && gameBoard[2][2] === playerMoveId){
      win(playerLetter);        
      return updateScoreElement();
    }
    if(gameBoard[0][2] === playerMoveId && gameBoard[1][1] === playerMoveId && gameBoard[2][0] === playerMoveId){
      win(playerLetter);           
      return updateScoreElement();
    } 
    
    if(gameBoard[i][0] === computerMoveId && gameBoard[i][1] === computerMoveId && gameBoard[i][2] === computerMoveId){
      loose(computerLetter);
      return updateScoreElement();
    }
    if(gameBoard[0][i] === computerMoveId && gameBoard[1][i] === computerMoveId && gameBoard[2][i] === computerMoveId){
      loose(computerLetter);
      return updateScoreElement();
    }
    if(gameBoard[0][0] === computerMoveId && gameBoard[1][1] === computerMoveId && gameBoard[2][2] === computerMoveId){
      loose(computerLetter);
      return updateScoreElement();
    }
    if(gameBoard[0][2] === computerMoveId && gameBoard[1][1] === computerMoveId && gameBoard[2][0] === computerMoveId){
      loose(computerLetter);
      return updateScoreElement();
    }

    if(gameBoard[0][0] !== 0 && gameBoard[0][1] !== 0 && gameBoard[0][2] !== 0 && gameBoard[1][0] !== 0 && gameBoard[1][1] !== 0 &&gameBoard[1][2] !== 0 && gameBoard[2][0] !== 0 &&gameBoard[1][1] !== 0 &&gameBoard[2][2] !== 0){
      result = true; 
      const resultMessage = document.querySelector('.js-message-player');
      resultMessage.innerHTML = `
      <div class="win-or-loose-info">
      <p>Draw</p<
      </div>`;
      setTimeout(()=>{resultMessage.innerHTML =''}, 4000);

      gameBoard = [[0,0,0],
                  [0,0,0],
                  [0,0,0]];
      localStorage.setItem('gameBoard', JSON.stringify(gameBoard));            
      renderTheBoard();
    }
  }
};


document.querySelector('.js-reset-button').addEventListener('click', () => {
  gameBoard = [[0,0,0],
                  [0,0,0],
                  [0,0,0]];
  score = {
          wins: 0,
          losses: 0
          }
  localStorage.setItem('score', JSON.stringify(score));
  localStorage.setItem('gameBoard', JSON.stringify(gameBoard));
  localStorage.removeItem('player-move');
  localStorage.removeItem('computer-move');
  updateScoreElement();
  renderTheBoard();
  choosePlayer();
})

function updateScoreElement() {
  const scoreInfo = document.querySelector('.js-score');
  scoreInfo.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}`;
}

function win(player){
  result = true; 
  const resultMessage = document.querySelector('.js-message-player');
  resultMessage.innerHTML = `
  <div class="win-or-loose-info">
  <p>Player ${player} wins</p<
  </div>`;
  score.wins++;
  localStorage.setItem('score', JSON.stringify(score));
  setTimeout(()=>{resultMessage.innerHTML =''}, 4000);

  gameBoard = [[0,0,0],
              [0,0,0],
              [0,0,0]];
  localStorage.setItem('gameBoard', JSON.stringify(gameBoard));            
  renderTheBoard();
}

function loose(player){
  const resultMessage = document.querySelector('.js-message-player');
  resultMessage.innerHTML = `
  <div class="win-or-loose-info">
  <p>Player ${player} wins</p<
  </div>`;
  score.losses++;
  localStorage.setItem('score', JSON.stringify(score));
  setTimeout(()=>{resultMessage.innerHTML =''}, 4000);

  gameBoard = [[0,0,0],
              [0,0,0],
              [0,0,0]];
  localStorage.setItem('gameBoard', JSON.stringify(gameBoard));
  renderTheBoard();
}