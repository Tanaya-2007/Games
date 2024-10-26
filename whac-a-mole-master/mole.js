let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

document
  .getElementById("board")
  .insertAdjacentHTML("afterbegin", `<a class="btn" href="#">Start</a>`);

document.querySelector(".btn").addEventListener("click", () => {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.remove();
  });
  score = 0;
  gameOver = false;
  document.getElementById("score").innerText = score.toString();

  setGame();
});
function setGame() {
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }
  setInterval(setMole, 1000);
  setInterval(setPlant, 2000);
}

function getRandomTile() {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setMole() {
  if (gameOver) {
    return;
  }
  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }
  let mole = document.createElement("img");
  mole.src = "./red.png";

  let num = getRandomTile();
  if (currPlantTile && currPlantTile.id == num) {
    return;
  }
  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
  gsap.from(mole, { duration: 0.5, scale: 1.1, y: 50, repeat: -1, yoyo: true });
}

function setPlant() {
  if (gameOver) {
    return;
  }
  if (currPlantTile) {
    currPlantTile.innerHTML = "";
  }
  let plant = document.createElement("img");
  plant.src = "./black.png";

  let num = getRandomTile();
  if (currMoleTile && currMoleTile.id == num) {
    return;
  }
  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);
  gsap.from(plant, {
    duration: 0.5,
    scale: 1.1,
    y: 50,
    repeat: -1,
    yoyo: true,
  });
}

function selectTile() {
  if (gameOver) {
    return;
  }
  if (this == currMoleTile) {
    score += 10;
    document.getElementById("score").innerText = score.toString();
  } else if (this == currPlantTile) {
    document.getElementById("score").innerText =
      "GAME OVER: " + score.toString();
    gameOver = true;

    document.querySelectorAll("#board div").forEach((tile) => {
      tile.remove();
    });
  
    document
    .getElementById("board")
    .insertAdjacentHTML("afterbegin", `<a class="btn" href="#" onclick="document.location.reload()">Restart</a>`);
    
  }
}
