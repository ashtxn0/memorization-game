var buttonColours = ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var gameStarted=false;
var level=0;

var greenSound= new Audio("./sounds/green.mp3");
var redSound= new Audio("./sounds/red.mp3");
var yellowSound= new Audio("./sounds/yellow.mp3");
var blueSound= new Audio("./sounds/blue.mp3");
var wrongSound= new Audio("./sounds/wrong.mp3");

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    flashSequence(randomChosenColor);
    level++;
    $("h1").text("level "+level);
}

function flashSequence(sequence){
    
    // for (i=0;i<sequence.length;i++){
        switch(sequence){
            case "green":
                $(".green").fadeOut(100).fadeIn(100);
                playSound("green");
                break;
            case "red":
                $(".red").fadeOut(100).fadeIn(100);
                playSound("red");
                break;
            case "yellow":
                $(".yellow").fadeOut(100).fadeIn(100);
                playSound("yellow");
                break;
            case "blue":
                $(".blue").fadeOut(100).fadeIn(100);
                playSound("blue");
                break;
            default:

        }
    
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);

    if(level===userClickedPattern.length){
        checkAnswer(level);
    }
})

function playSound(name){
    switch(name){
        case "green":
                greenSound.play();
                break;
        case "red":
                redSound.play();
                break;
        case "yellow":
                yellowSound.play();
                break;
        case "blue":
                blueSound.play();
                break;
        default:

    }
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);

}

document.addEventListener("keydown", function(event){
    
    if (gameStarted===false){
    gameStarted=true;
    userClickedPattern=[];
    gamePattern=[];
    nextSequence();    
    }

    
    // drumKey(event.key);
    // buttonAnimation(event.key);
});

function checkAnswer(currentLevel){
    if (gamePattern.every((val,index)=> val===userClickedPattern[index])){
        userClickedPattern=[];
        setTimeout(function () {
            nextSequence();
          }, 600);
    } else{
        level=0;
        wrongSound.play();
        $(document.body).addClass("game-over");
    setTimeout(function(){
        $(document.body).removeClass("game-over");
    },200);
        $("h1").text("Game Over, Press A Key to Restart ");
        gameStarted=false;
    }
}
