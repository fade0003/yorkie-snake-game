const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;

const headImage = new Image();
const middleImage = new Image();
const tailImage = new Image();
const foodImage = new Image();

headImage.src = 'yorkie_head.png';
middleImage.src = 'yorkie_middle.png';
tailImage.src = 'yorkie_tail.png';
foodImage.src = 'food.png';

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.drawImage(headImage, snake[0].x * gridSize, snake[0].y * gridSize, gridSize, gridSize);

    for (let i = 1; i < snake.length - 1; i++) {
        ctx.drawImage(middleImage, snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
    }

    if (snake.length > 1) {
        const tail = snake[snake.length - 1];
        ctx.drawImage(tailImage, tail.x * gridSize, tail.y * gridSize, gridSize, gridSize);
    }

    // Draw food
    ctx.drawImage(foodImage, food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // Draw score
    scoreDisplay.textContent = `Score: ${score}`;
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check for collision with walls
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || heady >= tileCount) {
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
    if (head.x === food x && head y === food y) {
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
        y: math.floor(Math.random() * tileCount)
    };
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 }];
    score = 0;
    draw();
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction y === 0)direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction x === 0)direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction x === 0)direction = { x: 1, y: 0 };
            break;
    }
});

function gameLoop() {
    update();
    setTimeout(gameLoop, 100);
}

gameLoop();
