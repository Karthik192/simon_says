var level = 0;

var started = false;

var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

autoPattern();

function autoPattern() {
    $(document).on("keypress", function () {
        if (!started) {
            $("h1").text(`Level ${level}`);
            nextSequence();
            started = true;
        }
    });
    $(".start-btn").on("click", function () {
        if (!started) {
            $("h1").text(`Level ${level}`);
            nextSequence();
            started = true;
        }
    });
}

$(".btn").click(function (event) {

    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
});

function nextSequence() {
    userClickedPattern = [];

    level++;

    $("h1").text(`Level ${level}`);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    flashAnimate(randomChoosenColor);
    playSound(randomChoosenColor);
}

function playSound(userChosenColor) {
    var audio = new Audio(`sounds/${userChosenColor}.mp3`);
    audio.play();
}

function flashAnimate(randomChoosenColor) {
    $(`#${randomChoosenColor}`).fadeOut(100).fadeIn(100);
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    }, 1000);
}

function checkAnswer(currentLevel) {
    // console.log(currentLevel);
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("Success");
    } else {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").html('Game Over, Press Any Key to <button class="start-btn">Restart</button>');
        startOver();
        $(".start-btn").on("click", function () {
            if (!started) {
                $("h1").text(`Level ${level}`);
                nextSequence();
                started = true;
            }
        });
        return 0;
    }
    if (userClickedPattern.length == gamePattern.length) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
