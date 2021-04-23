var balloon,balloonImage1,balloonImage2;
var position, database;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1000,500);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.addAnimation("hotAirBalloon2",balloonImage2);
  balloon.scale=0.5;

  textSize(20); 

  database = firebase.database();

  database.ref("Balloon/position").on("value", readPos);
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.changeAnimation("hotAirBalloon2",balloonImage2);
    changePosition(-5,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.changeAnimation("hotAirBalloon2",balloonImage2);
    changePosition(+5,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.changeAnimation("hotAirBalloon2",balloonImage2);
    changePosition(0,-5);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.changeAnimation("hotAirBalloon2",balloonImage2);
    changePosition(0,+5);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function changePosition(x,y){
  database.ref("Balloon/position").set({
      "posX": position.posX + x,
      "posY": position.posY + y
  })
}

function readPos(data){
  position = data.val();
  // console.log(position);
  balloon.x = position.posX;
  balloon.y = position.posY;
}
