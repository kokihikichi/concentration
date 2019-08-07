class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
  addScore() {
    this.score += 1;
    document.getElementById(this.name).innerHTML = this.score;
  }
}

function disableCards() {
  playerList[playerTurn].addScore();
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function unflipCards() {
  lockBoard = true;
  playerTurn += 1;
  if (playerTurn <= playerList.length - 1) {
  } else {
    playerTurn = 0;
  }

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function flipCard() {
  console.log(playerTurn);
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

const players = document.querySelectorAll(".player");
const cards = document.querySelectorAll(".memory-card");
let playerList = [];
players.forEach(player => playerList.push(new Player(player.childNodes[5].id)));

let playerTurn = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 52);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener("click", flipCard));
