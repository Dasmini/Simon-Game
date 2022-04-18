var gamePattern = [];
var userClickedpattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


$(document).keydown(function() {
  if (!started) {
    $("h1").text("level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedpattern = [];
  var randomNumber = Math.floor(Math.random() * 3 + 1);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); //pushing the chosen colour to the game pattern
  $("h1").text("level " + level);
  level = level + 1;


  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedpattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(this);

  checkAnswer(userClickedpattern.length - 1);

});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  currentColour.classList.add("pressed");
  setTimeout(function() {
    currentColour.classList.remove("pressed");
  }, 100);
}

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;

  nextSequence();


}

function checkAnswer(currentLevel) {

  if (userClickedpattern[currentLevel] === gamePattern[currentLevel]) {


    if (userClickedpattern.length === gamePattern.length) {


      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("h1").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $(document).keydown(function() {
      startOver();
    });
  }
}
