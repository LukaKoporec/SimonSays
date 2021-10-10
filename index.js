
const buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickerPattern = [];
var started = false;
var level = 0

$(document).on("keypress", function() {
    if(!started) {
    nextSequence();
    $("h1").text("Level " + level);
    started = true;
    }
});

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");

    userClickerPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickerPattern.length-1);

});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickerPattern[currentLevel]) {

      console.log("success");

      if (userClickerPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");
     
      playSound("wrong");
      
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
    }

}


function nextSequence() {

    userClickerPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour =buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {

    
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

}