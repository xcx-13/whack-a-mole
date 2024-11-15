const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

let result = 0
let hitPosition
let currentTime = 60
let timerId = null
let milliSecond = 10;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })
    let randomSquarePosition = squares[Math.floor(Math.random() * 9)]
    randomSquarePosition.classList.add('mole')

    hitPosition = randomSquarePosition.id
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++
            score.textContent = result
            hitPosition = null
        }
    })
})

let clicker = 0;

let countDownTimerId = 0;

function moveMole() {
    clicker++;
    if (clicker === 1) {
        countDownTimerId = setInterval(countDown, 1000)
        timerId = setInterval(randomSquare, milliSecond * 100)
    }
}

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime == 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert("Game Over _ Final Score: " + result)
        clicker = 0;
        currentTime = 60;
    }
}
