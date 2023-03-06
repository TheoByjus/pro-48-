let ground;
let lander;
var lander_img;
var bg_img;
var obstaculo
var pedra
var crash
var pousar
var obsSprite
var pedraSprite
var gas = 20 

var vx = 0;
var g = 0.05;
var vy = 0;

var playerLeft
var playerRight
var playerUp
function preload()
{
  lander_img = loadAnimation("normal.png")
  bg_img = loadImage("bg.png")
  playerLeft = loadAnimation ("left_thruster_1.png","left_thruster_2.png")
  playerRight = loadAnimation ("right_thruster_1.png","right_thruster_2.png")
  playerUp = loadAnimation ("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png")
  obstaculo = loadImage("obstacle.png")
  pedra = loadImage("lz.png")
  crash = loadAnimation("crash1.png","crash2.png","crash3.png")
  pousar = loadAnimation("landing1.png","landing2.png","landing_3.png")
  crash.looping = false
  pousar.looping = false
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);
//criar sprite lander e add imagem e scale
  lander = createSprite(60,70)
  lander.addAnimation("normal",lander_img)
  lander.addAnimation ("left",playerLeft)
  lander.addAnimation ("right",playerRight)
  lander.addAnimation ("Up",playerUp)
  lander.addAnimation("pouso", pousar)
  lander.addAnimation("crash", crash)
  lander.scale = 0.1
  lander.setCollider("rectangle",0,0,200,200)
  lander.debug = false
  ground = createSprite(500,680,1000,40)
obsSprite = createSprite(320,530,50,100)
obsSprite.addImage(obstaculo)
obsSprite.scale = 0.5
obsSprite.setCollider("rectangle",-50,150,100,200)
obsSprite.debug = false
pedraSprite = createSprite(880,590,50,30)
pedraSprite.addImage(pedra)
pedraSprite.scale = 0.3
pedraSprite.setCollider("rectangle",0,180,400,100)
pedraSprite.debug = false
  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  //colocar texto na tela para velocidade vertical
  text(" velocidade vertical: " + round(vy),800,75)
  text(" velocidade horizontal: " + round(vx),800,50) 
  text(" combustivel " + gas,800,100) 
  vy=vy+g
  lander.y += vy
  lander.x += vx
  pop();
if(lander.isTouching(obsSprite)|| lander.isTouching(ground)|| gas <=0){
  vx = 0 
  vy = 0
  g = 0
  lander.changeAnimation("crash")
  setTimeout(() => { lander.destroy() }, 2000);
  gas = 0
  gameOver()
}
  if(lander.isTouching(pedraSprite)){
    vx = 0 
    vy = 0
    g = 0
    lander.changeAnimation("pouso")
    ganhar()
  }
  lander.depth = pedraSprite.depth 
  lander.depth += 1 
  
  drawSprites();
}

function keyPressed(){
  if(keyCode == UP_ARROW){
vy= -1
gas -=1
lander.changeAnimation("Up")
  }
  if(keyCode == LEFT_ARROW){
    vx= -1
    gas -=1
    lander.changeAnimation("right")
      }
      if(keyCode == RIGHT_ARROW){
        vx= +1
        gas -=1
        lander.changeAnimation("left")
          }
}
function keyReleased(){
  if(keyCode == UP_ARROW){
    vy= -1
    lander.changeAnimation("normal")
      }
      if(keyCode == LEFT_ARROW){
        vx= -1
        lander.changeAnimation("normal")
          }
          if(keyCode == RIGHT_ARROW){
            vx= +1
            lander.changeAnimation("normal")
              }
}

function gameOver() {
  swal(
    {
      title: `Fim de Jogo!!!`,
      text: "Obrigada por jogar!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function ganhar() {
  swal(
    {
      title: `Você Ganhou o Jogo!!!`,
      text: "Obrigada por jogar!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
