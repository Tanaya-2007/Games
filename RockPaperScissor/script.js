const choices = document.querySelectorAll(".choice");
const Computerchoices = document.querySelectorAll(".c-choice");
const resultDisplay = document.getElementById("result");
const score = document.getElementById("score");
const MainText = document.getElementById("main-text");
const userText = document.getElementById("user");
const computerText = document.getElementById("computer");

let userScore = 0;
let computerScore = 0;

var userChoice, computerChoice, result;

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    userChoice = choice.id;
    computerChoice = getComputerChoice();
    result = compareTo(userChoice, computerChoice);
    updateComputer(computerChoice);
    updateResult();
    displayResult(result, userChoice, computerChoice);
    resultDisplay.innerHTML = result;
  });
});

function getComputerChoice() {
  const choices = ["rock", "paper", "scissor"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function compareTo(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "tie";
  } else if (
    (userChoice === "rock" && computerChoice === "scissor") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissor" && computerChoice === "paper")
  ) {
    confettiOP("user");
    userScore++;
    return "user";
  } else {
    computerScore++;
    confettiOP("computer");
    return "computer";
  }
}

function displayResult(result, userChoice, computerChoice) {
  if (result === "tie") {
    MainText.innerHTML = "It's a tie";
  } else if (result === "user") {
    MainText.innerHTML = `You win! ${userChoice} beats ${computerChoice}`;
  } else {
    MainText.innerHTML = `You lose! ${computerChoice} beats ${userChoice}`;
  }
}

const confetti = document.getElementById("canvas");
function confettiOP(winner) {
  const jsConfetti = new JSConfetti();
  if (winner === "user") {
    jsConfetti.addConfetti({
      confettiRadius: 6,
      confettiNumber: 1000,
    });
  } else {
    jsConfetti.addConfetti({
      emojis: ["😓"],
      emojiSize: 60,
      confettiNumber: 100,
    });
  }
}

function updateResult() {
  userText.innerHTML = userScore;
  computerText.innerHTML = computerScore;
}

function updateComputer(comp) {
  comp = "c-" + comp;
  Computerchoices.forEach((choice) => {
    choice.style.transform = "scale(1)";
    choice.style.filter = "grayscale(0)";
    if (choice.id === comp) {
      choice.style.transform = "scale(1.4)";
      choice.style.filter = "grayscale(1)";
    }
  });
}
