var bananaImg, stoneImg, foodGroup, stoneGroup;
var food, stone, ground, score, groundImg;
var monkey_running, monkey_collided, monkey;
var gameState = "play",
  invisibleGround;
var lives = 3,
  score = 0;

function preload() {
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");

  groundImg = loadImage("jungle.jpg");
}


function setup() {
  createCanvas(600, 400);
  ground = createSprite(500, 200, 600, 400);
  ground.scale = 1;
  ground.addImage("jungle", groundImg);
  ground.velocityX = -4;

  monkey = createSprite(100, 350, 40, 40);
  monkey.addAnimation("mnokey", monkey_running);
  monkey.scale = 0.08;

  invisibleGround = createSprite(300, 380, 600, 5);

  foodGroup = new Group();
  stoneGroup = new Group();
}

function draw() {
  background(220)
  if (gameState === "play") {
    if (ground.x < 100) {
      ground.x = ground.width / 2;
    }


    if (keyDown("space") && monkey.y > 300) {
      monkey.velocityY = -20;
    }
    monkey.velocityY += 0.6;
    monkey.collide(invisibleGround);
    invisibleGround.visible = false;
    spawnObstacles();
    spawnFood();

    if (foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach()
      score += 5;
    }
    if (stoneGroup.isTouching(monkey)) {
      stoneGroup.destroyEach();
      lives += -1;
      score += -2;
      monkey.scale = 0.08;
    }
    if (lives === 0) {
      gameState = "end";
    }
    drawSprites();
    textSize(20);
    fill(0);
    text("Lives : " + lives, 10, 30);
    text("Score : " + score, 500, 30);
  }

  if (gameState === "end") {


    textSize(40);
    fill("red");
    stroke("maroon");
    text("GAME", 250, 150);
    text("OVER", 250, 200);
    textSize(30);
    text("Final score : " + score, 200, 250);
    monkey.velocityY = 0;

    text("Press 'r' key to restart", 200, 300);

    if (keyDown("r")) {
      gameState = "play";
      lives = 3;
      score = 0;
      monkey.y = 300;
      monkey.collide(invisibleGround);
    }

  }

}

function spawnFood() {
  if (frameCount % 100 === 0) {
    food = createSprite(600, 0, 20, 20);
    food.addImage(bananaImg);
    food.scale = 0.05;
    food.y = Math.round(random(100, 350));
    food.velocityX = -4;
    food.lifetime = 200;
    foodGroup.add(food);

    switch (score) {
      case 10:
        monkey.scale += 0.005;
        break;
      case 20:
        monkey.scale += 0.01;
        break;
      case 30:
        monkey.scale += 0.015;
        break;
      case 40:
        monkey.scale += 0.02;
        food.scale += 0.1;
        break;
      default:
        break;

    }
  }
}

function spawnObstacles() {
  if (frameCount % 150 === 0) {
    stone = createSprite(600, 350, 20, 10);
    stone.velocityX = -4;
    stone.addImage(stoneImg);
    stone.scale = 0.2;
    stoneGroup.add(stone);
    stone.lifetime = 200;
    //stone.debug = true;
    stone.setCollider("circle", 0, 0, 200);
  }

}