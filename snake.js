
//board
var blocksize = 25;
var row = 20;
var col = 20;
var board;
var context;

//snake head
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

//snake food
var foodX;
var foodY;

var velocityX = 0;
var velocityY = 0;

var snakeBody = []

var gameOver = false;


window.onload = function() {
    board = document.getElementById("board");
    board.height = row * blocksize;
    board.width = col * blocksize;
    context = board.getContext("2d"); //used for drawing on board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000/10);
}

function update() {

    if (gameOver) {
        return;

    }
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    

    context.fillStyle="lime";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }

    //game over condition
    if (snakeX < 0 || snakeX > col*blocksize || snakeY < 0 || snakeY > rows * blocksize){
        gameOver = true;
        alert("Game Over")
    }

    for (let i = 0; i< snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY ==snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY != 1) {
       velocityX = 0;
       velocityY = -1; 
    }
    else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1; 
     }
    else if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0; 
     }
    else if(e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0; 
     }

}

function placeFood() {
    foodX = Math.floor(Math.random() * col) * blocksize;
    foodY = Math.floor(Math.random() * row) * blocksize;
}