/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

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

const pickFriend_radio = document.getElementById("pick-friend");
const pickAI_radio = document.getElementById("pick-ai");

pickAI_radio.addEventListener("click", () => {
    playerTwoName_p.innerHTML = "AI";
});

pickFriend_radio.addEventListener("click", () => {
    playerTwoName_p.innerHTML = "PLAYER 2";
});
