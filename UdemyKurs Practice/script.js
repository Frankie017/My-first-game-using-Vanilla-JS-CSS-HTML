let time = getD("time")
let rectangle = getD("rectangle")
let readyBtn = getD("readyBtn")
let startTime = new Date().getTime();
let level = getD("level")
let welcome = getD("welcome")
let gameStartBtn = getD("startBtn")
let mainLevelId = getD("mainLevelId")
let counter = getD("counter")
let banner = getD("banner")
let gameOverText = getD("gameOverDark")
var final = false;
let victory = false;
function getD(d) {
    return document.getElementById(d);
}

function listen(e, type, r) {
    return e.addEventListener(type, r);
}

var count = 2;

function rectangleListener() {

    let top = Math.floor(Math.random() * 70);
    let left = Math.floor(Math.random() * 70);
    let width = Math.floor(Math.random() * 50);

    rectangle.style.top = top + "%";
    rectangle.style.left = left + "%";
    rectangle.style.width = width + 100 + "px";
    rectangle.style.height = width + 100 + "px";
    rectangle.style.display = "block";

    
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    rectangle.style.backgroundColor = "#" + randomColor;

    let randomShape = Math.random() * 1

    if (randomShape >= 0.5) {
        rectangle.style.borderRadius = 50 + "%";
    } 
    else {
        rectangle.style.borderRadius = 0 + "%";
    }

}

let gameOverFlag = false;

let counterOnly = 25;

listen(readyBtn, "click", function () {rectangleListener(), count = 4, interval(), readyBtn.style.display = "none", gameOverFlag = false;})

listen(rectangle, "click", function () {
    counter.innerHTML = counterOnly--;
    let endTime = new Date().getTime()
    let speedResult = (endTime - startTime) / 1000;
    time.innerHTML = speedResult, 
    startTime = new Date().getTime(), 
    rectangleListener(); count = 2;
    if(counterOnly == 0) {
        endOFfirst()
    }
})

function gameOverChecker(check) {
    if(check == true) {
        gameOverText.style.display = "block"
    } else {
        gameOverText.style.display = "none"
    }
}

function interval() {
    let myTimer = setInterval(() => {
        count--;
        if(count == 0) {
            gameOverFlag = true;
            clearInterval(myTimer)
            counterOnly = 20;
            rectangle.style.display = "none";
            readyBtn.style.display = "block"
            readyBtn.innerHTML = "Retry"
            count = 2
        } if(banner.style.display == "none" && timeToNext.style.display == "block") {
            clearInterval(myTimer)
        }
        gameOverChecker(gameOverFlag)
        time.innerHTML = count;
    }, 1000)

}

listen(gameStartBtn, "click", function() {
    welcome.style.display = "none"
    readyBtn.style.display = "block"
    mainLevelId.style.opacity = ".4"
    gameStartBtn.style.opacity = "0"
})

// Timer 10 seconds for in order to start the second Level of a game

let timeToNext = getD("timeForTheRound")
let timerToNextSeconds = getD("nextSeconds")

let toNextSeconds = 10;

function endOFfirst() {
    banner.style.display = "none"
    timeToNext.style.display = "block"
    nextRoundFunc()
}


let level2Banner = getD("level2Banner")

function nextRoundFunc() {
    let nextRoundInterval = setInterval(() => {
        toNextSeconds-=1;
        timerToNextSeconds.innerHTML = toNextSeconds;
        if(toNextSeconds == 0) {
            clearInterval(nextRoundInterval)
            timeToNext.style.display = "none";
            level2Banner.style.display = "block";
            level.style.color = "#cf0000"
            chaserInterval()
        } 
    }, 1000);
}

// LEVEL 2 CODE
// LEVEL 2 CODE
// LEVEL 2 CODE
// LEVEL 2 CODE
// LEVEL 2 CODE

let shapeRunner = getD("shapeRunner");
let ghost = getD("ghost")
let angryFace = getD("angry")
let dragon = getD("dragon")
let shapeMovementCounterTB = 950;
let shapeMovementCounterRL = 600;

let tent = getD("tent")
let runPerson = getD("runPerson")

let s1 = getD("ghostS")
let s2 = getD("dragonS")
let s3 = getD("angryS")

let chaserFlag = false;

listen(window, "keydown",  function(e) {
 
    switch (e.key) {
        case "ArrowUp":
            if(chaserFlag == false) {
                shapeMovementCounterTB-=6.4;
                shapeRunner.style.top = shapeMovementCounterTB + "px"
            }
            break;
        case "ArrowDown":
            if(chaserFlag == false) {
                shapeMovementCounterTB+=6.4;
                shapeRunner.style.top = shapeMovementCounterTB + "px"
            }
            break;
        case "ArrowLeft":
            if(chaserFlag == false) {
                shapeMovementCounterRL -= 6.4;
                shapeRunner.style.left = shapeMovementCounterRL + "px"   
            }
            break;
        case "ArrowRight":
            if(chaserFlag == false) {
                shapeMovementCounterRL+=6.4;
                shapeRunner.style.left = shapeMovementCounterRL + "px"   
            }
            break;
        default:
            break;
    }

    if(shapeMovementCounterRL <= 0) {
        shapeMovementCounterRL = 0;
    }
    if(shapeMovementCounterTB <= 0) {
        shapeMovementCounterTB = 0;
    }
})

let chaserMoveTB = 0;
let chaserMoveRL = 0;

function chasers(a, b, c) {
    a.style.top = chaserMoveTB + "px";
    a.style.left = chaserMoveRL + "px";

    b.style.left = chaserMoveRL + "px";

    c.style.left = chaserMoveRL + "px";

    if(chaserMoveTB < shapeRunner.offsetTop && chaserFlag == false) {
        chaserMoveTB+= 5;
    }
    if(chaserMoveTB > shapeRunner.offsetTop && chaserFlag == false) {
        chaserMoveTB-=5;
    }

    if(chaserMoveRL < shapeRunner.offsetLeft && chaserFlag == false) {
        chaserMoveRL+=5;
    }
    if(chaserMoveRL > shapeRunner.offsetLeft && chaserFlag == false) {
        chaserMoveRL-=5;
    }
}


function chaserInterval() {
    let timer = setInterval(() => {
        chasers(ghost, dragon, angryFace)

    if((chaserMoveRL - shapeMovementCounterRL) <= 30 && (chaserMoveRL - shapeMovementCounterRL) >= -30 && (chaserMoveTB - shapeMovementCounterTB) <= 30 && (chaserMoveTB - shapeMovementCounterTB) >= -30) {
        chaserFlag = true;
        gameOverFlag = true;
        clearInterval(timer)
        gotcha()
    }

    if((chaserMoveRL - shapeMovementCounterRL) <= 30 && (chaserMoveRL - shapeMovementCounterRL) >= -30 && (754 - shapeMovementCounterTB) <= 50 && (754 - shapeMovementCounterTB) >= -50) {
        chaserFlag = true;
        gameOverFlag = true;
        clearInterval(timer)
        gotcha()
    }

    if((chaserMoveRL - shapeMovementCounterRL) <= 30 && (chaserMoveRL - shapeMovementCounterRL) >= -30 && (96 - shapeMovementCounterTB) <= 50 && (96 - shapeMovementCounterTB) >= -50) {
        chaserFlag = true;
        gameOverFlag = true;
        clearInterval(timer)
        gotcha()
    }

    if(shapeMovementCounterTB <= 80 && shapeMovementCounterRL <= 70 ) {
        tent.style.opacity = "1";
        runPerson.style.color = "rgb(91 215 23)"
        clearInterval(timer)
        s1.innerHTML = " We will meet again!"
        s2.innerHTML = " I'll burn your ass!"
        s3.innerHTML = " You made me angrier!"
        toNextSeconds = 10;
        timeText.innerHTML = "Type as as fast as you can and you are not allowed to make mistakes, even extra space is a loss. Let's go"
        level.style.color = "#001e96"
        intForWait()
    }

    gameOverChecker(gameOverFlag)

    }, 100)

}

function gotcha() {
    s1.innerHTML = " Gotcha!"
    s2.innerHTML = " Gotcha!"
    s3.innerHTML = " Gotcha!"
}

var waitV = 5;

function intForWait() {
    let wait = setInterval(() => {
        waitV--;
        if(waitV == 0) {
            endOfSecond()
            clearInterval(wait)
        }
        
    }, 1000);
}

// LEVEL 3 CODE
// LEVEL 3 CODE
// LEVEL 3 CODE
// LEVEL 3 CODE
// LEVEL 3 CODE

let text = getD("textToType");
let input = getD("input")
let typeSeconds = getD("typeSeconds")
let timerForType = getD("timerForType")
var level3Banner = getD("level3Banner")
let timeText = getD("timeText")


var newVar = text.innerHTML.split("");
let result = ""; 

for (let i = 0; i < text.innerHTML.length; i++) {
    result += "<span>" + text.innerHTML[i] + "</span>"
}
text.innerHTML = result;

listen(input, "input", function(e) {
    var length = text.children.length
    let inputArray = input.value.split("")

    newVar.forEach((ch, index) => {
        let character = text.innerHTML[index]
        if(text.children[index].textContent === inputArray[index]) {
            text.children[index].classList.add("correct")
            text.children[index].classList.remove("incorrect")
        } else {
            text.children[index].classList.add("incorrect")
            text.children[index].classList.remove("correct")
        }

    })

    if(input.value == lazyAss) {
        lastBanner.style.display = "block";
        level3Banner.style.display = "none"
        gameOverFlag = false;
    }

})

var lastBanner = getD("lastBanner")

var lazyAss = "This is the most badass game, that I've ever played in my life. So boy, I really enjoyed it. I will win this game, however it makes no sense!"

var keyboardIntCounter = 40;

function keyboardInterval() {
    let keyboardTestInt = setInterval(() => {
        keyboardIntCounter--;
        typeSeconds.innerHTML = keyboardIntCounter;
        if(keyboardIntCounter <= 20) {
            timerForType.style.color = "orange";
        }
        if(keyboardIntCounter <= 10) {
            timerForType.style.color = "red";
        }
        if(keyboardIntCounter == 0) {
            clearInterval(keyboardTestInt)
            gameOverFlag = true;
        } if(level3Banner.style.display == "none") {
            clearInterval(keyboardTestInt)
            gameOverFlag = false;
        }
        gameOverChecker(gameOverFlag)
    
    }, 1000);
}

let finSec = 10


function finalRound() {
    let finalInt = setInterval(() => {
        finSec--;
        timerToNextSeconds.innerHTML = finSec;

        if(finSec == 0) {
            level2Banner.style.display = "none"
            level3Banner.style.display = "block"
            clearInterval(finalInt)
            keyboardInterval()
            timeToNext.style.display = "none"
        }

    }, 1000);
}

function endOfSecond() {
    timeToNext.style.display = "block"
    finalRound()
}