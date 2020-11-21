var trex,ground,invisibleground,trex_running,trex_collided,groundImage;

var
cloudImage,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,CloudsGroup,ObstaclesGroup,score,gameState,PLAY,END;

var
gameOver,restart,gameOverimage,restartImage;


function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  
trex_collided=loadAnimation("trex_collided.png");
  
groundImage=loadImage("ground2.png"); 
  
cloudImage=loadImage("cloud.png");
  
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png"); 
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");
  
gameOverimage=loadImage("gameOver.png");
restartImage=loadImage("restart.png");  
}



function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,180,10,30);
  trex.addAnimation("running",trex_running);
  trex.scale=0.7;
  
  ground=createSprite(300,180,600,10);
  ground.addImage("ground",groundImage);
  ground.x=ground.width/2;
  
  invisibleground=createSprite(300,185,600,10);
 invisibleground.visible=false;
  
 gameOver=createSprite(300,50,40,10);
  gameOver.addImage(gameOverimage);
 restart=createSprite(300,100,30,10);
  restart.addImage(restartImage);
  
  restart.scale=0.8;
  gameOver.visible=false;
  restart.visible=false;
  
  score=0
  CloudsGroup=new Group();
  ObstacleGroup=new Group();
  PLAY=1
  END=0
  gameState=PLAY;
}
  

function draw() {
  background(180);
  text("Score :"+score,400,30);
  
  trex.collide(invisibleground);
  
  
 
  
if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*score/100);
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (score>0 && score%100 === 0){
      
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if (keyDown("space")&&trex.y>147){
   trex.velocityY=-10;
 }
  trex.velocityY = trex.velocityY + 0.8; 
  
  ground.velocityX=-6;
  
if (ground.x < 0){
    ground.x = ground.width/2;
}
   spawnClouds(); 
  
 spawnObstacles();
  
     
}
else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstacleGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.setAnimation("trex_collided");
    
    //set lifetime of the game objects so that they are never destroyed
    ObstacleGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
    

  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6 + 3*score/100);
    
    //generate random obstacles
    var rand =Math.round( random(1,6));
    
    switch(rand){
      case 1 :obstacle.addImage(obstacle1);
        break;
      case 2 :obstacle.addImage(obstacle2);
        break;
      case 3 :obstacle.addImage(obstacle3);
        break;
      case 4 :obstacle.addImage(obstacle4);
        break;
      case 5 :obstacle.addImage(obstacle5);
        break;
      case 6 :obstacle.addImage(obstacle6);
        break;
        default:break;
      
              
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstacleGroup.add(obstacle);
  }
}
