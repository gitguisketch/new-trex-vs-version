
var trex ,trex_running;
var ground
var upwall
var clouds
var score = 0
var END = 0
var PLAY = 1
var gamestate = PLAY
var restartgameover
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_stop = loadAnimation("trex_collided.png")
  groundimg = loadImage("ground2.png")
  cloudlings = loadImage("cloud.png")
  cactuludae = loadImage("obstacle1.png")
  cactuludae2 = loadImage("obstacle2.png")
  cactuludae3 = loadImage("obstacle3.png")
  cactuludae4 = loadImage("obstacle4.png")
  cactuludae5 = loadImage("obstacle5.png")
  cactuludae6 = loadImage("obstacle6.png")
  restartgame = loadImage("restart.png")
  gameisover = loadImage("gameOver.png")
}

function setup(){
  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,170,20,50);
  trex.scale = 0.5
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_stop);
  ground = createSprite (58, 195, 20, 200)
  anotherground = createSprite(58,210, 40, 30)
  anotherground.visible = false
  ground.addImage (groundimg)
  ground.velocityX = -5
  upwall = createSprite (58, 10, 200, 20)
  upwall.visible = false
  score = 0
  obstaclegroup = new Group()
  aircuddlegroup = new Group()
  reset = createSprite(300,100)
  gamedead = createSprite(300,50)
  reset.addImage(restartgame)
  gamedead.addImage(gameisover)
  reset.scale = 0.5
  gamedead.scale = 0.5
}

function draw(){
  background("white")
  drawSprites();
  if(ground.x < 0){
    ground.x = ground.width / 2
  }
  trex.collide(anotherground )
  trex.collide(upwall)
  textSize(20)
  text(score, 500, 40)
  if(gamestate === PLAY){
    ground.velocityX = -5
    trex.changeAnimation("running", trex_running)
    createClouds()
    makecactus()
    score = score + Math.round(frameCount/200);
    if(keyDown("space")&& trex.y >= 170 ){
      trex.velocityY = -6   
    }
    trex.velocityY = trex.velocityY +0.2
    if(obstaclegroup.isTouching(trex)){
      gamestate = END
    }
    reset.visible = false
    gamedead.visible = false
  }
  else if(gamestate === END){
    aircuddlegroup.setLifetimeEach(-1)
    ground.velocityX = 0
    trex.changeAnimation("collided", trex_stop);
    obstaclegroup.setVelocityXEach(0)
    aircuddlegroup.setVelocityXEach(0)
    reset.visible = true
    gamedead.visible = true
    trex.velocityY = 0
  if(mousePressedOver(reset)){
    resetar()
  }
  }
}
function createClouds(){
  if(frameCount % 150 ===0){
    clouds = createSprite(600, 100, 10, 10)
    clouds.velocityX = -6
    clouds.addImage(cloudlings)
    clouds.lifetime = 120
    clouds.depth = trex.depth
    trex.depth = trex.depth + 1
    clouds.y = Math.round(random(50,100))
    aircuddlegroup.add(clouds )
  }
}

function makecactus(){
  if(frameCount % 120 ===0){
    cactus = createSprite(600, 170, 10, 10)
    cactus.scale = 0.6
    cactus.lifetime = 60/50
    cactus.depth = trex.depth
    trex.depth = trex.depth + 1
    cactus.velocityX = -(5 + score/200)
    var r = Math.round(random(1,6))
    switch(r){
      case 1 : cactus.addImage(cactuludae)
      break
      case 2 : cactus.addImage(cactuludae2)
      break
      case 3 : cactus.addImage(cactuludae3)
      break
      case 4 : cactus.addImage(cactuludae4)
      break
      case 5 : cactus.addImage(cactuludae5)
      break
      case 6 : cactus.addImage(cactuludae6)
      break
    

    }
    obstaclegroup.add(cactus)
  }
}
  function resetar(){
    gamestate = PLAY
    obstaclegroup.destroyEach()
    aircuddlegroup.destroyEach()
    score = 0
  }