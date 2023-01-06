var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// next sequence
function nextSequence() {
  level++;
  userClickedPattern = [];
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];

  var audio = new Audio(randomChosenColor+".mp3");
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
  audio.play();
}

// button
$(".btn").click(function(){
  var userChosenColor = this.id;
  animatePress(this);
  var buttonSound = new Audio(userChosenColor+".mp3");
  buttonSound.play();
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
})

// Button clicks
function animatePress(currentColor) {
  $(currentColor).addClass("pressed");

  setTimeout(function(){
    $(currentColor).removeClass("pressed");
  },50);
}

// starting key
var pressed = false;
var level = 0;

$(document).keydown(function(){
  if(!pressed){
    nextSequence();
    pressed = true;
  }
  $("h2").text("");
})


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    var count = 0;
    for (var i = 0; i < gamePattern.length; i++) {
      if(gamePattern[i] === userClickedPattern[i]){
        // if the two values match, count + 1
        count++;
      }
    }

    if(count === gamePattern.length){
      console.log("success");
      setTimeout(function(){
          nextSequence();f
        }, 1000);
    }
// Game over dude
  } else {
    console.log("wrong");
      var wrongAudio = new Audio("wrong.mp3");
      wrongAudio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over");
      setTimeout(function(){
        $("h1").text("Press Any Key to Restart");
      },800 );

      startOver();
  }
}

// how to start over

function startOver(){
  level = 0;
  gamePattern = [];
  pressed = false;
}
