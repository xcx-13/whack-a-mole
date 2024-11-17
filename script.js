class Game {
    slots;
    score = 0;
    time = 60;
    count;
    timerId;
    started = false;
    position;

    constructor(slots) {
        this.slots = slots;
    }
}

class Mole {
    speed = 1100;
    wait = 800;
    timerId;
    position;

    constructor() {

    }
}

const game = new Game(9);

const mole = new Mole();

const gridContainer = document.getElementById("gridContainer");
gridContainer.addEventListener("click", function (event) {
    game.position = event.target.id;
    checkWhack();
});

for (let id = 0; id < game.slots; id++) {
    let div = document.createElement("div");
    let img = document.createElement("img");

    div.classList.add('grid-item')
    img.classList.add('blume');

    img.src = "style/img/blumentopf.png"
    div.id = id;

    div.appendChild(img);
    gridContainer.appendChild(div);
}

const score = document.getElementById('score')
const timer = document.getElementById('timer')
reset();

function gameStart() {
    if (game.started) {
        return;
    }
    game.started = true;
    moveMole()
    game.timerId = setInterval(startTimer, 1000)
}

function moveMole() {
    mole.timerId = setInterval(changePosition, mole.speed)
}

function checkWhack() {
    if (game.position == mole.position) {
        game.score++
        score.innerText = game.score
    }
}

function changePosition() {
    getRandomPosition()
    displayMole()
    setTimeout(removeMole, mole.wait)
}

function getRandomPosition() {
    const newPosition = Math.floor(Math.random() * game.slots);
    if (newPosition === 0) {
        getRandomPosition();
    }
    else if (mole.position === newPosition) {
        getRandomPosition();
    } else {
        mole.position = newPosition
    }
}

function displayMole() {
    const div = document.getElementById(mole.position)
    div.classList.add('mole')
}

function removeMole() {
    const div = document.getElementById(mole.position)
    div.classList.remove('mole')
}

function startTimer() {
    if (game.count === 0) {
        gameOver();
        return
    }
    game.count--;
    timer.innerText = game.count
}

function gameOver() {
    clearInterval(game.timerId)
    clearInterval(mole.timerId)
    alert("Game Over _ Final Score: " + game.score)
    reset();
}

function reset() {
    timer.innerText = game.time
    game.count = game.time
    game.started = false
    game.score = 0
    score.innerText = game.score
}