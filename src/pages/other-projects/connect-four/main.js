var canvas = document.querySelector("canvas");

canvas.width = 1000;
canvas.height = 600;

var ctx = canvas.getContext("2d");

ctx.font = "24px Comic Sans MS, Comic Sans, cursive";

const NONE = 0;
const RED = 1;
const YELLOW = 2;
const radius = 30;

let turn = 1;

var mouse = {
    x: undefined,
    y: undefined
}

class Circle {


    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isFilled = false;
        this.isRed = false;
        this.isYellow = false;

        this.draw = function(color) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, toRadians(360), false);
            ctx.closePath();
            switch (color) {
                case 0:
                    ctx.fillStyle = "white";
                    break;

                case 1:
                    ctx.fillStyle = "red";
                    this.isFilled = true;
                    this.isRed = true;
                    break;

                case 2:
                    ctx.fillStyle = "yellow";
                    this.isFilled = true;
                    this.isYellow = true;
                    break;
            }

            ctx.fill();
        };

        this.initialize = function() {
            this.isRed = false;
            this.isYellow = false;
        };

    }

}


ctx.fillStyle = "dodgerblue"
ctx.fillRect(0, 50, 750, 500);


var twoDCircleArray = [];

for (var i = 0; i < 7; i++) {
    var circleArray = [];
    for (var j = 0; j < 6; j++) {
        var circle = new Circle(70 + (i * 100), 500 - (j * 80));
        circle.initialize();
        circleArray.push(circle);
        circle.draw(0);
    }
    twoDCircleArray.push(circleArray);
}

console.log(twoDCircleArray);

canvas.addEventListener("click", onClick);

function onClick(event) {
    mouse.x = event.x;
    mouse.y = event.y;

    console.log(mouse);
    console.log(twoDCircleArray[0][0].isRed);

    for (var i in twoDCircleArray) {
        if (mouse.x - 30 < twoDCircleArray[i][0].x &&
            mouse.x + 30 > twoDCircleArray[i][0].x) {
            for (var j in twoDCircleArray[i]) {
                if (twoDCircleArray[i][j].isFilled) {
                    continue;
                } else {
                    twoDCircleArray[i][j].draw(turn)
                    changeTurn();
                    displayTurn();
                    break;
                }
            }

        }
    }

    if (checkWin() == RED) {
        ctx.clearRect(760, 150, 200, 50);
        ctx.clearRect(760, 90, 200, 50);
        ctx.fillStyle = "black";
        ctx.fillText("Red's Wins!", 770, 170, 500);
        canvas.removeEventListener("click", onClick);
        setTimeout(() => {
            window.location = "."
        }, 5000);
    }

    if (checkWin() == YELLOW) {
        ctx.clearRect(760, 150, 200, 50);
        ctx.clearRect(760, 90, 200, 50);
        ctx.fillStyle = "black";
        ctx.fillText("Yellow Wins!", 770, 170, 500);
        canvas.removeEventListener("click", onClick);
        setTimeout(() => {
            window.location = "."
        }, 5000);
    }

}








//-------------------------------------------

function isSameColor(arr) {
    var redCount = 0,
        yellowCount = 0;

    for (var i in arr) {
        if (arr[i].isYellow) {
            yellowCount++;
        } else if (arr[i].isRed) {
            redCount++;
        }
    }

    if (yellowCount == 4) return YELLOW;
    if (redCount == 4) return RED;
    return NONE;
}

function checkWin() {

    //check Vertical
    for (var i = 0; i < twoDCircleArray.length; i++) {
        for (var j = 0; j < 3; j++) {
            var arr = [];
            arr.push(twoDCircleArray[i][j]);
            arr.push(twoDCircleArray[i][j + 1]);
            arr.push(twoDCircleArray[i][j + 2]);
            arr.push(twoDCircleArray[i][j + 3]);

            if (isSameColor([...arr]) == NONE) continue;
            return isSameColor([...arr]);
        }
    }

    //check horizontal
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < twoDCircleArray[i].length; j++) {
            var arr = [];
            arr.push(twoDCircleArray[i][j]);
            arr.push(twoDCircleArray[i + 1][j]);
            arr.push(twoDCircleArray[i + 2][j]);
            arr.push(twoDCircleArray[i + 3][j]);
            if (isSameColor(arr) == NONE) continue;
            return isSameColor(arr);
        }
    }

}

function displayTurn() {
    if (turn == 1) {
        ctx.clearRect(760, 90, 200, 50);
        ctx.fillStyle = "black";
        ctx.fillText("Red's Turn", 770, 110, 500);

    }

    if (turn == 2) {
        ctx.clearRect(760, 90, 200, 50);
        ctx.fillStyle = "black";
        ctx.fillText("Yellow's Turn", 770, 110, 500);

    }
}

function changeTurn() {
    turn = turn == 1 ? 2 : 1;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function heightToPixels(prop) {
    return prop * canvas.height;
}

function widthToPixels(prop) {
    return prop * canvas.width;
}