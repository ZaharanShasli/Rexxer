var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var invisibleGround, backGround,backGroundImage;

var obstaclesGroup, obstacle1, obstacle1Image
var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){

  trex_running = loadAnimation("Run (1).png","Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png");
  trex_collided = loadAnimation("Dead8.png");
  
 backGroundImage = loadImage("background_land.png")
  
  obstacle1Image = loadImage("rock-obstacle.png");
  
  restartImg = loadImage("PlayButton.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(700,400);

 backGround = createSprite(0,0,700,400)
  backGround.addImage("backGround",backGroundImage);
  backGround.scale = 1.0;
  backGround.x = backGround.width/4;
  backGround.velocityX = -9;

  trex = createSprite(100,250,10,10);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.3;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.9;
  
  restart = createSprite(300,190);
  restart.addImage(restartImg); 
  restart.scale = 0.3;
  
  invisibleGround = createSprite(0,250,700,50);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();

  trex.setCollider("rectangle",0,0,0,0);
  trex.debug = false
  
  obstaclesGroup = new Group();
  
  score = 0;
  
}

function draw() {
  
  
  if (backGround.x <0) {
  backGround.x = backGround.width / 2;
}

  if(World.frameCount%100 === 0){
    mudder()
 }
  
  
  if(gameState === PLAY){
    
    if (backGround.x < 0) {
  backGround.x = backGround.width / 2;
}
    backGround.velocityX = -2;

    gameOver.visible = false;
    restart.visible = false;
    
    
    score = score + Math.round(getFrameRate()/60);
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    
    if(keyDown("space")&& trex.y >= 195||touches.length > 0 && trex.y  >= height-195) {
        trex.velocityY = -16;
        jumpSound.play();
      touches = [];
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
        dieSound.play()
    }
  }
   else if (gameState === END) {
      
    
     
gameOver.visible = true;
    restart.visible = true;
     
     
      trex.changeAnimation("collided", trex_collided);
     
      backGround.velocityX = 0;
      trex.velocityY = 0
      
    obstaclesGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0); 
      if(mousePressedOver(restart)||touches.length>0) {
      reset();
    touches = [];
    }
   }
  

  trex.collide(invisibleGround);

  drawSprites();
  textSize(30)
  textFont("Cambria (Headings)");
  fill("black")
  text("Score: "+ score, 100,50);
}

function reset(){
  gameState = PLAY
  trex.changeAnimation("running",trex_running)
  obstaclesGroup.destroyEach()
   score = 0
  gameOver.visible = false;
  restart.visible = false;
  
}

function mudder(){
  obstacle1 = createSprite(650,230,10,10);
  obstacle1.addImage(obstacle1Image)
  obstacle1.velocityX = -6
  obstacle1.scale = 0.3
  obstacle1.lifetime = 125
  obstaclesGroup.add(obstacle1)
}