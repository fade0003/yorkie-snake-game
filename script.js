const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = 'brown';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // Draw score
    scoreDisplay.textContent = `Score: ${score}`;
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check for collision with walls
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        resetGame();
        return;
    }

    // Check for collision with self
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        resetGame();
        return;
    }

    // Add new head
    snake.unshift(head);

    // Check for food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }

    draw();
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    draw();
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

function gameLoop() {
    update();
    setTimeout(gameLoop, 100);
}

gameLoop();