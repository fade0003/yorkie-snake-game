const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    { x: 10, y: 10, type: 'head' },
    { x: 9, y: 10, type: 'middle' },
    { x: 8, y: 10, type: 'tail' }
];
let direction = { x: 1, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;

// Load images
const headImage = new Image();
const middleImage = new Image();
const tailImage = new Image();
const foodImage = new Image();
headImage.src = 'yorkie_head.png';
middleImage.src = 'yorkie_middle.png';
tailImage.src = 'yorkie_tail.png';
foodImage.src = 'food.png';

// Wait for images to load
Promise.all([headImage, middleImage, tailImage, foodImage].map(img => new Promise(resolve => img.onload = resolve))).then(draw);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach(segment => {
        if (segment.type === 'head') {
            ctx.drawImage(headImage, segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        } else if (segment.type === 'middle') {
            ctx.drawImage(middleImage, segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        } else if (segment.type === 'tail') {
            ctx.drawImage(tailImage, segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        }
    });

    // Draw food
    ctx.drawImage(foodImage, food.x * gridSize, food.y * gridSize, gridSize, gridSize);

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
    snake.unshift({ x: head.x, y: head.y, type: 'head' });

    // Update segment types
    snake = snake.map((segment, index) => {
        if (index === 0) {
            return { ...segment, type: 'head' };
        } else if (index === snake.length - 1) {
            return { ...segment, type: 'tail' };
        } else {
            return { ...segment, type: 'middle' };
        }
    });

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
    snake = [
        { x: 10, y: 10, type: 'head' },
        { x: 9, y: 10, type: 'middle' },
        { x: 8, y: 10, type: 'tail' }
    ];
    direction = { x: 1, y: 0 };
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
