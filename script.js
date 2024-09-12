let totalScore1 = document.querySelector(".totalscore-1");
let totalScore2 = document.querySelector(".totalscore-2");
let currentScore1 = document.querySelector(".currentscore-1");
let currentScore2 = document.querySelector(".currentscore-2");
let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
let diceImg = document.querySelector(".diceImg");
let name1 = document.querySelector(".name1");
let name2 = document.querySelector(".name2");

const restartbtn = document.querySelector(".restartbtn");
const holdbtn = document.querySelector(".holdbtn");
const rolldice = document.querySelector(".rolldicebtn");
const overlay = document.querySelector(".overlay");
const winnerModal = document.querySelector(".winner-modal");
const rules = document.querySelector(".rules");
const helpBtn = document.querySelector(".help");
const closeBtn = document.querySelector(".close");

let currentScore, totalScore, activePlayer, playing;

function init() {
  currentScore = 0;
  totalScore = ["", 0, 0];
  activePlayer = 1;
  playing = true;

  player1.classList.add("playeractive");
  player2.classList.remove("playeractive");
  player1.classList.remove("playerwinner");
  player2.classList.remove("playerwinner");
  diceImg.classList.add("hide");

  name1.textContent = "PLAYER 1";
  name2.textContent = "PLAYER 2";
  totalScore1.textContent = 0;
  totalScore2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
}
init();

function current() {
  document.querySelector(`.currentscore-${activePlayer}`).textContent =
    currentScore;
}

function total() {
  document.querySelector(`.totalscore-${activePlayer}`).textContent =
    totalScore[activePlayer];
}

function switchPlayer() {
  currentScore = 0;
  current();
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1.classList.toggle("playeractive");
  player2.classList.toggle("playeractive");
}

function closeModal() {
  overlay.classList.add("hide");
  winnerModal.classList.add("hide");
  rules.classList.add("hidden");
  document.querySelector(".welcome-modal").classList.add("hide");
}

function hideOverlay() {
  overlay.addEventListener("click", closeModal);
}

function showRules() {
  rules.classList.remove("hidden");
  overlay.classList.remove("hide");
}

function showWelcomeModal() {
  document.querySelector(".welcome-modal").classList.remove("hide");
  overlay.classList.remove("hide");
  hideOverlay();
}

showWelcomeModal();

function playConfetti() {
  const confetti = document.querySelector(".confetti");
  confetti.classList.remove("hide");
  confetti.play();
  confetti.onended = function () {
    confetti.classList.add("hide");
  };
}

rolldice.addEventListener("click", function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6 + 1);
    diceImg.classList.remove("hide");
    diceImg.src = `${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      current();
    } else {
      switchPlayer();
    }
  }
});

holdbtn.addEventListener("click", function () {
  if (playing) {
    totalScore[activePlayer] += currentScore;
    total();

    if (totalScore[activePlayer] >= 80) {
      playing = false;
      document
        .querySelector(`.player${activePlayer}`)
        .classList.add("playerwinner");

      document.querySelector(`.name${activePlayer}`).textContent = " 🏆WINNER";

      document
        .querySelector(`.player${activePlayer}`)
        .classList.remove("activeplayer");

      document.querySelector(`.currentscore-${activePlayer}`).textContent = 0;

      winnerModal.classList.remove("hide");

      document.querySelector(
        ".win-name"
      ).textContent = `Player ${activePlayer} won this round 🥳`;

      document.querySelector(
        ".sum-total"
      ).textContent = `With a sum-total of ${totalScore[activePlayer]}  points ⭐`;

      overlay.classList.remove("hide");
      diceImg.classList.add("hide");

      playConfetti();
      hideOverlay();
    } else {
      switchPlayer();
    }
  }
});

restartbtn.addEventListener("click", init);

helpBtn.addEventListener("click", showRules);
hideOverlay();
closeBtn.addEventListener("click", closeModal);
