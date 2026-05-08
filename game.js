let gamesequence = [];
let usersequence = [];
let level = 1;
let isPlayerTurn = false;
let isgamestarted = false;

const playbtn = document.getElementById('play');
const buttons = document.querySelectorAll('.color-btn');
const start = document.getElementById('start');
const game = document.getElementById('game-screen');

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
    let num = Math.floor(Math.random() * 4);
    gamesequence.push(num);
    setTimeout(() => show_sequence(), 600);
}

function show_sequence() {
    isPlayerTurn = false;

    for (let i = 0; i < gamesequence.length; i++) {
        let delay = 500 + i * 600;
        setTimeout(() => {
            const btn = buttons[gamesequence[i]];
            if (btn) {
                btn.classList.add('active');
                playSound(); 
                setTimeout(() => {
                    btn.classList.remove('active');
                }, 200);
            }
        }, delay);
    }
    setTimeout(() => {
        isPlayerTurn = true;
    }, 500 + gamesequence.length * 600 + 400);
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

function checkAnswer(currentIndex) {
    if (usersequence[currentIndex] === gamesequence[currentIndex]) {
        if (usersequence.length === gamesequence.length) {
            isPlayerTurn = false;
            setTimeout(() => {
                usersequence = [];
                let num = Math.floor(Math.random() * 4);
                gamesequence.push(num);
                level++;
                show_sequence();
            }, 800);
        }
    } else {
        alert(`Game Over! You reached level ${level}`);
        resetGame();
    }
}
function resetGame() {
    gamesequence = [];
    usersequence = [];
    level = 1;
    isgamestarted = false;
    isPlayerTurn = false;
    start.classList.remove('hidden');
    game.classList.remove('show');
}