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
const stopGame_but = document.getElementById("stop-game");
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

const onOffGameButtons = () => {
    hold_but.disabled = !hold_but.disabled;
    rollDice_but.disabled = !rollDice_but.disabled;
};

const startNewGame = () => {
    gameIsInProgress = !gameIsInProgress;
    onOffSidePicking();
    resetScores();
    onOffGameButtons();
    playerOnePanel_div.classList = "player-1-panel active";
    playerTwoPanel_div.classList = "player-2-panel";
    playerOneTurn = true;
    // newGame_but.children[1].innerHTML = "STOP";
    newGame_but.classList = newGame_but.classList + " hide";
    // console.log(stopGame_but.classList[0]);
    // stopGame_but.classList.pop();
    const hideIndex = stopGame_but.classList.value.indexOf(" hide");
    stopGame_but.classList.value = stopGame_but.classList.value.substring(
        0,
        hideIndex
    );
};

const stopGame = () => {
    gameIsInProgress = !gameIsInProgress;
    onOffSidePicking();
    resetScores();
    onOffGameButtons();
    // playerOneTurn = true;
    stopGame_but.classList = stopGame_but.classList + " hide";
    const hideIndex = newGame_but.classList.value.indexOf(" hide");
    newGame_but.classList.value = newGame_but.classList.value.substring(
        0,
        hideIndex
    );
};

const passTurn = () => {
    playerOneTurn = !playerOneTurn;

    playerOnePanel_div.classList = `player-1-panel ${
        playerOneTurn ? " active" : ""
    }`;
    playerTwoPanel_div.classList = `player-2-panel ${
        !playerOneTurn ? " active" : ""
    }`;

    if (pickAI_radio.checked && !playerOneTurn) {
        // ai_Turn(0);
        aiTurn(1);
    }
    // console.log(pickAI_radio.checked);
};

const updateRoundPointsDivs = () => {
    if (playerOneTurn) {
        playerOneRoundScore_div.innerHTML = playerOneRoundScore;
    } else {
        playerTwoRoundScore_div.innerHTML = playerTwoRoundScore;
    }
};

const updateTotalPointsDivs = () => {
    if (playerOneTurn) {
        playerOneTotalScore_div.innerHTML = playerOneTotalScore;
    } else {
        playerTwoTotalScore_div.innerHTML = playerTwoTotalScore;
    }
};

const resetRoundPoints = () => {
    if (playerOneTurn) {
        playerOneRoundScore = 0;
    } else {
        playerTwoRoundScore = 0;
    }
};

const addRoundPoints = dicePoints => {
    if (playerOneTurn) {
        playerOneRoundScore += dicePoints;
    } else {
        playerTwoRoundScore += dicePoints;
    }
};

const addTotalPoints = () => {
    if (playerOneTurn) {
        playerOneTotalScore += playerOneRoundScore;
    } else {
        playerTwoTotalScore += playerTwoRoundScore;
    }
};

const holdPoints = () => {
    if (playerOneTurn) {
        playerOneTotalScore += playerOneRoundScore;
    } else {
        playerTwoTotalScore += playerTwoRoundScore;
    }
    resetRoundPoints();
    updateRoundPointsDivs();
    addTotalPoints();
    updateTotalPointsDivs();
    passTurn();
    // rollDiceAnimations();
};

const generateRandomDice = () => {
    const randomNumber = Math.floor(Math.random() * 6);
    dice_img.src = dices[randomNumber];
    return randomNumber + 1;
};

let diceCounter = 0;

const rollDiceAnimation = () => {
    dice_img.src = dices[diceCounter];

    diceCounter = diceCounter === 5 ? 0 : ++diceCounter;
    // console.log(diceCounter);
    // window.requestAnimationFrame
};

let clickDisabled = false;

const disableRollClick = () => {
    clickDisabled = true;
};

const enableRollClick = () => {
    clickDisabled = false;
};
// TODO:    Firstly run one iteration
// TODO:    then Run another, till 6 of them
// TODO:
// TODO:
// TODO:    Make only one round score variable
// TODO:    Make an array with scores instead of variables
// TODO:    Access that array with number of active player
// TODO:
// TODO:    Instead of if make
// TODO:
// TODO:    classlist.togglt
// TODO:

const throwDiceAnimations = () => {
    const timeout = 100;
    const start = Date.now();

    return new Promise((resolve, reject) => {
        const intervalID = setInterval(() => {
            if ((Date.now() - start) / 1000 < (timeout * 6) / 1000) {
                rollDiceAnimation();
            } else {
                clearInterval(intervalID);
                resolve();
            }
        }, timeout);
    });
};

const delay = (timeout, message = "Delay After One") => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(message);
            resolve();
        }, timeout);
    });
};

const rollDice = () => {
    // console.log(clickDisabled + " start");

    // const timeout = 100;
    // const start = Date.now();
    return new Promise(resolve => {
        let randomDice;

        const animation = throwDiceAnimations();
        animation
            .then(() => {
                randomDice = generateRandomDice();
                console.log(randomDice + " throwed dice");
            })
            .then(() => {
                if (randomDice === 1) {
                    const delayAfterOne = delay(500);
                    delayAfterOne.then(() => {
                        resetRoundPoints();
                        updateRoundPointsDivs();
                        passTurn();
                        resolve(randomDice);
                    });
                } else {
                    addRoundPoints(randomDice);
                    updateRoundPointsDivs();
                    resolve(randomDice);
                }
            });
    });

    // const intervalID = setInterval(() => {
    //     if ((Date.now() - start) / 1000 < (timeout * 6) / 1000) {
    //         rollDiceAnimations();
    //     } else {
    //         clearInterval(intervalID);
    //         const randomDice = generateRandomDice();

    //         if (randomDice === 1) {
    //             setTimeout(() => {
    //                 resetRoundPoints();
    //                 updateRoundPointsDivs();
    //                 passTurn();
    //                 return 1;
    //             }, 500);
    //         } else {
    //             addRoundPoints(randomDice);
    //             updateRoundPointsDivs();
    //             return randomDice;
    //         }
    //         console.log(clickDisabled + " end");
    //         // enableRoll();
    //     }
    // }, timeout);

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

const aiThrow = throws => {
    return new Promise((resolve, reject) => {
        console.log(throws);
        console.log(playerTwoRoundScore);
        if (throws <= 4 && playerTwoRoundScore <= 15) {
            disableRollClick();
            const rollResultPromise = rollDice();
            setTimeout(() => {
                rollResultPromise.then(rollResult => {
                    if (rollResult !== 1) {
                        console.log("It's not a one");
                        resolve(++throws);
                    } else {
                        console.log("It's ONE");
                        reject(1);
                    }
                });
            }, 550);
        } else {
            reject(0);
        }
    });
};

const aiTurn = throws => {
    const ai_throw = aiThrow(throws);

    ai_throw.then(
        throws => {
            const delayAI = delay(500, "Delay For Ai Throw");
            delayAI.then(() => {
                console.log("Wants to run again  " + throws);
                aiTurn(throws);
            });
        },
        code => {
            enableRollClick();
            if (code) {
                console.log("ONE");
            } else {
                console.log("AI_HOLDS");
                holdPoints();
            }
        }
    );
};

const ai_Turn = throws => {
    console.log(throws + " throws   =====");
    disableRollClick();
    const rollResult = rollDice();

    // if (playerTwoRoundScore < 15 && throws < 4) {
    setTimeout(() => {
        console.log(rollResult + " ROLL RESULT )))))))))))))))))))");
        if (rollResult !== 1) {
            console.log(playerTwoRoundScore + " AI Scored----------------");
            if (throws < 2) {
                console.log("~~~~~~~~~~RECURSION~~~~~~~~~~~");
                ai_Turn(++throws);
            } else {
                console.log("We are done here");
            }
        } else {
            enableRollClick();
            console.log("!!!!!!!!!!!!!! Rolled ONE !!!!!!!!!!");
            return 1;
        }
    }, 550);

    // enableRollClick();
    // holdPoints();
    //     // enableRoll();
    //     // passTurn();
};

const rollDiceIfPossible = () => {
    console.log(clickDisabled);
    if (clickDisabled || !gameIsInProgress) {
        return 1;
    }
    9;
    disableRollClick();
    rollDice();
    enableRollClick();
};

const holdPointsIfPossible = () => {
    if (!playerOneTurn && pickAI_radio.checked) {
        return 1;
    }
    holdPoints();
};

newGame_but.addEventListener("click", startNewGame);

stopGame_but.addEventListener("click", stopGame);

hold_but.addEventListener("click", holdPointsIfPossible);

rollDice_but.addEventListener("click", rollDiceIfPossible);
dice_img.addEventListener("click", rollDiceIfPossible);
