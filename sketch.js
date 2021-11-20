var spaceship,spaceshipImage;
var Obstacle1,Obstacle2,Obstacle3,Obstacle4,ObstacleGroup;
var bg,bgImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0







function preload(){

  spaceshipImage = loadImage("Images/Spaceship.png");
  Obstacle1 = loadImage("Images/Obstacle 1.png");
  Obstacle2 = loadImage("Images/Obstacle 2.png");
  Obstacle3 = loadImage("Images/Obstacle 3.png");
  Obstacle4 = loadImage("Images/Obstacle 4.png");
  bgImage = loadImage("Images/Background 1.jpg")

  

}
function setup(){
  canvas = createCanvas(windowWidth,windowHeight)
  bg = createSprite(windowWidth/2,windowHeight/2);
  bg.addImage("bg",bgImage);
  bg.scale = 1.5

  spaceship = createSprite(200,500);
  spaceship.addImage("spaceship",spaceshipImage);
  spaceship.velocityX = +7
  spaceship.scale = 1.2
    

  


  obstacleGroup = new Group();

  score = 0;

}
function draw(){
  background(0)

   //bg.velocityX = -5
   //if(bg.x < 100 ){
     //bg.x = windowWidth/4
   //}

  spaceship.x = camera.position.x-200

  if(gameState === PLAY){
    score = score + 0.1
  
    if(keyDown("up")){
      spaceship.y = spaceship.y -20
    }
  
    if(keyDown("down")){
      spaceship.y = spaceship.y +20
    }
  
  
    spawnObstacle();

    if(obstacleGroup.isTouching(spaceship)){
      gameState = END
    }
    
  }
  else if(gameState === END){
  
    obstacleGroup.setVelocityXEach(0);
    //bg.velocityX = 0
    if(keyDown("up")){
      spaceship.y = 300;
    }
    

  }

  

  drawSprites();

  textSize(50);
  fill("red")
  text("Score: " + Math.round(score), 500, 50);
  
}

function spawnObstacle(){
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(windowWidth-100,165,10,40);
  obstacle.velocityX = -(6 + score/10)
  obstacle.y = Math.round(random(100,windowHeight-100))


  var rand = Math.round(random(1,4));
  switch(rand) {
    case 1: obstacle.addImage(Obstacle1);
            break;
    case 2: obstacle.addImage(Obstacle2);
            break;
    case 3: obstacle.addImage(Obstacle3);
            break;
    case 4: obstacle.addImage(Obstacle4);
            break;
    default:break;
   }

   obstacle.scale = 0.3;
   obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);

  }

}