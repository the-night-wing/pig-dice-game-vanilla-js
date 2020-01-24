/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const dice1 = "./img/dice-1.png";
const dice2 = "./img/dice-2.png";
const dice3 = "./img/dice-3.png";
const dice4 = "./img/dice-4.png";
const dice5 = "./img/dice-5.png";
const dice6 = "./img/dice-6.png";
const dices = [dice1, dice2, dice3, dice4, dice5, dice6];

const playerOneName_p = document.getElementById("player-1-name");
const playerTwoName_p = document.getElementById("player-2-name");

const playerOnePanel_div = document.querySelector(".player-1-panel");
const playerTwoPanel_div = document.querySelector(".player-2-panel");

const playerOneTotalScore_div = document.getElementById("player-1-total-score");
const playerTwoTotalScore_div = document.getElementById("player-2-total-score");

const playerOneRoundScore_div = document.getElementById("player-1-round-score");
const playerTwoRoundScore_div = document.getElementById("player-2-round-score");

const dice_img = document.getElementById("dice");
const newGame_but = document.getElementById("new-game");
const rollDice_but = document.getElementById("roll-dice");
const hold_but = document.getElementById("hold");

const pickOpponent_div = document.querySelector(".checkboxes");
const pickFriend_radio = document.getElementById("pick-friend");
const pickAI_radio = document.getElementById("pick-ai");

let gameIsInProgress = false;
let playerOneTurn = false;

let playerOneRoundScore = 0;
let playerTwoRoundScore = 0;
let playerOneTotalScore = 0;
let playerTwoTotalScore = 0;

pickAI_radio.addEventListener("click", () => {
    playerTwoName_p.innerHTML = "AI";
});

pickFriend_radio.addEventListener("click", () => {
    playerTwoName_p.innerHTML = "PLAYER 2";
});

const onOffSidePicking = () => {
    pickFriend_radio.disabled = gameIsInProgress;
    pickAI_radio.disabled = gameIsInProgress;
    // pickOpponent_div.classList = "checkboxes absolute disabled";
    pickOpponent_div.style.opacity = gameIsInProgress ? 0.5 : 1;
};

const resetScores = () => {
    playerOneRoundScore_div.innerHTML = 0;
    playerTwoRoundScore_div.innerHTML = 0;
    playerOneTotalScore_div.innerHTML = 0;
    playerTwoTotalScore_div.innerHTML = 0;
};

const activeGameButtons = () => {
    hold_but.disabled = !hold_but.disabled;
    rollDice_but.disabled = !rollDice_but.disabled;
};

const startNewGame = () => {
    gameIsInProgress = !gameIsInProgress;
    onOffSidePicking();
    resetScores();
    activeGameButtons();
    playerOnePanel_div.classList = "player-1-panel active";
    playerTwoPanel_div.classList = "player-2-panel";
    playerOneTurn = true;
};

const passTurn = () => {
    playerOneTurn = !playerOneTurn;

    playerOnePanel_div.classList = `player-1-panel ${
        playerOneTurn ? " active" : ""
    }`;
    playerTwoPanel_div.classList = `player-2-panel ${
        !playerOneTurn ? " active" : ""
    }`;
};

const holdPoints = () => {
    if (playerOneTurn) {
        playerOneTotalScore += playerOneRoundScore;
    } else {
        playerTwoTotalScore += playerTwoRoundScore;
    }

    passTurn();
    rollDiceAnimations();
};

const addRoundPoints = (roundPoints) => {
    if(playerOneTurn){
        playerOneRoundScore += roundPoints
    }else{
        playerTwoRoundScore += roundPoints
    }
} 

const resetRoundPoints = () => {
    if(playerOneTurn){
        playerOneRoundScore = 0
        playerOneRoundScore_div
    }else{
        playerTwoRoundScore = 0
    }
}

const generateRandomDice = () => {
    const randomNumber = Math.floor(Math.random() * 6);
    dice_img.src = dices[randomNumber];
    return randomNumber + 1;
};

let diceCounter = 0;

const rollDiceAnimations = () => {
    dice_img.src = dices[diceCounter];

    diceCounter = diceCounter === 5 ? 0 : ++diceCounter;
    console.log(diceCounter);
    // window.requestAnimationFrame
};

const rollDice = () => {
    const timeout = 100;
    const start = Date.now();

    const intervalID = setInterval(() => {
        if ((Date.now() - start) / 1000 < (timeout * 6) / 1000) {
            rollDiceAnimations();
        } else {
            clearInterval(intervalID);
            const randomDice = generateRandomDice();

            if(randomDice === 1){
                resetRoundPoints()
            }else{
                addRoundPoints(randomDice)
            }
        }
    }, timeout);

    // const timerId = setTimeout(function run() {
    //     rollDiceAnimations();

    //     if ((Date.now() - start) / 1000 < (timeout * 6) / 1000) {
    //         // clearInterval(intervalID);
    //         console.log((Date.now() - start) / 1000 + "      Time");
    //         setTimeout(run, timeout);
    //     } else {
    //         clearTimeout(timerId);
    //     }
    // }, timeout);
};

newGame_but.addEventListener("click", startNewGame);

hold_but.addEventListener("click", holdPoints);

rollDice_but.addEventListener("click", rollDice);
