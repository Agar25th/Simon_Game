var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var level=0;
var started=false;

$(".btn").click(function(event){
  handler(event);
  playSound(event.target.id);
  animatePress(event.target.id);
  checkAnswer(userClickedPattern.length);
});

document.addEventListener("keydown",function(){

  if (!started){
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
})



function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level "+level);
}

function handler(event){
  var userChosenColour=event.target.id;
  userClickedPattern.push(userChosenColour);
}

function playSound(name){
  const audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
            $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel-1]===gamePattern[currentLevel-1]){
    if (currentLevel===gamePattern.length){
      setTimeout(function(){
                nextSequence();
        }, 1000);
      userClickedPattern=[];
    }
  }else{
    const audio = new Audio("sounds/arcade.wav");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
              $("body").removeClass("game-over");
      }, 100);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  gamePattern=[];
  userClickedPattern=[];
  level=0;
  started=false;
}
