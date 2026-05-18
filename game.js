let gamesequence = [];
let usersequence = [];
let level = 1;
let isPlayerTurn = false;
let isgamestarted = false;

const playbtn = document.getElementById('play');
const buttons = document.querySelectorAll('.color-btn');
const start = document.getElementById('start');
const game = document.getElementById('game-screen');
const levelDisplay = document.getElementById('level-display');

const sound = new Audio('sound.mp3'); 
function playSound() {
    sound.currentTime = 0; 
    sound.play();
}

playbtn.addEventListener('click', () => {
    startgame();
});

function startgame() {
    start.classList.add('hidden');
    game.classList.add('show');
    isgamestarted = true;
    gamesequence = [];
    usersequence = [];
    level = 1;
    updateLevelDisplay();
    let num = Math.floor(Math.random() * 4);
    gamesequence.push(num);
    setTimeout(() => {
        showNewColor();
    }, 500);
}

function updateLevelDisplay() {
    if (levelDisplay) {
        levelDisplay.textContent = `Level: ${level}`;
        console.log('Level updated to:', level); // Debug log
    } else {
        console.error('Level display not found!');
    }
}

function showNewColor() {
    isPlayerTurn = false;
    const lastIndex = gamesequence.length - 1;
    const btn = buttons[gamesequence[lastIndex]];
    
    if (btn) {
        btn.classList.add('active');
        playSound(); 
        setTimeout(() => {
            btn.classList.remove('active');
        }, 200);
    }
    setTimeout(() => {
        isPlayerTurn = true;
    }, 500);
}

function checkAnswer(currentIndex) {
    if (usersequence[currentIndex] === gamesequence[currentIndex]) {
        if (usersequence.length === gamesequence.length) {
            isPlayerTurn = false;
            setTimeout(() => {
                usersequence = [];
                let num = Math.floor(Math.random() * 4);
                gamesequence.push(num);
                level++;
                updateLevelDisplay();
                showNewColor(); 
            }, 800);
        }
    } else {
        alert(`Game Over! You reached level ${level}`);
        resetGame();
    }
}

buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (!isPlayerTurn) return;
        btn.classList.add('active');
        playSound(); 
        setTimeout(() => btn.classList.remove('active'), 100);

        usersequence.push(index);
        checkAnswer(usersequence.length - 1);
    });
});

function resetGame() {
    gamesequence = [];
    usersequence = [];
    level = 1;
    updateLevelDisplay();
    isgamestarted = false;
    isPlayerTurn = false;
    start.classList.remove('hidden');
    game.classList.remove('show');
}