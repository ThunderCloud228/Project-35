var balloon,balloonImage1,balloonImage2;
var database, position, balloonPosition;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  createCanvas(1500,700);
  database=firebase.database();

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  balloonPosition = database.ref('Balloon/position');
  balloonPosition.on("value",readPosition, showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(position !== undefined){
    if(keyDown(UP_ARROW) || keyDown("W")) {
      writePosition(0,-5);
      balloon.addAnimation("hotAirBalloon",balloonImage2);
      balloon.scale = balloon.scale - 0.01;
    }
    else if(keyDown(LEFT_ARROW) || keyDown("A")) {
      writePosition(-5,0);
      balloon.addAnimation("hotAirBalloon",balloonImage2);
    }
    else if(keyDown(DOWN_ARROW) || keyDown("S")) {
      writePosition(0,5);
      balloon.addAnimation("hotAirBalloon",balloonImage2);
      balloon.scale = balloon.scale + 0.01;
    }
    else if(keyDown(RIGHT_ARROW) || keyDown("D")) {
      writePosition(5,0);
      balloon.addAnimation("hotAirBalloon",balloonImage2);
    }
  
    drawSprites();
  }


  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function readPosition(data) {
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function writePosition(x, y) {
  database.ref('Balloon/position').set({
      'x': position.x+x, 
      'y': position.y+y
  });
}

function showError() {
  console.log("Error while reading and writing the data into the database");
}
