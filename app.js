const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board')
const colors = ['#02569C', '#019EB1', '#D35C78', '#F5DF4E', '#D4D0C8', '#949398', '#16e36b', '#b316e3']

let time = 0; 
let score = 0;


startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
});

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
      time = parseInt(event.target.getAttribute('data-time'))
      screens[1].classList.add('up')
      startGame()
    }
})

board.addEventListener('click', event => {
if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
}
} )


function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
    if (current < 10) {
        current = `0${current}`
    }
    setTime(current)
    }
    
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
}
function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle');
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = `${setColor(circle)}`
    

    board.append(circle)
    
}

function getRandomNumber(min, max) {
   return Math.round(Math.random() * (max - min) + min)
}

function setColor(circle) {
    const color = getRandomColor()
    circle.style.background = color
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
 }

function removeColor(circle) {
    circle.style.backgroundColor = '#1d1d1d'
    circle.style.boxShadow = `0 0 2px #000`
}

